import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: {
            isLoading: true, //kiểm tra api đã gọi thành công chưa
            allUsers: null,
            allProducts: null,
            allOrders: null,
            allListOrders: null,
            currentProduct: null,
            searchResults: null,
            allComments: null,
            allNews: null,
            currentNews: null,
            isFetching: false,
            error: false,
        },
        msg: '',
    },
    reducers: {
        getUserStart: (state) => {
            state.users.isFetching = true;
            state.msg = 'Cập nhật thông tin thành công';
        },
        getUserSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allUsers = action.payload;
        },
        getUserFailed: (state) => {
            state.users.error = false;
        },

        //delete user
        deleteUserStart: (state) => {
            state.users.isFetching = true;
        },
        deleteUserSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allUsers = action.payload;
            state.msg = 'Xóa người dùng thành công';
        },
        deleteUserFailed: (state, action) => {
            state.users.isFetching = false;
            state.users.error = true;
            state.msg = action.payload;
        },

        //update user
        updateListUserStart: (state) => {
            state.users.isFetching = true;
        },
        updateListUserSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allUsers = action.payload;
            state.msg = 'Cập nhật thông tin thành công';
        },
        updateListUserFailed: (state, action) => {
            state.users.isFetching = false;
            state.users.error = true;
            state.msg = action.payload;
        },

        //get all product
        getProductStart: (state) => {
            state.users.isFetching = true;
            state.users.isLoading = true;
        },
        getProductSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allProducts = action.payload;
            state.users.isLoading = false;
        },
        getProductFailed: (state) => {
            state.users.error = false;
            state.users.isLoading = true;
        },

        //delete product
        deleteProductStart: (state) => {
            state.users.isFetching = true;
        },
        deleteProductSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allProducts = action.payload;
            state.msg = 'Xóa sản phẩm thành công';
        },
        deleteProductFailed: (state, action) => {
            state.users.isFetching = false;
            state.users.error = true;
            state.msg = action.payload;
        },

        //update product
        updateProductStart: (state) => {
            state.users.isFetching = true;
        },
        updateProductSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allProducts = action.payload;
            state.msg = 'Cập nhật thông tin thành công';
        },
        updateProductFailed: (state, action) => {
            state.users.isFetching = false;
            state.users.error = true;
            state.msg = action.payload;
        },

        //create product
        createProductStart: (state) => {
            state.users.isFetching = true;
        },
        createProductSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allProducts = action.payload;
        },
        createProductFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },

        //get product information from frontend
        sendInforProductStart: (state) => {
            state.users.isFetching = true;
        },
        sendInforProductSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.currentProduct = action.payload;
        },
        sendInforProductFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },

        //get the search results
        getSearchResultsStart: (state) => {
            state.users.isFetching = true;
        },
        getSearchResultsSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.searchResults = action.payload;
        },
        getSearchResultsFailed: (state) => {
            state.users.error = false;
        },

        //create Order
        createOrdersStart: (state) => {
            state.users.isFetching = true;
        },
        createOrdersSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allListOrders = action.payload;
        },
        createOrdersFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },

        //get all Order
        getAllOrdersStart: (state) => {
            state.users.isFetching = true;
        },
        getAllOrdersSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allListOrders = action.payload;
        },
        getAllOrdersFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },

        //delete order
        deleteOrderStart: (state) => {
            state.users.isFetching = true;
        },
        deleteOrderSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allListOrders = action.payload;
            state.msg = 'Xóa đơn hàng thành công';
        },
        deleteOrderFailed: (state, action) => {
            state.users.isFetching = false;
            state.users.error = true;
            state.msg = action.payload;
        },

        //update order
        updateOrderStart: (state) => {
            state.users.isFetching = true;
        },
        updateOrderSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allListOrders = action.payload;
            state.msg = 'Cập nhật đơn hàng thành công';
        },
        updateOrderFailed: (state, action) => {
            state.users.isFetching = false;
            state.users.error = true;
            state.msg = action.payload;
        },

        //create comment
        createCommentStart: (state) => {
            state.users.isFetching = true;
        },
        createCommentSuccess: (state, acction) => {
            state.users.isFetching = false;
            state.users.allComments = acction.payload;
            state.users.error = false;
        },
        createCommentFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },

        //get all comment
        getAllCommentStart: (state) => {
            state.users.isFetching = true;
        },
        getAllCommentSuccess: (state, acction) => {
            state.users.isFetching = false;
            state.users.allComments = acction.payload;
            state.users.error = false;
        },
        getAllCommentFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },

        //update user
        updateCommentStart: (state) => {
            state.users.isFetching = true;
        },
        updateCommentSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allComments = action.payload;
            state.users.error = false;
        },
        updateCommentFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },

        //delete comment
        deleteCommentStart: (state) => {
            state.users.isFetching = true;
        },
        deleteCommentSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allComments = action.payload;
            state.users.error = false;
        },
        deleteCommentFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },

        //Lấy tất cả bài viết
        getAllNewsStart: (state) => {
            state.users.isFetching = true;
        },
        getAllNewsSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allNews = action.payload;
            state.users.error = false;
        },
        getAllNewsFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },

        //cập nhật bài viết
        updateNewStart: (state) => {
            state.users.isFetching = true;
        },
        updateNewSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allNews = action.payload;
            state.users.error = false;
        },
        updateNewFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },

        //Lấy thông tin của bài viết hiện tại
        getInfoNewStart: (state) => {
            state.users.isFetching = true;
        },
        getInfoNewSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.currentNews = action.payload;
            state.users.error = false;
        },
        getInfoNewFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },

        //create new
        createNewStart: (state) => {
            state.users.isFetching = true;
        },
        createNewSuccess: (state, acction) => {
            state.users.isFetching = false;
            state.users.allNews = acction.payload;
            state.users.error = false;
        },
        createNewFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },

        //delete new
        deleteNewStart: (state) => {
            state.users.isFetching = true;
        },
        deleteNewSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allNews = action.payload;
            state.users.error = false;
        },
        deleteNewFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },
    },
});

