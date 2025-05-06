// Blog post data
const blogPosts = [
  {
    id: 1,
    title: "The Ultimate Guide to Choosing the Right Dog Bed",
    slug: "ultimate-guide-dog-beds",
    excerpt:
      "Find out how to select the perfect bed for your furry friend based on their size, age, and sleeping habits.",
    content: `
      <p>Choosing the right dog bed is essential for your pet's comfort and health. Here's what to consider:</p>
      
      <h3>Size Matters</h3>
      <p>Measure your dog from nose to tail while they're lying down and add 8-12 inches to determine the ideal bed length. For width, measure your dog curled up and add 8 inches.</p>
      
      <h3>Consider Your Dog's Age</h3>
      <p>Puppies might need chew-resistant beds, while senior dogs benefit from orthopedic memory foam that supports aging joints.</p>
      
      <h3>Sleeping Style</h3>
      <p>Does your dog stretch out or curl up? Sprawlers need rectangular beds, while nesters prefer beds with bolsters or raised edges.</p>
      
      <h3>Health Needs</h3>
      <p>Dogs with arthritis or hip dysplasia need orthopedic beds. Those with allergies benefit from hypoallergenic materials.</p>
      
      <h3>Climate Considerations</h3>
      <p>In warm climates, cooling beds with gel inserts or elevated designs improve airflow. In cold areas, plush, insulated beds keep dogs warm.</p>
      
      <p>Remember that quality matters - a good dog bed is an investment in your pet's health and happiness!</p>
    `,
    author: "Dr. Emma Wilson",
    authorImage: "https://randomuser.me/api/portraits/women/63.jpg",
    authorBio: "Veterinarian with 15 years of experience in canine care",
    publishDate: "2023-10-15",
    category: "Pet Care",
    tags: ["dog beds", "pet comfort", "senior dogs", "puppies"],
    featuredImage:
      "https://images.unsplash.com/photo-1541599468348-e96984315921?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    relatedProducts: [2], // IDs of related products
  },
  {
    id: 2,
    title: "Training Tips: Teaching Your Dog to Walk on a Leash",
    slug: "dog-leash-training-tips",
    excerpt: "Practical advice for training your dog to walk politely on a leash without pulling.",
    content: `
      <p>Leash training is one of the most important skills for your dog to master. Here's how to make walks enjoyable for both of you:</p>
      
      <h3>Start Indoors</h3>
      <p>Begin in a distraction-free environment. Let your dog get used to wearing a collar or harness for short periods before attaching the leash.</p>
      
      <h3>Use Positive Reinforcement</h3>
      <p>Reward your dog with treats and praise when they walk beside you without pulling. Consistency is key!</p>
      
      <h3>The "Stop and Wait" Method</h3>
      <p>When your dog pulls, stop walking immediately and wait until they return to your side or create slack in the leash before continuing.</p>
      
      <h3>Choose the Right Equipment</h3>
      <p>Front-clip harnesses can help reduce pulling by redirecting your dog's momentum. Avoid retractable leashes during training as they can reinforce pulling.</p>
      
      <h3>Practice Makes Perfect</h3>
      <p>Short, frequent training sessions are more effective than occasional long ones. Aim for 5-10 minutes several times a day.</p>
      
      <p>Remember that patience is essential. Some dogs learn quickly, while others may take weeks or months to master leash walking.</p>
    `,
    author: "Mark Johnson",
    authorImage: "https://randomuser.me/api/portraits/men/32.jpg",
    authorBio: "Certified dog trainer and behavioral specialist",
    publishDate: "2023-10-10",
    category: "Training",
    tags: ["leash training", "dog walking", "behavior", "puppies"],
    featuredImage:
      "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    relatedProducts: [5], // IDs of related products
  },
  {
    id: 3,
    title: "The Benefits of Interactive Toys for Your Dog's Mental Health",
    slug: "interactive-toys-dog-mental-health",
    excerpt:
      "Discover how puzzle toys and interactive games can keep your dog mentally stimulated and prevent behavioral problems.",
    content: `
      <p>Just like humans, dogs need mental stimulation to stay happy and healthy. Interactive toys are a great way to provide this stimulation:</p>
      
      <h3>Preventing Boredom and Anxiety</h3>
      <p>Dogs with nothing to do often develop destructive behaviors like chewing furniture or excessive barking. Interactive toys keep their minds occupied.</p>
      
      <h3>Problem-Solving Skills</h3>
      <p>Puzzle toys challenge your dog to figure out how to access treats or toys, developing their cognitive abilities and confidence.</p>
      
      <h3>Slowing Down Fast Eaters</h3>
      <p>Food puzzle toys force dogs to eat more slowly, which can help prevent digestive issues like bloat, especially in larger breeds.</p>
      
      <h3>Reducing Separation Anxiety</h3>
      <p>Interactive toys can keep your dog engaged when you're not home, helping to reduce stress and anxiety.</p>
      
      <h3>Types of Interactive Toys</h3>
      <p>From treat-dispensing balls to complex puzzles with sliding compartments, there's a wide range of options for dogs of all intelligence levels.</p>
      
      <p>Start with simpler toys and gradually increase the difficulty as your dog masters each challenge. The mental workout will leave them satisfied and content!</p>
    `,
    author: "Dr. Sarah Peterson",
    authorImage: "https://randomuser.me/api/portraits/women/44.jpg",
    authorBio: "Canine psychologist specializing in enrichment activities",
    publishDate: "2023-10-05",
    category: "Mental Health",
    tags: ["interactive toys", "mental stimulation", "puzzle toys", "behavior"],
    featuredImage:
      "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    relatedProducts: [3, 6, 8], // IDs of related products
  },
  {
    id: 4,
    title: "Nutrition Essentials: Choosing the Best Food for Your Dog",
    slug: "dog-nutrition-essentials",
    excerpt: "Learn how to read dog food labels and select the best nutrition for your dog's specific needs.",
    content: `
      <p>Proper nutrition is the foundation of your dog's health. Here's how to navigate the complex world of dog food:</p>
      
      <h3>Understanding Dog Food Labels</h3>
      <p>Look for foods where meat is the first ingredient. Be wary of generic terms like "meat meal" or "animal by-products" which don't specify the source.</p>
      
      <h3>Life Stage Considerations</h3>
      <p>Puppies, adults, and senior dogs have different nutritional needs. Choose food formulated for your dog's specific life stage.</p>
      
      <h3>Size and Breed Factors</h3>
      <p>Large breed puppies need controlled growth to prevent joint issues, while small breeds often need smaller kibble and higher calorie density.</p>
      
      <h3>Special Dietary Needs</h3>
      <p>Dogs with allergies, sensitivities, or health conditions may benefit from specialized diets. Consult your veterinarian before making significant changes.</p>
      
      <h3>Wet vs. Dry Food</h3>
      <p>Dry food is convenient and helps clean teeth, while wet food provides hydration and is often more palatable. Many owners use a combination of both.</p>
      
      <p>Remember that the best food for your dog is one that meets their individual needs and that they'll actually eat. Monitor their weight, energy levels, and coat condition to assess if their diet is working well.</p>
    `,
    author: "Dr. James Miller",
    authorImage: "https://randomuser.me/api/portraits/men/11.jpg",
    authorBio: "Veterinary nutritionist with a focus on canine dietary needs",
    publishDate: "2023-09-28",
    category: "Nutrition",
    tags: ["dog food", "nutrition", "diet", "health"],
    featuredImage:
      "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    relatedProducts: [4], // IDs of related products
  },
  {
    id: 5,
    title: "Grooming Guide: Keeping Your Dog's Coat Healthy",
    slug: "dog-grooming-guide",
    excerpt: "Essential grooming tips for different coat types to keep your dog looking and feeling their best.",
    content: `
      <p>Regular grooming is essential for your dog's health and comfort. Here's what you need to know:</p>
      
      <h3>Brushing Basics</h3>
      <p>Short-haired breeds need brushing once a week, while long-haired breeds may need daily attention. Use the right brush for your dog's coat type.</p>
      
      <h3>Bathing Schedule</h3>
      <p>Most dogs only need bathing every 1-3 months unless they get particularly dirty. Over-bathing can strip natural oils and dry out skin.</p>
      
      <h3>Nail Care</h3>
      <p>Trim nails every 3-4 weeks. If you can hear them clicking on the floor, they're too long. Be careful not to cut the quick (the pink part containing blood vessels).</p>
      
      <h3>Ear Cleaning</h3>
      <p>Check ears weekly for redness, odor, or discharge. Clean with a veterinarian-approved solution, especially for floppy-eared breeds prone to infections.</p>
      
      <h3>Dental Health</h3>
      <p>Brush your dog's teeth several times a week with dog-specific toothpaste. Dental chews and toys can help reduce plaque between brushings.</p>
      
      <p>Grooming is also a great opportunity to check for any abnormalities like lumps, skin issues, or parasites. Make it a positive experience with treats and praise!</p>
    `,
    author: "Lisa Taylor",
    authorImage: "https://randomuser.me/api/portraits/women/28.jpg",
    authorBio: "Professional dog groomer with 10+ years of experience",
    publishDate: "2023-09-20",
    category: "Grooming",
    tags: ["grooming", "coat care", "nail trimming", "bathing"],
    featuredImage:
      "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    relatedProducts: [1, 7], // IDs of related products
  },
]

// Get all blog posts
export const getAllBlogPosts = () => {
  return blogPosts
}

// Get blog post by slug
export const getBlogPostBySlug = (slug) => {
  return blogPosts.find((post) => post.slug === slug)
}

// Get blog post by ID
export const getBlogPostById = (id) => {
  return blogPosts.find((post) => post.id === id)
}

// Get related blog posts by category
export const getRelatedBlogPosts = (category, currentPostId, limit = 3) => {
  return blogPosts.filter((post) => post.category === category && post.id !== currentPostId).slice(0, limit)
}

// Get blog categories
export const getBlogCategories = () => {
  const categories = blogPosts.map((post) => post.category)
  return [...new Set(categories)]
}

export default blogPosts
