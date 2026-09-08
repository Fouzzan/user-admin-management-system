import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await api.get('/users');
    return response.data;
});

export const fetchUserById = createAsyncThunk('users/fetchUserById', async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
});

export const updateUserById = createAsyncThunk('users/updateUserById', async ({ id, updates }) => {
    const response = await api.patch(`/users/${id}`, updates);
    return response.data;
});

export const createUser = createAsyncThunk('users/createUser', async (user) => {
    const existingUser = await api.get('/users', {
        params: { email: user.email }
    });

    if (existingUser.data.length > 0) {
        throw new Error('Email already registered');
    }

    const response = await api.post('/users', user);
    return response.data;
});

export const deleteUserById = createAsyncThunk('users/deleteUserById', async (id) => {
    await api.delete(`/users/${id}`);
    return id;
});

const initialState = {
    users: [],
    selectedUser: null,
    loading: false,
    error: null
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        clearSelectedUser: (state) => {
            state.selectedUser = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchUserById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.selectedUser = null;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedUser = action.payload;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedUser = action.payload;
                state.users = state.users.map((user) =>
                    user.id === action.payload.id ? action.payload : user
                );
            })
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateUserById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteUserById.fulfilled, (state, action) => {
                state.users = state.users.filter((user) => user.id !== action.payload);
            });
    }
});

export const { clearSelectedUser } = userSlice.actions;

export default userSlice.reducer;
