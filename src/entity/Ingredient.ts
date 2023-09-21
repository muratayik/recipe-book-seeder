import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  amount: string;

  @Column()
  meal_id: number;
}
