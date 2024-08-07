// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.4.0
// - protoc             v5.27.0
// source: converter_service.proto

package pb

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.62.0 or later.
const _ = grpc.SupportPackageIsVersion8

const (
	ConverterService_Upload_FullMethodName = "/converter.ConverterService/Upload"
)

// ConverterServiceClient is the client API for ConverterService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type ConverterServiceClient interface {
	Upload(ctx context.Context, opts ...grpc.CallOption) (ConverterService_UploadClient, error)
}

type converterServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewConverterServiceClient(cc grpc.ClientConnInterface) ConverterServiceClient {
	return &converterServiceClient{cc}
}

func (c *converterServiceClient) Upload(ctx context.Context, opts ...grpc.CallOption) (ConverterService_UploadClient, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	stream, err := c.cc.NewStream(ctx, &ConverterService_ServiceDesc.Streams[0], ConverterService_Upload_FullMethodName, cOpts...)
	if err != nil {
		return nil, err
	}
	x := &converterServiceUploadClient{ClientStream: stream}
	return x, nil
}

type ConverterService_UploadClient interface {
	Send(*FileUploadRequest) error
	Recv() (*FileUploadResponse, error)
	grpc.ClientStream
}

type converterServiceUploadClient struct {
	grpc.ClientStream
}

func (x *converterServiceUploadClient) Send(m *FileUploadRequest) error {
	return x.ClientStream.SendMsg(m)
}

func (x *converterServiceUploadClient) Recv() (*FileUploadResponse, error) {
	m := new(FileUploadResponse)
	if err := x.ClientStream.RecvMsg(m); err != nil {
		return nil, err
	}
	return m, nil
}

// ConverterServiceServer is the server API for ConverterService service.
// All implementations must embed UnimplementedConverterServiceServer
// for forward compatibility
type ConverterServiceServer interface {
	Upload(ConverterService_UploadServer) error
	mustEmbedUnimplementedConverterServiceServer()
}

// UnimplementedConverterServiceServer must be embedded to have forward compatible implementations.
type UnimplementedConverterServiceServer struct {
}

func (UnimplementedConverterServiceServer) Upload(ConverterService_UploadServer) error {
	return status.Errorf(codes.Unimplemented, "method Upload not implemented")
}
func (UnimplementedConverterServiceServer) mustEmbedUnimplementedConverterServiceServer() {}

// UnsafeConverterServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to ConverterServiceServer will
// result in compilation errors.
type UnsafeConverterServiceServer interface {
	mustEmbedUnimplementedConverterServiceServer()
}

func RegisterConverterServiceServer(s grpc.ServiceRegistrar, srv ConverterServiceServer) {
	s.RegisterService(&ConverterService_ServiceDesc, srv)
}

func _ConverterService_Upload_Handler(srv interface{}, stream grpc.ServerStream) error {
	return srv.(ConverterServiceServer).Upload(&converterServiceUploadServer{ServerStream: stream})
}

type ConverterService_UploadServer interface {
	Send(*FileUploadResponse) error
	Recv() (*FileUploadRequest, error)
	grpc.ServerStream
}

type converterServiceUploadServer struct {
	grpc.ServerStream
}

func (x *converterServiceUploadServer) Send(m *FileUploadResponse) error {
	return x.ServerStream.SendMsg(m)
}

func (x *converterServiceUploadServer) Recv() (*FileUploadRequest, error) {
	m := new(FileUploadRequest)
	if err := x.ServerStream.RecvMsg(m); err != nil {
		return nil, err
	}
	return m, nil
}

// ConverterService_ServiceDesc is the grpc.ServiceDesc for ConverterService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var ConverterService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "converter.ConverterService",
	HandlerType: (*ConverterServiceServer)(nil),
	Methods:     []grpc.MethodDesc{},
	Streams: []grpc.StreamDesc{
		{
			StreamName:    "Upload",
			Handler:       _ConverterService_Upload_Handler,
			ServerStreams: true,
			ClientStreams: true,
		},
	},
	Metadata: "converter_service.proto",
}
