import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Admin from '../../Admin/Admin';
import './ListProducts.scss';
import { createProduct, deleteProduct, getAllProducts, updateProduct } from '../../../redux/apiRequest';
import { createAxios } from '../../../createInstance';
import { loginSuccess } from '../../../redux/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function ListProducts() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.login?.currentUser);
    //Lấy tất cả người dùng
    const listProduct = useSelector((state) => state.users.users?.allProducts);
    console.log(listProduct);
    //refresh token
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    //Hiện form chỉnh sửa
    const [newName, setNewName] = useState('');
    const [newAvatar, setNewAvatar] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newNumber, setNewNumber] = useState(0);
    const [newPrice, setNewPrice] = useState(0);
    const [newCost, setNewCost] = useState(0);
    const [newPercent, setNewPercent] = useState(0);
    const [newWeight, setNewWeight] = useState('');

    const [newBrandOrigin, setBrandOrigin] = useState('');
    const [newMadeIn, setNewMadeIn] = useState('');
    const [newProducer, setNewProducer] = useState('');
    const [newAppropriateAge, setNewAppropriateAge] = useState('');
    const [newUserManual, setNewUserManual] = useState('');
    const [newStorageInstructions, setNewStorageInstructions] = useState('');

    const [currentId, setCurrentId] = useState('');
    const [currentBtn, setCurrentBtn] = useState('');
    const [currentTitle, setCurrentTitle] = useState('');
    const handleShowEdit = (product) => {
        setNewName(product.name);
        setNewAvatar(product.product.avatar);
        setNewDescription(product.product.description);
        setNewNumber(product.product.number);
        setNewPrice(product.product.price);
        setNewCost(product.product.cost);
        setNewPercent(product.product.percent);
        setBrandOrigin(product.product.brandOrigin);
        setNewMadeIn(product.product.madeIn);
        setNewProducer(product.product.producer);
        setNewAppropriateAge(product.product.appropriateAge);
        setNewUserManual(product.product.userManual);
        setNewStorageInstructions(product.product.storageInstructions);
        setNewWeight(product.product.weight);
        setCurrentId(product._id);

        setCurrentBtn('Lưu');
        setCurrentTitle('Chỉnh sửa thông tin');
        document.querySelector('.listproduct-box').style.display = 'flex';
    };

    //đóng form chỉnh sửa
    const handleClearEdit = () => {
        document.querySelector('.listproduct-box').style.display = 'none';
    };

    //delete product
    const handleDelete = (id) => {
        deleteProduct(user.accessToken, dispatch, id, axiosJWT);
    };

    //show create product
    const handleShowProduct = () => {
        setNewName('');
        setNewAvatar('');
        setNewDescription('');
        setNewNumber(0);
        setNewPrice(0);
        setNewCost(0);
        setNewPercent(0);
        setBrandOrigin('');
        setNewMadeIn('');
        setNewProducer('');
        setNewAppropriateAge('');
        setNewUserManual('');
        setNewStorageInstructions('');
        setNewWeight('');
        setCurrentId('');

        setCurrentBtn('Thêm');
        setCurrentTitle('Thêm mới');
        document.querySelector('.listproduct-box').style.display = 'flex';
    };

    const handleProduct = (value) => {
        const newProduct = {
            name: newName,
            product: {
                description: newDescription,
                avatar: newAvatar,
                number: newNumber,
                price: newPrice,
                cost: newCost,
                percent: newPercent,
                brandOrigin: newBrandOrigin,
                madeIn: newMadeIn,
                producer: newProducer,
                appropriateAge: newAppropriateAge,
                userManual: newUserManual,
                storageInstructions: newStorageInstructions,
                weight: newWeight,
            },
        };

        if (
            newName.length < 1 ||
            newDescription.length < 1 ||
            newAvatar.length < 1 ||
            newNumber.length < 1 ||
            newPrice.length < 1 ||
            newCost.length < 1 ||
            newPercent.length < 1 ||
            newBrandOrigin.length < 1 ||
            newMadeIn.length < 1 ||
            newProducer.length < 1 ||
            newAppropriateAge.length < 1 ||
            newUserManual.length < 1 ||
            newStorageInstructions.length < 1 ||
            newWeight.length < 1
        ) {
            alert('Không được để trống thông tin');
        } else if (newPrice < 0) {
            alert('Giá ưu đãi không hợp lệ');
            setNewPrice(0);
        } else if (newCost < 0) {
            alert('Giá gốc không hợp lệ');
            setNewCost(0);
        } else if (newNumber < 0) {
            alert('Số lượng không hợp lệ');
            setNewNumber(0);
        } else if (newPercent < 0) {
            alert('Phần trăm giảm không hợp lệ');
            setNewPercent(0);
        } else {
            if (value === 'Thêm') {
                console.log(newProduct);
                //Tạo sản phẩm mới
                createProduct(dispatch, newProduct);
            } else if (value === 'Lưu') {
                //Chỉnh sửa thông tin sản phẩm
                updateProduct(user.accessToken, newProduct, currentId, axiosJWT, dispatch);
            }
        }
    };

    useEffect(() => {
        if (!user?.admin) {
            navigate('/');
        }
        if (user?.accessToken) {
            getAllProducts(dispatch);
        }
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div className="listproduct-box">
                <div className="wrapper">
                    <h3>{currentTitle} sản phẩm</h3>
                    <section className="wrapper-body">
                        <div className="wrapper-col">
                            <div className="wrapper-item">
                                <span>Hãng</span>
                                <input
                                    type="text"
                                    placeholder="Hãng"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                />
                            </div>
                            <div className="wrapper-item">
                                <span>Tên</span>
                                <input
                                    type="text"
                                    placeholder="Tên sản phẩm"
                                    value={newDescription}
                                    onChange={(e) => setNewDescription(e.target.value)}
                                />
                            </div>
                            <div className="wrapper-item">
                                <span>Ảnh</span>
                                <input
                                    type="text"
                                    placeholder="Link ảnh mô tả"
                                    value={newAvatar}
                                    onChange={(e) => setNewAvatar(e.target.value)}
                                />
                            </div>
                            <div className="wrapper-item">
                                <span>Giá ưu đãi</span>
                                <input
                                    type="number"
                                    min={0}
                                    placeholder="Giá ưu đãi"
                                    value={newPrice}
                                    onChange={(e) => setNewPrice(e.target.value)}
                                />
                            </div>
                            <div className="wrapper-item">
                                <span>Giá gốc</span>
                                <input
                                    type="number"
                                    min={0}
                                    placeholder="Giá gốc"
                                    value={newCost}
                                    onChange={(e) => setNewCost(e.target.value)}
                                />
                            </div>
                            <div className="wrapper-item">
                                <span>Số lượng</span>
                                <input
                                    type="number"
                                    min={0}
                                    placeholder="Số lượng"
                                    value={newNumber}
                                    onChange={(e) => setNewNumber(e.target.value)}
                                />
                            </div>
                            <div className="wrapper-item">
                                <span>Giảm</span>
                                <input
                                    type="number"
                                    min={0}
                                    placeholder="Phần trăm giảm"
                                    value={newPercent}
                                    onChange={(e) => setNewPercent(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="wrapper-col">
                            <div className="wrapper-item">
                                <span>Xuất xứ thương hiệu</span>
                                <input
                                    type="text"
                                    placeholder="Xuất xứ thương hiệu"
                                    value={newBrandOrigin}
                                    onChange={(e) => setBrandOrigin(e.target.value)}
                                />
                            </div>
                            <div className="wrapper-item">
                                <span>Khối lượng</span>
                                <input
                                    type="text"
                                    placeholder="Khối lượng"
                                    value={newWeight}
                                    onChange={(e) => setNewWeight(e.target.value)}
                                />
                            </div>
                            <div className="wrapper-item">
                                <span>Sản xuất tại </span>
                                <input
                                    type="text"
                                    placeholder="Sản xuất tại"
                                    value={newMadeIn}
                                    onChange={(e) => setNewMadeIn(e.target.value)}
                                />
                            </div>
                            <div className="wrapper-item">
                                <span>Nhà sản xuất</span>
                                <input
                                    type="text"
                                    placeholder="Nhà sản xuất"
                                    value={newProducer}
                                    onChange={(e) => setNewProducer(e.target.value)}
                                />
                            </div>
                            <div className="wrapper-item">
                                <span>Độ tuổi phù hợp</span>
                                <input
                                    type="text"
                                    placeholder="Độ tuổi phù hợp"
                                    value={newAppropriateAge}
                                    onChange={(e) => setNewAppropriateAge(e.target.value)}
                                />
                            </div>
                            <div className="wrapper-item">
                                <span>Hướng dẫn sử dụng</span>
                                <input
                                    type="text"
                                    placeholder="Hướng dẫn sử dụng"
                                    value={newUserManual}
                                    onChange={(e) => setNewUserManual(e.target.value)}
                                />
                            </div>
                            <div className="wrapper-item">
                                <span>Hướng dẫn bảo quản </span>
                                <input
                                    type="text"
                                    placeholder="Hướng dẫn bảo quản"
                                    value={newStorageInstructions}
                                    onChange={(e) => setNewStorageInstructions(e.target.value)}
                                />
                            </div>
                        </div>
                    </section>
                    <button className="btn-edit" onClick={(e) => handleProduct(currentBtn)}>
                        {currentBtn}
                    </button>
                    <button className="btn-delete" onClick={handleClearEdit}>
                        Hủy
                    </button>
                </div>
            </div>
            <div className="listproduct-container">
                <Admin />
                <div className="listproduct-header">Danh sách sản phẩm</div>
                <div className="listproduct-container-btn">
                    <button className="btn-add" onClick={(e) => handleShowProduct()}>
                        <FontAwesomeIcon icon={faPlus} />
                        Tạo mới
                    </button>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <th>Hãng</th>
                            <th>Hình ảnh</th>
                            <th>Tên</th>
                            <th>Giá ưu đãi</th>
                            <th>Giá gốc</th>
                            <th>Khối lượng</th>
                            <th>Số lượng</th>
                        </tr>
                        {listProduct?.map((item) => {
                            return (
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>
                                        <img src={item.product.avatar} alt="" />
                                    </td>
                                    <td className="listproduct-description">{item.product.description}</td>
                                    <td>
                                        {Intl.NumberFormat('de-DE', {
                                            style: 'currency',
                                            currency: 'VND',
                                        }).format(item.product.price)}
                                    </td>
                                    <td>
                                        {Intl.NumberFormat('de-DE', {
                                            style: 'currency',
                                            currency: 'VND',
                                        }).format(item.product.cost)}
                                    </td>
                                    <td>{item.product.weight}</td>
                                    <td>{item.product.number}</td>
                                    <td>
                                        <button className="btn-edit" onClick={(e) => handleShowEdit(item)}>
                                            Chỉnh sửa
                                        </button>
                                        <button className="btn-delete" onClick={(e) => handleDelete(item._id)}>
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ListProducts;
