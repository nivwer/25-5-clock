import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 0,
}

const clockSlice = createSlice({
    name: 'clock',
    initialState,
    reducers: {

    }
})

// export const {} = clockSlice.actions

export default clockSlice.reducer