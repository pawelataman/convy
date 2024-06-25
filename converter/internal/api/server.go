package api

import (
	"bytes"
	"converter/pb"
	"io"
	"log"
)

type ConverterServer struct {
	pb.UnimplementedConverterServiceServer
}

func NewConverterServer() *ConverterServer {
	return &ConverterServer{}
}

func (g *ConverterServer) Upload(stream pb.ConverterService_UploadServer) error {

	imageBuffer := new(bytes.Buffer)

	for {
		req, err := stream.Recv()

		if err == io.EOF {
			break
		}
		if err != nil {
			log.Fatal(err)
			break
		}

		chunk := req.GetChunk()
		imageBuffer.Write(chunk)
	}

	return stream.SendAndClose(&pb.FileUploadResponse{FileName: fileName, Size: fileSize})
}
