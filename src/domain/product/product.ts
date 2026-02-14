import type { IPaginationProps } from "@/types/pagination";

export interface IProductQuery {
  limit?: number;
  order?: "asc" | "desc";
  q?: string;
  skip?: number;
  select?: string;
  sortBy?: string;
}

export interface IProductDimensions {
  height: number;
  width: number;
  depth: number;
}

export interface IProductReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface IProductMeta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface IProductProps {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: IProductDimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: IProductReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: IProductMeta;
  thumbnail: string;
  images: string[];
}

export interface IProductsResponse extends IPaginationProps {
  products: IProductProps[];
}

export interface IProductCategory {
  slug: string;
  name: string;
  url: string;
}
