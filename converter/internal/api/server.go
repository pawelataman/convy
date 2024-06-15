package api

import (
	"converter/pb"
	"converter/utils"
	"fmt"
	"io"
	"log"
	"path/filepath"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type ConverterServer struct {
	pb.UnimplementedConverterServiceServer
}

func NewConverterServer() *ConverterServer {
	return &ConverterServer{}
}

func (g *ConverterServer) Upload(stream pb.ConverterService_UploadServer) error {
	file := utils.NewFile()
	var fileSize uint32
	fileSize = 0
	defer func() {
		if err := file.OutputFile.Close(); err != nil {
			log.Fatal(err)
			return
		}
	}()

	for {
		req, err := stream.Recv()

		if err == io.EOF {
			break
		}
		if err != nil {
			log.Fatal(err)
			break
		}

		if file.FilePath == "" {
			file.SetFile(req.GetFileName(), "./")
		}

		fmt.Printf("name: %s \n", req.FileName)
		chunk := req.GetChunk()
		fileSize += uint32(len(chunk))
		fmt.Printf("received a chunk with size: %d \n", fileSize)

		if err := file.Write(chunk); err != nil {
			log.Fatal(status.Error(codes.Internal, err.Error()))
			break
		}
	}
	fileName := filepath.Base(file.FilePath)
	fmt.Printf("saved file: %s, size: %d \n", fileName, fileSize)
	return stream.SendAndClose(&pb.FileUploadResponse{FileName: fileName, Size: fileSize})
}
