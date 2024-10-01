import './Home.scss';
import { Link, useNavigate } from 'react-router-dom';
import Admin from '../../Admin/Admin';
import Sidebar from '../../Sidebar/Sidebar';
import Loading from '../../../_common/Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';

// Import files slider
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import popup from '../../../assets/imgs/buy2pay1.png';
import slide1 from '../../../assets/imgs/banner1.jpg';
import slide2 from '../../../assets/imgs/banner3.jpg';
import slide3 from '../../../assets/imgs/banner5.jpg';
import slide4 from '../../../assets/imgs/banner6.jpg';
import slide5 from '../../../assets/imgs/banner2.jpg';
import slide6 from '../../../assets/imgs/banner4.jpg';
import { getAllCarts, getAllProducts, sendCurrentProduct } from '../../../redux/apiRequest';
import { useEffect, useState } from 'react';
import { createAxios } from '../../../createInstance';
import { loginSuccess } from '../../../redux/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

let productArr = [
    {
        id: 1,
        name: 'Happy Baby',
        list: [],
    },
    {
        id: 2,
        name: 'Bean Stalk',
        list: [],
    },
    {
        id: 3,
        name: 'Hipp',
        list: [],
    },
    {
        id: 4,
        name: 'Vinamilk',
        list: [],
    },
    {
        id: 5,
        name: 'Ceralac',
        list: [],
    },
    {
        id: 6,
        name: 'Pigeon',
        list: [],
    },
];

function Home() {
    const user = useSelector((state) => state.auth.login.currentUser);
    const listProduct = useSelector((state) => state.users.users.allProducts);
    const loading = useSelector((state) => state.users.users?.isLoading);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const axiosJWT = createAxios(user, dispatch, loginSuccess);

    const [currentList, setCurrentList] = useState('All');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                await getAllCarts(dispatch, axiosJWT, user.accesstoken);
            }

            // Lấy tất cả sản phẩm
            await getAllProducts(dispatch);
            // Xử lý dữ liệu
            for (let i = 0; i < productArr.length; i++) {
                for (let j = 0; j < listProduct?.length; j++) {
                    if (productArr[i].name === listProduct[j].name) {
                        const id = listProduct[j]._id;
                        productArr[i].list.push({ ...listProduct[j].product, id });
                    }
                }

                // Kiểm tra xem đã xử lý xong tất cả dữ liệu chưa
                if (loading) {
                    window.location.reload();
                } else if (i === productArr.length - 1) {
                    setIsLoading(false);
                }
            }
        };

        fetchData();
    }, []);

    //slider
    var settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
    };

    const handleShowproduct = (product, name) => {
        if (product) {
            sendCurrentProduct(dispatch, navigate, { ...product, name: name });
        }
    };

    //Đóng popup
    const handleHidePopup = () => {
        document.querySelector('.home-popup').style.display = 'none';
    };

    return isLoading ? (
        <Loading />
    ) : (
        <>
            {user?.admin ? (
                navigate('/admin')
            ) : (
                <div className="home-container">
                    <div className="home-popup">
                        <FontAwesomeIcon className="icon" icon={faXmark} onClick={handleHidePopup} />
                        <Link to="/tin-tuc">
                            <img className="popup-img" src={popup} alt="popup" />
                        </Link>
                    </div>
                    <div className="wrapper">
                        <Sidebar />
                        <div className="right">
                            {currentList === 'All' ? (
                                <section className="home-slider">
                                    <Slider {...settings}>
                                        <img className="slide" src={slide1} alt="slide1" />
                                        <img className="slide" src={slide2} alt="slide2" />
                                        <img className="slide" src={slide3} alt="slide3" />
                                        <img className="slide" src={slide4} alt="slide4" />
                                        <img className="slide" src={slide5} alt="slide5" />
                                        <img className="slide" src={slide6} alt="slide6" />
                                    </Slider>
                                </section>
                            ) : (
                                ''
                            )}
                            <div className="home-wrapper">
                                <div className="home-wrapper-title">Thương Hiệu Lớn</div>
                                <div className="home-menu">
                                    <Link
                                        className="home-menu-item"
                                        onClick={(e) => setCurrentList('Happy Baby')}
                                    ></Link>
                                    <Link
                                        className="home-menu-item"
                                        onClick={(e) => setCurrentList('Bean Stalk')}
                                    ></Link>
                                    <Link className="home-menu-item" onClick={(e) => setCurrentList('Hipp')}></Link>
                                    <Link className="home-menu-item" onClick={(e) => setCurrentList('Vinamilk')}></Link>
                                    <Link className="home-menu-item" onClick={(e) => setCurrentList('Ceralac')}></Link>
                                    <Link className="home-menu-item" onClick={(e) => setCurrentList('Pigeon')}></Link>
                                </div>

                                <div className="home-product">
                                    {productArr.map((item) => {
                                        return currentList === 'All' ? ( //hiện tất cả
                                            <div key={item.id} className="home-product-items">
                                                <h3>{item.name}</h3>
                                                <div className="home-product-items-box">
                                                    {item.list.map((list) => {
                                                        return (
                                                            <div
                                                                key={`${list.id}${Math.random(10)}`}
                                                                className="home-product-items-box-item"
                                                                onClick={(e) => handleShowproduct(list, item.name)}
                                                            >
                                                                <img src={list.avatar} alt="" />
                                                                <p>{list.description}</p>
                                                                <div className="home-product-items-box-item-price">
                                                                    <span>
                                                                        {Intl.NumberFormat('de-DE', {
                                                                            style: 'currency',
                                                                            currency: 'VND',
                                                                        }).format(list.price)}
                                                                    </span>
                                                                    <div className="home-product-items-box-item-discount">
                                                                        {list.percent}%
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ) : item.name === currentList ? ( //hiện theo danh mục
                                            <div key={item.id} className="home-product-items">
                                                <h3>{item.name}</h3>
                                                <div className="home-product-items-box">
                                                    {item.list.map((list) => {
                                                        return (
                                                            <div
                                                                key={`${list.id}${Math.random(10)}`}
                                                                className="home-product-items-box-item"
                                                                onClick={(e) => handleShowproduct(list)}
                                                            >
                                                                <div className="home-product-items-box-item-img">
                                                                    <span>{list.percent}%</span>
                                                                </div>
                                                                <img src={list.avatar} alt="" />
                                                                <p>{list.description}</p>
                                                                <div className="home-product-items-box-item-price">
                                                                    <span>
                                                                        {Intl.NumberFormat('de-DE', {
                                                                            style: 'currency',
                                                                            currency: 'VND',
                                                                        }).format(list.price)}
                                                                    </span>
                                                                    <div className="home-product-items-box-item-discount">
                                                                        {list.percent}%
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ) : (
                                            ''
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Home;
