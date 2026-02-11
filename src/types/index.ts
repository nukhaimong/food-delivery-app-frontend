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

export enum OrderStatus {
  pending = 'PENDING',
  preparing = 'PREPARING',
  delivered = 'DELIVERED',
  cancelled = 'CANCELLED',
}
