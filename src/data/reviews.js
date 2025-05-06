// Sample review data
const reviews = [
  {
    id: 1,
    productId: 1,
    userId: "user1",
    userName: "Sarah Johnson",
    userImage: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    title: "Perfect for my Labrador!",
    comment:
      "This collar is absolutely perfect for my energetic Lab. The quality is outstanding and it's held up to all our adventures.",
    date: "2023-10-15",
    verified: true,
    helpfulCount: 12,
  },
  {
    id: 2,
    productId: 1,
    userId: "user2",
    userName: "Mike Peterson",
    userImage: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
    title: "Great quality but sizing runs small",
    comment:
      "The collar is beautiful and well-made, but I had to exchange for a larger size. My German Shepherd needed the XL instead of the L.",
    date: "2023-09-22",
    verified: true,
    helpfulCount: 8,
  },
  {
    id: 3,
    productId: 2,
    userId: "user3",
    userName: "Emma Wilson",
    userImage: "https://randomuser.me/api/portraits/women/63.jpg",
    rating: 5,
    title: "My senior dog loves this bed!",
    comment:
      "My 12-year-old Golden Retriever with arthritis has been sleeping so much better since we got this bed. Worth every penny!",
    date: "2023-10-05",
    verified: true,
    helpfulCount: 15,
  },
  {
    id: 4,
    productId: 2,
    userId: "user4",
    userName: "David Miller",
    userImage: "https://randomuser.me/api/portraits/men/11.jpg",
    rating: 5,
    title: "High quality and durable",
    comment:
      "This bed has survived my two Labs who love to nest and dig before lying down. The cover washes well and the memory foam has kept its shape.",
    date: "2023-09-18",
    verified: true,
    helpfulCount: 7,
  },
  {
    id: 5,
    productId: 3,
    userId: "user5",
    userName: "Jessica Brown",
    userImage: "https://randomuser.me/api/portraits/women/17.jpg",
    rating: 4,
    title: "Great mental stimulation",
    comment:
      "My Border Collie was solving this too quickly at first, but once I adjusted the difficulty it's been perfect for keeping her busy.",
    date: "2023-10-12",
    verified: true,
    helpfulCount: 9,
  },
  {
    id: 6,
    productId: 4,
    userId: "user6",
    userName: "Robert Taylor",
    userImage: "https://randomuser.me/api/portraits/men/67.jpg",
    rating: 5,
    title: "Improved my dog's coat and energy",
    comment:
      "After switching to this food, my dog's coat is shinier and he has much more energy on our walks. Highly recommend!",
    date: "2023-09-30",
    verified: true,
    helpfulCount: 11,
  },
  {
    id: 7,
    productId: 5,
    userId: "user7",
    userName: "Amanda Clark",
    userImage: "https://randomuser.me/api/portraits/women/28.jpg",
    rating: 5,
    title: "No more pulling on walks!",
    comment:
      "This harness has been a game-changer for walks with my excitable Boxer. The no-pull design works perfectly.",
    date: "2023-10-08",
    verified: true,
    helpfulCount: 14,
  },
  {
    id: 8,
    productId: 6,
    userId: "user8",
    userName: "Thomas Wright",
    userImage: "https://randomuser.me/api/portraits/men/52.jpg",
    rating: 3,
    title: "Cute but not very durable",
    comment: "My puppy loved these toys but unfortunately tore through them within a week. Better for gentle chewers.",
    date: "2023-09-25",
    verified: true,
    helpfulCount: 6,
  },
]

// Get reviews by product ID
export const getReviewsByProductId = (productId) => {
  return reviews.filter((review) => review.productId === productId)
}

// Get average rating for a product
export const getAverageRating = (productId) => {
  const productReviews = getReviewsByProductId(productId)
  if (productReviews.length === 0) return 0

  const sum = productReviews.reduce((total, review) => total + review.rating, 0)
  return (sum / productReviews.length).toFixed(1)
}

// Get review count for a product
export const getReviewCount = (productId) => {
  return getReviewsByProductId(productId).length
}

export default reviews
