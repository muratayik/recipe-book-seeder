import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Meal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  public_id: string;

  @Column()
  name: string;

  @Column()
  image_url: string;

  @Column()
  youtube_url: string;

  @Column()
  source_url: string;

  @Column()
  category_id: number;
}
