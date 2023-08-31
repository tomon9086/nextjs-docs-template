import { configureStore } from '@reduxjs/toolkit'
import loadingReducer from './loading'

const store = configureStore({
  reducer: {
    loading: loadingReducer
  }
})

export type State = ReturnType<typeof store.getState>

export default store
