import { ClientOptions, Transport } from '@nestjs/microservices';
import * as path from 'node:path';

export const ConverterSvcOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: `localhost:9000`,
    package: 'converter',
    protoPath: [path.join(__dirname, '/_proto/converter_service.proto')],
    loader: {
      includeDirs: [path.join(__dirname, '/_proto')],
    },
  },
};
