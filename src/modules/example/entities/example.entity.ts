import { GlobalEntity } from 'src/modules/global.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

@Entity('example')
export class ExampleEntity extends GlobalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { name: 'name', length: 150, nullable: false })
  name: string;

  @Column('varchar', { name: 'email', length: 150, nullable: true })
  email: string;

  @Column('varchar', { name: 'phone_number', length: 150, nullable: false })
  phone_number: string;

  @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
  status: Status;

  @Column({ nullable: true, default: null })
  file: string;
}
