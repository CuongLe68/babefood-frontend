import './Order.scss';
import { useSelector, useDispatch } from 'react-redux';
import User from '../User/User';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllOrders } from '../../../redux/apiRequest';
import { loginSuccess } from '../../../redux/authSlice';
import { createAxios } from '../../../createInstance';

let currentOrders = []; //danh sách sản phẩm của người dùng hiện tại
let currentList = []; //danh sách sản phẩm theo danh mục

let PREV_CLASS_ACTIVE = ''; //class của danh mục trước đó
let CURRENT_CLASS_ACTIVE = ''; //class của danh mục hiện tại

if (window.innerWidth <= 600) {
    PREV_CLASS_ACTIVE = 'order-navbar-mobile_all';
    CURRENT_CLASS_ACTIVE = 'order-navbar-mobile_all';
} else {
    PREV_CLASS_ACTIVE = 'order-navbar-desktop_all';
    CURRENT_CLASS_ACTIVE = 'order-navbar-desktop_all';
}

function Order() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const orders = useSelector((state) => state.users.users?.allListOrders);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    //refresh token
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const [listOrders, setListOrders] = useState('');

    //lấy tất cả sản phẩm của người dùng hiện tại
    currentOrders = [];
    if (orders) {
        for (let i = 0; i < orders?.length; i++) {
            if (orders[i].listproduct[0]?.userId === user?._id) {
                currentOrders.push(orders[i]);
            }
        }
        if (listOrders === '') {
            currentList = currentOrders;
        }
    }

    //xử lý hiển thị list theo danh mục

    window.addEventListener('resize', () => {
        if (window.innerWidth <= 600) {
            PREV_CLASS_ACTIVE = 'order-navbar-mobile_all';
            CURRENT_CLASS_ACTIVE = 'order-navbar-mobile_all';
        } else {
            PREV_CLASS_ACTIVE = 'order-navbar-desktop_all';
            CURRENT_CLASS_ACTIVE = 'order-navbar-desktop_all';
        }
    });
    const handleShowListOrders = (e) => {
        currentList = [];
        setListOrders(e);

        PREV_CLASS_ACTIVE = e.split(' ')[1];

        //hiển thị danh mục đang được chọn
        document.querySelector(`.${CURRENT_CLASS_ACTIVE}`).classList.remove('active');
        document.querySelector(`.${PREV_CLASS_ACTIVE}`).classList.add('active');

        CURRENT_CLASS_ACTIVE = PREV_CLASS_ACTIVE;

        //Hiển thị danh sách sản phẩm cảu danh mục
        if (PREV_CLASS_ACTIVE === 'order-navbar-mobile_all' || PREV_CLASS_ACTIVE === 'order-navbar-desktop_all') {
            currentList = currentOrders;
        } else if (
            PREV_CLASS_ACTIVE === 'order-navbar-mobile_payment' ||
            PREV_CLASS_ACTIVE === 'order-navbar-desktop_payment'
        ) {
            for (let i = 0; i < currentOrders.length; i++) {
                if (!currentOrders[i].isPayment) {
                    currentList.push(currentOrders[i]);
                }
            }
        } else if (
            PREV_CLASS_ACTIVE === 'order-navbar-mobile_transported' ||
            PREV_CLASS_ACTIVE === 'order-navbar-desktop_transported'
        ) {
            for (let i = 0; i < currentOrders.length; i++) {
                if (currentOrders[i].isPayment === true && currentOrders[i].istransported === false) {
                    currentList.push(currentOrders[i]);
                }
            }
        } else if (
            PREV_CLASS_ACTIVE === 'order-navbar-mobile_success' ||
            PREV_CLASS_ACTIVE === 'order-navbar-desktop_success'
        ) {
            for (let i = 0; i < currentOrders.length; i++) {
                if (
                    currentOrders[i].isPayment === true &&
                    currentOrders[i].istransported === true &&
                    currentOrders[i].isSuccess === true
                ) {
                    currentList.push(currentOrders[i]);
                }
            }
        } else if (
            PREV_CLASS_ACTIVE === 'order-navbar-mobile_failed' ||
            PREV_CLASS_ACTIVE === 'order-navbar-desktop_failed'
        ) {
            for (let i = 0; i < currentOrders.length; i++) {
                if (
                    currentOrders[i].isPayment === true &&
                    currentOrders[i].istransported === true &&
                    currentOrders[i].isSuccess === false
                ) {
                    currentList.push(currentOrders[i]);
                }
            }
        }
    };

    //format date
    function formatDate(value) {
        const date = new Date(value);
        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1;
        const year = date.getUTCFullYear();

        // Định dạng lại chuỗi ngày tháng năm
        const formattedDate = `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;

        return formattedDate;
    }

    useEffect(() => {
        if (!user) {
            navigate('/dang-nhap');
        } else if (user?.accessToken) {
            getAllOrders(dispatch, axiosJWT, user?.accessToken);
        }

        // eslint-disable-next-line
    }, []);

    //Mua lại thì chuyển đến trang mua lại, xử lí tìm kiếm và danh mục sản phẩm trong đơn hàng 2/1/20123
    return (
        <div className="order-container">
            <div className="order-wrapper">
                <User />
                <div className="order-right">
                    <div className="order-navbar order-navbar-desktop">
                        <div
                            className="order-navbar_item order-navbar-desktop_all active"
                            onClick={(e) => handleShowListOrders(e.target.className)}
                        >
                            Tất cả
                        </div>
                        <div
                            className="order-navbar_item order-navbar-desktop_payment"
                            onClick={(e) => handleShowListOrders(e.target.className)}
                        >
                            Chờ xác nhận
                        </div>
                        <div
                            className="order-navbar_item order-navbar-desktop_transported"
                            onClick={(e) => handleShowListOrders(e.target.className)}
                        >
                            Đang giao
                        </div>
                        <div
                            className="order-navbar_item order-navbar-desktop_success"
                            onClick={(e) => handleShowListOrders(e.target.className)}
                        >
                            Đã giao
                        </div>
                        <div
                            className="order-navbar_item order-navbar-desktop_failed"
                            onClick={(e) => handleShowListOrders(e.target.className)}
                        >
                            Đã Hủy
                        </div>
                    </div>

                    {/* giao diện điện thoại */}
                    <div className="order-navbar order-navbar-mobile">
                        <div className="order-navbar-mobile-top">
                            <div
                                className="order-navbar_item order-navbar-mobile_all active"
                                onClick={(e) => handleShowListOrders(e.target.className)}
                            >
                                Tất cả
                            </div>
                            <div
                                className="order-navbar_item order-navbar-mobile_payment"
                                onClick={(e) => handleShowListOrders(e.target.className)}
                            >
                                Chờ xác nhận
                            </div>
                            <div
                                className="order-navbar_item order-navbar-mobile_transported"
                                onClick={(e) => handleShowListOrders(e.target.className)}
                            >
                                Đang giao
                            </div>
                        </div>
                        <div className="order-navbar-mobile-bottom">
                            <div
                                className="order-navbar_item order-navbar-mobile_success"
                                onClick={(e) => handleShowListOrders(e.target.className)}
                            >
                                Đã giao
                            </div>
                            <div
                                className="order-navbar_item order-navbar-mobile_failed"
                                onClick={(e) => handleShowListOrders(e.target.className)}
                            >
                                Đã Hủy
                            </div>
                        </div>
                    </div>
                    <div className="order-search">
                        <FontAwesomeIcon icon={faSearch} />
                        <input type="text" placeholder="Bạn có thể tìm kiếm đơn hàng theo ID hoặc tên sản phẩm" />
                    </div>
                    {currentList.map((order) => {
                        return (
                            <div className="order-item" key={order._id}>
                                <p className="order-item-header">
                                    {!order.isPayment
                                        ? 'chờ xác nhận'
                                        : !order.istransported
                                        ? 'đang giao'
                                        : order.isSuccess
                                        ? 'đã giao'
                                        : 'đã hủy'}
                                </p>
                                {order.listproduct.map((item) => {
                                    return (
                                        <div className="order-item-body" key={item._id}>
                                            <img src={item.avatar} alt="" />
                                            <div className="order-item-body-des">
                                                <p>{item.description}</p>
                                                <p style={{ color: 'green' }}>x{item.count}</p>
                                            </div>
                                            <div className="price">
                                                <span>
                                                    {Intl.NumberFormat('de-DE', {
                                                        style: 'currency',
                                                        currency: 'VND',
                                                    }).format(item.price)}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div className="order-item-footer">
                                    <div className="box">
                                        <p className="order-item-footer-row-1">
                                            Thành tiền:{' '}
                                            <span>
                                                <span>
                                                    {Intl.NumberFormat('de-DE', {
                                                        style: 'currency',
                                                        currency: 'VND',
                                                    }).format(order.total)}
                                                </span>
                                            </span>
                                        </p>
                                        <p className="order-item-footer-row-1">
                                            Mã đơn hàng: <p>{order._id}</p>
                                        </p>
                                        <p className="order-item-footer-row-1">
                                            Địa chỉ: <p>{order.user.address}</p>
                                        </p>
                                        <p className="order-item-footer-row-1">
                                            Số điện thoại: <p>{order.user.phone}</p>
                                        </p>
                                        <p className="order-item-footer-row-1">
                                            Ngày đặt hàng: <p>{formatDate(order.dateCreate)}</p>
                                        </p>
                                        <p className="order-item-footer-row-1">
                                            Ngày giao dự kiến: <p>{formatDate(order.dateEnd)}</p>
                                        </p>
                                    </div>
                                    <div className="order-item-footer-row-2">
                                        <p>Quản lý bởi hệ thống Mouse Store, giao hàng sớm nhất 3 đến 5 ngày</p>
                                        <div className="order-item-footer-row-2-btn">
                                            <Link to="/">Quay về</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Order;
