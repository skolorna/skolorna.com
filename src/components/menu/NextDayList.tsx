import React, { FunctionComponent } from "react";
import { useDays } from "../../lib/menu/days";
import DividedList from "../list/DividedList";
import InlineSkeleton from "../skeleton/InlineSkeleton";
import InfoText from "../typography/InfoText";

export interface NextDayListProps {
  menu?: string;
  maxMeals?: number;
}

const NextDayList: FunctionComponent<NextDayListProps> = ({
  menu,
  maxMeals,
}) => {
  const { data, error } = useDays({
    menu,
  });

  const nextDay = data?.[0];

  if (error) {
    return <InfoText>Misslyckades med att hämta information.</InfoText>;
  }

  if (!nextDay) {
    // data has been received, but no nextDay is present.
    if (data) {
      return <InfoText>Ingen information.</InfoText>;
    }

    // No data. It must be loading!
    return <InlineSkeleton count={3} />;
  }

  const { meals } = nextDay;

  const mealOverflow = meals.length - (maxMeals ?? meals.length);

  return (
    <DividedList>
      {meals.slice(0, maxMeals).map((meal) => (
        <li key={meal.value}>{meal.value}</li>
      ))}
      {mealOverflow > 0 && <li>(Ytterligare {mealOverflow})</li>}
    </DividedList>
  );
};

export default NextDayList;
