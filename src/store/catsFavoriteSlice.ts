import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FetchCatListResponseItem } from '~/api/cats.types';

const SLICE_NAME = 'catsFavorite';

type FavorHash = Record<string, number>;

interface IS {
  data: FetchCatListResponseItem[];
  hash: FavorHash;
}

const initialState: IS = { data: [], hash: {} };

const getHash = (data: FetchCatListResponseItem[]): FavorHash => {
  const result: FavorHash = {};
  data.forEach((cat, index) => {
    result[cat.id] = index;
  });
  return result;
};

const { actions, reducer } = createSlice({
  initialState,
  name: SLICE_NAME,
  reducers: {
    add: (state, action: PayloadAction<FetchCatListResponseItem>) => {
      if (state.hash[action.payload.id] !== undefined) {
        state.data = state.data.filter((cat) => cat.id !== action.payload.id);
      } else {
        state.data.push(action.payload);
      }
      state.hash = getHash(state.data);
    },
    delete: (state, action: PayloadAction<{ id: string }>) => {
      state.data = state.data.filter((cat) => cat.id !== action.payload.id);
      state.hash = getHash(state.data);
    },
  },
});

export const catsFavoriteReducer = reducer;
export const catsFavoriteSlice = { actions } as const;
