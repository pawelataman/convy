PROTO_DIR = _proto
API_GATEWAY_PROTO_PATH = client/apps/backend/src/app/core/proto-types
CONVERTER_SERVICE_PROTO_PATH = converter/pb

proto-go-gen:
	@protoc --go_out=. --go-grpc_out=. ${PROTO_DIR}/*.proto -I ./${PROTO_DIR}
proto-go-clean:
	@rm ${CONVERTER_SERVICE_PROTO_PATH}/*.go
proto-ts-gen:
	@protoc --ts_proto_opt=nestJs=true --ts_proto_out=${API_GATEWAY_PROTO_PATH} --plugin=client/node_modules/ts-proto/protoc-gen-ts_proto ./${PROTO_DIR}/*.proto -I ./${PROTO_DIR}
proto-ts-clean:
	@rm ${API_GATEWAY_PROTO_PATH}/*.ts

proto-gen: proto-go-gen proto-ts-gen
proto-clean: proto-go-clean proto-ts-clean
proto: proto-clean proto-gen