import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
            allCarts: null,
            isFetching: false,
            error: false,
        },
        register: {
            isFetching: false,
            error: false,
            success: false,
        },
        msg: '',
    },
    reducers: {
        registerStart: (state) => {
            state.register.isFetching = true;
        },
        registerSuccess: (state) => {
            state.register.isFetching = false;
            state.register.success = true;
        },
        registerFailed: (state) => {
            state.register.isFetching = false;
            state.register.error = true;
        },

        //login
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
        },
        loginFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
            alert('Thông tin đăng nhập không chính xác!');
        },

        //logout
        logOutStart: (state) => {
            state.login.isFetching = true;
        },
        logOutSuccess: (state) => {
            state.login.isFetching = false;
            state.login.currentUser = null;
            state.login.allCarts = null;
        },
        logOutFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },

        //update user
        updateUserStart: (state) => {
            state.login.isFetching = true;
        },
        updateUserSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload.data;
            state.msg = {
                code: action.payload.code,
                msg: action.payload.msg,
            };
        },
        updateUserFailed: (state, action) => {
            state.login.isFetching = false;
            state.login.error = true;
            state.msg = action.payload;
        },

        //add product to cart
        createCartStart: (state) => {
            state.login.isFetching = true;
        },
        createCartSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.allCarts = action.payload;
        },
        createCartFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },

        //get all carts
        getAllCartsStart: (state) => {
            state.login.isFetching = true;
        },
        getAllCartsSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.allCarts = action.payload;
        },
        getAllCartsFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },

        //delete product from carts
        deleteProductCartsStart: (state) => {
            state.login.isFetching = true;
        },
        deleteProductCartsSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.allCarts = action.payload;
        },
        deleteProductCartsFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },

        //update carts
        updateProductCartsStart: (state) => {
            state.login.isFetching = true;
        },
        updateProductCartsSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.allCarts = action.payload;
        },
        updateProductCartsFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailed,

    registerStart,
    registerSuccess,
    registerFailed,

    logOutStart,
    logOutSuccess,
    logOutFailed,

    updateUserStart,
    updateUserSuccess,
    updateUserFailed,

    createCartStart,
    createCartSuccess,
    createCartFailed,

    getAllCartsStart,
    getAllCartsSuccess,
    getAllCartsFailed,

    deleteProductCartsStart,
    deleteProductCartsSuccess,
    deleteProductCartsFailed,

    updateProductCartsStart,
    updateProductCartsSuccess,
    updateProductCartsFailed,
} = authSlice.actions;

export default authSlice.reducer;
