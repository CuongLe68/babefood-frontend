import { useSelector } from 'react-redux';
import Admin from '../../Admin/Admin';
import './ListReports.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faChartColumn, faFileInvoice, faUserPlus } from '@fortawesome/free-solid-svg-icons';

function ListReports() {
    const users = useSelector((state) => state.users.users?.allUsers);
    const user = useSelector((state) => state.auth.login?.currentUser);
    const products = useSelector((state) => state.users.users?.allProducts);
    const orders = useSelector((state) => state.users.users?.allListOrders);

    const navigate = useNavigate();

    const [totalRevenue, setTotalRevenue] = useState(0);
    const [countRevenue, setCountRevenue] = useState(0);
    const [listUser, setListUser] = useState([]);
    const [listProducts, setListProducts] = useState([]);
    const [listOrders, setListOrders] = useState([]);
    const [valueSelect, setValueSelect] = useState('date');
    const [year, setYear] = useState();
    const [quarter, setQuarter] = useState();
    const [showSearch, setShowSearch] = useState({ isShow: false, showInfo: 'users' });
    const { isShow, showInfo } = showSearch;

    const currentTableReport = {
        revenue: {
            title: 'Thống kê doanh thu',
            fields: ['Số lượng đơn hàng', 'Tổng doanh thu'],
        },
        products: {
            title: 'Thống kê Sản phẩm',
            fields: ['Hãng', 'Hình ảnh', 'Tên sản phẩm', 'Giá ưu đãi', 'Giá gốc', 'Số lượng', 'Ngày tạo'],
        },
        invoices: {
            title: 'Thống kê đơn hàng',
            fields: [
                'Mã đơn',
                'Khách hàng',
                'Tổng tiền',
                'Ngày đặt',
                'Ngày giao',
                'Phương thức thanh toán',
                'Số điện thoại',
            ],
        },
        users: {
            title: 'Thống kê người dùng',
            fields: ['Tên người dùng', 'Số điện thoại', 'Địa chỉ', 'Email', 'Tài khoản', 'Ngày tạo'],
        },
    };

    // reFormatdate YYYY-MM-DD
    function reFormatDate(date) {
        const formattedDate = moment(date).format('YYYY-MM-DD');

        return formattedDate;
    }

    // reFormatdate YYYY-MM
    function reFormatMonth(date) {
        const formattedDate = moment(date).format('YYYY-MM');

        return formattedDate;
    }

    // reFormatdate YYYY
    function reFormatYear(date) {
        const formattedDate = moment(date).format('YYYY');

        return formattedDate;
    }

    //Thống kê doanh thu
    let totalRe = 0;
    for (let i = 0; i < orders?.length; i++) {
        totalRe += orders[i].total;
    }

    /*thống kê danh sách
        - Lay theo ngay: chon 1 ngay bat ky (1 - 31)
        - Lay theo thang: chon 1 thang bat ky (1 - 12)
        - chon quy: chon 1 quy bat ky (1 - 4)
        - chon theo nam: chon 1 nam bat ky nho hon nam hien tai 
    */
    //Lấy danh sách trước khi thống kê
    const setPrevDataByInfo = (info) => {
        if (info === 'revenue') {
            return orders;
        } else if (info === 'products') {
            return products;
        } else if (info === 'invoices') {
            return orders;
        } else if (info === 'users') {
            return users;
        }
    };

    //Lấy data sau khi thống kê
    const setNewDataByInfo = (info, data) => {
        if (info === 'revenue') {
            let totalR = 0;
            let countR = 0;

            for (let i = 0; i < data.length; i++) {
                countR++;
                totalR += data[i].total;
            }

            setTotalRevenue(totalR);
            setCountRevenue(countR);
        } else if (info === 'products') {
            setListProducts(data);
        } else if (info === 'invoices') {
            setListOrders(data);
        } else if (info === 'users') {
            setListUser(data);
        }
    };

    const getList = (type, time) => {
        const currentList = setPrevDataByInfo(showInfo);
        const newList = [];
        if (type === 'date') {
            let formatInputTime = new Date(time); // format lại thời gian người dùng chọn để so sánh

            for (let i = 0; i < currentList.length; i++) {
                let reformatDate;
                if (showInfo === 'invoices' || showInfo === 'revenue') {
                    reformatDate = reFormatDate(currentList[i].dateCreate);
                } else {
                    reformatDate = reFormatDate(currentList[i].createdAt);
                }
                let formatDateCreate = new Date(reformatDate);

                if (formatInputTime < formatDateCreate) {
                } else if (formatInputTime > formatDateCreate) {
                } else {
                    newList.push(currentList[i]);
                }
            }
            setNewDataByInfo(showInfo, newList);
        } else if (type === 'month') {
            let formatInputTime = new Date(time); // format lại thời gian người dùng chọn để so sánh

            for (let i = 0; i < currentList.length; i++) {
                let reformatDate = reFormatMonth(currentList[i].createdAt);
                let formatDateCreate = new Date(reformatDate);

                if (formatInputTime < formatDateCreate) {
                } else if (formatInputTime > formatDateCreate) {
                } else {
                    newList.push(currentList[i]);
                }
            }
            setNewDataByInfo(showInfo, newList);
        } else if (type === 'quarter') {
            if (!quarter || quarter < 2023 || quarter > 2100) {
                alert('Vui lòng chọn năm : 2023 -2100');
                setQuarter('');
            } else {
                const isDateInQuarterOne = (date) => {
                    const inputDate = new Date(date);
                    const month = inputDate.getMonth(); // Lấy tháng từ ngày đó
                    const year = inputDate.getFullYear(); // Lấy năm từ ngày đó

                    //Kiểm tra năm của người dùng óc trùng với năm của mình nhập vào không
                    if (year === Number(quarter)) {
                        // Kiểm tra xem tháng có nằm trong khoảng quý nào
                        if (time === 1) {
                            return month >= 0 && month <= 2;
                        } else if (time === 2) {
                            return month >= 3 && month <= 5;
                        } else if (time === 3) {
                            return month >= 6 && month <= 8;
                        } else if (time === 4) {
                            return month >= 9 && month <= 11;
                        }
                    } else {
                        return false;
                    }
                };

                for (let i = 0; i < currentList.length; i++) {
                    let reformatDate;
                    if (showInfo === 'invoices' || showInfo === 'revenue') {
                        reformatDate = reFormatDate(currentList[i].dateCreate);
                    } else {
                        reformatDate = reFormatDate(currentList[i].createdAt);
                    }

                    if (isDateInQuarterOne(reformatDate)) {
                        newList.push(currentList[i]);
                    }
                }
                setNewDataByInfo(showInfo, newList);
                setQuarter(quarter);
            }
        } else if (type === 'year') {
            if (!time || time < 2023 || time > 2100) {
                alert('Vui lòng chọn năm : 2023 -2100');
                setYear('');
            } else {
                let formatInputTime = new Date(time); // format lại thời gian người dùng chọn để so sánh

                for (let i = 0; i < currentList.length; i++) {
                    let reformatDate = reFormatYear(currentList[i].createdAt);
                    let formatDateCreate = new Date(reformatDate);

                    if (formatInputTime < formatDateCreate) {
                    } else if (formatInputTime > formatDateCreate) {
                    } else {
                        newList.push(currentList[i]);
                    }
                }
                setNewDataByInfo(showInfo, newList);
                setYear(time);
            }
        }
    };

    useEffect(() => {
        if (!user?.admin) {
            navigate('/');
        }
    });
    return (
        <div className="listreport-container">
            <Admin />
            <div className="listreport-wrapper">
                <div className="listreport-header">Quản lý thống kê</div>
                <div className="header">
                    <label className="top-product">Tên sản phẩm bán chạy nhất</label>
                    <p className="top-product-name">
                        Sữa Nan Optipro PLUS 4 1.5kg, với 5HMO, Công thức từ Thụy Sĩ (2-6 tuổi)
                    </p>
                    <p className="top-product-name">Sữa Enfagrow A+ số 4 1700g (2-6 tuổi) 2Flex</p>
                    <span className="top-product-number">
                        Với số lượng: <span style={{ fontSize: '1.5rem', fontWeight: 600 }}>45</span> sản phẩm
                    </span>
                    <div className="list-report">
                        <div className="item">
                            <div className="top">
                                <div className="left">
                                    <div className="count">
                                        {Intl.NumberFormat('de-DE', {
                                            style: 'currency',
                                            currency: 'VND',
                                        }).format(totalRe)}
                                    </div>
                                    <div className="title">Tổng doanh thu</div>
                                </div>
                                <div className="right">
                                    <FontAwesomeIcon icon={faBagShopping} />
                                </div>
                            </div>
                            <div
                                className="more-info"
                                onClick={(e) => setShowSearch({ isShow: true, showInfo: 'revenue' })}
                            >
                                Thông tin chi tiết
                            </div>
                        </div>
                        <div className="item">
                            <div className="top">
                                <div className="left">
                                    <div className="count">{products?.length} sản phẩm</div>
                                    <div className="title">Tổng số lượng sản phẩm</div>
                                </div>
                                <div className="right">
                                    <FontAwesomeIcon icon={faChartColumn} />
                                </div>
                            </div>
                            <div
                                className="more-info"
                                onClick={(e) => setShowSearch({ isShow: true, showInfo: 'products' })}
                            >
                                Thông tin chi tiết
                            </div>
                        </div>
                        <div className="item">
                            <div className="top">
                                <div className="left">
                                    <div className="count">{orders?.length} đơn hàng</div>
                                    <div className="title">Tổng số lượng đơn hàng</div>
                                </div>
                                <div className="right">
                                    <FontAwesomeIcon icon={faFileInvoice} />
                                </div>
                            </div>
                            <div
                                className="more-info"
                                onClick={(e) => setShowSearch({ isShow: true, showInfo: 'invoices' })}
                            >
                                Thông tin chi tiết
                            </div>
                        </div>
                        <div className="item">
                            <div className="top">
                                <div className="left">
                                    <div className="count">{users?.length - 1} người dùng</div>
                                    <div className="title">Tổng số lượng người dùng</div>
                                </div>
                                <div className="right">
                                    <FontAwesomeIcon icon={faUserPlus} />
                                </div>
                            </div>
                            <div
                                className="more-info"
                                onClick={(e) => setShowSearch({ isShow: true, showInfo: 'users' })}
                            >
                                Thông tin chi tiết
                            </div>
                        </div>
                    </div>
                </div>
                {isShow ? (
                    <div className="body">
                        <select className="choice" onChange={(e) => setValueSelect(e.target.value)}>
                            <option value="date">Thống kê theo ngày</option>
                            <option value="month">Thống kê theo tháng</option>
                            <option value="quarter">Thống kê theo quý</option>
                            <option value="year">Thống kê theo năm</option>
                        </select>
                        <div className="listreport-body">
                            {valueSelect === 'date' ? (
                                <div className="listreport-body-option">
                                    <input
                                        type={valueSelect}
                                        min="2023-01-01"
                                        max="2100-01-01"
                                        onChange={(e) => getList(valueSelect, e.target.value)}
                                    />
                                </div>
                            ) : valueSelect === 'month' ? (
                                <div className="listreport-body-option">
                                    <input
                                        type={valueSelect}
                                        min="2023-01"
                                        max="2100-01"
                                        onChange={(e) => getList(valueSelect, e.target.value)}
                                    />
                                </div>
                            ) : valueSelect === 'quarter' ? (
                                <div className="listreport-body-option">
                                    <input
                                        type="year"
                                        min="1"
                                        max="4"
                                        value={quarter}
                                        placeholder="Năm từ 2023 đến 2100"
                                        onChange={(e) => setQuarter(e.target.value)}
                                    />
                                    <button
                                        className="listreport-body-option-btn"
                                        onClick={(e) => getList('quarter', 1)}
                                    >
                                        Quý 1
                                    </button>
                                    <button
                                        className="listreport-body-option-btn"
                                        onClick={(e) => getList('quarter', 2)}
                                    >
                                        Quý 2
                                    </button>
                                    <button
                                        className="listreport-body-option-btn"
                                        onClick={(e) => getList('quarter', 3)}
                                    >
                                        Quý 3
                                    </button>
                                    <button
                                        className="listreport-body-option-btn"
                                        onClick={(e) => getList('quarter', 4)}
                                    >
                                        Quý 4
                                    </button>
                                </div>
                            ) : (
                                <div className="listreport-body-option">
                                    <input
                                        type="number"
                                        min="2023"
                                        max="2100"
                                        value={year}
                                        placeholder="Năm từ 2023 đến 2100"
                                        onChange={(e) => setYear(e.target.value)}
                                    />
                                    <button
                                        className="listreport-body-option-btn"
                                        onClick={(e) => getList('year', year)}
                                    >
                                        Tìm kiếm
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="title-table">{currentTableReport[showInfo].title}</div>
                        <table className="list">
                            <tbody>
                                <tr>
                                    {currentTableReport[showInfo].fields.map((field, index) => {
                                        return <th id={index}>{field}</th>;
                                    })}
                                </tr>
                                {showInfo === 'revenue' ? (
                                    <tr>
                                        <td>{countRevenue} đơn hàng</td>
                                        <td>
                                            {Intl.NumberFormat('de-DE', {
                                                style: 'currency',
                                                currency: 'VND',
                                            }).format(totalRevenue)}
                                        </td>
                                    </tr>
                                ) : showInfo === 'products' ? (
                                    <>
                                        {listProducts?.map((product) => {
                                            return (
                                                <tr key={product._id}>
                                                    <td>{product.name}</td>
                                                    <td>
                                                        <img src={product.product.avatar} alt="" />
                                                    </td>
                                                    <td>{product.product.description}</td>
                                                    <td>
                                                        {Intl.NumberFormat('de-DE', {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        }).format(product.product.price)}
                                                    </td>
                                                    <td>
                                                        {Intl.NumberFormat('de-DE', {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        }).format(product.product.cost)}
                                                    </td>
                                                    <td>{product.product.number}</td>
                                                    <td>{reFormatDate(product.createdAt)}</td>
                                                </tr>
                                            );
                                        })}{' '}
                                    </>
                                ) : showInfo === 'invoices' ? (
                                    <>
                                        {listOrders?.map((listOrder) => {
                                            return (
                                                <tr key={listOrder._id}>
                                                    <td>{listOrder._id}</td>
                                                    <td>{listOrder.user.fullname}</td>
                                                    <td>
                                                        {Intl.NumberFormat('de-DE', {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        }).format(listOrder.total)}
                                                    </td>
                                                    <td>{reFormatDate(listOrder.dateCreate)}</td>
                                                    <td>{reFormatDate(listOrder.dateEnd)}</td>
                                                    <td>{listOrder.paymentMethods}</td>
                                                    <td>{listOrder.user.phone}</td>
                                                </tr>
                                            );
                                        })}{' '}
                                    </>
                                ) : (
                                    <>
                                        {listUser?.map((user) => {
                                            return (
                                                <tr key={user._id}>
                                                    <td>{user.fullname}</td>
                                                    <td>{user.phone}</td>
                                                    <td>{user.address}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.username}</td>
                                                    <td>{reFormatDate(user.createdAt)}</td>
                                                </tr>
                                            );
                                        })}{' '}
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
}

export default ListReports;
