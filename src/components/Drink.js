import React from "react";

function Drink({ drink }) {
  return (
    <div className="drink">
      <h3>{drink.name}</h3>
      <p>Precio: {drink.price} $</p>
    </div>
  );
}

export default Drink;
