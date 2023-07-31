import "@/app/globals.css";
import { Hero, HeroesListReducer } from "@/types/heroes";
import React, { useCallback } from "react";
import HeroCard from "../HeroCard";

import Pagination from "../Pagination";
import { useDispatch } from "react-redux";
import { changePage, updateOffSet } from "@/redux/heroesList/slice";
import { useSelector } from "react-redux";

type Props = {
  heroesList: Hero[];
};

const HeroesList = ({ heroesList }: Props) => {
  const { perPage } = useSelector(
    (state: HeroesListReducer) => state.heroesListReducer
  );
  const dispatch = useDispatch();

  const renderHeroesList = useCallback(
    (data: Hero[]) => {
      return (
        <>
          {data.map((hero) => (
            <HeroCard key={hero.id} heroData={hero} />
          ))}
        </>
      );
    },
    [heroesList]
  );

  const handlePageClick = (event: { selected: number }): void => {
    dispatch(changePage(event.selected));

    const newOffset = (event.selected * perPage) % heroesList.length;
    dispatch(updateOffSet(newOffset));
  };

  return (
    <div className="flex justify-between items-center flex-wrap p-8 gap-4">
      {heroesList && heroesList.length > 0 ? (
        <>
          {renderHeroesList(heroesList)}

          <Pagination onChange={handlePageClick} />
        </>
      ) : (
        <p>Não há herois a serem listados</p>
      )}
    </div>
  );
};

export default HeroesList;
