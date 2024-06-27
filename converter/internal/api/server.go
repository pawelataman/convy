package api

import (
	"converter/internal/services"
	"converter/pb"
	_ "image/gif"
	_ "image/jpeg"
	_ "image/png"
	"io"
	"log"

	_ "golang.org/x/image/bmp"
	_ "golang.org/x/image/tiff"
)

const CHUNK_SIZE = 65 * 1024

var converterService = services.ConverterService{}

type ConverterServer struct {
	pb.UnimplementedConverterServiceServer
}

func NewConverterServer() *ConverterServer {
	return &ConverterServer{}
}

func (g *ConverterServer) Upload(stream pb.ConverterService_UploadServer) error {

	converterImageReader, fileName, err := converterService.Convert(stream)

	if err != nil {
		log.Fatal(err)
	}

	buff := make([]byte, CHUNK_SIZE)

	for {
		n, err := converterImageReader.Read(buff)

		if err == io.EOF {
			break
		}

		if err != nil {
			log.Fatal(err)
		}

		if err = stream.Send(&pb.FileUploadResponse{
			FileName: fileName,
			Chunk:    buff[:n],
		}); err != nil {
			return err
		}
	}
	return nil
}
