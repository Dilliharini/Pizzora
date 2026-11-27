// Central mock data. Swap these modules for real API calls later — see services/.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'
export const USE_MOCK_DATA = true

export const DEMO_CREDENTIALS = {
  customer: { email: 'demo@pizzora.com', password: 'demo1234' },
  admin: { email: 'admin@pizzora.com', password: 'admin1234' },
}

export const PIZZA_IMAGE = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`

// Real, hand-picked Unsplash photo IDs (pizza / ingredients, dark & moody where possible)
const IMGS = {
  margherita: '1571997478779-2adcbbe9ab2f',
  farmhouse: '1513104890138-7c749659a591',
  peri: '1565895405138-6c3e5f9add8a',
  cheese: '1513456852971-30c0b8199d4d',
  garden: '1571407970349-bc81e7e96d47',
  paneer: '1588167056543-c8b9b7bbedb0',
  pepperoni: '1628840042765-ef6e59fda914',
  mediterranean: '1573821663912-6df460f9c684',
  hero: '1590947132387-155cc02f3212',
  builder: '1593560708920-61dd98c46a4e',
  ingerdientBasil: '1627627256672-68848bebeb18',
}

export const heroImage = PIZZA_IMAGE(IMGS.hero, 1400)

export const pizzas = [
  {
    id: 'margherita-classic',
    name: 'Margherita Classic',
    description: 'San Marzano tomato sauce, fresh mozzarella, basil leaves, cold-pressed olive oil.',
    price: 349,
    rating: 4.8,
    reviews: 412,
    category: 'Vegetarian',
    veg: true,
    tags: ['Bestseller', 'Popular'],
    image: PIZZA_IMAGE(IMGS.margherita),
  },
  {
    id: 'farmhouse-supreme',
    name: 'Farmhouse Supreme',
    description: 'Loaded capsicum, roasted onions, juicy tomatoes, mushrooms with a three-cheese blend.',
    price: 529,
    rating: 4.7,
    reviews: 356,
    category: 'Vegetarian',
    veg: true,
    tags: ['Popular'],
    image: PIZZA_IMAGE(IMGS.farmhouse),
  },
  {
    id: 'fiery-peri-peri',
    name: 'Fiery Peri Peri',
    description: 'Peri peri sauce, smoked chicken, red chilli flakes, charred peppers, coriander.',
    price: 599,
    rating: 4.9,
    reviews: 521,
    category: 'Non-Veg',
    veg: false,
    tags: ['Bestseller'],
    image: PIZZA_IMAGE(IMGS.peri),
  },
  {
    id: 'four-cheese-delight',
    name: 'Four Cheese Delight',
    description: 'Mozzarella, aged cheddar, parmesan and gorgonzola on a slow-fermented crust.',
    price: 649,
    rating: 4.8,
    reviews: 289,
    category: 'Vegetarian',
    veg: true,
    tags: ['Chef Special'],
    image: PIZZA_IMAGE(IMGS.cheese),
  },
  {
    id: 'garden-fresh',
    name: 'Garden Fresh',
    description: 'Garden greens, cherry tomatoes, olives, sweet corn on a light garlic-tomato base.',
    price: 399,
    rating: 4.5,
    reviews: 198,
    category: 'Vegetarian',
    veg: true,
    tags: [],
    image: PIZZA_IMAGE(IMGS.garden),
  },
  {
    id: 'spicy-paneer',
    name: 'Spicy Paneer',
    description: 'Tandoor-spiced paneer cubes, onions, capsicum, mint drizzle on peri-kissed tomato base.',
    price: 549,
    rating: 4.7,
    reviews: 341,
    category: 'Vegetarian',
    veg: true,
    tags: ['Popular'],
    image: PIZZA_IMAGE(IMGS.paneer),
  },
  {
    id: 'pepperoni-feast',
    name: 'Pepperoni Feast',
    description: 'Double pepperoni, mozzarella, chilli flakes, oregano — crisp edges, molten centre.',
    price: 679,
    rating: 4.9,
    reviews: 604,
    category: 'Non-Veg',
    veg: false,
    tags: ['Bestseller'],
    image: PIZZA_IMAGE(IMGS.pepperoni),
  },
  {
    id: 'mediterranean-special',
    name: 'Mediterranean Special',
    description: 'Olives, sun-dried tomatoes, feta crumble, roasted peppers, wild herbs.',
    price: 629,
    rating: 4.6,
    reviews: 176,
    category: 'Non-Veg',
    veg: false,
    tags: [],
    image: PIZZA_IMAGE(IMGS.mediterranean),
  },
]

export const pizzaBuilderOptions = {
  bases: [
    { id: 'thin-crust', name: 'Thin Crust', price: 0 },
    { id: 'hand-tossed', name: 'Classic Hand Tossed', price: 40 },
    { id: 'cheese-burst', name: 'Cheese Burst', price: 120 },
    { id: 'whole-wheat', name: 'Whole Wheat', price: 60 },
    { id: 'pan-crust', name: 'Pan Crust', price: 80 },
  ],
  sauces: [
    { id: 'classic-tomato', name: 'Classic Tomato', price: 0 },
    { id: 'peri-peri', name: 'Peri Peri', price: 30 },
    { id: 'bbq', name: 'BBQ', price: 30 },
    { id: 'pesto', name: 'Pesto', price: 50 },
    { id: 'creamy-garlic', name: 'Creamy Garlic', price: 40 },
  ],
  cheeses: [
    { id: 'mozzarella', name: 'Mozzarella', price: 0 },
    { id: 'cheddar', name: 'Cheddar', price: 40 },
    { id: 'parmesan', name: 'Parmesan', price: 50 },
    { id: 'vegan', name: 'Vegan Cheese', price: 60 },
  ],
  toppings: [
    { id: 'capsicum', name: 'Capsicum', price: 30 },
    { id: 'onion', name: 'Onion', price: 20 },
    { id: 'tomato', name: 'Tomato', price: 20 },
    { id: 'olives', name: 'Olives', price: 40 },
    { id: 'jalapenos', name: 'Jalapenos', price: 40 },
    { id: 'mushroom', name: 'Mushroom', price: 40 },
    { id: 'sweet-corn', name: 'Sweet Corn', price: 30 },
    { id: 'paneer', name: 'Paneer', price: 60 },
  ],
}

export const CUSTOM_BASE_PRICE = 249

export const builderShowcase = PIZZA_IMAGE(IMGS.builder)

export const testimonials = [
  { name: 'Aarav Mehta', role: 'Food blogger, Mumbai', rating: 5, text: 'The cheese burst crust is unreal. Pizzora ruined every other pizza for me — in the best way possible.' },
  { name: 'Sara Fernandes', role: 'Chef & restaurateur', rating: 5, text: 'You can taste the fermentation time in the crust. Genuinely restaurant-grade pizza delivered hot.' },
  { name: 'Rohan Iyer', role: 'Regular since 2023', rating: 4, text: 'The custom builder is addictive. I have saved three of my own combinations and rotate through them weekly.' },
  { name: 'Priya Nair', role: 'Designer, Bengaluru', rating: 5, text: 'Ordered at 9 pm, delivered in 32 minutes, still molten. The packaging alone feels premium.' },
]

export const howItWorks = [
  { step: '01', title: 'Choose your craft', text: 'Pick a signature pizza or build your own from fresh bases, sauces and toppings.' },
  { step: '02', title: 'We fire it fresh', text: 'Every pizza is hand-stretched and baked to order in our stone oven — never pre-made.' },
  { step: '03', title: 'Track to your door', text: 'Live order tracking from kitchen to doorstep, with real-time stage updates.' },
]
