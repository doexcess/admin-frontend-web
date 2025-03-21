import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ProductDetails, ProductsResponse } from '@/types/product';
import axios from 'axios';
import api from '@/lib/api';
import Cookies from 'js-cookie';

interface ProductState {
  products: ProductDetails[];
  count: number;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  perPage: number;
}

// Initial state
const initialState: ProductState = {
  products: [],
  count: 0,
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  perPage: 10, // Default per-page count
};

// Async thunk to fetch paginated products
export const fetchProducts = createAsyncThunk(
  'product-general/fetch',
  async ({
    page,
    limit,
    q,
    startDate,
    endDate,
  }: {
    page?: number;
    limit?: number;
    q?: string;
    startDate?: string;
    endDate?: string;
  }) => {
    const params: Record<string, any> = {};

    if (page !== undefined) params['pagination[page]'] = page;
    if (limit !== undefined) params['pagination[limit]'] = limit;
    if (q !== undefined) params['q'] = q;
    if (startDate !== undefined) params['startDate'] = startDate;
    if (endDate !== undefined) params['endDate'] = endDate;

    const { data } = await api.get<ProductsResponse>('/product-general/fetch', {
      params,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });

    return {
      products: data.data,
      count: data.count,
    };
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setPerPage: (state, action: PayloadAction<number>) => {
      state.perPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.count = action.payload.count;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export const { setPage, setPerPage } = productSlice.actions;
export default productSlice.reducer;
