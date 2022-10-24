import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export const PizzaCard: React.FC = () => {
  const [pizza, setPizza] = useState<{
    title: string;
    imageUrl: string;
    description: string;
  }>();
  const { pizzaId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://63332db0433198e79dc0e828.mockapi.io/pizzas/${pizzaId}`
        );
        setPizza(data);
      } catch (error) {
        alert('Возникла ошибка, попробуйте перезагрузить');
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return (
      <div className='preloader'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

  return (
    <div className='container'>
      <h1>{pizza.title}</h1>
      <div className='pizza-card'>
        <div className='pizza-card-image'>
          <img src={pizza.imageUrl} />
          <button
            className='button button--outline button--add go-back-btn'
            onClick={() => navigate('/')}
          >
            &lt; На главную
          </button>
        </div>
        <div>
          <p style={{ color: '#fe5f1e' }}>Ингредиенты:</p>
          <br />
          <p> {pizza.description}</p>
        </div>
      </div>
    </div>
  );
};
