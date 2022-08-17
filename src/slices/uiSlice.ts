import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  actionSheetOpen: false,
  selectedUser: null,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    closeActionSheet: (state) => {
      state.actionSheetOpen = false
    },
    openActionSheet: (state, payload) => {
      state.actionSheetOpen = true
      state.selectedUser = payload.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { openActionSheet, closeActionSheet } = uiSlice.actions

export default uiSlice.reducer
