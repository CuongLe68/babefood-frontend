import './User.scss';
import logoUser from '../../../assets/imgs/userlogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { createAxios } from '../../../createInstance';
import { logOutSuccess } from '../../../redux/authSlice';
import { logOut } from '../../../redux/apiRequest';

import { faHome, faBell, faClipboardList, faPen, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';

function User() {
    const user = useSelector((state) => state.auth.login?.currentUser);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    let axiosJWT = createAxios(user, dispatch, logOutSuccess);

    const handleLogout = () => {
        logOut(dispatch, user?._id, user?.accessToken, axiosJWT);
    };

    useEffect(() => {
        if (!user) {
            navigate('/dang-nhap');
        }
    });

    return (
        <div className="user-container">
            <div className="user-left user-left-desktop">
                <div className="user-info">
                    <img src={logoUser} alt="logo-user" />
                    <p>
                        <span className="user-info-name">{user?.fullname}</span>
                        <span className="user-info-edit">
                            <FontAwesomeIcon icon={faPen} />
                            Sửa Hồ Sơ
                        </span>
                    </p>
                </div>
                <div className="user-account">
                    <Link to="/tai-khoan/tai-khoan-cua-toi" className="user-account-item">
                        <FontAwesomeIcon icon={faUser} />
                        Tài khoản của tôi
                    </Link>
                    <Link to="/tai-khoan/don-hang" className="user-account-item">
                        <FontAwesomeIcon icon={faClipboardList} />
                        Đơn mua
                    </Link>
                    <Link to="/tai-khoan/thong-bao" className="user-account-item">
                        <FontAwesomeIcon icon={faBell} />
                        Thông báo
                    </Link>
                    <Link to="/" className="user-account-item" onClick={handleLogout}>
                        <FontAwesomeIcon icon={faRightFromBracket} />
                        Đăng xuất
                    </Link>
                </div>
            </div>

            {/* Giao diện điện thoại */}
            <ul className="user-left user-left-mobile">
                <Link className="user-left-mobile-item" to="/">
                    <FontAwesomeIcon icon={faHome} />
                    <p>Trang Chủ</p>
                </Link>
                <Link to="/tai-khoan/tai-khoan-cua-toi" className="user-left-mobile-item">
                    <FontAwesomeIcon icon={faUser} />
                    <p>Tài khoản</p>
                </Link>
                <Link to="/tai-khoan/don-hang" className="user-left-mobile-item">
                    <FontAwesomeIcon icon={faClipboardList} />
                    <p>Đơn mua</p>
                </Link>
                <Link to="/tai-khoan/thong-bao" className="user-left-mobile-item">
                    <FontAwesomeIcon icon={faBell} />
                    <p>Thông báo</p>
                </Link>
                <Link to="/" className="user-left-mobile-item" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faRightFromBracket} />
                    <p>Đăng xuất</p>
                </Link>
            </ul>
        </div>
    );
}

export default User;
