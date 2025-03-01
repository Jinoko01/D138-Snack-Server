import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('snacks')
export class Snack {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'adscewqc' })
  id: string;

  @Column()
  @ApiProperty({ example: '새우깡' })
  name: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'https://www.coupang.com/vp/products/1234' })
  link?: string;
}
