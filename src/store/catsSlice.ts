import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  RequestList,
  RequestStateProperty,
  makeRequestExtraReducer,
  makeRequestStateProperty,
} from './helpers';
import { catsApi } from '~/api/catsApi';
import { FetchCatListResponseItem } from '~/api/cats.types';

const SLICE_NAME = 'CATS';

interface IS {
  fetchCatListRequest: RequestStateProperty<FetchCatListResponseItem[]>;
}

const initialState: IS = { fetchCatListRequest: makeRequestStateProperty() };

const { actions, reducer } = createSlice({
  initialState,
  name: SLICE_NAME,
  reducers: {},
  extraReducers: (builder) => {
    makeRequestExtraReducer<RequestList<IS>>(
      builder,
      fetchCatListThunk,
      'fetchCatListRequest',
    );
  },
});

const fetchCatListThunk = createAsyncThunk(
  `${SLICE_NAME}/fetchCatListThunk`,
  async (_, store) => {
    try {
      const res = await catsApi.fetchCatList();
      return store.fulfillWithValue(res);
    } catch (e: unknown) {
      return store.rejectWithValue((e as Error).message);
    }
  },
);

export const catsSliceReducer = reducer;
export const catsSlice = { actions, thunks: { fetchCatListThunk } } as const;
