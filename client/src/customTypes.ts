export interface ProductI {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
  reviews: string[];
}

export interface CartProductI {
  product: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  quantity: number;
}

export interface MatchParamsI {
  name: string;
  id: string;
}

export interface UserI {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

export interface InitialStoreStateI {
  cart: {
    cartItems: CartProductI[];
  };
  user: {
    userDetails: UserI;
  };
}
