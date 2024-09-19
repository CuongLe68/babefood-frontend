import { faChevronRight, faMinus, faPaperPlane, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Sidebar from '../../Sidebar/Sidebar';
import Notification from '../../../_common/Notification/Notification';
import './Product.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, createComment, getAllComment } from '../../../redux/apiRequest';
import { createAxios } from '../../../createInstance';
import { loginSuccess } from '../../../redux/authSlice';
import moment from 'moment';

import starsWhite from '../../../assets/imgs/stars-white.png';
import starsOrange from '../../../assets/imgs/stars-orange.png';
import userLogo from '../../../assets/imgs/userlogo.png';

function Product() {
    const user = useSelector((state) => state.auth.login.currentUser);
    const currentProduct = useSelector((state) => state.users.users.currentProduct);
    const comments = useSelector((state) => state.users.users?.allComments);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const axiosJWT = createAxios(user, dispatch, loginSuccess);

    const [count, setCount] = useState(1);
    const [rating, setRating] = useState();
    const [currentConmment, setCurrentConmment] = useState('');
    const [listComments, setListComments] = useState();
    const [popup, setPopup] = useState({
        isShow: false,
        type: 'success',
        description: 'descriptionAddCart',
    });

    useEffect(() => {
        getAllComment(dispatch);
        setListComments(getCurrentListComment(comments));
        // eslint-disable-next-line
    }, []);

    function getCurrentListComment(list) {
        let currentListProduct = [];
        for (let i = 0; i < list?.length; i++) {
            if (currentProduct.id === list[i].currentProduct.id) {
                currentListProduct.push(list[i]);
            }
        }
        return currentListProduct;
    }

    //tạo object để lưu số sao và trung bình cộng
    const totalRating = {
        average: arrangeRating(6),
        star5: arrangeRating(5),
        star4: arrangeRating(4),
        star3: arrangeRating(3),
        star2: arrangeRating(2),
        star1: arrangeRating(1),
    };

    //Xử lí đếm số sao và tính trung bình cộng
    function arrangeRating(star) {
        let total = 0; //Tỉnh tổng số sao
        let count = 0; //Đếm số lượng

        if (star === 6) {
            for (let i = 0; i < listComments?.length; i++) {
                total += listComments[i].rating;
                count++;
            }

            if (count === 0) {
                return 0;
            } else {
                return Math.round(total / count);
            }
        } else if (star === 5) {
            for (let i = 0; i < listComments?.length; i++) {
                if (listComments[i].rating === 5) {
                    count++;
                }
            }
        } else if (star === 4) {
            for (let i = 0; i < listComments?.length; i++) {
                if (listComments[i].rating === 4) {
                    count++;
                }
            }
        } else if (star === 3) {
            for (let i = 0; i < listComments?.length; i++) {
                if (listComments[i].rating === 3) {
                    count++;
                }
            }
        } else if (star === 2) {
            for (let i = 0; i < listComments?.length; i++) {
                if (listComments[i].rating === 2) {
                    count++;
                }
            }
        } else if (star === 1) {
            for (let i = 0; i < listComments?.length; i++) {
                if (listComments[i].rating === 1) {
                    count++;
                }
            }
        }

        return count;
    }

    //Xử lí chọn số lượng sản phẩm thêm vào giỏ hàng
    const handleInputNumber = (e) => {
        if (Number(e) < 1) {
            alert('Số lượng sản phẩm đặt phải lớn hơn 1');
            setCount(1);
            e.preventDefault();
        } else if (Number(e) > currentProduct.number) {
            alert(`Số lượng sản phẩm đặt phải nhỏ hơn ${currentProduct.number}`);
            setCount(currentProduct.number);
            e.preventDefault();
        }
        setCount(Number(e));
    };

    //Xử lí thông báo lỗi khi nhập số lượng sản phẩm không hợp lệ
    const handleCount = (value) => {
        let newcount;
        if (value === '+') {
            if (count < currentProduct.number) {
                newcount = count + 1;
                setCount(newcount);
            } else {
                alert(`Số lượng sản phẩm còn lại trong kho không đủ để thực hiện giao dịch`);
            }
        } else if (value === '-') {
            if (count > 1) {
                newcount = count - 1;
                setCount(newcount);
            } else {
                alert('Số lượng sản phẩm đặt phải lớn hơn 1');
            }
        }
    };

    //Xử lí thêm sản phẩm vào giỏ hàng
    const handleAddcart = (e, type) => {
        if (!user) {
            navigate('/dang-nhap');
        } else {
            const newProduct = {
                productId: currentProduct.id,
                userId: user._id,
                description: currentProduct.description,
                avatar: currentProduct.avatar,
                price: currentProduct.price,
                count: count,
                productTotal: count * currentProduct.price,
            };

            if (count < 0 || count > currentProduct.number) {
                alert('Số lượng sản phẩm không hợp lệ');
            } else {
                addToCart(dispatch, newProduct, axiosJWT, type);

                //Hiển thị thông báo vầ chuyển route
                if (type === '/gio-hang/thanh-toan') {
                    navigate(`${type}`);
                } else if (type === '/gio-hang') {
                    setPopup({
                        isShow: true,
                        type: 'success',
                        description: 'descriptionAddCart',
                    });
                    setTimeout(() => {
                        setPopup((prevPopup) => ({
                            ...prevPopup,
                            isShow: false,
                        }));
                    }, 3000);
                }
            }
        }
    };

    // reFormatdate YYYY-MM-DD
    function reFormatDate(date) {
        const formattedDate = moment(date).format('YYYY-MM-DD');

        return formattedDate;
    }

    //Lưu comment
    const handleRating = (e) => {
        e.preventDefault();
        if (!user) {
            setPopup({
                isShow: true,
                type: 'warning',
                description: 'descriptionComment',
            });
            setTimeout(() => {
                navigate('/dang-nhap');
            }, 2000);
        } else if (!rating) {
            setPopup({
                isShow: true,
                type: 'warning',
                description: 'descriptionCommentRate',
            });
            setTimeout(() => {
                setPopup((prevPopup) => ({
                    ...prevPopup,
                    isShow: false,
                }));
            }, 3000);
        } else if (currentConmment === '') {
            setPopup({
                isShow: true,
                type: 'warning',
                description: 'descriptionCommentText',
            });
            setTimeout(() => {
                setPopup((prevPopup) => ({
                    ...prevPopup,
                    isShow: false,
                }));
            }, 3000);
        } else {
            const dateComment = new Date();

            const newComment = {
                user: user,
                rating: rating,
                comment: currentConmment,
                reComment: '',
                dateComment: dateComment,
                dateReComment: '',
                currentProduct: currentProduct,
            };

            //call api tạo bình luận mới
            createComment(newComment, axiosJWT, dispatch);

            //set lại danh sách bình luận
            setListComments((prevComments) => [...prevComments, newComment]);
            setRating();
            setCurrentConmment('');
        }
    };

    return (
        <>
            <div className="product-show-sidebar">
                <Sidebar />
            </div>
            <Notification isShow={popup.isShow} type={popup.type} description={popup.description} />
            <div className="product-container">
                <div className="product-header">
                    <p>
                        Trang chủ <FontAwesomeIcon icon={faChevronRight} /> Sản phẩm
                    </p>
                </div>
                <div className="product-body">
                    <div className="product-right">
                        <div className="product-right-item">
                            <img src={currentProduct.avatar} alt="" />
                        </div>
                        <div className="product-right-description">
                            <div className="product-right-description-title">
                                <p>{currentProduct.description}</p>
                                <div className="product-right-description-title-price">
                                    <span>
                                        {Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(
                                            currentProduct.cost,
                                        )}
                                    </span>
                                    <span>
                                        {Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(
                                            currentProduct.price,
                                        )}
                                    </span>
                                    <div className="product-right-description-title-price-percent">
                                        {currentProduct.percent}%
                                    </div>
                                </div>
                            </div>

                            <div className="product-right-description-payment">
                                <div className="product-right-description-payment-box">
                                    <p>Số lượng</p>
                                    <div className="product-right-description-payment-box-add">
                                        <FontAwesomeIcon icon={faMinus} onClick={(e) => handleCount('-')} />
                                        <input
                                            className="input-value"
                                            type="number"
                                            value={count}
                                            onChange={(e) => handleInputNumber(e.target.value)}
                                        />
                                        <FontAwesomeIcon icon={faPlus} onClick={(e) => handleCount('+')} />
                                    </div>
                                </div>
                                <span>Còn lại: {currentProduct.number} sản phẩm</span>
                                <div className="product-right-description-payment-box-btns">
                                    <button
                                        className="product-right-description-payment-box-btn"
                                        onClick={(e) => handleAddcart(e, '/gio-hang')}
                                    >
                                        Thêm Vào Giỏ Hàng
                                    </button>
                                    <button
                                        className="product-right-description-payment-box-btn"
                                        onClick={(e) => handleAddcart(e, '/gio-hang/thanh-toan')}
                                    >
                                        Mua Ngay
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <table className="product-right-detail">
                        <tbody>
                            <tr className="product-right-detail-title">
                                <th>Chi tiết sản phẩm</th>
                            </tr>
                            <tr>
                                <th>Tên sản phẩm</th>
                                <td>{currentProduct.description}</td>
                            </tr>
                            <tr>
                                <th>Thương hiệu</th>
                                <td>{currentProduct.name}</td>
                            </tr>
                            <tr>
                                <th>Xuất xứ thương hiệu</th>
                                <td>{currentProduct.brandOrigin}</td>
                            </tr>
                            <tr>
                                <th>Sản xuất tại</th>
                                <td>{currentProduct.madeIn}</td>
                            </tr>
                            <tr>
                                <th>Nhà máy sản xuất</th>
                                <td>{currentProduct.producer}</td>
                            </tr>
                            <tr>
                                <th>Trọng lượng sản phẩm</th>
                                <td>{currentProduct.weight}</td>
                            </tr>
                            <tr>
                                <th>Thành phần</th>
                                <td>
                                    Nước xương hầm, Gạo tấm (10%), Thịt gà ác (7%), Đậu xanh (2%), Thực phẩm bổ sung dầu
                                    ăn dinh dưỡng cho trẻ em nhãn hiệu Kiddy, Muối tinh, Đường tinh luyện, Calcium
                                    carbonate, Vitamin B1 (Thiaminchloride hydrochloride), Vitamin B6 (Pyridoxine
                                    hydrochloride).
                                </td>
                            </tr>
                            <tr>
                                <th>Ưu điểm nổi bật</th>
                                <td>
                                    - 100% nguyên liệu tự nhiên; <br />
                                    - Bổ sung Canxi, DHA, OMEGA 3, Vitamin B1 và B6;
                                    <br />
                                    - Cháo chín sẵn - Mở gói ăn ngay.; <br />- Bao bì nhôm phức hợp 4 lớp, tiêu chuẩn
                                    Nhật Bản.
                                </td>
                            </tr>
                            <tr>
                                <th>Công dụng</th>
                                <td>
                                    - Gà ác rất tốt cho trẻ em vì nhiều chất dinh dưỡng, là món ăn tốt cho người biếng
                                    ăn, còi xương, suy dinh dưỡng. Đặc biệt, thịt gà ác là loại thịt không gây phong
                                    ngứa như các loại gà khác, lại có khả năng giúp mau lành xương. Thịt gà ác ít lipid,
                                    rất giàu protein, có khoảng 18 loại acid amin, nhiều vitamin như A, B1, B2, B6, N12,
                                    E, PP… và các nguyên tố vi lượng như K, Na, Ca, Fe, Mg, Mn, Cu…; <br />
                                    - Đậu xanh có nhiều chất chống oxy hoá và dưỡng chất thiết yếu cho cơ thể: chất xơ,
                                    protein, axit béo omega-3, các vitamin E, vitamin nhóm B, C, tiền vitamin K, acid
                                    folic và các khoáng chất Ca, Mg, K, Na, Zn, sắt, flavonoid và carotenoid;
                                    <br />- Món ăn này mang đến quý khách hương vị đậm đà làm tăng vị giác, giúp dễ dàng
                                    tiêu hóa và bổ sung dinh dưỡng nhiều hơn cho cơ thể.
                                </td>
                            </tr>
                            <tr>
                                <th>Hướng dẫn sử dụng</th>
                                <td>{currentProduct.userManual}</td>
                            </tr>
                            <tr>
                                <th>Hướng dẫn bảo quản</th>
                                <td>{currentProduct.storageInstructions}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="product-comment">
                    <h1 className="title">ĐÁNH GIÁ SẢN PHẨM</h1>
                    <div className="wrapper">
                        <div className="left">
                            <h2 className="total-start">
                                <span className="total-rating">{totalRating.average}</span> / 5
                            </h2>
                            <div class="rating">
                                <img className="rating-white" src={starsWhite} alt="" />
                                <img
                                    className="rating-orange"
                                    src={starsOrange}
                                    style={{ objectPosition: `-${(5 - totalRating.average) * 2.4}rem` }}
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="right">
                            <div class="rating">
                                <div className="stars">
                                    <img className="rating-white" src={starsWhite} alt="" />
                                    <img className="rating-orange" src={starsOrange} alt="" />
                                </div>
                                <span>({totalRating.star5})</span>
                            </div>
                            <div class="rating">
                                <div className="stars">
                                    <img className="rating-white" src={starsWhite} alt="" />
                                    <img className="rating-orange" src={starsOrange} alt="" />
                                </div>
                                <span>({totalRating.star4})</span>
                            </div>
                            <div class="rating">
                                <div className="stars">
                                    <img className="rating-white" src={starsWhite} alt="" />
                                    <img className="rating-orange" src={starsOrange} alt="" />
                                </div>
                                <span>({totalRating.star3})</span>
                            </div>
                            <div class="rating">
                                <div className="stars">
                                    <img className="rating-white" src={starsWhite} alt="" />
                                    <img className="rating-orange" src={starsOrange} alt="" />
                                </div>
                                <span>({totalRating.star2})</span>
                            </div>
                            <div class="rating">
                                <div className="stars">
                                    <img className="rating-white" src={starsWhite} alt="" />
                                    <img className="rating-orange" src={starsOrange} alt="" />
                                </div>
                                <span>({totalRating.star1})</span>
                            </div>
                        </div>
                    </div>
                    <div className="list-comment">
                        {listComments?.map((comment) => {
                            return (
                                <div className="comment" key={comment.user._id}>
                                    <img className="logo" src={userLogo} alt="" />
                                    <div className="value">
                                        <div className="content">{comment.user.fullname}</div>
                                        <div className="stars">
                                            <img className="rating-white" src={starsWhite} alt="" />
                                            <img
                                                className="rating-orange"
                                                src={starsOrange}
                                                style={{ objectPosition: `-${(5 - comment.rating) * 1.5}rem` }}
                                                alt=""
                                            />
                                        </div>
                                        <div className="time">{reFormatDate(comment.dateComment)}</div>
                                        <div className="content">{comment.comment}</div>
                                        {comment.reComment ? (
                                            <div className="admin-comment">
                                                <h3>Phản hồi của Admin</h3>
                                                <span>{reFormatDate(comment.dateReComment)}</span>
                                                <p>{comment.reComment}</p>
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="enter-comment">
                        <img className="logo-user" src={userLogo} alt="" />
                        <div className="content">
                            <div class="rating">
                                <input type="radio" id={5} name="rating" value="5" checked={rating === 5} />
                                <label onClick={(e) => setRating(5)}>★</label>
                                <input type="radio" id={4} name="rating" value="4" checked={rating === 4} />
                                <label onClick={(e) => setRating(4)}>★</label>
                                <input type="radio" id={3} name="rating" value="3" checked={rating === 3} />
                                <label onClick={(e) => setRating(3)}>★</label>
                                <input type="radio" id={2} name="rating" value="2" checked={rating === 2} />
                                <label onClick={(e) => setRating(2)}>★</label>
                                <input type="radio" id={1} name="rating" value="1" checked={rating === 1} />
                                <label onClick={(e) => setRating(1)}>★</label>
                                <label
                                    style={{
                                        fontSize: '1.6rem',
                                        color: '#666',
                                        paddingRight: '1rem',
                                        cursor: 'default',
                                    }}
                                >
                                    :Đánh giá{' '}
                                </label>
                            </div>
                            <form onSubmit={handleRating} className="text-comment">
                                <input
                                    type="text"
                                    maxLength={150}
                                    value={currentConmment}
                                    placeholder="Nhập nội dung bình luận"
                                    onChange={(e) => setCurrentConmment(e.target.value)}
                                />
                                <FontAwesomeIcon icon={faPaperPlane} onClick={(e) => handleRating(e)} />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Product;
