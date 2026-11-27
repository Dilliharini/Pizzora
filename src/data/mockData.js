// All admin-facing mock data lives here.

export const mockOrders = [
  { id: 'PZR-1041', customer: 'Aarav Mehta', phone: '+91 98200 11223', address: '14B Palm Grove, Bandra West, Mumbai', date: '2026-11-26', time: '19:42', amount: 1127, paymentStatus: 'Paid', paymentMethod: 'Razorpay (Demo)', status: 'Delivered', items: [{ name: 'Fiery Peri Peri', qty: 1, price: 599 }, { name: 'Margherita Classic', qty: 1, price: 349 }] },
  { id: 'PZR-1042', customer: 'Priya Nair', phone: '+91 90045 55221', address: '7 Indira Nagar, Bengaluru', date: '2026-11-26', time: '20:05', amount: 748, paymentStatus: 'Paid', paymentMethod: 'Razorpay (Demo)', status: 'Sent to Delivery', items: [{ name: 'Four Cheese Delight', qty: 1, price: 649 }] },
  { id: 'PZR-1043', customer: 'Rohan Iyer', phone: '+91 98730 44110', address: '22 Hauz Khas Village, New Delhi', date: '2026-11-26', time: '20:31', amount: 1358, paymentStatus: 'Pending', paymentMethod: 'Cash on Delivery', status: 'In Kitchen', items: [{ name: 'Pepperoni Feast', qty: 1, price: 679 }, { name: 'Garden Fresh', qty: 1, price: 399 }] },
  { id: 'PZR-1044', customer: 'Sara Fernandes', phone: '+91 99872 20094', address: '3 Miramar Circle, Panaji', date: '2026-11-26', time: '21:02', amount: 549, paymentStatus: 'Paid', paymentMethod: 'Razorpay (Demo)', status: 'In Kitchen', items: [{ name: 'Spicy Paneer', qty: 1, price: 549 }] },
  { id: 'PZR-1045', customer: 'Karan Kapoor', phone: '+91 98111 77332', address: '9 Koregaon Park, Pune', date: '2026-11-26', time: '21:18', amount: 978, paymentStatus: 'Paid', paymentMethod: 'Razorpay (Demo)', status: 'Order Received', items: [{ name: 'Custom: Hand Tossed / Pesto / 3 toppings', qty: 1, price: 629 }, { name: 'Margherita Classic', qty: 1, price: 349 }] },
  { id: 'PZR-1046', customer: 'Meera Shah', phone: '+91 90223 30188', address: '51 Sector 18, Noida', date: '2026-11-25', time: '19:55', amount: 679, paymentStatus: 'Refunded', paymentMethod: 'Razorpay (Demo)', status: 'Delivered', items: [{ name: 'Pepperoni Feast', qty: 1, price: 679 }] },
  { id: 'PZR-1047', customer: 'Dev Malhotra', phone: '+91 98220 66210', address: '18 Anna Nagar, Chennai', date: '2026-11-25', time: '20:44', amount: 877, paymentStatus: 'Paid', paymentMethod: 'Cash on Delivery', status: 'Delivered', items: [{ name: 'Farmhouse Supreme', qty: 1, price: 529 }] },
]

export const ORDER_STATUSES = ['Order Received', 'In Kitchen', 'Sent to Delivery', 'Delivered']