export const {
    getUserStart,
    getUserSuccess,
    getUserFailed,

    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailed,

    updateListUserStart,
    updateListUserSuccess,
    updateListUserFailed,

    getProductStart,
    getProductSuccess,
    getProductFailed,

    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailed,

    updateProductStart,
    updateProductSuccess,
    updateProductFailed,

    createProductStart,
    createProductSuccess,
    createProductFailed,

    sendInforProductStart,
    sendInforProductSuccess,
    sendInforProductFailed,

    getSearchResultsStart,
    getSearchResultsSuccess,
    getSearchResultsFailed,

    createOrdersStart,
    createOrdersSuccess,
    createOrdersFailed,

    getAllOrdersStart,
    getAllOrdersSuccess,
    getAllOrdersFailed,

    deleteOrderStart,
    deleteOrderSuccess,
    deleteOrderFailed,

    updateOrderStart,
    updateOrderSuccess,
    updateOrderFailed,

    createCommentStart,
    createCommentSuccess,
    createCommentFailed,

    getAllCommentStart,
    getAllCommentSuccess,
    getAllCommentFailed,

    updateCommentStart,
    updateCommentSuccess,
    updateCommentFailed,

    deleteCommentStart,
    deleteCommentSuccess,
    deleteCommentFailed,

    getInfoNewStart,
    getInfoNewSuccess,
    getInfoNewFailed,

    getAllNewsStart,
    getAllNewsSuccess,
    getAllNewsSFailed,

    updateNewStart,
    updateNewSuccess,
    updateNewFailed,

    createNewStart,
    createNewSuccess,
    createNewFailed,

    deleteNewStart,
    deleteNewSuccess,
    deleteNewFailed,
} = userSlice.actions;

export default userSlice.reducer;
