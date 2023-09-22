import fs from "fs";

import { AppDataSource } from "../config/data-source.config";
import { Repository } from "typeorm";
import { Meal } from "../entity/Meal";
import { Ingredient } from "../entity/Ingredient";
import { Instruction } from "../entity/Instruction";

export const migrateMealsData = async (categoryList: any) => {
  const mealRepository = AppDataSource.getRepository(Meal);
  const ingredientRepository = AppDataSource.getRepository(Ingredient);
  const instructionRepository = AppDataSource.getRepository(Instruction);

  const { meals } = JSON.parse(
    fs.readFileSync("src/data/meal-details-simplified.json", "utf-8")
  );

  for (const mealRecord of meals) {
    const mealData = await getMealWithName(mealRecord.name, mealRepository);
    if (mealData) {
      console.log(`meal with name ${mealRecord.name} already exists`);
    } else {
      console.log(`creating meal with name ${mealRecord.name}`);
      const newMeal = await insertMealToDatabase(
        mealRecord,
        mealRepository,
        categoryList
      );

      console.log("Creating ingredients");
      await insertIngredientsToDatabase(
        mealRecord.ingredients,
        ingredientRepository,
        newMeal.id
      );

      console.log("Creating instructions");
      await insertInstructionsToDatabase(
        mealRecord.instructions,
        instructionRepository,
        newMeal.id
      );
    }
  }
};

const getMealWithName = async (
  name: string,
  mealRepository: Repository<Meal>
) => {
  return await mealRepository.findOneBy({ name });
};

const insertMealToDatabase = async (
  mealRecord: any,
  mealRepository: Repository<Meal>,
  categoryList: any
) => {
  const { name, imageUrl, youtubeUrl, sourceUrl, category } = mealRecord;
  const newMeal = new Meal();
  newMeal.name = name;
  newMeal.public_id = convertNameToLatin(name);
  newMeal.image_url = imageUrl;
  newMeal.youtube_url = youtubeUrl;
  newMeal.source_url = sourceUrl;
  newMeal.category_id = categoryList[category];
  await mealRepository.save(newMeal);
  return newMeal;
};

const insertIngredientsToDatabase = async (
  ingredientsRecord: any,
  ingredientRepository: Repository<Ingredient>,
  mealId: number
) => {
  for (const ingRecord of ingredientsRecord) {
    const { name, amount } = ingRecord;
    const newIngredient = new Ingredient();
    newIngredient.name = name;
    newIngredient.amount = amount;
    newIngredient.meal_id = mealId;
    await ingredientRepository.save(newIngredient);
  }
};

const insertInstructionsToDatabase = async (
  instructionsRecord: any,
  instructionRepository: Repository<Instruction>,
  mealId: number
) => {
  let index = 1;
  for (const instructionRecord of instructionsRecord) {
    const newInstructions = new Instruction();
    newInstructions.sequence = index;
    newInstructions.step = instructionRecord;
    newInstructions.meal_id = mealId;
    await instructionRepository.save(newInstructions);
    index++;
  }
};

const convertNameToLatin = (name: string) => {
  const alphabetAndDash = "abcdefghijklmnopqrstuvwxyz-";

  const result: any = [];
  name
    .toLowerCase()
    .split("")
    .forEach((c) => {
      if (alphabetAndDash.includes(c)) {
        result.push(c);
      } else if (c === " ") {
        result.push("-");
      }
    });

  return result.join("").replace("--", "-");
};
