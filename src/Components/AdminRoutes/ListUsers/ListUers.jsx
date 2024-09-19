import './ListUsers.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '../../../createInstance';
import { deleteUser, getAllUsers, updateListUser } from '../../../redux/apiRequest';
import { loginSuccess } from '../../../redux/authSlice';
import Admin from '../../Admin/Admin';

function ListUsers() {
    const user = useSelector((state) => state.auth.login?.currentUser);

    const [newfullname, setNewFullname] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [newAddress, setNewAddress] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [currentId, setCurrentId] = useState('');

    //Lấy tất cả người dùng
    const listUser = useSelector((state) => state.users.users?.allUsers);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //refresh token
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    useEffect(() => {
        if (!user?.admin) {
            navigate('/');
        }
        if (user?.accessToken) {
            getAllUsers(user?.accessToken, dispatch);
        }
        // eslint-disable-next-line
    }, []);

    //Xóa người dùng
    const handleDelete = (id) => {
        deleteUser(user?.accessToken, dispatch, id, axiosJWT);
    };

    //Hiện form chỉnh sửa
    const handleShowEdit = (user) => {
        setNewFullname(user.fullname);
        setNewEmail(user.email);
        setNewPhone(user.phone);
        setNewAddress(user.address);
        setNewUsername(user.username);
        setCurrentId(user._id);

        document.querySelector('.listusers-box').style.display = 'flex';
    };
    //đóng form chỉnh sửa
    const handleClearEdit = () => {
        document.querySelector('.listusers-box').style.display = 'none';
    };

    //Chỉnh sửa thông tin người dùng
    const handleEdit = () => {
        const newUser = {
            fullname: newfullname,
            email: newEmail,
            phone: newPhone,
            address: newAddress,
            username: newUsername,
        };

        // Kiểm tra định dạng email
        const isValidEmail = /\S+@\S+\.\S+/;

        if (newfullname === '' && newEmail === '' && newPhone === '' && newAddress === '' && newUsername === '') {
            alert('Lỗi: Không được để trống thông tin');
        } else if (newfullname.length < 5) {
            alert('Lỗi: Độ tên phải từ 5 - 30 ký tự');
        } else if (!isValidEmail.test(newEmail)) {
            alert('Lỗi: Email không đúng định dạng');
        } else if (newEmail.length < 10) {
            alert('Lỗi: Độ dài email từ 10 - 40 ký tự');
        } else if (newPhone < 0 || newPhone.length < 10 || newPhone.length > 12) {
            alert('Lỗi: số điện thoại không hợp lệ');
            setNewPhone('');
        } else if (newAddress.length < 1) {
            alert('Lỗi: Bạn chưa nhập địa chỉ ');
        } else if (newUsername < 7) {
            alert('Lỗi: Độ dài tài khoản từ 7 - 40 ký tự');
        } else {
            updateListUser(user.accessToken, dispatch, currentId, axiosJWT, newUser);
        }
    };

    return (
        <>
            <div className="listusers-box">
                <div className="wrapper">
                    <h3>Chỉnh sửa</h3>
                    <div className="wrapper-item">
                        <span>Họ tên</span>
                        <input
                            type="text"
                            placeholder="Họ và tên"
                            value={newfullname}
                            onChange={(e) => setNewFullname(e.target.value)}
                        />
                    </div>
                    <div className="wrapper-item">
                        <span>Email</span>
                        <input
                            type="text"
                            placeholder="Email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                        />
                    </div>
                    <div className="wrapper-item">
                        <span>Điện thoại</span>
                        <input
                            type="number"
                            placeholder="Số điện thoại"
                            value={newPhone}
                            onChange={(e) => setNewPhone(e.target.value)}
                        />
                    </div>
                    <div className="wrapper-item">
                        <span>Địa chỉ</span>
                        <input
                            type="text"
                            placeholder="Địa chỉ"
                            value={newAddress}
                            onChange={(e) => setNewAddress(e.target.value)}
                        />
                    </div>
                    <div className="wrapper-item">
                        <span>Tài khoản</span>
                        <input
                            type="text"
                            placeholder="Tài khoản"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                        />
                    </div>
                    <button className="btn-edit" onClick={(e) => handleEdit()}>
                        Lưu
                    </button>
                    <button className="btn-delete" onClick={handleClearEdit}>
                        Hủy
                    </button>
                </div>
            </div>
            <div className="listusers-container">
                <Admin />
                <div className="listusers-header">Danh sách người dùng</div>
                <table>
                    <tr>
                        <th>Tên người dùng</th>
                        <th>Số điện thoại</th>
                        <th>Địa chỉ</th>
                        <th>Email</th>
                        <th>Tài khoản</th>
                    </tr>
                    {listUser?.map((item) => {
                        return !item.admin ? (
                            <tr key={item._id}>
                                <td>{item.fullname}</td>
                                <td>{item.phone}</td>
                                <td>{item.address}</td>
                                <td>{item.email}</td>
                                <td>{item.username}</td>
                                <td>
                                    <button className="btn-edit" onClick={(e) => handleShowEdit(item)}>
                                        Chỉnh sửa
                                    </button>
                                    <button className="btn-delete" onClick={(e) => handleDelete(item._id)}>
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ) : (
                            ''
                        );
                    })}
                </table>
            </div>
        </>
    );
}

export default ListUsers;
