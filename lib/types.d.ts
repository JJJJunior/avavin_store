export type CollectionType = {
  id: string;
  title: string;
  description: string;
  image: string;
  products: ProductType[];
};

export type ProductType = {
  id: string;
  title: string;
  description: string;
  media: string;
  category: string;
  collections: string;
  tags: string;
  sizes: string;
  colors: string;
  price: number;
  expense: number;
  createdAt: Date;
  updatedAt: Date;
};

export type UserType = {
  clerkId: string;
  wishlist: string;
  orders: string;
  createdAt: string;
  updatedAt: string;
};
