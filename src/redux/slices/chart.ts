import { createSlice } from '@reduxjs/toolkit'

export interface State {
    data: Record<string, any> | Record<string, any>[],
    labels: string[]
}

const initialState: State = {
    data: [],
    labels: []
}

export const chartSlice = createSlice({
    name: 'chart',
    initialState,
    reducers: {
        setData(state, { payload }) {
            state.data = payload
        },
        pushData(state, { payload }) {
            state.data.push(payload)
        },
        setLabels(state, { payload }) {
            state.labels = payload
        },
        pushLabels(state, { payload }) {
            state.labels.push(payload)
        }
    },
})

export const { pushData, setData, pushLabels, setLabels } = chartSlice.actions

export default chartSlice.reducer