import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendCurrentProduct } from '../../../redux/apiRequest';
import Footer from '../../Footer/Footer';
import NavBar from '../../NavBar/NavBar';
import './Search.scss';

let productArr = [
    {
        id: 1,
        name: 'Dell',
        list: [],
    },
    {
        id: 2,
        name: 'Asus',
        list: [],
    },
    {
        id: 3,
        name: 'Macbook',
        list: [],
    },
    {
        id: 4,
        name: 'HP',
        list: [],
    },
    {
        id: 5,
        name: 'Acer',
        list: [],
    },
    {
        id: 6,
        name: 'Lenovo',
        list: [],
    },
    {
        id: 7,
        name: 'Msi',
        list: [],
    },
];

function Search() {
    const getProduct = useSelector((state) => state.users.users?.searchResults);
    const listProduct = getProduct.listProduct;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    for (let i = 0; i < productArr.length; i++) {
        for (let j = 0; j < listProduct.length; j++) {
            if (productArr[i].name === listProduct[j].name) {
                const id = listProduct[j]._id;
                productArr[i].list.push({ ...listProduct[j].product, id });
            }
        }
    }

    const handleShowproduct = (product) => {
        if (product) {
            sendCurrentProduct(dispatch, navigate, product);
        }
    };

    return (
        <div className="search-container">
            <NavBar />
            <div className="search-wrapper">
                <div className="search-product">
                    <h3>
                        {listProduct.length !== 0
                            ? `Tìm thấy được ${listProduct.length} kết quả cho "${getProduct.valueInput}"`
                            : 'Bạn chưa nhập dữ liệu tìm kiếm'}
                    </h3>
                    {productArr.map((item) => {
                        return (
                            <div key={item.id} className="search-product-items-box">
                                {item.list.map((list) => {
                                    return (
                                        <div
                                            key={`${list.id}${Math.random(10)}`}
                                            className="search-product-items-box-item"
                                            onClick={(e) => handleShowproduct(list)}
                                        >
                                            <div className="search-product-items-box-item-img">
                                                <span>{list.percent}%</span>
                                            </div>
                                            <img src={list.avatar} alt="" />
                                            <p>{list.description}</p>
                                            <span>
                                                {Intl.NumberFormat('de-DE', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }).format(list.price)}
                                            </span>
                                            <span className="search-product-items-box-item-discount">
                                                {Intl.NumberFormat('de-DE', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }).format(list.cost)}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Search;
