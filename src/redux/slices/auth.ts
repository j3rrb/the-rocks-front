import { createSlice } from '@reduxjs/toolkit'

export interface State {
    authenticated: boolean;
    company?: string;
}

const initialState: State = {
    authenticated: false,
}

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setAuth: (state, { payload }) => {
            state.authenticated = payload.authenticated
            state.company = payload.company
        },
    },
})

export const { setAuth } = authSlice.actions

export default authSlice.reducer