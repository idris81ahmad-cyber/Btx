export interface Product {
  id: number;
  name: string;
  price: number;           // in Naira
  image: string;
  description: string;
  material: string;
  size: string;
  color: string;
  inStock: boolean;
  category?: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Ankara Print Set",
    price: 18500,
    image: "/images/ankara-premium.jpg",
    description: "Vibrant premium quality Ankara fabric with modern contemporary patterns. Perfect for stylish everyday wear and special occasions.",
    material: "100% Cotton",
    size: "6 yards",
    color: "Multicolor",
    inStock: true,
    category: "Ankara",
  },
  {
    id: 2,
    name: "Luxury Adire Batik",
    price: 24500,
    image: "/images/adire-luxury.jpg",
    description: "Handcrafted Adire fabric featuring intricate traditional Yoruba patterns dyed with natural indigo.",
    material: "Cotton",
    size: "5 yards",
    color: "Indigo & White",
    inStock: true,
    category: "Adire",
  },
  {
    id: 3,
    name: "Guinea Brocade Gold Embroidery",
    price: 32500,
    image: "/images/guinea-brocade.jpg",
    description: "Exquisite Guinea Brocade with rich gold embroidery. A symbol of prestige and elegance for weddings and ceremonies.",
    material: "Guinea Brocade",
    size: "5 yards",
    color: "Gold & Black",
    inStock: true,
    category: "Brocade",
  },
  {
    id: 4,
    name: "Silk Velvet Damask",
    price: 42800,
    image: "/images/velvet-damask.jpg",
    description: "Premium Silk Velvet Damask with a soft luxurious feel and beautiful sheen. Ideal for high-end fashion.",
    material: "Silk Velvet",
    size: "5 yards",
    color: "Deep Burgundy",
    inStock: true,
    category: "Silk",
  },
  {
    id: 5,
    name: "Royal Gold Brocade Special Collection",
    price: 28500,
    image: "/images/royal-gold-brocade.jpg",
    description: "Limited edition Royal Gold Brocade with intricate patterns. Perfect for making statement outfits.",
    material: "Guinea Brocade",
    size: "5 yards",
    color: "Gold & Cream",
    inStock: true,
    category: "Brocade",
  },
  {
    id: 6,
    name: "Classic Lace Fabric",
    price: 16800,
    image: "/images/classic-lace.jpg",
    description: "High-quality lace material popular for both casual and formal attire across Nigeria.",
    material: "Lace",
    size: "5 yards",
    color: "Champagne",
    inStock: true,
    category: "Lace",
  },
];

export default products;
