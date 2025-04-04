import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/lib/api';
import {
  Business,
  BusinessDetails,
  BusinessDetailsResponse,
  BusinessResponse,
  ContactAccount,
  ContactResponse,
  Customer,
  CustomersResponse,
} from '@/types/organization';
import { SystemRole } from '@/lib/utils';

interface OrganizationState {
  organizations: Business[];
  organization: BusinessDetails | null;
  contacts: ContactAccount[];
  customers: Customer[];
  totalCustomers: number;
  totalContacts: number;
  count: number;
  loading: boolean;
  error: string | null;
  currentPage: number;
}

// Initial state
const initialState: OrganizationState = {
  organizations: [],
  organization: null,
  contacts: [],
  customers: [],
  totalCustomers: 0,
  totalContacts: 0,
  count: 0,
  loading: false,
  error: null,
  currentPage: 1,
};

// Async thunk to fetch paginated organizations/businesses
export const fetchOrganizations = createAsyncThunk(
  'onboard/fetch-all-businesses',
  async (
    {
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
    },
    { rejectWithValue }
  ) => {
    const params: Record<string, any> = {};

    if (page !== undefined) params['pagination[page]'] = page;
    if (limit !== undefined) params['pagination[limit]'] = limit;
    if (q !== undefined) params['q'] = q;
    if (startDate !== undefined) params['startDate'] = startDate;
    if (endDate !== undefined) params['endDate'] = endDate;

    try {
      const { data } = await api.get<BusinessResponse>(
        '/onboard/fetch-all-businesses',
        {
          params,
        }
      );

      return {
        organizations: data.data,
        count: data.count,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch organizations'
      );
    }
  }
);

// Async thunk to fetch organization/business details
export const fetchOrganizationDetails = createAsyncThunk(
  'onboard/fetch-business-details/:id',
  async (id: string, { rejectWithValue }) => {
    const params: Record<string, any> = {};

    try {
      const { data } = await api.get<BusinessDetailsResponse>(
        `/onboard/fetch-business-details/${id}`,
        {
          params,
        }
      );

      return data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch organization details'
      );
    }
  }
);

// Async thunk to fetch paginated organizations/businesses
export const fetchContacts = createAsyncThunk(
  'contact/fetch/:id',
  async (
    {
      businessId,
      page,
      limit,
      q,
      startDate,
      endDate,
    }: {
      businessId: string;
      page?: number;
      limit?: number;
      q?: string;
      startDate?: string;
      endDate?: string;
    },
    { rejectWithValue }
  ) => {
    const params: Record<string, any> = {};

    if (page !== undefined) params['pagination[page]'] = page;
    if (limit !== undefined) params['pagination[limit]'] = limit;
    if (q !== undefined) params['q'] = q;
    if (startDate !== undefined) params['startDate'] = startDate;
    if (endDate !== undefined) params['endDate'] = endDate;

    try {
      const { data } = await api.get<ContactResponse>(
        `/contact/fetch/${businessId}`,
        {
          params,
        }
      );

      return {
        contacts: data.data,
        count: data.count,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch contacts'
      );
    }
  }
);

// Async thunk to fetch paginated business customers
export const fetchCustomers = createAsyncThunk(
  'contact/fetch-customers',
  async (
    {
      business_id,
      page,
      limit,
      q,
      role,
      startDate,
      endDate,
    }: {
      business_id?: string;
      page?: number;
      limit?: number;
      q?: string;
      role?: SystemRole;
      startDate?: string;
      endDate?: string;
    },
    { rejectWithValue }
  ) => {
    const params: Record<string, any> = {};

    if (page !== undefined) params['pagination[page]'] = page;
    if (limit !== undefined) params['pagination[limit]'] = limit;
    if (q !== undefined) params['q'] = q;
    if (role !== undefined) params['role'] = role;
    if (business_id !== undefined) params['business_id'] = business_id;
    if (startDate !== undefined) params['startDate'] = startDate;
    if (endDate !== undefined) params['endDate'] = endDate;

    try {
      const { data } = await api.get<CustomersResponse>(
        `/contact/fetch-customers`,
        {
          params,
        }
      );

      return {
        customers: data.data,
        count: data.count,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch business's customers"
      );
    }
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
      })
      .addCase(fetchOrganizationDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrganizationDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.organization = action.payload;
      })
      .addCase(fetchOrganizationDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload.contacts;
        state.totalContacts = action.payload.count;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload.customers;
        state.totalCustomers = action.payload.count;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPage, setPerPage } = organizationSlice.actions;
export default organizationSlice.reducer;
