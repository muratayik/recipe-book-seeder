import { DataSource } from "typeorm";
import { Category } from "../entity/Category";
import { Instruction } from "../entity/Instruction";
import { Ingredient } from "../entity/Ingredient";
import { Meal } from "../entity/Meal";

export let AppDataSource: DataSource;

export const connectToDataBase = () => {
  AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Category, Meal, Ingredient, Instruction],
    synchronize: false,
    logging: false,
  });

  return AppDataSource;
};
