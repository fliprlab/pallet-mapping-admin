import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IUploadItems {
  drawerOpened: boolean;
  drawerLoading: boolean;
  items: {
    invalidLocation: TLocationItems[];
    duplicateEntries: TLocationItems[];
    validEntries: TLocationItems[];
    invalidEntries: TLocationItems[];
  };
}

const initialState: IUploadItems = {
  drawerOpened: false,
  drawerLoading: false,
  items: {
    duplicateEntries: [],
    invalidEntries: [],
    invalidLocation: [],
    validEntries: [],
  },
};

const itemSlice = createSlice({
  initialState,
  name: "upload-items",
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.drawerLoading = action.payload;
    },
    toggleDrawer: (state) => {
      state.drawerOpened = !state.drawerOpened;
    },
    updateItems: (state, action: PayloadAction<IUploadItems["items"]>) => {
      state.items = action.payload;
    },
  },
});

export const { setLoading, toggleDrawer, updateItems } = itemSlice.actions;

export default itemSlice.reducer;
