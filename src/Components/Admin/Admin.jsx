import './Admin.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/apiRequest';
import { createAxios } from '../../createInstance';
import { loginSuccess } from '../../redux/authSlice';
import logo from '../../assets/imgs/userlogo.png';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Admin = () => {
    //users
    const user = useSelector((state) => state.auth.login?.currentUser);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    //refresh token
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleLogout = () => {
        logOut(dispatch, user?.id, user?.accessToken, axiosJWT);
    };

    useEffect(() => {
        if (!user?.admin) {
            navigate('/admin');
        }
    }, []);
    return (
        <main className="admin-container">
            <div className="admin-container-navbar">
                <div className="admin-container-item">
                    <img src={logo} alt="" />
                    <p>{user?.fullname}</p>
                </div>
                <Link to="/quan-li-san-pham" className="admin-container-item">
                    Quản lý sản phẩm
                </Link>
                <Link to="/quan-li-nguoi-dung" className="admin-container-item">
                    Quản lý người dùng
                </Link>
                <Link to="/quan-li-don-hang" className="admin-container-item">
                    Quản lý đơn hàng
                </Link>
                <Link to="/quan-li-thong-ke" className="admin-container-item">
                    Quản lý thống kê
                </Link>
                <Link to="/quan-li-danh-gia-binh-luan" className="admin-container-item">
                    Quản lý đánh giá bình luận
                </Link>
                <Link to="/quan-li-tin-tuc" className="admin-container-item">
                    Quản lý tin tức
                </Link>
                <Link to="/" onClick={handleLogout} className="admin-container-item">
                    Đăng xuất
                </Link>
            </div>
        </main>
    );
};

export default Admin;
