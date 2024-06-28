import { Global, Module } from '@nestjs/common';

import { ExampleModule } from './example/example.module';

@Global()
@Module({
  imports: [ExampleModule],
})
export class GlobalModule {}
