import { Types } from 'mongoose';

export interface IReview {
  id?: string;
  user: Types.ObjectId;
  rating: number;
  comment?: string;
  createdAt: Date;
}

export interface IProduct {
  name: string;
  brand: string;
  price: number;
  category:
    | 'Writing'
    | 'Office Supplies'
    | 'Art Supplies'
    | 'Educational'
    | 'Technology';
  description: string;
  quantity: number;
  inStock: boolean;
  imageUrl: string;
  reviews: IReview[];
}

export interface IGetProductsQuery {
  searchTerm?: string;
}
