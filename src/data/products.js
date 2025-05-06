// Dog products data with categories
const products = [
  {
    id: 1,
    name: "Premium Leather Dog Collar",
    price: 49.99,
    image1:
      "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    image2:
      "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "Accessories",
    description: "Handcrafted premium leather collar with durable metal hardware. Perfect for medium to large dogs.",
    sizes: ["S", "M", "L", "XL"],
    features: ["Genuine leather", "Adjustable fit", "Rust-resistant hardware", "Handmade"],
    forBreeds: ["All breeds"],
    bestFor: ["Daily wear", "Training", "Shows"],
  },
  {
    id: 2,
    name: "Orthopedic Dog Bed",
    price: 129.99,
    image1:
      "https://images.unsplash.com/photo-1541599468348-e96984315921?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    image2:
      "https://images.unsplash.com/photo-1541599468348-e96984315921?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "Bedding",
    description:
      "Memory foam orthopedic bed that provides joint relief and comfort for dogs of all ages. Removable, machine-washable cover.",
    sizes: ["S", "M", "L", "XL"],
    features: ["Memory foam", "Waterproof liner", "Non-slip bottom", "Machine washable cover"],
    forBreeds: ["All breeds", "Senior dogs", "Dogs with joint issues"],
    bestFor: ["Everyday use", "Arthritis relief", "Post-surgery recovery"],
  },
  {
    id: 3,
    name: "Interactive Treat Puzzle",
    price: 34.99,
    image1:
      "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    image2:
      "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "Toys",
    description:
      "Challenging puzzle toy that dispenses treats as your dog solves it. Great for mental stimulation and preventing boredom.",
    sizes: ["One Size"],
    features: ["Adjustable difficulty", "Dishwasher safe", "Non-toxic materials", "Stimulates problem-solving"],
    forBreeds: ["All breeds", "High-energy dogs", "Intelligent breeds"],
    bestFor: ["Mental stimulation", "Slow feeding", "Preventing boredom"],
  },
  {
    id: 4,
    name: "Grain-Free Premium Dog Food",
    price: 79.99,
    image1:
      "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    image2:
      "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "Food",
    description:
      "High-protein, grain-free formula with real meat as the first ingredient. No artificial preservatives or fillers.",
    sizes: ["5lb", "15lb", "30lb"],
    features: ["Grain-free", "High protein", "No artificial preservatives", "Supports digestive health"],
    forBreeds: ["All breeds", "Dogs with grain sensitivities"],
    bestFor: ["Daily nutrition", "Allergies", "Sensitive stomachs"],
  },
  {
    id: 5,
    name: "Reflective Dog Harness",
    price: 45.99,
    image1:
      "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    image2:
      "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "Accessories",
    description:
      "No-pull harness with reflective stitching for nighttime visibility. Adjustable straps for a perfect fit.",
    sizes: ["XS", "S", "M", "L", "XL"],
    features: ["Reflective", "No-pull design", "Adjustable", "Padded chest plate"],
    forBreeds: ["All breeds"],
    bestFor: ["Walking", "Training", "Hiking", "Night walks"],
  },
  {
    id: 6,
    name: "Plush Squeaky Toy Set",
    price: 24.99,
    image1:
      "https://images.unsplash.com/photo-1591946614720-90a587da4a36?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    image2:
      "https://images.unsplash.com/photo-1591946614720-90a587da4a36?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "Toys",
    description: "Set of 3 durable plush toys with squeakers. Perfect for fetch and gentle play.",
    sizes: ["One Size"],
    features: ["Multiple squeakers", "Reinforced stitching", "Soft plush exterior", "Machine washable"],
    forBreeds: ["Small to medium breeds", "Gentle chewers"],
    bestFor: ["Indoor play", "Fetch", "Comfort toys"],
  },
  {
    id: 7,
    name: "Automatic Water Fountain",
    price: 59.99,
    image1:
      "https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    image2:
      "https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "Accessories",
    description: "Filtered water fountain that encourages hydration with continuously circulating fresh water.",
    sizes: ["2L", "3L"],
    features: ["Carbon filter", "Ultra-quiet pump", "LED indicator", "Dishwasher-safe parts"],
    forBreeds: ["All breeds"],
    bestFor: ["Daily hydration", "Multiple pet households"],
  },
  {
    id: 8,
    name: "Indestructible Chew Toy",
    price: 19.99,
    image1:
      "https://images.unsplash.com/photo-1575425186775-b8de9a427e67?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    image2:
      "https://images.unsplash.com/photo-1575425186775-b8de9a427e67?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    category: "Toys",
    description:
      "Nearly indestructible rubber toy for aggressive chewers. Can be filled with treats for extended play.",
    sizes: ["S", "M", "L"],
    features: ["Virtually indestructible", "Treat-dispensing", "Floats in water", "Dishwasher safe"],
    forBreeds: ["Power chewers", "Large breeds", "Active dogs"],
    bestFor: ["Heavy chewers", "Teething puppies", "Boredom prevention"],
  },
]

// Get all unique categories
export const getCategories = () => {
  const categories = products.map((product) => product.category)
  return [...new Set(categories)]
}

// Get all unique dog sizes
export const getDogSizes = () => {
  const sizes = products.flatMap((product) => product.sizes || [])
  return [...new Set(sizes)]
}

// Get product by ID
export const getProductById = (id) => {
  return products.find((product) => product.id === id)
}

// Export products
export default products
