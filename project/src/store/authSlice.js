import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: null, // Use null for initial state
    userData: null, // Store user data
    loading: true, // Track loading state
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Action to handle user login
        authLogin: (state, action) => {
            state.status = true; // Set authentication status to true
            state.userData = action.payload; // Store user data
            state.loading = false; // Stop loading
        },
        // Action to handle user logout
        authLogout: (state) => {
            state.status = false; // Set authentication status to false
            state.userData = null; // Clear user data
            state.loading = false; // Stop loading
        },
        // Action to set loading state
        setLoading: (state) => {
            state.loading = true; // Start loading
        },
    },
});

// Export actions
export const { authLogin, authLogout, setLoading } = authSlice.actions;

// Export reducer
export default authSlice.reducer;