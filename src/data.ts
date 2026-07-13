import { MenuItem, Testimonial, FAQ, ServiceItem, ChefInfo } from './types';

export const RESTAURANT_INFO = {
  name: "Spice Heritage",
  tagline: "Authentic Indian Flavors, Crafted with Tradition",
  cuisine: ["North Indian", "South Indian", "Mughlai", "Chinese", "Fast Food"],
  established: "2018",
  owner: "Arjun Mehta",
  address: "45 MG Road, Indiranagar, Bengaluru, Karnataka 560038",
  phone: "+91 98765 43210",
  email: "hello@spiceheritage.in",
  website: "www.spiceheritage.in",
  rating: 4.7,
  reviewsCount: "1,850+",
  openingHours: [
    { days: "Monday – Thursday", hours: "11:00 AM – 10:30 PM" },
    { days: "Friday – Sunday", hours: "11:00 AM – 11:30 PM" }
  ],
  socials: {
    facebook: "https://facebook.com/SpiceHeritageIndia",
    instagram: "https://instagram.com/spiceheritage.in",
    twitter: "https://twitter.com/SpiceHeritage",
    youtube: "https://youtube.com/SpiceHeritage"
  }
};

export const MENU_ITEMS: MenuItem[] = [
  // STARTERS
  {
    id: "s1",
    name: "Paneer Tikka",
    category: "starters",
    price: 299,
    description: "Charred tandoori paneer tikka cubes marinated in spiced yogurt, grilled to perfection with bell peppers and onions.",
    isVegetarian: true,
    popular: true,
    image: "/src/assets/images/paneer_tikka_1783514111288.jpg"
  },
  {
    id: "s2",
    name: "Chicken Tikka",
    category: "starters",
    price: 349,
    description: "Succulent boneless chicken pieces marinated in rich aromatic spices and grilled in our traditional clay oven.",
    isVegetarian: false,
    popular: true,
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "s3",
    name: "Veg Spring Rolls",
    category: "starters",
    price: 199,
    description: "Crispy fried pastry wrappers packed with a seasoned mix of shredded vegetables and served with sweet chili dip.",
    isVegetarian: true,
    popular: false,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "s4",
    name: "Hara Bhara Kebab",
    category: "starters",
    price: 249,
    description: "Healthy and flavorful pan-fried patties made of spinach, green peas, mashed potatoes, and delicate spices.",
    isVegetarian: true,
    popular: false,
    image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&q=80&w=600"
  },

  // MAIN COURSE
  {
    id: "m1",
    name: "Butter Chicken",
    category: "main-course",
    price: 449,
    description: "Our world-famous dish featuring tender tandoori-grilled chicken simmered in a velvety, buttery tomato and cashew gravy.",
    isVegetarian: false,
    popular: true,
    image: "/src/assets/images/butter_chicken_1783514073856.jpg"
  },
  {
    id: "m2",
    name: "Dal Makhani",
    category: "main-course",
    price: 299,
    description: "Slow-cooked black lentils and kidney beans, simmered overnight on charcoal with butter, cream, and rich spices.",
    isVegetarian: true,
    popular: true,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "m3",
    name: "Paneer Butter Masala",
    category: "main-course",
    price: 329,
    description: "Fresh cottage cheese cubes in a smooth, creamy, mildly sweet tomato-based gravy infused with butter and cream.",
    isVegetarian: true,
    popular: false,
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "m4",
    name: "Kadai Chicken",
    category: "main-course",
    price: 399,
    description: "Juicy chicken stir-fried in a traditional wok with freshly pounded coriander seeds, dry red chilies, capsicum, and onions.",
    isVegetarian: false,
    popular: false,
    image: "https://images.unsplash.com/photo-1603496987351-f84a3ba5ec85?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "m5",
    name: "Hyderabadi Chicken Biryani",
    category: "main-course",
    price: 429,
    description: "Layers of fragrant long-grain Basmati rice and spiced marinated chicken cooked on 'Dum' (slow steam) with saffron.",
    isVegetarian: false,
    popular: true,
    image: "/src/assets/images/hyderabadi_biryani_1783514096795.jpg"
  },
  {
    id: "m6",
    name: "Veg Biryani",
    category: "main-course",
    price: 299,
    description: "Fragrant basmati rice layered with mixed fresh vegetables, paneer cubes, saffron, mint, and fried onions.",
    isVegetarian: true,
    popular: false,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=600"
  },

  // INDIAN BREADS
  {
    id: "b1",
    name: "Butter Naan",
    category: "indian-breads",
    price: 60,
    description: "Leavened flatbread baked freshly in a clay oven and brushed generously with unsalted butter.",
    isVegetarian: true,
    popular: true,
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "b2",
    name: "Garlic Naan",
    category: "indian-breads",
    price: 80,
    description: "Soft flatbread seasoned with finely minced garlic, coriander, baked in tandoor, finished with rich glaze.",
    isVegetarian: true,
    popular: true,
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "b3",
    name: "Tandoori Roti",
    category: "indian-breads",
    price: 40,
    description: "Healthy whole wheat flour flatbread baked on the piping hot clay walls of the tandoor oven.",
    isVegetarian: true,
    popular: false,
    image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&q=80&w=600"
  },

  // DESSERTS
  {
    id: "d1",
    name: "Gulab Jamun",
    category: "desserts",
    price: 120,
    description: "Spongy, deep-fried milk dumplings soaked in a warm cardamom and rose water infused sugar syrup.",
    isVegetarian: true,
    popular: true,
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "d2",
    name: "Rasmalai",
    category: "desserts",
    price: 160,
    description: "Flattened cottage cheese patties poached in sweetened milk, reduced with saffron, cardamom, and sliced pistachios.",
    isVegetarian: true,
    popular: true,
    image: "/src/assets/images/rasmalai_dessert_1783521149984.jpg"
  },
  {
    id: "d3",
    name: "Kulfi",
    category: "desserts",
    price: 140,
    description: "Traditional dense Indian frozen dessert flavored with creamy pistachio, almonds, and real saffron threads.",
    isVegetarian: true,
    popular: false,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=600"
  },

  // BEVERAGES
  {
    id: "v1",
    name: "Mango Lassi",
    category: "beverages",
    price: 180,
    description: "A thick, creamy, chilled yogurt-based beverage blended perfectly with rich sweet Alphonso mango pulp.",
    isVegetarian: true,
    popular: true,
    image: "https://images.unsplash.com/photo-1571006831614-419b48b7f805?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "v2",
    name: "Fresh Lime Soda",
    category: "beverages",
    price: 120,
    description: "Effervescent refreshing soda with fresh lime juice, offered in Sweet, Salted, or Mixed options.",
    isVegetarian: true,
    popular: false,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "v3",
    name: "Masala Chai",
    category: "beverages",
    price: 80,
    description: "A warming Indian milk tea brewed with crushed ginger, whole green cardamom, cinnamon, cloves, and fresh tea leaves.",
    isVegetarian: true,
    popular: false,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "v4",
    name: "Cold Coffee",
    category: "beverages",
    price: 190,
    description: "Rich, creamy, thick blended ice-cold coffee served with a generous scoop of vanilla bean ice cream.",
    isVegetarian: true,
    popular: false,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=600"
  }
];

