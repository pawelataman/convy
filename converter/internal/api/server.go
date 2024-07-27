package api

import (
	"converter/internal/services"
	"converter/pb"
	"io"
	"log"
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

	convertedImageBuffer, fileName, err := converterService.Convert(stream)

	if err != nil {
		log.Fatal(err)
		return err
	}

	buff := make([]byte, CHUNK_SIZE)

	for {
		n, err := convertedImageBuffer.Read(buff)

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

			log.Fatal(err)
			return err
		}
	}
	return nil
}
