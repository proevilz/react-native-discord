import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loggedIn: true,
    user: {
        id: '99',
        avatar: 'https://cdn.discordapp.com/avatars/292729670129025025/8391c3c2d5c68e10339d2d19389cf803.webp?size=240',
        username: 'ProEvilz',
        status: 4,
    },
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
})

// Action creators are generated for each case reducer function
export const {} = authSlice.actions

export default authSlice.reducer
