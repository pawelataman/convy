package api

import (
	"bytes"
	"converter/pb"
	"fmt"
	_ "image/gif"
	_ "image/jpeg"
	_ "image/png"
	"io"
	"log"

	_ "golang.org/x/image/bmp"
	_ "golang.org/x/image/tiff"
)

type ConverterServer struct {
	pb.UnimplementedConverterServiceServer
}

func NewConverterServer() *ConverterServer {
	return &ConverterServer{}
}

func (g *ConverterServer) Upload(stream pb.ConverterService_UploadServer) error {

	imageBuffer := new(bytes.Buffer)
	fileName := ""
	for {
		req, err := stream.Recv()

		if fileName == "" {
			fileName = req.FileName
		}

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

	fmt.Println("Done converting image")
	return stream.SendAndClose(&pb.FileUploadResponse{FileName: "cats.jpeg", Size: 10})
}
