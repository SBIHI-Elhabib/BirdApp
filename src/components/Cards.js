import React, { useEffect, useState } from "react";
import "./Cards.css";
import CardItem from "./CardItem";

function Cards() {
  const [birdSets, setBirdSets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch("http://localhost:8000/api/birds");
        if (!result.ok) {
          throw new Error(`Failed to fetch birds: ${result.statusText}`);
        }

        const jsonResult = await result.json();

        // Split the array into sets of three
        const sets = [];
        for (let i = 0; i < jsonResult.length; i += 3) {
          sets.push(jsonResult.slice(i, i + 3));
        }

        setBirdSets(sets);
      } catch (error) {
        console.error("Error fetching birds:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="cards">
      <h1>Check out these EPIC Pictures of BIRDS!</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          {birdSets.map((birdSet, setIndex) => (
            <div key={setIndex} className="cards__items">
              {birdSet.map((bird) => (
                <div key={bird.name} className="cards__item">
                  <CardItem
                    src={bird.imageUrl}
                    text={bird.description}
                    label={bird.name}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cards;
