import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IUploadItems {
  drawerOpened: boolean;
  drawerLoading: boolean;
  progress: number;

  items: {
    invalidLocation: TLocationItems[];
    duplicateEntries: TLocationItems[];
    inserted: TLocationItems[];
    invalidEntries: TLocationItems[];
  };
}

const initialState: IUploadItems = {
  drawerOpened: false,
  drawerLoading: false,
  progress: 0,
  items: {
    duplicateEntries: [],
    invalidEntries: [],
    invalidLocation: [],
    inserted: [],
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
      // if (!state.drawerOpened) {
      //   // reset all
      //   state.items.duplicateEntries = [];
      //   state.items.invalidEntries = [];
      //   state.items.invalidLocation = [];
      //   state.items.inserted = [];
      //   state.drawerLoading = false;
      //   state.progress = 0;
      // }
    },
    updateItems: (state, action: PayloadAction<IUploadItems["items"]>) => {
      state.items = action.payload;
    },
    setProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
  },
});

export const { setLoading, toggleDrawer, updateItems, setProgress } =
  itemSlice.actions;

export default itemSlice.reducer;
