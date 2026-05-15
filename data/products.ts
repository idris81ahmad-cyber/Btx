export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Royal Indigo Damask",
    price: 45000,
    image: "/images/5C3cc.jpg",   // adjust names as needed
    category: "Damask",
    description: "Premium quality indigo luxury fabric",
  },
  {
    id: 2,
    name: "Gold Brocade Supreme",
    price: 68000,
    image: "/images/6LzXu.jpg",
    category: "Brocade",
    description: "Exquisite gold-embellished textile",
  },
  // Add more products (use your other images)
  {
    id: 3,
    name: "Velvet Silk Blend",
    price: 52000,
    image: "/images/ZvdjA.jpg",
    category: "Silk",
    description: "Soft luxurious velvet silk",
  },
];
