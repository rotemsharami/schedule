import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';



import {getData} from "../../tools/data"

const initialState = {
  value: 0,
  status: 'idle',
  data: getData(),
  days:[],
  selectedDays:[],
  dataByTime:{}
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },

    setActiveDays: (state, action) => {
        state.days = action.payload;
    },
    setTheSelectedDays: (state, action) => {
        if (state.selectedDays.includes(action.payload)){
            state.selectedDays = state.selectedDays.filter(a =>a !== action.payload);
        }
        else{
            state.selectedDays.push(action.payload);
        }
    },
    setDataByTime: (state, action) => {
        state.dataByTime = action.payload;
    },

    setInisialSelectedDays: (state, action) => {
        state.selectedDays = action.payload;
    }


  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.

});

export const { increment, decrement, incrementByAmount, setActiveDays, setTheSelectedDays, setDataByTime, setInisialSelectedDays} = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state) => state.counter;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
};

export default counterSlice.reducer;
