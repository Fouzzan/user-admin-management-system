import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../services/api';



export const loginUser = createAsyncThunk(
    'auth/loginUser',

    async ({ email, password }) => {
        const response = await api.get('/users', {
            params: {
                email
            }
        });

        const user = response.data.find((item) => item.password === password);

        if (!user) {
            throw new Error('Invalid email or password');
        }

        if (!user.isActive) {
            throw new Error('Your account is inactive');
        }

        localStorage.setItem('user', JSON.stringify(user));

        return user;
    }
);



export const registerUser = createAsyncThunk(
    'auth/registerUser',

    async ({ name, email, password, phone }) => {
        const existingUser = await api.get('/users', {
            params: { email }
        });

        if (existingUser.data.length > 0) {
            throw new Error('Email already registered');
        }

        const response = await api.post('/users', {
            name,
            email,
            password,
            phone,
            profilePicture: '',
            role: 'user',
            isActive: true
        });

        localStorage.setItem('user', JSON.stringify(response.data));

        return response.data;
    }
);




export const updateUser = createAsyncThunk(
    'auth/updateUser',

    async ({ id, name, email, phone }) => {
        const response = await api.patch(`/users/${id}`, {
            name,
            email,
            phone
        });

        return response.data;
    }
);




export const changePassword = createAsyncThunk(
    'auth/changePassword',

    async ({ id, password }) => {
        const response = await api.patch(`/users/${id}`, {
            password
        });

        return response.data;
    }
);



const initialState = {
    currentUser: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    authInitialized: false
};



const authSlice = createSlice({
    name: 'auth',

    initialState,

    reducers: {


        logout: (state) => {
            state.currentUser = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
            state.authInitialized = true;

            localStorage.removeItem('user');
        },



        restoreUser: (state, action) => {
            state.currentUser = action.payload;
            state.isAuthenticated = true;
            state.authInitialized = true;
        },



        initializeAuth: (state) => {
            state.authInitialized = true;
        }
    },


    extraReducers: (builder) => {

        builder



            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
                state.isAuthenticated = true;
                state.authInitialized = true;
            })

            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })




            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
                state.isAuthenticated = true;
                state.authInitialized = true;
            })

            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })




            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;

                localStorage.setItem(
                    'user',
                    JSON.stringify(action.payload)
                );
            })

            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })




            .addCase(changePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(changePassword.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;

                localStorage.setItem(
                    'user',
                    JSON.stringify(action.payload)
                );
            })

            .addCase(changePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});




export default authSlice.reducer;

export const {
    logout,
    restoreUser,
    initializeAuth
} = authSlice.actions;
