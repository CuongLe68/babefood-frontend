import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createAxios } from '../../../createInstance';
import { createNewOrder } from '../../../redux/apiRequest';
import { loginSuccess } from '../../../redux/authSlice';
import Sidebar from '../../Sidebar/Sidebar';
import './Payment.scss';
import { checkPaid } from '../../../redux/apiPayment';
import Notification from '../../../_common/Notification/Notification';

let price = 0; // tổng tiền giả để gán cho state total
let arrCarts = []; // danh sách tất cả sản phẩm đã tick
let listCarts = []; // danh sách tất cả sản phẩm của user hiện tại
function Payment() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const carts = useSelector((state) => state.auth.login?.allCarts); //lấy tất cả sản phẩm của tất cả users
    const [total, setTotal] = useState(price); // tổng tiền của đơn hàng chưa tính phí vận chuyển
    const [paymentMethods, setPaymentMethods] = useState('offline'); //lựa chọn phương thức thanh toán
    const [code, setCode] = useState(''); //mã giao dịch khi thanh toán bằng chuyển khoản
    const [popup, setPopup] = useState({
        isShow: false,
        type: 'success',
        description: 'descriptionAddCard',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const axiosJWT = createAxios(user, dispatch, loginSuccess);

    // Đẩy sản phẩm của user vào mảng
    listCarts = [];
    for (let i = 0; i < carts?.length; i++) {
        if (user._id === carts[i].userId) {
            listCarts.push(carts[i]);
        }
    }

    // START -> test chức năng chuyển online tự động
    //Tạo mã random 6 số để tạo key cho mỗi giao dịch, tránh trường hợp họ thanh toán rồi, thanh toán lại với nội dung và tiền tương tự vẫn success
    const randomCode = () => {
        // Tạo một số ngẫu nhiên từ 0 đến 999999 (bao gồm cả 0 và 99999999)
        let randomNumber = Math.floor(Math.random() * 1000000);

        // Chuyển số thành chuỗi và thêm các số 0 vào phía trước nếu cần thiết
        let result = randomNumber.toString().padStart(6, '0');
        return result;
    };

    //convert thành không dấu, vd: Quốc Cường -> Quoc Cuong
    // function removeAccents(str) {
    //     return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    // }

    const [codeBank, setCodeBank] = useState(`${user?.phone}c${randomCode()}`);

    //Thông tin ngân hàng
    let BANK_INFO = {
        BANK_ID: 'MB', //Tên ngân hàng
        ACCOUNT_NO: '0862368128', //Số tài khoản người nhận
        TEMPLATE: 'compact',
        AMOUNT: total,
        DESCRIPTION: codeBank,
        ACCOUNT_NAME: 'PHAM THI HOAI THUONG',
    };

    //Mã qr code hiển thị
    let QR = `https://img.vietqr.io/image/${BANK_INFO.BANK_ID}-${BANK_INFO.ACCOUNT_NO}-${BANK_INFO.TEMPLATE}.png?amount=${BANK_INFO.AMOUNT}&addInfo=${BANK_INFO.DESCRIPTION}&accountName=${BANK_INFO.ACCOUNT_NAME}`;

    //Thêm/xóa sản phẩm vào danh sách thanh toán
    //ERR: khi lùi trang quay lại đang lỗi bị đảo ngược check và chưa check
    function handleAddCarts(item) {
        arrCarts.push(item);
        price += item.productTotal;
        setTotal(price);
    }

    function handleRemoveCarts(item) {
        let newArrCarts = arrCarts.filter((product) => {
            return item._id !== product._id;
        });
        arrCarts = newArrCarts;
        price -= item.productTotal;
        setTotal(price);
    }

    const handleChecked = (item) => {
        if (arrCarts.length > 0) {
            for (let i = 0; i < arrCarts.length; i++) {
                if (item._id === arrCarts[i]._id) {
                    handleRemoveCarts(item);
                    return 0;
                }
            }
            handleAddCarts(item);
        } else {
            arrCarts.push(item);
            price += item.productTotal;
            setTotal(price);
        }
    };

    //Kiểm tra phương thức thanh toán
    const handleCheckPayment = (e) => {
        setPaymentMethods(e);
        if (e === 'offline') {
            document.querySelector('.form-payment').style.display = 'none';
            document.querySelector('.options-onl').checked = false;
            document.querySelector('.options-off').setAttribute('checked', '');
        } else if (e === 'online') {
            document.querySelector('.form-payment').style.display = 'block';
            document.querySelector('.options-off').checked = false;
            document.querySelector('.options-onl').setAttribute('checked', '');
        }
    };

    //Tạo đơn hàng mới
    const crateNewOder = (payMethod) => {
        let currentDate = new Date();
        let DATE_CREATE = new Date(currentDate.getTime() + 7 * 60 * 60 * 1000);

        // Tạo một đối tượng Date từ chuỗi thời gian UTC
        let utcDate = new Date(DATE_CREATE);

        // Thêm 3 ngày (3 * 24 giờ * 60 phút * 60 giây * 1000 mili giây)
        let threeDaysInMilliseconds = 3 * 24 * 60 * 60 * 1000;

        // Tính thời gian mới sau khi thêm 3 ngày
        let DATE_END = new Date(utcDate.getTime() + threeDaysInMilliseconds);

        const newOrders = {
            user: user,
            listproduct: arrCarts,
            paymentMethods: payMethod,
            total: total,
            tradingCode: code,
            isPayment: false,
            istransported: false,
            isSuccess: false,
            dateCreate: DATE_CREATE,
            dateEnd: DATE_END,
        };

        return newOrders;
    };

    //đặt hàng
    const handleSubmit = () => {
        /* 3 giá trị tự sinh ra nữa ngoài id của giao dịch là 
            isPayment: false -> là đơn hàng chưa thanh toán (true là đơn hàng đã thanh toán)
            istransported: false -> là đơn hàng chưa được vận chuyển (true là đơn hàng đã được vận chuyển)
            isSuccess: false -> là đơn hàng bị hủy (true là đơn hàng đã giao thành công)
        */
        if (arrCarts.length === 0) {
            setPopup({
                isShow: true,
                type: 'warning',
                description: 'descriptionPaymentChoseProduct',
            });
            setTimeout(() => {
                setPopup((prevPopup) => ({
                    ...prevPopup,
                    isShow: false,
                }));
            }, 3000);
        } else {
            let newOrders = crateNewOder('offline'); //Tạo order mới
            if (paymentMethods === 'offline') {
                createNewOrder(dispatch, newOrders, axiosJWT);
                setPopup({
                    isShow: true,
                    type: 'success',
                    description: 'descriptionPayment',
                });
                setTimeout(() => {
                    navigate('/tai-khoan/don-hang');
                }, 3000);
            } else {
                //Thanh toán online realtime nên tạm thời ẩn đi, hết api free thì xài lại
                // if (code === '') {
                //     alert('Không được để trống mã giao dịch');
                // } else {
                //     createNewOrder(dispatch, navigate, newOrders, axiosJWT);
                // }
            }
        }
    };

    //set checked đã check khi bắt đầu
    useEffect(() => {
        if (!user) {
            navigate('/dang-nhap');
        } else if (arrCarts.length !== 0) {
            const checks = document.querySelectorAll('.col-60>input');
            for (let i = 0; i < arrCarts?.length; i++) {
                for (let j = 0; j < listCarts.length; j++) {
                    if (arrCarts[i]._id === listCarts[j]._id) checks[j].setAttribute('checked', '');
                }
            }
        } else if (user) {
            //vào component thì call api thanh toán, Remove khỏi hàm thì clear interval đi
            let shouldCallCreateNewOrder = true; //cho phép gọi hàm createNewOrder
            const intervalID = setInterval(() => {
                checkPaid()
                    .then((data) => {
                        for (let i = 0; i <= 1; i++) {
                            //Thanh toán online
                            if (data[i]['Mô tả'].includes(BANK_INFO.DESCRIPTION) && data[i]['Giá trị'] >= total) {
                                if (shouldCallCreateNewOrder) {
                                    const newOrders = crateNewOder('online');
                                    createNewOrder(dispatch, navigate, newOrders, axiosJWT);
                                    shouldCallCreateNewOrder = false; // Đánh dấu là không cần gọi createNewOrder nữa
                                    setPopup({
                                        isShow: true,
                                        type: 'success',
                                        description: 'descriptionPayment',
                                    });
                                    setTimeout(() => {
                                        navigate('/tai-khoan/don-hang');
                                    }, 4000);
                                }
                            }
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }, 1000);

            // Xóa interval khi component bị unmount
            return () => {
                clearInterval(intervalID);
                shouldCallCreateNewOrder = false;
            };
        }
    }, []);

    return (
        <div className="payment-container">
            <div className="payment-show-sidebar">
                <Sidebar />
            </div>
            <Notification isShow={popup.isShow} type={popup.type} description={popup.description} />
            <div className="payment-wrapper">
                <div className="adress">
                    <div className="title">
                        <FontAwesomeIcon icon={faLocationDot} />
                        Địa Chỉ Nhận Hàng
                    </div>
                    <div className="info info-desktop">
                        <h3>{user?.fullname} -</h3>
                        <h3 style={{ paddingLeft: '1rem' }}>{user?.phone}</h3>
                        <p>{user?.address}</p>
                        <span>Mặc định</span>
                        <Link to="/tai-khoan/tai-khoan-cua-toi">Chỉnh sửa</Link>
                    </div>
                    <div className="info info-mobile">
                        <div className="info-mobile-row">
                            <h3>{user?.fullname} -</h3>
                            <h3 style={{ paddingLeft: '1rem' }}>{user?.phone}</h3>
                        </div>
                        <div className="info-mobile-row">
                            <p>{user?.address}</p>
                            <span>Mặc định</span>
                            <Link to="/tai-khoan/tai-khoan-cua-toi">Chỉnh sửa</Link>
                        </div>
                    </div>
                </div>
                <div className="product">
                    <div className="title">
                        <p>Thông tin giỏ hàng</p>
                    </div>
                    <div className="wrapper wrapper-desktop">
                        <div className="item">
                            <h3 className="col-60">Sản phẩm</h3>
                            <h3 className="col-10">Đơn giá</h3>
                            <h3 className="col-10">Số lượng</h3>
                            <h3 className="col-20">Thành tiền</h3>
                        </div>
                        {!listCarts || listCarts?.lenght === 0
                            ? ''
                            : listCarts.map((item) => {
                                  return (
                                      <div className="item" key={item._id}>
                                          <div className="col-60">
                                              <input type="checkbox" onChange={(e) => handleChecked(item)} />
                                              <div className="avatar">
                                                  <img src={item.avatar} alt="" />
                                              </div>
                                              <p>{item.description}</p>
                                          </div>
                                          <div className="col-10">
                                              <span>
                                                  {Intl.NumberFormat('de-DE', {
                                                      style: 'currency',
                                                      currency: 'VND',
                                                  }).format(item.price)}
                                              </span>
                                          </div>
                                          <div className="col-10">
                                              <span>{item.count}</span>
                                          </div>
                                          <div className="col-20">
                                              <span>
                                                  {Intl.NumberFormat('de-DE', {
                                                      style: 'currency',
                                                      currency: 'VND',
                                                  }).format(item.productTotal)}
                                              </span>
                                          </div>
                                      </div>
                                  );
                              })}
                        <div className="total">
                            Tổng số tiền :
                            <p>
                                {Intl.NumberFormat('de-DE', {
                                    style: 'currency',
                                    currency: 'VND',
                                }).format(total)}
                            </p>
                        </div>
                    </div>
                    <div className="wrapper wrapper-mobile">
                        {!listCarts || listCarts?.lenght === 0
                            ? ''
                            : listCarts.map((item) => {
                                  return (
                                      <div className="item" key={item._id}>
                                          <div className="col-60">
                                              <input type="checkbox" onChange={(e) => handleChecked(item)} />
                                              <div className="avatar">
                                                  <img src={item.avatar} alt="" />
                                              </div>
                                              <div className="right">
                                                  <p>{item.description}</p>
                                                  <p>
                                                      Đơn giá:
                                                      <span>
                                                          {Intl.NumberFormat('de-DE', {
                                                              style: 'currency',
                                                              currency: 'VND',
                                                          }).format(item.price)}
                                                      </span>
                                                  </p>
                                                  <p>
                                                      Số lượng: <span>{item.count}</span>
                                                  </p>
                                                  <p>
                                                      Thành tiền:{' '}
                                                      <span>
                                                          {Intl.NumberFormat('de-DE', {
                                                              style: 'currency',
                                                              currency: 'VND',
                                                          }).format(item.productTotal)}
                                                      </span>
                                                  </p>
                                              </div>
                                          </div>
                                      </div>
                                  );
                              })}
                        <div className="total">
                            Tổng số tiền :
                            <p>
                                {Intl.NumberFormat('de-DE', {
                                    style: 'currency',
                                    currency: 'VND',
                                }).format(total)}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="payment">
                    <div className="title">
                        <p>Phương thức thanh toán</p>
                        <div className="options">
                            <div className="item">
                                <input
                                    className="options-off"
                                    type="radio"
                                    defaultChecked
                                    onChange={(e) => handleCheckPayment('offline')}
                                />
                                Thanh toán khi nhận hàng
                            </div>
                            <div className="item">
                                <input
                                    className="options-onl"
                                    type="radio"
                                    onChange={(e) => handleCheckPayment('online')}
                                />
                                Thanh toán online
                            </div>
                            <div className="form-payment">
                                {/* <span>
                                    * Vui lòng nhập đầy đủ thông tin khi tiến hành thanh toán, sau đó nhập mã giao dịch
                                    vào ô Mã giao dịch và tiến hành đặt hàng
                                </span>
                                <div className="form-payment-des">
                                    <h3>Số tài khoản</h3>
                                    <p>: 09876543210</p>
                                </div>
                                <div className="form-payment-des">
                                    <h3>Ngân Hàng</h3>
                                    <p>: Vietcombank</p>
                                </div>
                                <div className="form-payment-des">
                                    <h3>Chủ thẻ</h3>
                                    <p>: Nguyễn Văn A</p>
                                </div>
                                <div className="form-payment-des">
                                    <h3>Số tiền</h3>
                                    <p>
                                        {`: ` +
                                            Intl.NumberFormat('de-DE', {
                                                style: 'currency',
                                                currency: 'VND',
                                            }).format(total)}
                                    </p>
                                </div>
                                <div className="form-payment-des">
                                    <h3>Nội dung</h3>
                                    <p>
                                        : hoten_sodienthoai_muahang
                                        <span>*vd: lequoccuong_0987235674_muahang</span>
                                    </p>
                                </div>
                                <div className="form-payment-code">
                                    <span>Mã giao dịch</span>
                                    <input
                                        type="text"
                                        placeholder="Nhập mã giao dịch"
                                        maxLength={40}
                                        onChange={(e) => setCode(e.target.value)}
                                    />
                                </div> */}

                                {/* test chức năng chuyển online tự động */}
                                {arrCarts.length === 0 ? (
                                    <div className="form-payment-title">Vui lòng chọn sản phẩm</div>
                                ) : (
                                    <div className="form-payment-wrapper">
                                        <div className="form-payment-wrapper-img">
                                            <img src={QR} alt="" />
                                        </div>
                                        <div className="form-payment-info">
                                            <div className="form-payment-info-desc">
                                                *Miễn phí vận chuyển khi thanh toán online, vui lòng kiểm tra lại thông
                                                tin đơn hàng
                                            </div>
                                            <div className="form-payment-info-item">
                                                Nội dung chuyển khoản: {BANK_INFO.DESCRIPTION}
                                            </div>
                                            <div className="form-payment-info-item">
                                                Số tiền:{' '}
                                                {Intl.NumberFormat('de-DE', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }).format(BANK_INFO.AMOUNT)}
                                            </div>
                                            <div className="form-payment-info-item">
                                                Số tài khoản: {BANK_INFO.ACCOUNT_NO}
                                            </div>
                                            <div className="form-payment-info-item">
                                                Chủ tài khoản: {BANK_INFO.ACCOUNT_NAME}
                                            </div>
                                            <div className="form-payment-info-item">Ngân hàng: {BANK_INFO.BANK_ID}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        {paymentMethods === 'offline' ? (
                            <div className="confirm">
                                <div className="confirm-description">
                                    <div className="confirm-item">
                                        <p>Tổng tiền hàng</p>
                                        <span>
                                            {Intl.NumberFormat('de-DE', {
                                                style: 'currency',
                                                currency: 'VND',
                                            }).format(total)}
                                        </span>
                                    </div>
                                    <div className="confirm-item">
                                        <p>Phí vận chuyển</p>
                                        <span>30.000 đ</span>
                                    </div>
                                    <div className="confirm-item">
                                        <p>Tổng thanh toán</p>
                                        <span>
                                            {Intl.NumberFormat('de-DE', {
                                                style: 'currency',
                                                currency: 'VND',
                                            }).format(total + 30000)}
                                        </span>
                                    </div>
                                    <div className="cofirm-btn">
                                        <button onClick={(e) => handleSubmit()}>Đặt hàng</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;
