import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ImsState = {
    imsToken: string
};

type ImsActionPayload = {
    imsToken: string;
}

const initialIMSState: ImsState = {
    imsToken: ""
};

const imsSlice = createSlice({
    name: 'ims',
    initialState: initialIMSState,
    reducers: {
        setImsToken(state, action: PayloadAction<ImsActionPayload>) {
            state.imsToken = action.payload.imsToken
        }
    }
});

export default imsSlice;
