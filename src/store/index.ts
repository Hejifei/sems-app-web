import {configureStore} from '@reduxjs/toolkit'

import baseSlice from '@/models/baseSlice'

const store = configureStore({
  reducer: {
    base: baseSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
