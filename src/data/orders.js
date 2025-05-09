// Sample order data structure
const orders = [
  {
    id: "ORD-12345678",
    userId: "user123",
    date: "2023-05-15T10:30:00Z",
    status: "delivered", // pending, processing, shipped, delivered, cancelled
    items: [
      {
        id: 1,
        name: "Cozy Dog Hoodie",
        price: 29.99,
        quantity: 2,
        image: "/images/products/hoodie-1.jpg",
        selectedSize: "M",
      },
    ],
    shipping: {
      address: "123 Main St",
      city: "Dogtown",
      state: "CA",
      zipCode: "90210",
      country: "United States",
    },
    payment: {
      method: "credit_card",
      last4: "4242",
    },
    subtotal: 59.98,
    tax: 4.8,
    shipping_cost: 0,
    total: 64.78,
    tracking: {
      number: "TRK123456789",
      carrier: "DHL",
      estimatedDelivery: "2023-05-20",
      updates: [
        {
          status: "Order Placed",
          date: "2023-05-15T10:30:00Z",
          location: "Online",
        },
        {
          status: "Processing",
          date: "2023-05-16T09:15:00Z",
          location: "Warehouse",
        },
        {
          status: "Shipped",
          date: "2023-05-17T14:20:00Z",
          location: "Distribution Center",
        },
        {
          status: "Delivered",
          date: "2023-05-19T11:45:00Z",
          location: "Customer Address",
        },
      ],
    },
  },
  {
    id: "ORD-87654321",
    userId: "user123",
    date: "2023-04-20T15:45:00Z",
    status: "delivered",
    items: [
      {
        id: 3,
        name: "Waterproof Dog Jacket",
        price: 34.99,
        quantity: 1,
        image: "/images/products/jacket-1.jpg",
        selectedSize: "L",
      },
      {
        id: 5,
        name: "Dog Bandana Set",
        price: 12.99,
        quantity: 3,
        image: "/images/products/bandana-1.jpg",
        selectedSize: "One Size",
      },
    ],
    shipping: {
      address: "123 Main St",
      city: "Dogtown",
      state: "CA",
      zipCode: "90210",
      country: "United States",
    },
    payment: {
      method: "paypal",
      email: "user@example.com",
    },
    subtotal: 73.96,
    tax: 5.92,
    shipping_cost: 0,
    total: 79.88,
    tracking: {
      number: "TRK987654321",
      carrier: "FedEx",
      estimatedDelivery: "2023-04-25",
      updates: [
        {
          status: "Order Placed",
          date: "2023-04-20T15:45:00Z",
          location: "Online",
        },
        {
          status: "Processing",
          date: "2023-04-21T10:30:00Z",
          location: "Warehouse",
        },
        {
          status: "Shipped",
          date: "2023-04-22T13:15:00Z",
          location: "Distribution Center",
        },
        {
          status: "Delivered",
          date: "2023-04-24T09:20:00Z",
          location: "Customer Address",
        },
      ],
    },
  },
  {
    id: "ORD-24681357",
    userId: "user123",
    date: "2023-06-05T08:20:00Z",
    status: "shipped",
    items: [
      {
        id: 2,
        name: "Reflective Dog Harness",
        price: 24.99,
        quantity: 1,
        image: "/images/products/harness-1.jpg",
        selectedSize: "S",
      },
    ],
    shipping: {
      address: "123 Main St",
      city: "Dogtown",
      state: "CA",
      zipCode: "90210",
      country: "United States",
    },
    payment: {
      method: "credit_card",
      last4: "1234",
    },
    subtotal: 24.99,
    tax: 2.0,
    shipping_cost: 0,
    total: 26.99,
    tracking: {
      number: "TRK24681357",
      carrier: "UPS",
      estimatedDelivery: "2023-06-10",
      updates: [
        {
          status: "Order Placed",
          date: "2023-06-05T08:20:00Z",
          location: "Online",
        },
        {
          status: "Processing",
          date: "2023-06-06T11:30:00Z",
          location: "Warehouse",
        },
        {
          status: "Shipped",
          date: "2023-06-07T14:45:00Z",
          location: "Distribution Center",
        },
      ],
    },
  },
]

// Get all orders for a specific user
export const getUserOrders = (userId) => {
  return orders.filter((order) => order.userId === userId)
}

// Get a specific order by ID
export const getOrderById = (orderId) => {
  return orders.find((order) => order.id === orderId)
}

// Create a new order
export const createOrder = (orderData) => {
  // In a real application, this would save to a database
  // For now, we'll just return the data with an ID
  const newOrder = {
    id: `ORD-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
    date: new Date().toISOString(),
    status: "pending",
    tracking: {
      updates: [
        {
          status: "Order Placed",
          date: new Date().toISOString(),
          location: "Online",
        },
      ],
    },
    ...orderData,
  }

  // In a real app, we would push to database here
  // orders.push(newOrder);

  return newOrder
}

export default orders
