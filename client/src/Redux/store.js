import { createSlice, configureStore } from '@reduxjs/toolkit';

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('authState');
        if (serializedState === null) {
            return { isLogin: false, userId: null };
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return { isLogin: false, userId: null };
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('authState', serializedState);
    } catch (err) {
        // Ignore write errors
    }
};

const authentication = createSlice({
    name: "authentication",
    initialState: loadState(),
    reducers: {
        login(state) {
            state.isLogin = true;
            saveState(state);
        },
        logout(state) {
            state.isLogin = false;
            saveState(state); 
        }
    }
});

export const authenticationActions = authentication.actions;

export const store = configureStore({
    reducer: authentication.reducer,
});
