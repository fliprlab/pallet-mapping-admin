import { configureStore } from "@reduxjs/toolkit";
import uploadItemsSlice from "./reducers/upload-items/upload-items.reducer";
import uploadGridsSlice from "./reducers/upload-grids/upload-grids.reducer";

export const store = configureStore({
  reducer: {
    uploadItems: uploadItemsSlice,
    uploadGrids: uploadGridsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
