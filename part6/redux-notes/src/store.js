import { configureStore } from '@reduxjs/toolkit'

import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

// combined reducers: every action gets handled in every reducer
const store = configureStore({
    reducer: {
        notes: noteReducer,
        filter: filterReducer
    }
})

export default store