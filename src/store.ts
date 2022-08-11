import { configureStore } from '@reduxjs/toolkit'
import bottomTabsReducer from './slices/bottomTabsSlice'
import chatReducer from './slices/chatSlice'
import authReducer from './slices/authSlice'
import uiReducer from './slices/uiSlice'
export const store = configureStore({
  reducer: {
    bottomTabs: bottomTabsReducer,
    chat: chatReducer,
    auth: authReducer,
    ui: uiReducer,
  },
  devTools: true,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

const getSelectedConversationObj = (state) => {
  return state.chat.conversations.find(
    (conversation) => conversation.id === state.chat.selectedConversation
  )
}
export const selectors = {
  findConversation: (state, userId) => {
    return state.chat.conversations.find(
      (conversation) => conversation.id === state.chat.selectedConversation
    )
  },
  findConversationUser: (state, conversationId) => {
    const authedUserId = state.auth.user.id
    const conversation = state.chat.conversations.find(
      (conversation) => conversation.id === conversationId
    )
    return conversation.users.find((user) => user.id !== authedUserId)
  },
  findChatParticipant: (state) => {
    const authedUserId = state.auth.user.id
    const conversation = getSelectedConversationObj(state)
    return conversation.users.find((user) => user.id !== authedUserId)
  },
  findMessageAuthor: (state, authorId) => {
    const conversation = getSelectedConversationObj(state)
    return conversation.users.find((user) => user.id === authorId)
  },
}
