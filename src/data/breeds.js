// Breed data with descriptions and associated products
const breeds = [
  {
    id: "labrador",
    name: "Labrador Retriever",
    image:
      "https://images.unsplash.com/photo-1591946614720-90a587da4a36?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description:
      "Friendly, outgoing, and high-spirited companions who have more than enough affection to go around for a family looking for a medium-to-large dog.",
    characteristics: ["Friendly", "Active", "Outgoing", "Even Tempered", "Intelligent"],
    size: "Large",
    activity: "High",
    shedding: "Moderate",
    recommendedProducts: [1, 2, 4, 5, 8],
  },
  {
    id: "german-shepherd",
    name: "German Shepherd",
    image:
      "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description:
      "Intelligent, capable, and loyal dogs that excel at most anything they're trained to do: guide and assistance work, search and rescue, police and military service, and performance events.",
    characteristics: ["Confident", "Courageous", "Smart", "Loyal", "Protective"],
    size: "Large",
    activity: "High",
    shedding: "High",
    recommendedProducts: [2, 4, 5, 7, 8],
  },
  {
    id: "french-bulldog",
    name: "French Bulldog",
    image:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description:
      "Playful, alert, adaptable, and completely irresistible. The French Bulldog is a small breed with a big personality.",
    characteristics: ["Playful", "Alert", "Adaptable", "Bright", "Easygoing"],
    size: "Small",
    activity: "Low",
    shedding: "Low",
    recommendedProducts: [1, 3, 6, 7],
  },
  {
    id: "border-collie",
    name: "Border Collie",
    image:
      "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description:
      "A remarkably bright workaholic, the Border Collie is an amazing dog—maybe a bit too amazing for owners without the time, energy, or means to keep it occupied.",
    characteristics: ["Intelligent", "Energetic", "Athletic", "Responsive", "Work-oriented"],
    size: "Medium",
    activity: "Very High",
    shedding: "Moderate",
    recommendedProducts: [3, 4, 5, 8],
  },
  {
    id: "beagle",
    name: "Beagle",
    image:
      "https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description:
      "Beagles are merry little hounds with an appealing expression, compact build, and a tail that signals their mood. They're curious, clever, and energetic.",
    characteristics: ["Merry", "Friendly", "Curious", "Determined", "Intelligent"],
    size: "Small to Medium",
    activity: "High",
    shedding: "Moderate",
    recommendedProducts: [1, 3, 4, 6],
  },
  {
    id: "golden-retriever",
    name: "Golden Retriever",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description:
      "Intelligent, friendly, and devoted dogs. They are outgoing, trustworthy, and eager-to-please family dogs that are always reliable.",
    characteristics: ["Friendly", "Intelligent", "Devoted", "Trustworthy", "Confident"],
    size: "Large",
    activity: "High",
    shedding: "High",
    recommendedProducts: [2, 4, 5, 6, 8],
  },
  {
    id: "poodle",
    name: "Poodle",
    image:
      "https://images.unsplash.com/photo-1594149929911-78975a43d4f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description:
      "Exceptionally smart and active dogs with a distinctive curly coat. They come in three size varieties: Standard, Miniature, and Toy.",
    characteristics: ["Intelligent", "Active", "Alert", "Faithful", "Trainable"],
    size: "Varies (Toy, Miniature, Standard)",
    activity: "High",
    shedding: "Low",
    recommendedProducts: [1, 3, 4, 7],
  },
  {
    id: "dachshund",
    name: "Dachshund",
    image:
      "https://images.unsplash.com/photo-1612195583950-b8fd34c87093?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description:
      "Smart, spunky, and playful, the Dachshund is a versatile companion with a personality that's twice as big as they are.",
    characteristics: ["Clever", "Stubborn", "Devoted", "Lively", "Courageous"],
    size: "Small",
    activity: "Moderate",
    shedding: "Moderate",
    recommendedProducts: [1, 3, 6, 7],
  },
]

// Get all breeds
export const getAllBreeds = () => {
  return breeds
}

// Get breed by ID
export const getBreedById = (id) => {
  return breeds.find((breed) => breed.id === id)
}

export default breeds
