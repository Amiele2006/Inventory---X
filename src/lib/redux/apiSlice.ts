import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define types for our API responses
interface DashboardMetrics {
  totalProducts: number;
  totalUsers: number;
  totalRevenue: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

interface NewProduct {
  name: string;
  price: number;
  stock: number;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface ExpenseByCategorySummary {
  category: string;
  amount: number;
}

// Create the API slice
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["DashboardMetrics", "Products", "Users", "Expenses"],
  endpoints: (build) => ({
    getDashboardMetrics: build.query<DashboardMetrics, void>({
      query: () => "/dashboard",
      providesTags: ["DashboardMetrics"],
    }),
    getProducts: build.query<Product[], string | void>({
      query: (search) => ({
        url: "/products",
        params: search ? { search } : {},
      }),
      providesTags: ["Products"],
    }),
    createProduct: build.mutation<Product, NewProduct>({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    getUsers: build.query<User[], void>({
      query: () => "/users",
      providesTags: ["Users"],
    }),
    getExpensesByCategory: build.query<ExpenseByCategorySummary[], void>({
      query: () => "/expenses",
      providesTags: ["Expenses"],
    }),
  }),
});

// Export hooks for each endpoint
export const {
  useGetDashboardMetricsQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useGetUsersQuery,
  useGetExpensesByCategoryQuery,
} = api;
