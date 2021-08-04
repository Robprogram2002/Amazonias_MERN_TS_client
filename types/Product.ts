export interface IProduct {
  title: string;
  slug: string;
  type: string;
  basePrice: number;
  currency: string;
  description: string;
  sku: string;
  stock: number;
  images: {
    publicId: string;
    url: string;
  }[];
  features: string[];
  specifications: {
    name: string;
    value: string;
  }[];
  sale: {
    onSale: boolean;
    saleAmount: number;
    expiry: Date;
  };
  depaartmentId: any;
  categoryId: any;
  subs: any[];
  availability: string;
  state: string;
  condition: string;
  brand: string;
  details: string;
  ratings: {
    star: number;
    postedBy: any;
  }[];
  questions: any[];
  comments: any[];
  createdAt: Date;
  updatedAt: Date;
}
