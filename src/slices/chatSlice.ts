import { createSlice } from '@reduxjs/toolkit'
import uuid from 'react-native-uuid'
interface IUser {
    id: string
    avatar: string
    username: string
    status: number
}
interface IMessage {
    id: string
    text: string
    createdAt: string
    updatedAt: string
    authorId: string
    conversationId: string
}
interface conversation {
    id: string
    createdAt: string
    users: IUser[]
    messages: IMessage[]
}
interface IinitialState {
    conversations: conversation[]
    selectedConversation: string
}
const initialState: IinitialState = {
    conversations: [
        {
            id: '1',
            createdAt: '2022-08-07T19:58:55+01:00',
            users: [
                {
                    id: '5',
                    avatar: 'https://robohash.org/officiisdictatempora.jpg?size=50x50&set=set5',
                    username: 'mnormavell4',
                    status: 1,
                },
                {
                    id: '99',
                    avatar: 'https://cdn.discordapp.com/avatars/292729670129025025/8391c3c2d5c68e10339d2d19389cf803.webp?size=240',
                    username: 'ProEvilz',
                    status: 4,
                },
            ],
            messages: [
                {
                    id: '1',
                    text: 'Fusce consequat.',
                    createdAt: '2021-10-15T04:24:30Z',
                    updatedAt: '2022-02-22T21:08:05Z',
                    authorId: '5',
                    conversationId: '1',
                },
                {
                    id: '2',
                    text: 'Cras in purus eu magna vulputate luctus.',
                    createdAt: '2022-03-01T01:07:15Z',
                    updatedAt: '2022-04-21T16:41:17Z',
                    authorId: '99',
                    conversationId: '1',
                },
                {
                    id: '3',
                    text: 'Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.',
                    createdAt: '2021-08-19T22:23:43Z',
                    updatedAt: '2022-07-15T21:08:32Z',
                    authorId: '5',
                    conversationId: '1',
                },
            ],
        },
        {
            id: '2',
            createdAt: '2022-08-06T19:58:55+01:00',
            users: [
                {
                    id: '3',
                    avatar: 'https://robohash.org/expeditaipsasunt.jpg?size=50x50&set=set5',
                    username: 'driddick2',
                    status: 4,
                },
                {
                    id: ' 99',
                    avatar: 'https://cdn.discordapp.com/avatars/292729670129025025/8391c3c2d5c68e10339d2d19389cf803.webp?size=240',
                    username: 'ProEvilz',
                    status: 4,
                },
            ],
            messages: [
                {
                    id: '1',
                    text: 'Fusce consequat.',
                    createdAt: '2021-10-15T04:24:30Z',
                    updatedAt: '2022-02-22T21:08:05Z',
                    authorId: '3',
                    conversationId: '1',
                },
                {
                    id: '2',
                    text: 'Cras in purus eu magna vulputate luctus.',
                    createdAt: '2022-03-01T01:07:15Z',
                    updatedAt: '2022-04-21T16:41:17Z',
                    authorId: '99',
                    conversationId: '1',
                },
                {
                    id: '3',
                    text: 'Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.',
                    createdAt: '2021-08-19T22:23:43Z',
                    updatedAt: '2022-07-15T21:08:32Z',
                    authorId: '3',
                    conversationId: '1',
                },
            ],
        },
    ],
    selectedConversation: '1',
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        selectConversation: (state, action) => {
            state.selectedConversation = action.payload.conversationId
        },
        addMessage: (state, action) => {
            const message = {
                id: uuid.v4() as string,
                text: action.payload.message,
                createdAt: new Date().toString() as unknown as string,
                updatedAt: new Date().toString() as unknown as string,
                authorId: action.payload.authorId,
                conversationId: action.payload.conversationId,
            }
            console.log({ message })
            const conversation = state.conversations.find(
                (conversation) =>
                    conversation.id === action.payload.conversationId
            )
            conversation.messages = [...conversation.messages, message]
        },
    },
})

// Action creators are generated for each case reducer function
export const { selectConversation, addMessage } = chatSlice.actions

export default chatSlice.reducer
