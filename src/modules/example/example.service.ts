import { Injectable } from '@nestjs/common';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { CreateExampleDto } from './dto/create-example.dto';
import { UpdateExampleDto } from './dto/update-example.dto';

@Injectable()
export class ExampleService {
  constructor() // @InjectRepository(ExampleEntity)
  // private readonly exampleRepository: Repository<ExampleEntity>,
  {}

  async paginate(options: IPaginationOptions) {
    // ): Promise<Pagination<ExampleEntity>> {
    // return paginate<ExampleEntity>(this.exampleRepository, options);
  }

  async create(createExampleDto: CreateExampleDto, file?: Express.Multer.File) {
    // if (file) {
    //   return this.exampleRepository.save({
    //     ...createExampleDto,
    //     file: file.originalname,
    //   });
    // }
    // return this.exampleRepository.save(createExampleDto);
  }

  async findAll() {
    // return this.exampleRepository.find();
  }

  async findAllPagination(page: number, limit: number) {
    // // https://github.com/nestjsx/nestjs-typeorm-paginate
    // return paginate<ExampleEntity>(this.exampleRepository, {
    //   page,
    //   limit,
    // });
  }

  async error(err = true) {
    // //Optional
    // const additionalMessage = 'on endpoint /example/error';
    // if (err) {
    //   throw new ErrorException(responseMessage.BAD_REQUEST, additionalMessage);
    // } else {
    //   return;
    // }
  }

  async findOne(id: number) {
    // const data = this.exampleRepository.findOneBy({ id });
    // return data;
  }

  async update(id: number, updateExampleDto: UpdateExampleDto) {
    // const updatedData = this.exampleRepository.update(id, updateExampleDto);
    // return updatedData;
  }

  async remove(id: number) {
    // return this.exampleRepository.delete(id);
  }
}
