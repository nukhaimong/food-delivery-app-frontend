export interface Meal {
  id: string;
  meal_name: string;
  image_url: string;
  price: number;
  description: string;
  category: {
    id: string;
    category_name: string;
  };
  provider: {
    id: string;
    name: string;
    providerProfile: {
      id: string;
      restaurant_name: string;
    };
  };
}

export interface PostMealData {
  meal_name: string;
  image_url: string;
  description: string;
  price: number;
  category_id: string;
}

export interface CartMeal {
  meal_id: string;
  meal_name: string;
  price: number;
  image_url: string;
  category: {
    category_name: string;
  };
  provider: {
    providerProfile: {
      providerProfileId: string;
      restaurant_name: string;
    };
  };
}

export interface orderData {
  providerProfile_id: string;
  meal_id: string;
  quantity: number;
  price: number;
  delivery_address: string;
  phone_number: string;
}

export interface CustomerOrders {
  order_id: string;
  meal: {
    meal_name: string;
  };
  providerProfile: {
    restaurant_name: string;
    phone_number: string;
  };
  quantity: string;
  total_price: number;
  order_status: string;
  order_method: string;
  delivery_address: string;
  phone_number: string;
  createdAt: string;
}

export enum OrderStatus {
  pending = 'PENDING',
  preparing = 'PREPARING',
  delivered = 'DELIVERED',
  cancelled = 'CANCELLED',
}
