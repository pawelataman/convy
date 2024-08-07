import { ClientOptions, Transport } from '@nestjs/microservices';
import path from 'node:path';
import { CONVERTER_PACKAGE_NAME } from '@backend/src/app/common/proto-types/converter_service';

export const CONVERTER_MICROSERVICE_CONFIG: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: `localhost:9000`,
    package: CONVERTER_PACKAGE_NAME,
    protoPath: [path.join(__dirname, '/_proto/converter_service.proto')],
    loader: {
      includeDirs: [path.join(__dirname, '/_proto')],
    },
  },
};
