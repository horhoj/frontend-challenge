import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  RequestList,
  RequestStateProperty,
  makeRequestExtraReducer,
  makeRequestStateProperty,
} from './helpers';
import { RootState } from './types';
import { catsApi } from '~/api/catsApi';
import { FetchCatListResponseItem } from '~/api/cats.types';

const SLICE_NAME = 'CATS';

interface IS {
  catList: FetchCatListResponseItem[];
  fetchCatListRequest: RequestStateProperty;
  page: number;
}

const initialState: IS = {
  catList: [],
  fetchCatListRequest: makeRequestStateProperty(),
  page: 0,
};

const { actions, reducer } = createSlice({
  initialState,
  name: SLICE_NAME,
  reducers: {
    addCatPack: (state, action: PayloadAction<FetchCatListResponseItem[]>) => {
      state.catList.push(...action.payload);
      state.page = state.page + 1;
    },
  },
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
      const { page } = (store.getState() as RootState).cats;
      console.log(13123, page);

      const res = await catsApi.fetchCatList(page);
      store.dispatch(actions.addCatPack(res));
      return store.fulfillWithValue(null);
    } catch (e: unknown) {
      return store.rejectWithValue((e as Error).message);
    }
  },
);

export const catsSliceReducer = reducer;
export const catsSlice = { actions, thunks: { fetchCatListThunk } } as const;
