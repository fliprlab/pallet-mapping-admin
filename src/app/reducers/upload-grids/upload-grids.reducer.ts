import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IUploadGrids {
  drawerOpened: boolean;
  drawerLoading: boolean;
  progress: number;

  items: {
    invalidLocation: TGrid[];
    duplicateEntries: TGrid[];
    validEntries: TGrid[];
    invalidEntries: TGrid[];
  };
}

const initialState: IUploadGrids = {
  drawerOpened: false,
  drawerLoading: false,
  progress: 0,
  items: {
    duplicateEntries: [],
    invalidEntries: [],
    invalidLocation: [],
    validEntries: [],
  },
};

const gridSlices = createSlice({
  initialState,
  name: "upload-grids",
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.drawerLoading = action.payload;
    },
    toggleDrawer: (state) => {
      state.drawerOpened = !state.drawerOpened;
    },
    updateItems: (state, action: PayloadAction<IUploadGrids["items"]>) => {
      state.items = action.payload;
    },
    setProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
  },
});

export const { setLoading, toggleDrawer, updateItems, setProgress } =
  gridSlices.actions;

export default gridSlices.reducer;
