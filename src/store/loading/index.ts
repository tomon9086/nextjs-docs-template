import { PayloadAction, combineReducers, createSlice } from '@reduxjs/toolkit'

const initialState: string[] = []
const slice = createSlice({
  name: 'loading/loading',
  initialState,
  reducers: {
    start: (state, action: PayloadAction<string>) => {
      if (state.includes(action.payload)) {
        return state
      } else {
        return [...state, action.payload]
      }
    },
    finish: (state, action: PayloadAction<string>) => {
      if (state.includes(action.payload)) {
        return state.filter((id) => id !== action.payload)
      } else {
        return state
      }
    }
  }
})

const reducer = combineReducers({
  loading: slice.reducer
})

export const actions = slice.actions

export default reducer
