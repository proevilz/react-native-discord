import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loggedIn: true,
  user: {
    id: '99',
    avatar:
      'https://cdn.discordapp.com/avatars/292729670129025025/8391c3c2d5c68e10339d2d19389cf803.webp?size=240',
    username: 'ProEvilz',
    status: 4,
  },
  friends: [
    {
      id: 1,
      avatar: 'https://robohash.org/nisiestnesciunt.jpg?size=50x50&set=set1',
      username: 'pguice0',
      status: 4,
    },
    {
      id: 2,
      avatar: 'https://robohash.org/quiauteum.jpg?size=50x50&set=set5',
      username: 'lmcnally1',
      status: 2,
    },
    {
      id: 3,
      avatar: 'https://robohash.org/expeditaipsasunt.jpg?size=50x50&set=set5',
      username: 'driddick2',
      status: 4,
    },
    {
      id: 4,
      avatar:
        'https://robohash.org/explicabolaborecommodi.jpg?size=50x50&set=set5',
      username: 'tgiovanetti3',
      status: 2,
    },
    {
      id: 5,
      avatar:
        'https://robohash.org/officiisdictatempora.jpg?size=50x50&set=set5',
      username: 'mnormavell4',
      status: 1,
    },
  ],
  registration: {
    email: '',
    password: '',
    username: '',
    signUpError: {},
  },
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateRegistration: (state, payload) => {
      state.registration = payload.payload
    },
    updateUsername: (state, payload) => {
      state.registration.username = payload.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateRegistration, updateUsername } = authSlice.actions

export default authSlice.reducer
