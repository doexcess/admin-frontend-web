import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/lib/api';
import Cookies from 'js-cookie';
import { Business, BusinessResponse } from '@/types/organization';

interface OrganizationState {
  organizations: Business[];
  count: number;
  loading: boolean;
  error: string | null;
  currentPage: number;
}

// Initial state
const initialState: OrganizationState = {
  organizations: [],
  count: 0,
  loading: false,
  error: null,
  currentPage: 1,
};

// Async thunk to fetch paginated organizations/businesses
export const fetchOrganizations = createAsyncThunk(
  'onboard/fetch-all-businesses',
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

    const { data } = await api.get<BusinessResponse>(
      '/onboard/fetch-all-businesses',
      {
        params,
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      }
    );

    return {
      organizations: data.data,
      count: data.count,
    };
  }
);

const organizationSlice = createSlice({
  name: 'organizations',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setPerPage: (state, action: PayloadAction<number>) => {
      // state.perPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrganizations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrganizations.fulfilled, (state, action) => {
        state.loading = false;
        state.organizations = action.payload.organizations;
        state.count = action.payload.count;
      })
      .addCase(fetchOrganizations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export const { setPage, setPerPage } = organizationSlice.actions;
export default organizationSlice.reducer;
