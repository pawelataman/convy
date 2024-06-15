package api

import (
	"context"
	"converter/pb"
	"fmt"
)

type ConverterServer struct {
	pb.UnimplementedConverterServiceServer
}

func NewConverterServer() *ConverterServer {
	return &ConverterServer{}
}

func (g *ConverterServer) SayHello(ctx context.Context, request *pb.HelloRequest) (*pb.HelloReply, error) {
	fmt.Println(request.Name)

	return &pb.HelloReply{
		Message: "Cześć Madzia <3 - Response",
	}, nil
}