export const SERVICES: ServiceItem[] = [
  { id: "srv1", name: "Dine-In", description: "Immersive air-conditioned fine dining experience with warm hospitality.", icon: "UtensilsCrossed", available: true },
  { id: "srv2", name: "Home Delivery", description: "Superfast and hygienic home delivery within Indiranagar and nearby.", icon: "Bike", available: true },
  { id: "srv3", name: "Online Ordering", description: "Seamless, real-time website checkout with flexible options.", icon: "Smartphone", available: true },
  { id: "srv4", name: "Catering", description: "Tailored multi-cuisine menus for weddings, birthdays, and celebrations.", icon: "ChefHat", available: true },
  { id: "srv5", name: "Private Party Bookings", description: "Reserve our beautifully lit indoor banquet space for private events.", icon: "Sparkles", available: true },
  { id: "srv6", name: "Free Wi-Fi", description: "High-speed wireless internet access for all our valued guests.", icon: "Wifi", available: true },
  { id: "srv7", name: "Air Conditioned", description: "Beat the Bengaluru heat in our fully temperature-controlled interiors.", icon: "Wind", available: true },
  { id: "srv8", name: "Family Seating", description: "Cozy benched areas and highchairs for large family gatherings.", icon: "Users", available: true },
  { id: "srv9", name: "Outdoor Seating", description: "Alfresco street-view garden seating under beautiful fairy lights.", icon: "TreePine", available: true },
  { id: "srv10", name: "Parking Available", description: "Dedicated secure valet parking slots for cars and two-wheelers.", icon: "Car", available: true }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Priya S.",
    review: "One of the best butter chicken dishes I've ever had. Great ambience and excellent service! The garlic naan is exceptionally soft and goes perfectly with their gravy.",
    rating: 5,
    date: "July 2, 2026",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "t2",
    name: "Rahul K.",
    review: "The biryani was perfectly cooked and full of authentic dum aroma. Grains are separate, chicken was juicy. Best Indian spot in Indiranagar, without a doubt.",
    rating: 5,
    date: "June 28, 2026",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "t3",
    name: "Neha P.",
    review: "Beautiful brass and wood interiors, delicious authentic food, and very reasonable prices. Their Mango Lassi is to die for, so thick and delicious!",
    rating: 4,
    date: "June 15, 2026",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
  }
];

