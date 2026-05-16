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
    name: "Luxury Indigo Fabric",
    price: 45000,
    image: "/images/IMG_0547.JPG",
    category: "Damask",
    description: "Premium quality indigo luxury fabric",
  },
  {
    id: 2,
    name: "Gold Rich Brocade",
    price: 68000,
    image: "/images/IMG_0554.JPG",
    category: "Brocade",
    description: "Exquisite gold-embellished textile",
  },
  {
    id: 3,
    name: "Velvet Silk Touch",
    price: 52000,
    image: "/images/IMG_0674.JPG",
    category: "Silk",
    description: "Soft luxurious velvet silk blend",
  },
  {
    id: 4,
    name: "Royal Textile",
    price: 58000,
    image: "/images/IMG_0675.JPG",
    category: "Premium",
    description: "Elegant high-end fabric",
  },
  {
    id: 5,
    name: "Classic Damask",
    price: 47000,
    image: "/images/IMG_0678.JPG",
    category: "Damask",
    description: "Timeless classic design",
  },
  {
    id: 6,
    name: "Special Collection",
    price: 65000,
    image: "/images/Screenshot_20260509-190939.jpg",
    category: "Exclusive",
    description: "Limited edition textile",
  },
];
