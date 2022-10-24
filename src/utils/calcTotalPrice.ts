import { CartItem } from '../redux/slices/cart/types';

export const calcTotalPrice = (items: CartItem[]) => {
  return Number(
    items.reduce((sum, obj) => obj.price * obj.count + sum, 0).toFixed(2)
  );
};
