import './Sidebar.scss';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
    faBell,
    faChevronRight,
    faHeadphones,
    faHome,
    faQuestionCircle,
    faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import sidebar from '../../../src/assets/imgs/sidebar.png';

const Sidebar = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const navigate = useNavigate();

    //Chỉ tải lại trang
    const handleReload = () => {
        navigate('/');
        window.location.reload();
    };

    //set vị trí của sidebar
    useEffect(() => {
        const navbarElelement = document.querySelector('.navbar-container');
        const sidebarElelement = document.querySelector('.sidebar-container');

        //bắt sự kiện scroll
        const handleScroll = () => {
            var rect = navbarElelement.getBoundingClientRect();
            sidebarElelement.style.bottom = `${-110 - rect.top}px`;
        };

        // Thêm event listener khi component được mount
        window.addEventListener('scroll', handleScroll);

        // Xóa event listener khi component bị unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className="sidebar-container">
            <ul className="menu menu-desktop">
                <div className="menu-item" onClick={(e) => handleReload()}>
                    Trang Chủ
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>
                <Link className="menu-item" to="/gioi-thieu">
                    Giới Thiệu Về Kids Nuttions
                    <FontAwesomeIcon icon={faChevronRight} />
                </Link>
                <Link className="menu-item" to="/">
                    Danh Sách Sản Phẩm
                    <FontAwesomeIcon icon={faChevronRight} />
                </Link>
                <Link className="menu-item" to="/tin-tuc">
                    Thông Báo
                    <FontAwesomeIcon icon={faChevronRight} />
                </Link>
                <Link className="menu-item" to="/cham-soc-khach-hang">
                    Chăm Sóc Khách Hàng
                    <FontAwesomeIcon icon={faChevronRight} />
                </Link>
                <Link className="menu-item" to="/tuyen-dung">
                    Bài Tuyển Dụng
                    <FontAwesomeIcon icon={faChevronRight} />
                </Link>
            </ul>

            {/* Giao diện điện thoại */}
            <ul className="menu menu-mobile">
                <div className="menu-mobile-item" onClick={(e) => handleReload()}>
                    <FontAwesomeIcon icon={faHome} />
                    <p>Trang Chủ</p>
                </div>
                <Link className="menu-mobile-item" to="/gioi-thieu">
                    <FontAwesomeIcon icon={faQuestionCircle} />
                    <p>Giới Thiệu</p>
                </Link>
                <Link className="menu-mobile-item" to="/tin-tuc">
                    <FontAwesomeIcon icon={faBell} />
                    <p>Tin Tức</p>
                </Link>
                <Link className="menu-mobile-item" to="/cham-soc-khach-hang">
                    <FontAwesomeIcon icon={faHeadphones} />
                    <p>Hỗ Trợ</p>
                </Link>
                {!user ? (
                    <Link className="menu-mobile-item" to="/dang-nhap">
                        <FontAwesomeIcon icon={faUserCircle} />
                        <p>Tài khoản</p>
                    </Link>
                ) : (
                    <Link className="menu-mobile-item" to="/tai-khoan/tai-khoan-cua-toi">
                        <FontAwesomeIcon icon={faUserCircle} />
                        <p>Tài khoản</p>
                    </Link>
                )}
            </ul>
            <Link to="/tin-tuc" className="banner">
                <img src={sidebar} alt="sidebar" />
            </Link>
        </nav>
    );
};

export default Sidebar;