export const CHEFS: ChefInfo[] = [
  {
    id: "c1",
    name: "Arjun Mehta",
    role: "Founder & Executive Chef",
    bio: "With over 15 years of rich culinary expertise across Mughlai and South Indian cuisines, Chef Arjun crafts heritage recipes with traditional slow-cook methods to preserve authentic aromas.",
    image: "/src/assets/images/chef_arjun_mehta_1783514024218.jpg",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com/chef_arjun",
    twitter: "https://twitter.com"
  },
  {
    id: "c2",
    name: "Meera Nair",
    role: "Head of Southern Delicacies",
    bio: "Hailing from Kochi, Chef Meera specializes in crisp, golden Malabar dosas, fragrant sambars, and local seafood curries using daily hand-ground coconut spices.",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=400",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com/chef_meera",
    twitter: "https://twitter.com"
  },
  {
    id: "c3",
    name: "Rajat Sharma",
    role: "Tandoor & Clay Oven Master",
    bio: "With red-hot clay ovens as his playground, Chef Rajat has mastered the precise oakwood flame control needed for soft, fluffy naans and charred, juicy tikkas.",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=400",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com/chef_rajat",
    twitter: "https://twitter.com"
  }
];

export const GALLERY_IMAGES = [
  {
    title: "Signature Butter Chicken",
    category: "Main Course",
    image: "/src/assets/images/butter_chicken_1783514073856.jpg",
    description: "Simmered in rich tomato gravy"
  },
  {
    title: "Luxury Dining Ambience",
    category: "Interior",
    image: "/src/assets/images/spice_heritage_hero_1783514009155.jpg",
    description: "Cozy luxury setup on MG Road"
  },
  {
    title: "Charred Paneer Tikka",
    category: "Starters",
    image: "/src/assets/images/paneer_tikka_1783514111288.jpg",
    description: "Grilled in traditional tandoor"
  },
  {
    title: "Dum Chicken Biryani",
    category: "Main Course",
    image: "/src/assets/images/hyderabadi_biryani_1783514096795.jpg",
    description: "Aromatic Basmati rice masterpiece"
  },
  {
    title: "Handmade Garlic Naans",
    category: "Breads",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=600",
    description: "Leavened bread with butter and garlic"
  },
  {
    title: "Saffron Rasmalai",
    category: "Dessert",
    image: "/src/assets/images/rasmalai_dessert_1783521149984.jpg",
    description: "flattened patties in reduced milk"
  }
];

export const FAQS: FAQ[] = [
  {
    id: "f1",
    question: "Do you offer pure vegetarian options?",
    answer: "Yes, Spice Heritage is highly acclaimed for both vegetarian and non-vegetarian selections. We maintain strictly separated preparation areas, utensils, and oil fryers in our kitchen to ensure absolute hygiene and trust."
  },
  {
    id: "f2",
    question: "Is booking a reservation mandatory for dining?",
    answer: "No, we welcome walk-ins! However, during weekend peak hours (Friday–Sunday evenings), we highly recommend booking a table online in advance through our reservation portal to avoid wait times."
  },
  {
    id: "f3",
    question: "What areas do you cover for home delivery?",
    answer: "We deliver directly up to a 7 km radius from our location in Indiranagar. For further deliveries, you can order from us via major food delivery aggregates."
  },
  {
    id: "f4",
    question: "Can I host a corporate party or family gathering?",
    answer: "Absolutely! We offer custom banquet seating and premium buffet catering menus. You can submit an inquiry through our Reservation/Catering section, and our manager will call you back."
  },
  {
    id: "f5",
    question: "Are your ingredients organic and allergen-free?",
    answer: "We source our vegetables daily and use premium, authentic spices from reliable estates. If you have any specific allergies (e.g., nuts, dairy, gluten), please let our staff know or add special instructions to your online order!"
  }
];
