import axios from 'axios';
import {
    loginFailed,
    loginStart,
    loginSuccess,
    logOutFailed,
    logOutStart,
    logOutSuccess,
    registerFailed,
    registerStart,
    registerSuccess,
    updateUserFailed,
    updateUserStart,
    updateUserSuccess,
    createCartFailed,
    createCartStart,
    createCartSuccess,
    getAllCartsFailed,
    getAllCartsStart,
    getAllCartsSuccess,
    deleteProductCartsFailed,
    deleteProductCartsStart,
    deleteProductCartsSuccess,
    updateProductCartsStart,
    updateProductCartsFailed,
    updateProductCartsSuccess,
} from './authSlice';
import {
    createOrdersFailed,
    createOrdersStart,
    createOrdersSuccess,
    createProductFailed,
    createProductStart,
    createProductSuccess,
    deleteProductFailed,
    deleteOrderFailed,
    deleteOrderStart,
    deleteOrderSuccess,
    deleteProductStart,
    deleteProductSuccess,
    deleteUserFailed,
    deleteUserStart,
    deleteUserSuccess,
    getAllOrdersFailed,
    getAllOrdersStart,
    getAllOrdersSuccess,
    getProductFailed,
    getProductStart,
    getProductSuccess,
    getSearchResultsFailed,
    getSearchResultsStart,
    getSearchResultsSuccess,
    getUserFailed,
    getUserStart,
    getUserSuccess,
    sendInforProductFailed,
    sendInforProductStart,
    sendInforProductSuccess,
    updateListUserFailed,
    updateListUserStart,
    updateListUserSuccess,
    updateProductFailed,
    updateProductStart,
    updateProductSuccess,
    updateOrderStart,
    updateOrderSuccess,
    updateOrderFailed,
    createCommentStart,
    createCommentFailed,
    createCommentSuccess,
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
} from './userSlice';

const proxy = process.env.REACT_APP_URL_API_KIDSNUTTIONS_PRODUCT;

//auth
//Đăng nhập bằng username và password
export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(`${proxy}/auth/login/`, user);
        dispatch(loginSuccess(res.data));
        navigate('/');
    } catch (error) {
        dispatch(loginFailed());
    }
};

//Đăng nhập bằng facebook
export const loginWithFacebook = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(`${proxy}/auth/login-facebook/`, user);
        dispatch(loginSuccess(res.data.data));
        navigate('/');
    } catch (error) {
        dispatch(loginFailed());
    }
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await axios.post(`${proxy}/auth/register/`, user);
        dispatch(registerSuccess());
        alert('Đăng ký tài khoản thành công');
        navigate('/dang-nhap');
        window.location.reload();
    } catch (error) {
        dispatch(registerFailed());
    }
};

