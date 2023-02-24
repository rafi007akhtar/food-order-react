import availableMealsStyles from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import appConstants from "../../store/constants";
import { useCallback, useEffect, useState } from "react";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 20,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

export default function AvailableMeals() {
  const [mealItems, setMealItems] = useState();

  const fetchAllMeals = useCallback(async () => {
    const mealsUrl = `${appConstants.BASE_URL}${appConstants.MEALS_EXTENSION}`;
    const response = await fetch(mealsUrl);
    const mealsObj = await response.json();
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
  }, []);

  useEffect(() => {
    fetchAllMeals();
  }, [fetchAllMeals]);

  return (
    <section className={availableMealsStyles.meals}>
      {mealItems && (
        <Card>
          <ul>{mealItems}</ul>
        </Card>
      )}
      {!mealItems && <p>Loading the meals...</p>}
    </section>
  );
}
