import type { Product } from '@christianacca/shared/shared-types';

const products: Product[] = [
  {
    id: 10,
    name: 'Strawberry(s)',
    description: '16oz package of fresh organic strawberries',
    quantity: 1
  },
  {
    id: 20,
    name: 'Sliced bread',
    description: 'Loaf of fresh sliced wheat bread',
    quantity: 1
  },
  {
    id: 30,
    name: 'Apples',
    description: 'Bag of 7 fresh McIntosh apples',
    quantity: 1
  },
  {
    id: 40,
    name: 'Bananas',
    description: 'Bunch of lovely bananas',
    quantity: 1
  }
];

const data = {
  products
};

const getRandomInt = () => {
  const max = 1000;
  const min = 100;
  return Math.floor(Math.random() * Math.floor(max) + min);
};

const addProduct = (product: Product): Product => {
  product.id = getRandomInt();
  data.products.push(product);
  return product;
};

const updateProduct = (product: Product): Product => {
  const index = data.products.findIndex(v => v.id === product.id);
  console.log(product);
  data.products.splice(index, 1, product);
  return product;
};

const deleteProduct = (id: string): boolean => {
  const value = parseInt(id, 10);
  data.products = data.products.filter(v => v.id !== value);
  return true;
};

const getProducts = (): Product[] => {
  return data.products;
};

export { addProduct, updateProduct, deleteProduct, getProducts };
