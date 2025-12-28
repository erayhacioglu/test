import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

// Async Thunk - Fetch History
export const fetchHistory = createAsyncThunk(
    'history/fetchHistory',
    async ({ cardId, page = 0, size = 20, eventType = null }, { rejectWithValue }) => {
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                size: size.toString(),
                sort: 'createdAt,desc'
            });

            if (eventType && eventType.length > 0) {
                params.append('eventType', eventType.join(','));
            }

            const response = await axiosInstance.get(`/history/user/${cardId}?${params}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Geçmiş yüklenirken hata oluştu');
        }
    }
);

const initialState = {
    historyData: {
        content: [],
        totalElements: 0,
        totalPages: 0,
        size: 20,
        number: 0
    },
    currentPage: 0,
    pageSize: 20,
    filters: {
        eventTypes: []
    },
    loading: false,
    error: null
};

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setPageSize: (state, action) => {
            state.pageSize = action.payload;
            state.currentPage = 0;
        },
        setEventTypeFilter: (state, action) => {
            state.filters.eventTypes = action.payload;
            state.currentPage = 0;
        },
        clearFilters: (state) => {
            state.filters.eventTypes = [];
            state.currentPage = 0;
        },
        resetHistory: (state) => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.historyData = action.payload;
                state.error = null;
            })
            .addCase(fetchHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { 
    setCurrentPage, 
    setPageSize, 
    setEventTypeFilter, 
    clearFilters,
    resetHistory 
} = historySlice.actions;

export default historySlice.reducer;
