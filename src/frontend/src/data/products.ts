export interface Product {
  id: string;
  name: string;
  description: string;
  category: "Electronics" | "Home" | "Kitchen" | "Smart Gadgets";
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  inStock: number;
  benefits: string[];
  tags: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Earbuds Pro X1 — 40Hr Battery & Active Noise Cancellation",
    description:
      "Crystal clear sound with deep bass. Fits perfectly, stays put during workouts. Compatible with all devices.",
    category: "Electronics",
    price: 799,
    originalPrice: 1999,
    rating: 4.8,
    reviews: 2341,
    image: "/assets/generated/product-earbuds.dim_600x600.jpg",
    badge: "60% OFF",
    inStock: 12,
    benefits: [
      "40Hr total battery",
      "ANC + Transparency mode",
      "IPX5 water resistant",
    ],
    tags: ["bestseller", "trending"],
  },
  {
    id: "2",
    name: "Smart LED Desk Lamp — Adjustable Color Temperature & USB Charging",
    description:
      "Eye-care LED technology with 5 brightness levels. Built-in USB port to charge your devices.",
    category: "Electronics",
    price: 599,
    originalPrice: 1499,
    rating: 4.6,
    reviews: 1823,
    image: "/assets/generated/product-lamp.dim_600x600.jpg",
    badge: "60% OFF",
    inStock: 8,
    benefits: ["Eye-care mode", "USB charging port", "Touch control"],
    tags: ["bestseller"],
  },
  {
    id: "3",
    name: "Digital Air Fryer 5L — Oil-Free Cooking with 12 Preset Programs",
    description:
      "Cook healthy, crispy food with 99% less oil. 12 preset recipes. Rapid heat technology.",
    category: "Kitchen",
    price: 2499,
    originalPrice: 4999,
    rating: 4.7,
    reviews: 3102,
    image: "/assets/generated/product-airfryer.dim_600x600.jpg",
    badge: "50% OFF",
    inStock: 5,
    benefits: ["99% less oil", "12 preset programs", "5L capacity"],
    tags: ["bestseller", "trending"],
  },
  {
    id: "4",
    name: "Smart Fitness Tracker Band — Heart Rate, SpO2 & Sleep Monitoring",
    description:
      "Track your health 24/7. Monitors heart rate, blood oxygen, and sleep quality. 10-day battery life.",
    category: "Smart Gadgets",
    price: 999,
    originalPrice: 2499,
    rating: 4.5,
    reviews: 1456,
    image: "/assets/generated/product-gadgets.dim_600x600.jpg",
    badge: "60% OFF",
    inStock: 20,
    benefits: ["10-day battery", "Heart rate + SpO2", "Waterproof IP68"],
    tags: ["trending"],
  },
  {
    id: "5",
    name: "Premium Stainless Steel Water Bottle — 1L Double-Wall Insulation",
    description:
      "Keeps drinks cold 24 hours or hot 12 hours. BPA-free, leak-proof lid. Perfect for gym & travel.",
    category: "Home",
    price: 399,
    originalPrice: 799,
    rating: 4.9,
    reviews: 4203,
    image: "/assets/generated/product-home.dim_600x600.jpg",
    badge: "50% OFF",
    inStock: 50,
    benefits: ["24hr cold/12hr hot", "BPA-free", "Leak-proof"],
    tags: ["bestseller"],
  },
  {
    id: "6",
    name: "Portable Bluetooth Speaker — 360° Sound & 20Hr Playtime",
    description:
      "Powerful 20W speaker with booming bass. Waterproof design, built-in mic for calls.",
    category: "Electronics",
    price: 1299,
    originalPrice: 2999,
    rating: 4.6,
    reviews: 987,
    image: "/assets/generated/product-gadgets.dim_600x600.jpg",
    badge: "57% OFF",
    inStock: 15,
    benefits: ["20Hr battery", "Waterproof IPX7", "Built-in mic"],
    tags: ["trending"],
  },
  {
    id: "7",
    name: "Multi-Port Fast Charger 65W GaN — Charge 4 Devices Simultaneously",
    description:
      "Ultra-compact GaN charger. 65W total power. Charges laptop, phone, tablet at full speed.",
    category: "Electronics",
    price: 1499,
    originalPrice: 2999,
    rating: 4.7,
    reviews: 2101,
    image: "/assets/generated/product-gadgets.dim_600x600.jpg",
    badge: "50% OFF",
    inStock: 30,
    benefits: ["65W GaN tech", "4 ports", "Universal compatibility"],
    tags: [],
  },
  {
    id: "8",
    name: "Ergonomic Memory Foam Neck Pillow — Travel & Office Support",
    description:
      "Contour memory foam relieves neck pain. Machine washable cover. Perfect for flights and office chairs.",
    category: "Home",
    price: 499,
    originalPrice: 999,
    rating: 4.4,
    reviews: 1234,
    image: "/assets/generated/product-home.dim_600x600.jpg",
    badge: "50% OFF",
    inStock: 40,
    benefits: ["Memory foam", "Washable cover", "Travel size"],
    tags: [],
  },
  {
    id: "9",
    name: "Smart Plug Wi-Fi Enabled — Voice Control & Energy Monitoring",
    description:
      "Control any appliance remotely. Works with Alexa and Google Home. Real-time energy tracking.",
    category: "Smart Gadgets",
    price: 599,
    originalPrice: 1299,
    rating: 4.5,
    reviews: 876,
    image: "/assets/generated/product-gadgets.dim_600x600.jpg",
    badge: "54% OFF",
    inStock: 25,
    benefits: ["Voice control", "Energy monitoring", "Works with Alexa"],
    tags: [],
  },
  {
    id: "10",
    name: "Electric Kettle 1.7L — BPA Free, Rapid Boil & Auto Shutoff",
    description:
      "Boils 1.7L water in 3 minutes. Auto shutoff and boil-dry protection. 360° base.",
    category: "Kitchen",
    price: 799,
    originalPrice: 1499,
    rating: 4.6,
    reviews: 1654,
    image: "/assets/generated/product-airfryer.dim_600x600.jpg",
    badge: "47% OFF",
    inStock: 18,
    benefits: ["Rapid boil 3 min", "Auto shutoff", "1.7L capacity"],
    tags: [],
  },
  {
    id: "11",
    name: "Magnetic Laptop Stand — Adjustable Height, Aluminium Build",
    description:
      "Premium aluminium stand with 6 height settings. Foldable and portable. Reduces neck strain by 45%.",
    category: "Home",
    price: 1299,
    originalPrice: 2499,
    rating: 4.8,
    reviews: 743,
    image: "/assets/generated/product-home.dim_600x600.jpg",
    badge: "48% OFF",
    inStock: 22,
    benefits: ["Aluminium build", "6 height settings", "Foldable & portable"],
    tags: [],
  },
  {
    id: "12",
    name: "Wireless Charging Pad 15W Fast Charge — Compatible with All Qi Devices",
    description:
      "Universal 15W fast wireless charger. Works with iPhone, Samsung, and all Qi devices. LED indicator.",
    category: "Smart Gadgets",
    price: 699,
    originalPrice: 1499,
    rating: 4.4,
    reviews: 1098,
    image: "/assets/generated/product-gadgets.dim_600x600.jpg",
    badge: "53% OFF",
    inStock: 35,
    benefits: ["15W fast charge", "Universal Qi", "No cable needed"],
    tags: [],
  },
];

export const categories = [
  {
    name: "Electronics",
    icon: "⚡",
    color: "from-indigo-600 to-purple-600",
    description: "Gadgets & Tech",
  },
  {
    name: "Home",
    icon: "🏠",
    color: "from-blue-600 to-cyan-600",
    description: "Home Essentials",
  },
  {
    name: "Kitchen",
    icon: "🍳",
    color: "from-orange-500 to-amber-500",
    description: "Smart Kitchen",
  },
  {
    name: "Smart Gadgets",
    icon: "🤖",
    color: "from-purple-600 to-pink-600",
    description: "Future Tech",
  },
];

export const indianNames = [
  "Rahul",
  "Priya",
  "Arjun",
  "Sneha",
  "Vikram",
  "Anjali",
  "Rohit",
  "Kavya",
  "Amit",
  "Pooja",
  "Suresh",
  "Divya",
  "Nikhil",
  "Shreya",
  "Karan",
  "Neha",
  "Ravi",
  "Meera",
  "Deepak",
  "Ananya",
];

export const indianCities = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Pune",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Surat",
  "Lucknow",
  "Chandigarh",
];
