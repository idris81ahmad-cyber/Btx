export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  material?: string;
  size?: string;
  color?: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Luxury Indigo Fabric",
    price: 45000,
    image: "/images/IMG_0547.JPG",
    category: "Damask",
    description: "Premium quality indigo luxury fabric with intricate patterns",
    material: "100% Cotton Blend",
    size: "5 yards",
    color: "Deep Indigo",
  },
  {
    id: 2,
    name: "Gold Rich Brocade",
    price: 68000,
    image: "/images/IMG_0554.JPG",
    category: "Brocade",
    description: "Exquisite gold-embellished textile with traditional weaving",
    material: "Silk & Gold Thread",
    size: "4 yards",
    color: "Gold & Cream",
  },
  {
    id: 3,
    name: "Velvet Silk Touch",
    price: 52000,
    image: "/images/IMG_0674.JPG",
    category: "Silk",
    description: "Soft luxurious velvet silk blend perfect for elegant occasions",
    material: "80% Silk, 20% Velvet",
    size: "6 yards",
    color: "Burgundy",
  },
  {
    id: 4,
    name: "Royal Textile",
    price: 58000,
    image: "/images/IMG_0675.JPG",
    category: "Premium",
    description: "Elegant high-end fabric with sophisticated embroidery",
    material: "Premium Cotton Mix",
    size: "5.5 yards",
    color: "Royal Purple",
  },
  {
    id: 5,
    name: "Classic Damask",
    price: 47000,
    image: "/images/IMG_0678.JPG",
    category: "Damask",
    description: "Timeless classic design with intricate damask patterns",
    material: "100% Egyptian Cotton",
    size: "5 yards",
    color: "Charcoal Black",
  },
  {
    id: 6,
    name: "Special Collection",
    price: 65000,
    image: "/images/Screenshot_20260509-190939.jpg",
    category: "Exclusive",
    description: "Limited edition textile with unique African-inspired designs",
    material: "Mixed Heritage Blend",
    size: "4.5 yards",
    color: "Multi-color",
  },
];
