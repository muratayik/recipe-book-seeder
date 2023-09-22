import fs from "fs";

import { AppDataSource } from "../config/data-source.config";
import { Category } from "../entity/Category";
import { Repository } from "typeorm";

export const migrateCategoryData = async () => {
  const categoryRepository = AppDataSource.getRepository(Category);

  const categoryList: { [key: string]: number } = {};

  const { categories } = JSON.parse(
    fs.readFileSync("src/data/categories.json", "utf-8")
  );

  for (const category of categories) {
    const categoryData = await categoryRepository.findOneBy({
      name: category.strCategory,
    });

    if (!categoryData) {
      console.log("Inserting new category: ", category.strCategory);
      const newCategory = await createCategory(category, categoryRepository);
      categoryList[newCategory.name] = newCategory.id;
    } else {
      console.log("Category already exists: ", category.strCategory);
      categoryList[category.strCategory] = categoryData.id;
    }
  }

  return categoryList;
};

const createCategory = async (
  category: any,
  categoryRepository: Repository<Category>
) => {
  const { strCategory, strCategoryThumb, strCategoryDescription } = category;

  const newCategory = new Category();
  newCategory.public_id = strCategory.toLowerCase();
  newCategory.name = strCategory;
  newCategory.image_url = strCategoryThumb;
  newCategory.description = strCategoryDescription;

  await categoryRepository.save(newCategory);
  return newCategory;
};
