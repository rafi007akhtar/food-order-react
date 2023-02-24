import availableMealsStyles from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import appConstants from "../../store/constants";
import { useCallback, useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";

export default function AvailableMeals() {
  const [mealItems, setMealItems] = useState();

  const [mealsObj, error, isLoading, fetchMeals] = useHttp(
    `${appConstants.BASE_URL}${appConstants.MEALS_EXTENSION}`
  );

  const generateMealItems = useCallback(() => {
    if (mealsObj) {
      const mealsJSX = [];
      Object.keys(mealsObj).forEach((key) => {
        const item = { ...mealsObj[key], id: key };
        const mealJSX = (
          <MealItem
            key={item.id}
            description={item.description}
            price={item.price}
            id={item.id}
            name={item.name}
          >
            {item.name}
          </MealItem>
        );
        mealsJSX.push(mealJSX);
      });
      setMealItems(mealsJSX);
    }
  }, [mealsObj]);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  useEffect(() => {
    generateMealItems()
  }, [generateMealItems]);

  return (
    <section className={availableMealsStyles.meals}>
      {mealItems && (
        <Card>
          <ul>{mealItems}</ul>
        </Card>
      )}
      {isLoading && <p>Loading the meals...</p>}
    </section>
  );
}