export const mockInventory = [
  { id: 'inv-01', name: 'Thin Crust Base', category: 'Pizza Bases', quantity: 64, unit: 'pcs', threshold: 20 },
  { id: 'inv-02', name: 'Hand Tossed Base', category: 'Pizza Bases', quantity: 48, unit: 'pcs', threshold: 20 },
  { id: 'inv-03', name: 'Cheese Burst Base', category: 'Pizza Bases', quantity: 12, unit: 'pcs', threshold: 15 },
  { id: 'inv-04', name: 'Whole Wheat Base', category: 'Pizza Bases', quantity: 30, unit: 'pcs', threshold: 12 },
  { id: 'inv-05', name: 'Pan Crust Base', category: 'Pizza Bases', quantity: 25, unit: 'pcs', threshold: 10 },
  { id: 'inv-06', name: 'Classic Tomato Sauce', category: 'Sauces', quantity: 8, unit: 'kg', threshold: 6 },
  { id: 'inv-07', name: 'Peri Peri Sauce', category: 'Sauces', quantity: 5, unit: 'kg', threshold: 6 },
  { id: 'inv-08', name: 'BBQ Sauce', category: 'Sauces', quantity: 14, unit: 'kg', threshold: 6 },
  { id: 'inv-09', name: 'Pesto Sauce', category: 'Sauces', quantity: 0, unit: 'kg', threshold: 4 },
  { id: 'inv-10', name: 'Creamy Garlic Sauce', category: 'Sauces', quantity: 11, unit: 'kg', threshold: 5 },
  { id: 'inv-11', name: 'Mozzarella', category: 'Cheeses', quantity: 22, unit: 'kg', threshold: 8 },
  { id: 'inv-12', name: 'Cheddar', category: 'Cheeses', quantity: 9, unit: 'kg', threshold: 6 },
  { id: 'inv-13', name: 'Parmesan', category: 'Cheeses', quantity: 4, unit: 'kg', threshold: 5 },
  { id: 'inv-14', name: 'Vegan Cheese', category: 'Cheeses', quantity: 7, unit: 'kg', threshold: 4 },
  { id: 'inv-15', name: 'Capsicum', category: 'Vegetables', quantity: 18, unit: 'kg', threshold: 7 },
  { id: 'inv-16', name: 'Onion', category: 'Vegetables', quantity: 26, unit: 'kg', threshold: 8 },
  { id: 'inv-17', name: 'Olives', category: 'Vegetables', quantity: 6, unit: 'kg', threshold: 5 },
  { id: 'inv-18', name: 'Jalapenos', category: 'Vegetables', quantity: 3, unit: 'kg', threshold: 5 },
  { id: 'inv-19', name: 'Mushroom', category: 'Vegetables', quantity: 2, unit: 'kg', threshold: 4 },
  { id: 'inv-20', name: 'Sweet Corn', category: 'Vegetables', quantity: 13, unit: 'kg', threshold: 5 },
]

export const INVENTORY_CATEGORIES = ['Pizza Bases', 'Sauces', 'Cheeses', 'Vegetables']

export const stockStatus = (item) => {
  if (item.quantity <= 0) return 'Out of Stock'
  if (item.quantity <= item.threshold) return 'Low Stock'
  return 'In Stock'
}

export const mockAlerts = [
  { id: 'al-01', type: 'Low Stock', severity: 'critical', title: 'Pesto Sauce depleted', message: 'Pesto Sauce (Sauces) is at 0 kg. Reorder immediately — it is on the custom builder.', time: '6 min ago', read: false },
  { id: 'al-02', type: 'Low Stock', severity: 'warning', title: 'Mushroom below threshold', message: 'Mushroom stock is 2 kg, below the 4 kg threshold.', time: '24 min ago', read: false },
  { id: 'al-03', type: 'Order', severity: 'info', title: 'Large order PZR-1043', message: 'Rohan Iyer placed a ₹1,358 order (2 items, Cash on Delivery).', time: '41 min ago', read: false },
  { id: 'al-04', type: 'Low Stock', severity: 'warning', title: 'Cheese Burst Base running low', message: '12 pcs left, threshold is 15 pcs.', time: '1 hr ago', read: true },
  { id: 'al-05', type: 'Order', severity: 'info', title: 'New order PZR-1045', message: 'Karan Kapoor placed an order containing a custom pizza.', time: '1 hr ago', read: true },
  { id: 'al-06', type: 'Low Stock', severity: 'warning', title: 'Jalapenos below threshold', message: 'Jalapenos stock is 3 kg, below the 5 kg threshold.', time: '2 hrs ago', read: true },
]

export const weeklyTrend = [
  { day: 'Mon', orders: 32, revenue: 21400 },
  { day: 'Tue', orders: 28, revenue: 18800 },
  { day: 'Wed', orders: 41, revenue: 27300 },
  { day: 'Thu', orders: 37, revenue: 24600 },
  { day: 'Fri', orders: 58, revenue: 39400 },
  { day: 'Sat', orders: 71, revenue: 48900 },
  { day: 'Sun', orders: 64, revenue: 43200 },
]

export const popularPizzas = [
  { name: 'Pepperoni Feast', orders: 212 },
  { name: 'Fiery Peri Peri', orders: 198 },
  { name: 'Margherita Classic', orders: 184 },
  { name: 'Spicy Paneer', orders: 141 },
  { name: 'Four Cheese Delight', orders: 122 },
]

export const revenueByDay = [
  { name: 'Mon', revenue: 21400 },
  { name: 'Tue', revenue: 18800 },
  { name: 'Wed', revenue: 27300 },
  { name: 'Thu', revenue: 24600 },
  { name: 'Fri', revenue: 39400 },
  { name: 'Sat', revenue: 48900 },
  { name: 'Sun', revenue: 43200 },
]
