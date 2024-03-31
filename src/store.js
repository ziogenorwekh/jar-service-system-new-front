import {configureStore, createSlice} from '@reduxjs/toolkit';
import axios from "axios";

let user = createSlice(
    {
        name: 'user',
        initialState: {email: '', userId: ''},
        reducers: {
            setStoreEmail(state, action) {
                state.email = action.payload;
            },
            setStoreUserId(state, action) {
                state.userId = action.payload;
            },
            logout(stats) {

                axios.defaults.headers.common['Authorization'] = null;
                stats.email = '';
                stats.userId = '';
            },
        }
    }
)



export let {setStoreEmail, setStoreUserId, logout} = user.actions;
export default configureStore({
    reducer: {
        user: user.reducer,
    }
})
