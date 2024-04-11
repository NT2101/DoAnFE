import { createAsyncThunk, createSlice, unwrapResult } from '@reduxjs/toolkit'
import { accountApi } from '../../api/accountApi'

// First, create the thunk
export const login = createAsyncThunk('accounts/login', async (payload) => {
    const data = await accountApi.get(payload.Name, payload.Password);
    // Save data to localStorage
    localStorage.setItem("USER", JSON.stringify(data.data))
    return data;
});


// Then, handle actions in your reducers:
const accountSlice = createSlice({
    name: 'users',
    initialState: {
        current: JSON.stringify(localStorage.getItem("USER")) || {},
        loading: {},
        setting: {}
    },
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
        logout(state) {
            // Clear local storage
            localStorage.removeItem("USER");
            state.current = {}
        }
    },
    extraReducers: {
        // Trang thai khi login thanh cong
        [login.fulfilled]: (state, action) => {
            state.current = action.payload;
        },
    },
})
const { actions, reducer } = accountSlice;
export const { logout } = actions;
export default reducer;
