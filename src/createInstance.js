import axios from 'axios';
import jwt_decode from 'jwt-decode';

//refresh token
const refreshToken = async () => {
    try {
        const res = await axios.post('http://localhost:8000/v1/auth/refresh', {
            withCredentials: true, //bắt buộc xác thực
        });
        return res.data;
    } catch (error) {
        console.log('Lỗi refresh token ' + error);
    }
};

//check accessToken đã hết hạn chưa
export const createAxios = (user, dispatch, stateSuccess) => {
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
        async (config) => {
            let date = new Date();
            const decodedToken = jwt_decode(user?.accessToken); //lấy token đã giả mã
            if (decodedToken.exp < date.getTime() / 1000) {
                const data = await refreshToken();
                const refreshUser = {
                    ...user,
                    accessToken: data.accessToken,
                };
                dispatch(stateSuccess(refreshUser)); //lấy thông tin mới của user
                config.headers['token'] = 'Bearer ' + data.accessToken; //thay thế headers đã có bằng headers mới với accessToken mới
            }
            return config; //trả về thông tin mới
        },
        (error) => {
            return Promise.reject(error); //trả về lỗi
        },
    );
    return newInstance;
};
