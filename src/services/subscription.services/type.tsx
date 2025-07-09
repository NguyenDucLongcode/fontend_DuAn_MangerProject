import { AccountUser } from "@/lib/redux/slices/auth/type";

export interface Subscription {
  id: string;
  plan: string;
  expiresAt: string;
  price: number;
  createdAt: string;
  user: AccountUser;
}

// Pagination

export interface PaginationResponse {
  statusCode: number;
  data: {
    message: string;
    subscriptions: Subscription[];
    total: number;
    totalPages: number;
    currentPage: number;
  };
  timestamp: string;
  path: string;
}

export interface FilterInput {
  limit: number;
  page: number;
  userId: string | undefined;
  plan: string | undefined;
  fromDate: string | undefined;
  toDate: string | undefined;
}

//create subscription
export interface CreateSubscriptionResponse {
  statusCode: number;
  data?: {
    message: string;
    subscription: Subscription;
  };
  message?: string;
  timestamp: string;
  path: string;
}

export interface CreateSubscriptionPayload {
  userId: string;
  plan: string;
  expiresAt: string;
  price: string;
}

// update subscription
export interface UpdateSubscriptionResponse {
  statusCode: number;
  data?: {
    message: string;
    data: Subscription;
  };
  message?: string;
  timestamp: string;
  path: string;
}

export interface UpdateSubscriptionPayload {
  id: string;
  userId: string;
  plan: string;
  expiresAt: string;
  price: string;
}

// delete User
export interface SubscriptionResponse {
  statusCode: number;
  message: string;
  timestamp: string;
  path: string;
}
