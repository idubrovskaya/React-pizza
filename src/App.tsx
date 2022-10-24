import './scss/app.scss';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import { PizzaCard } from './pages/PizzaCard';
import { NotFound } from './pages/NotFound';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<Home />} />
        <Route path='pizza/:pizzaId' element={<PizzaCard />} />
        <Route path='cart' element={<Cart />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
