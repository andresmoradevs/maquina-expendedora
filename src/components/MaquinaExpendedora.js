import React, { useState, useEffect } from "react";
import Drink from "./Drink";
import axios from "axios";

function MaquinaExpendedora() {
  const [drinks, setDrinks] = useState([]);
  const [selected, setSelected] = useState(null);
  const [coinsInserted, setCoinsInserted] = useState(0);
  const [optionsCoins] = useState([0.05, 0.1, 0.25]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8080/drinks")
      .then((response) => {
        // Asegúrate de que la respuesta tenga un campo "data" que sea un arreglo
        if (Array.isArray(response.data.data)) {
          setDrinks(response.data.data);
        } else {
          console.error("La respuesta de la API no contiene un arreglo 'data':", response.data);
        }
      })
      .catch((error) => {
        console.error("Error al recuperar datos:", error);
      });
  }, []);
  
  // Agrega una función para simular la compra de una bebida
  const buyDrink = (drink) => {
    if (coinsInserted >= drink.price) {
      alert(`¡Has comprado una ${drink.name}!`);
      setCoinsInserted(coinsInserted - drink.price);
    } else {
      alert("No tienes suficientes monedas para comprar esta bebida.");
    }
  };

  const addCoin = (valor) => {
    setCoinsInserted(coinsInserted + valor);
    updateBalance();
  };

  const updateBalance = () => {
    setBalance(coinsInserted);
  };

  return (
    <div className="maquina-expendedora">
      <h2>Máquina Expendedora de Bebidas</h2>

      <p>Saldo: $ {balance}</p>

      <div className="options-coins">
        {optionsCoins.map((valor, index) => (
          <button key={index} onClick={() => addCoin(valor)}>
            Agregar $ {valor} 
          </button>
        ))}
      </div>

      <div className="list-drinks">
        {drinks.map((drink) => (
          <div key={drink.id} className="drink">
            <h3>{drink.name}</h3>
            <p>Precio: $ {drink.price}</p>
            <button onClick={() => buyDrink(drink)}>Comprar</button>
          </div>
        ))}
      </div>
      {/* Mostrar la bebida seleccionada y monedas ingresadas */}
      {selected && (
        <div className="selected">
          <h3>Bebida seleccionada: {selected.name}</h3>
          <p>Precio: $ {selected.price}</p>
          <p>Monedas ingresadas: $ {coinsInserted}</p>
        </div>
      )}
    </div>
  );
}

export default MaquinaExpendedora;
