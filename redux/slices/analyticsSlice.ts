import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/api';
import {
  RevenueReport,
  Metrics,
  MetricsResponse,
  RevenueResponse,
} from '@/types/analytics';

interface AnalyticsState {
  metrics: Metrics | null;
  revenue: RevenueReport | null;
  metricsLoading: boolean;
  revenuesLoading: boolean;
  metricsError: string | null;
  revenueError: string | null;
}

// Initial state
const initialState: AnalyticsState = {
  metrics: null,
  revenue: null,
  metricsLoading: false,
  revenuesLoading: false,
  metricsError: null,
  revenueError: null,
};

// Async thunk to fetch metrics
export const fetchMetrics = createAsyncThunk(
  'owner-analytics/fetch-metrics',
  async () => {
    const { data } = await api.get<MetricsResponse>(
      '/owner-analytics/fetch-metrics'
    );

    return {
      metrics: data.data,
    };
  }
);

// Async thunk to fetch revenue report
export const fetchRevenue = createAsyncThunk(
  'owner-analytics/fetch-revenue',
  async ({ year }: { year?: number }) => {
    const params: Record<string, any> = {};

    if (year !== undefined) params['year'] = year;

    const { data } = await api.get<RevenueResponse>(
      '/owner-analytics/fetch-revenue',
      {
        params,
      }
    );

    return {
      revenue: data.data,
    };
  }
);

const analysisSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMetrics.pending, (state) => {
        state.metricsLoading = true;
        state.metricsError = null;
      })
      .addCase(fetchMetrics.fulfilled, (state, action) => {
        state.metricsLoading = false;
        state.metrics = action.payload.metrics;
      })
      .addCase(fetchMetrics.rejected, (state, action) => {
        state.metricsLoading = false;
        state.metricsError = action.error.message || 'Failed to fetch metrics';
      })
      .addCase(fetchRevenue.pending, (state) => {
        state.revenuesLoading = true;
        state.revenueError = null;
      })
      .addCase(fetchRevenue.fulfilled, (state, action) => {
        state.revenuesLoading = false;
        state.revenue = action.payload.revenue;
      })
      .addCase(fetchRevenue.rejected, (state, action) => {
        state.revenuesLoading = false;
        state.revenueError = action.error.message || 'Failed to fetch revenue';
      });
  },
});

export default analysisSlice.reducer;
