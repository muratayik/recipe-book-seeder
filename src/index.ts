import dotenv from "dotenv";

import { connectToDataBase } from "./config/data-source.config";
import { migrateCategoryData } from "./service/category.service";
import { migrateMealsData } from "./service/meal.service";

dotenv.config();

const migrateData = async () => {
  const categoryList = await migrateCategoryData();
  console.log(categoryList);
  await migrateMealsData(categoryList);
  console.log("<<<<<<<<<<<<Data migrated successfully");
};

connectToDataBase()
  .initialize()
  .then(() => {
    migrateData();
  })
  .catch((error) => console.log(error));
