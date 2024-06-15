package main

import (
	"converter/internal/api"
	"converter/pb"
	"fmt"
	"log"
	"net"

	"google.golang.org/grpc"
)

func main() {

	lis, err := net.Listen("tcp", fmt.Sprintf("localhost:%d", 9000))
	if err != nil {
		log.Fatal(err)
	}

	grpcServer := *grpc.NewServer()

	converterServer := api.NewConverterServer()

	pb.RegisterConverterServiceServer(&grpcServer, converterServer)

	fmt.Println("Listen on port :9000")

	if err := grpcServer.Serve(lis); err != nil {
		log.Fatal(err)
	}

}
