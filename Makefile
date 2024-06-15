proto-go-gen:
	@protoc -I./_proto --go_out=. --go-grpc_out=. _proto/*.proto
proto-go-clean:
	@rm converter/pb/*.go
