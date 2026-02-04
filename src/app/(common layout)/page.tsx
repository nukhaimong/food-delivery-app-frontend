import CategorySection from '@/components/modules/homepage/categories';
import FoodHero from '@/components/modules/homepage/hereSection';
import RecentMealsSection from '@/components/modules/homepage/recentMeal';
import TopRestaurantsSection from '@/components/modules/homepage/topRestaurants';

export const dummyCategories = [
  {
    id: '1',
    name: 'Pizza',
    image: 'https://cdn-icons-png.flaticon.com/512/1404/1404945.png',
  },
  {
    id: '2',
    name: 'Burgers',
    image: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png',
  },
  {
    id: '3',
    name: 'Biryani',
    image: 'https://cdn-icons-png.flaticon.com/512/857/857681.png',
  },
  {
    id: '4',
    name: 'Chinese',
    image: 'https://cdn-icons-png.flaticon.com/512/3480/3480618.png',
  },
  {
    id: '5',
    name: 'Desserts',
    image: 'https://cdn-icons-png.flaticon.com/512/3081/3081967.png',
  },
  {
    id: '6',
    name: 'Drinks',
    image: 'https://cdn-icons-png.flaticon.com/512/3050/3050158.png',
  },
];

export const dummyMeals = [
  {
    id: '1',
    name: 'Margherita Pizza',
    restaurant: 'Pizza House',
    price: 299,
    image: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png',
  },
  {
    id: '2',
    name: 'Veg Burger',
    restaurant: 'Burger Hub',
    price: 149,
    image: 'https://cdn-icons-png.flaticon.com/512/1404/1404945.png',
  },
  {
    id: '3',
    name: 'Chicken Biryani',
    restaurant: 'Biryani Corner',
    price: 399,
    image: 'https://cdn-icons-png.flaticon.com/512/857/857681.png',
  },
  {
    id: '4',
    name: 'Chinese Noodles',
    restaurant: 'Dragon Wok',
    price: 249,
    image: 'https://cdn-icons-png.flaticon.com/512/3480/3480618.png',
  },
  {
    id: '5',
    name: 'Chocolate Cake',
    restaurant: 'Sweet Treats',
    price: 199,
    image: 'https://cdn-icons-png.flaticon.com/512/3081/3081967.png',
  },
  {
    id: '6',
    name: 'Mango Smoothie',
    restaurant: 'Juice Bar',
    price: 129,
    image: 'https://cdn-icons-png.flaticon.com/512/3050/3050158.png',
  },
];

export const dummyRestaurants = [
  {
    id: "1",
    name: "Pizza House",
    image: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
    cuisine: "Italian",
    rating: 4.5,
    deliveryTime: "30-40 mins",
  },
  {
    id: "2",
    name: "Burger Hub",
    image: "https://cdn-icons-png.flaticon.com/512/1404/1404945.png",
    cuisine: "Fast Food",
    rating: 4.2,
    deliveryTime: "20-30 mins",
  },
  {
    id: "3",
    name: "Biryani Corner",
    image: "https://cdn-icons-png.flaticon.com/512/857/857681.png",
    cuisine: "Indian",
    rating: 4.7,
    deliveryTime: "35-45 mins",
  },
  {
    id: "4",
    name: "Dragon Wok",
    image: "https://cdn-icons-png.flaticon.com/512/3480/3480618.png",
    cuisine: "Chinese",
    rating: 4.3,
    deliveryTime: "25-35 mins",
  },
  {
    id: "5",
    name: "Sweet Treats",
    image: "https://cdn-icons-png.flaticon.com/512/3081/3081967.png",
    cuisine: "Desserts",
    rating: 4.8,
    deliveryTime: "15-25 mins",
  },
  {
    id: "6",
    name: "Juice Bar",
    image: "https://cdn-icons-png.flaticon.com/512/3050/3050158.png",
    cuisine: "Beverages",
    rating: 4.6,
    deliveryTime: "10-20 mins",
  },
];

export default async function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <FoodHero />
      <CategorySection categories={dummyCategories} />
      <RecentMealsSection meals={dummyMeals} />
      <TopRestaurantsSection restaurants={dummyRestaurants} />
    </div>
  );
}
