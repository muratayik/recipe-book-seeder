import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Instruction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sequence: number;

  @Column()
  step: string;

  @Column()
  meal_id: number;
}
