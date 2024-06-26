package api

import (
	"bytes"
	"converter/pb"
	"fmt"
	"image"
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
		fmt.Printf("Recieved %d bytes \n", len(chunk))
		imageBuffer.Write(chunk)
	}

	_, imageFormat, err := image.Decode(imageBuffer)

	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Printf("Image format %s \n", imageFormat)
	}

	return stream.SendAndClose(&pb.FileUploadResponse{FileName: "cats.jpeg", Size: 10})
}
