import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, SortType } from '../../const';

export type appData = {
  city: string;
  sortType: string;
};

const initialState: appData = {
  city: 'Paris',
  sortType: SortType.DEFAULT,
};

export const appData = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    changeSortType: (state, action: PayloadAction<string>) => {
      state.sortType = action.payload;
    }
  }
});

export const { changeCity, changeSortType } = appData.actions;
