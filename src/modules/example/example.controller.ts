import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { Agata } from 'src/shared/decorators/agata.decorator';
import { Public } from 'src/shared/decorators/public.decorator';
import { ResponseMessage } from 'src/shared/decorators/response.decorator';
import { Roles } from 'src/shared/decorators/role.decorator';
import { AgataHeaders } from 'src/shared/interface/agata.interface';
import { responseMessage, role } from 'src/shared/utils/constant';
import { CreateExampleDto } from './dto/create-example.dto';
import { ExampleService } from './example.service';

@ApiTags('Example')
@ApiBasicAuth()
@Controller({
  version: '1',
  path: 'example',
})
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  // method
  @Get()
  // public without auth
  @Public()
  // versioning override the controller version
  @Version('2')
  // RBAC
  @Roles(role.ADMIN, role.USER)
  // returned message with OPTIONAL additional message
  @ResponseMessage(responseMessage.SUCCESS, 'getting list')
  findAllV2(@Agata() agata: AgataHeaders) {
    // retrieve agata headers
    console.log(agata);
    console.log('this is v2');
    return this.exampleService.findAll();
  }

  @Get()
  @Public()
  @Roles(role.ADMIN, role.USER)
  @ResponseMessage(responseMessage.SUCCESS)
  findAll(@Agata() agata: AgataHeaders) {
    console.log(agata);
    console.log('this is v1');
    return this.exampleService.findAll();
  }

  @Post()
  @ResponseMessage(responseMessage.SUCCESSFULLY_CREATED)
  create(@Body() createExampleDto: CreateExampleDto) {
    return this.exampleService.create(createExampleDto);
  }

  @Post('file')
  @ResponseMessage(responseMessage.SUCCESSFULLY_CREATED)
  @UseInterceptors(FileInterceptor('file'))
  createWithFile(
    @Body() createExampleDto: CreateExampleDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.exampleService.create(createExampleDto, file);
  }

  @Get('pagination')
  @ResponseMessage(responseMessage.SUCCESS)
  findAllPagination(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    return this.exampleService.findAllPagination(page, limit);
  }

  // example when returned error throw only on service
  @Get('error')
  @ResponseMessage(responseMessage.SUCCESS)
  findError() {
    return this.exampleService.error();
  }

  @Get(':id')
  @ResponseMessage(responseMessage.SUCCESS)
  findOne(@Query('id') id: number) {
    return this.exampleService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage(responseMessage.SUCCESS)
  update(@Query('id') id: number, @Body() updateExampleDto: CreateExampleDto) {
    return this.exampleService.update(id, updateExampleDto);
  }

  @Delete(':id')
  @ResponseMessage(responseMessage.SUCCESS)
  remove(@Query('id') id: number) {
    return this.exampleService.remove(id);
  }
}
