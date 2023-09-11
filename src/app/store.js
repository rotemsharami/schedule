import { configureStore } from '@reduxjs/toolkit';
//import counterReducer from '../features/counter/counterSlice';
import counterReducer from '../features/appInfo/appInfo';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