export const logOut = async (dispatch, id, accessToken, axiosJWT) => {
    dispatch(logOutStart());
    try {
        await axiosJWT.post(`${proxy}/auth/logout/`, id, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(logOutSuccess());
        //làm màu tai lại trang
        setTimeout(() => {
            window.location.reload();
        }, 100);
    } catch (error) {
        dispatch(logOutFailed());
    }
};

//users
export const getAllUsers = async (accessToken, dispatch) => {
    dispatch(getUserStart());
    try {
        const res = await axios.get(`${proxy}/user/`, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(getUserSuccess(res.data));
    } catch (error) {
        dispatch(getUserFailed());
    }
};

//delete
export const deleteUser = async (accessToken, dispatch, id, axiosJWT) => {
    dispatch(deleteUserStart());
    try {
        const res = await axiosJWT.delete(`${proxy}/user/` + id, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(deleteUserSuccess(res.data));
    } catch (error) {
        dispatch(deleteUserFailed(error.response.data));
    }
};

//update user
export const updateUser = async (accessToken, dispatch, id, axiosJWT, user) => {
    dispatch(updateUserStart());
    try {
        const res = await axiosJWT.put(`${proxy}/auth/update/` + id, {
            headers: { token: `Bearer ${accessToken}` },
            body: user,
        });
        dispatch(updateUserSuccess(res.data));
        setTimeout(() => {
            window.location.reload();
        }, 500);
    } catch (error) {
        dispatch(updateUserFailed(error.response.data));
    }
};

//update listuser by admin
export const updateListUser = async (accessToken, dispatch, id, axiosJWT, user) => {
    dispatch(updateListUserStart());
    try {
        const res = await axiosJWT.put(`${proxy}/user/update-listusers/` + id, {
            headers: { token: `Bearer ${accessToken}` },
            body: user,
        });
        alert('Cập nhật thông tin thành công');
        dispatch(updateListUserSuccess(res.data));
        window.location.reload();
    } catch (error) {
        dispatch(updateListUserFailed(error.response.data));
    }
};

//get all products
export const getAllProducts = async (dispatch) => {
    dispatch(getProductStart());
    try {
        const res = await axios.get(`${proxy}/user/all-products/`, {
            headers: {
                appKey: process.env.REACT_APP_APP_KEY,
                appId: process.env.REACT_APP_APP_ID,
            },
        });
        dispatch(getProductSuccess(res.data));
    } catch (error) {
        dispatch(getProductFailed());
    }
};

//delete product
export const deleteProduct = async (accessToken, dispatch, id, axiosJWT) => {
    dispatch(deleteProductStart());
    try {
        const res = await axiosJWT.delete(`${proxy}/user/delete-product/` + id, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(deleteProductSuccess(res.data));
    } catch (error) {
        dispatch(deleteProductFailed(error.response.data));
    }
};

//Update Product
export const updateProduct = async (accessToken, user, id, axiosJWT, dispatch) => {
    dispatch(updateProductStart());
    try {
        const res = await axiosJWT.put(`${proxy}/user/update-product/` + id, {
            headers: { token: `Bearer ${accessToken}` },
            body: user,
        });
        alert('Cập nhật thông tin thành công');
        dispatch(updateProductSuccess(res.data));
        window.location.reload();
    } catch (error) {
        updateProductFailed(error.response.data);
    }
};

//create product
export const createProduct = async (dispatch, newproduct) => {
    dispatch(createProductStart());
    try {
        const res = await axios.post(`${proxy}/user/create-product/`, newproduct);
        dispatch(createProductSuccess(res.data));
        alert('Tạo sản phẩm thành công!');
        window.location.reload();
    } catch (error) {
        dispatch(createProductFailed());
    }
};

//get product information from frontend
export const sendCurrentProduct = async (dispatch, navigate, product) => {
    dispatch(sendInforProductStart());
    try {
        dispatch(sendInforProductSuccess(product));
        navigate('/san-pham/thong-tin-chi-tiet');
        // window.location.reload();
    } catch (error) {
        dispatch(sendInforProductFailed());
    }
};

//get the search results
export const getSearchResults = async (dispatch, navigate, listProduct) => {
    dispatch(getSearchResultsStart());
    try {
        dispatch(getSearchResultsSuccess(listProduct));
        navigate('/danh-sach-san-pham');
        window.location.reload();
    } catch (error) {
        dispatch(getSearchResultsFailed());
    }
};

//add product to cart
export const addToCart = async (dispatch, newProduct, axiosJWT) => {
    dispatch(createCartStart());
    try {
        const res = await axiosJWT.post(`${proxy}/user/add-to-cart/`, newProduct);
        dispatch(createCartSuccess(res.data));
    } catch (error) {
        dispatch(createCartFailed());
    }
};

//get all products cart
export const getAllCarts = async (dispatch, axiosJWT, accessToken) => {
    dispatch(getAllCartsStart());
    try {
        const res = await axiosJWT.get(`${proxy}/user/get-all-cart/`, {
            headers: { token: `Bearer ${accessToken}` },
        });

        dispatch(getAllCartsSuccess(res.data));
    } catch (error) {
        dispatch(getAllCartsFailed());
    }
};

//delete product from cars
export const deleteCarts = async (dispatch, id, axiosJWT) => {
    dispatch(deleteProductCartsStart());
    try {
        const res = await axiosJWT.delete(`${proxy}/user/delete-cart/` + id);
        dispatch(deleteProductCartsSuccess(res.data));
        window.location.reload();
    } catch (error) {
        dispatch(deleteProductCartsFailed());
    }
};

//update carts
export const updateCarts = async (dispatch, listOrders) => {
    dispatch(updateProductCartsStart());
    try {
        dispatch(updateProductCartsSuccess(listOrders));
    } catch (error) {
        dispatch(updateProductCartsFailed);
    }
};

//create order
export const createNewOrder = async (dispatch, newOrders, axiosJWT) => {
    dispatch(createOrdersStart());
    try {
        const res = await axiosJWT.post(`${proxy}/user/create-order/`, newOrders);
        dispatch(createOrdersSuccess(res.data));
    } catch (error) {
        dispatch(createOrdersFailed());
    }
};

//get all orders
export const getAllOrders = async (dispatch, axiosJWT, accessToken) => {
    dispatch(getAllOrdersStart());
    try {
        const res = await axiosJWT.get(`${proxy}/user/all-orders/`, {
            headers: { token: `Bearer ${accessToken}` },
        });

        dispatch(getAllOrdersSuccess(res.data));
    } catch (error) {
        dispatch(getAllOrdersFailed());
    }
};

//delete 643d2c232899340fa945d103
export const deleteOrder = async (dispatch, id, axiosJWT) => {
    dispatch(deleteOrderStart());
    try {
        const res = await axiosJWT.delete(`${proxy}/user/delete-order/` + id);
        dispatch(deleteOrderSuccess(res.data));
        alert('Xóa đơn hàng thành công');
        window.location.reload();
    } catch (error) {
        dispatch(deleteOrderFailed());
    }
};

//Update Orders
export const updateOrder = async (orderId, orders, axiosJWT, dispatch) => {
    dispatch(updateOrderStart());
    try {
        const res = await axiosJWT.put(`${proxy}/user/update-order/` + orderId, {
            body: orders,
        });
        alert('Cập nhật thông tin thành công');
        dispatch(updateOrderSuccess(res.data));
        window.location.reload();
    } catch (error) {
        dispatch(updateOrderFailed(error.response.data));
    }
};

//Create comment
export const createComment = async (newComment, axiosJWT, dispatch) => {
    dispatch(createCommentStart());
    try {
        const res = await axiosJWT.post(`${proxy}/user/create-comment/`, newComment);
        dispatch(createCommentSuccess(res.data));
    } catch (error) {
        dispatch(createCommentFailed());
    }
};

//get all comment
export const getAllComment = async (dispatch) => {
    dispatch(getAllCommentStart());
    try {
        const res = await axios.get(`${proxy}/user/get-all-comment/`);
        dispatch(getAllCommentSuccess(res.data));
    } catch (error) {
        dispatch(getAllCommentFailed());
    }
};

//Update comment
export const updateComment = async (id, comment, axiosJWT, dispatch) => {
    dispatch(updateCommentStart());
    try {
        const res = await axiosJWT.put(`${proxy}/user/update-comment/` + id, {
            body: comment,
        });
        alert('Phản hồi thành công');
        dispatch(updateCommentSuccess(res.data));
        window.location.reload();
    } catch (error) {
        dispatch(updateCommentFailed(error.response.data));
    }
};

//delete 643d2c232899340fa945d103
export const deleteComment = async (id, dispatch, axiosJWT) => {
    dispatch(deleteCommentStart());
    try {
        const res = await axiosJWT.delete(`${proxy}/user/delete-comment/` + id);
        dispatch(deleteCommentSuccess(res.data));
        alert('Xóa bình luận thành công');
    } catch (error) {
        dispatch(deleteCommentFailed());
    }
};

//get all news
export const getAllNews = async (dispatch) => {
    dispatch(getAllNewsStart());
    try {
        const res = await axios.get(`${proxy}/user/get-all-news/`);
        dispatch(getAllNewsSuccess(res.data));
    } catch (error) {
        dispatch(getAllNewsSFailed());
    }
};

//Update new
export const updateNew = async (id, currentNew, dispatch) => {
    dispatch(updateNewStart());
    try {
        const res = await axios.put(`${proxy}/user/update-new/` + id, {
            body: currentNew,
        });
        dispatch(updateNewSuccess(res.data));
    } catch (error) {
        dispatch(updateNewFailed());
    }
};

//get new information from frontend
export const getInfoCurrentNew = async (dispatch, navigate, currentNew) => {
    dispatch(getInfoNewStart());
    try {
        dispatch(getInfoNewSuccess(currentNew));
        navigate('/tin-tuc/chi-tiet-bai-viet');
    } catch (error) {
        dispatch(getInfoNewFailed());
    }
};

//Create New
export const createNew = async (newNew, dispatch) => {
    dispatch(createNewStart());
    try {
        const res = await axios.post(`${proxy}/user/create-new/`, newNew);
        dispatch(createNewSuccess(res.data));
        alert('Tạo bài viết mới thành công');
    } catch (error) {
        dispatch(createNewFailed());
    }
};

//delete new
export const deleteNew = async (id, dispatch) => {
    dispatch(deleteNewStart());
    try {
        const res = await axios.delete(`${proxy}/user/delete-new/` + id);
        dispatch(deleteNewSuccess(res.data));
        alert('Xóa bài viết thành công thành công');
    } catch (error) {
        dispatch(deleteNewFailed());
    }
};
