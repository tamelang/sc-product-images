import { configureStore } from '@reduxjs/toolkit';
import imsSlice from "./ims-slice";

const store = configureStore({
    reducer: {
        imsToken: imsSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
