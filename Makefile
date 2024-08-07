PROTO_DIR = _proto
API_GATEWAY_PROTO_PATH = client/apps/backend/src/app/common/proto-types
CONVERTER_SERVICE_PROTO_PATH = converter/pb

proto-go-gen:
	@protoc --go_out=. --go-grpc_out=. ${PROTO_DIR}/*.proto -I ./${PROTO_DIR}
proto-go-clean:
	@rm ${CONVERTER_SERVICE_PROTO_PATH}/*.go
proto-ts-gen:
	@protoc --ts_proto_opt=nestJs=true --ts_proto_out=${API_GATEWAY_PROTO_PATH} --plugin=client/node_modules/ts-proto/protoc-gen-ts_proto ./${PROTO_DIR}/*.proto -I ./${PROTO_DIR}
proto-ts-clean:
	@rm ${API_GATEWAY_PROTO_PATH}/*.ts
docker-dev:
	@docker-compose -f ./docker/compose-local.yml --env-file=.env up --build
docker-prune:
	@docker image prune -f && docker container prune -f && docker volume prune -f
proto-gen: proto-go-gen proto-ts-gen
proto-clean: proto-go-clean proto-ts-clean
proto: proto-clean proto-gen
backend-dev:
	@npm run serve:backend
frontend-dev:
	@npm run serve:frontend