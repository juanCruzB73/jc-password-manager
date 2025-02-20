import { configureStore } from '@reduxjs/toolkit'
import { authSlice, credentialsSlice, groupSlice, popUpSlice,noteSlice } from './slices'

export const store = configureStore({
  reducer: {
    auth:authSlice.reducer,
    popUp:popUpSlice.reducer,
    credential:credentialsSlice.reducer,
    group:groupSlice.reducer,
    note:noteSlice.reducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch