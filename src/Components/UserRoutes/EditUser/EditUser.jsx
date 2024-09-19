import logoUser from '../../../assets/imgs/userlogo.png';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { updateUser } from '../../../redux/apiRequest';
import { createAxios } from '../../../createInstance';
import { loginSuccess } from '../../../redux/authSlice';
import User from '../User/User';
import './EditUser.scss';
import Notification from '../../../_common/Notification/Notification';

function EditUser() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const msg = useSelector((state) => state.auth?.msg);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const [newfullname, setNewFullname] = useState(user?.fullname);
    const [newEmail, setNewEmail] = useState(user?.email);
    const [newPhone, setNewPhone] = useState(user?.phone);
    const [newAddress, setNewAddress] = useState(user?.address);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [reNewPassword, setReNewPassword] = useState('');
    const [popup, setPopup] = useState({
        isShow: false,
        type: 'success',
        description: 'descriptionAddCard',
    });
    const [isShowPopup, setIsShowPopup] = useState(false); //Ngăn hiển thị thông báo lần đầu tiên
    const [showPassword, setShowPassword] = useState({
        'item-1': true,
        'item-2': true,
        'item-3': true,
    });

    const handleShowPassword = (value) => {
        const currentBoxElement = document.querySelector(`.edituser-right-info-left-item-${value} > input`);
        if (showPassword[`item-${value}`]) {
            currentBoxElement.setAttribute('type', 'text');
        } else {
            currentBoxElement.setAttribute('type', 'password');
        }

        setShowPassword((prevState) => ({
            ...prevState,
            [`item-${value}`]: !prevState[`item-${value}`],
        }));
    };

    //Cho phép edit thông tin
    const handleEditInfo = () => {
        const setInput = document.querySelectorAll('.edituser-right-info-left-item input');
        const buttons = document.querySelectorAll('.edituser-right-info-left-btn button');
        for (let i = 0; i < setInput.length; i++) {
            setInput[i].removeAttribute('disabled');
        }
        setOldPassword('');
        buttons[0].style.opacity = '1';
        buttons[0].style.cursor = 'pointer';
        buttons[1].setAttribute('disabled', '');
        buttons[1].style.opacity = '0.6';
        buttons[1].style.cursor = 'default';
    };

    //Xử lí thông báo lỗi
    const showPopup = (description) => {
        setPopup({
            isShow: true,
            type: 'warning',
            description: description,
        });
        setTimeout(() => {
            setPopup((prevPopup) => ({
                ...prevPopup,
                isShow: false,
            }));
        }, 3000);
    };

    //Cập nhật thông tin người dùng
    const handleUpdateUser = () => {
        // Kiểm tra định dạng email
        const isValidEmail = /\S+@\S+\.\S+/;

        if (newfullname === '' || newEmail === '' || newPhone === '' || newAddress === '') {
            showPopup('descriptionEditUser');
        } else if (newfullname.length < 5) {
            showPopup('descriptionEditUserFullname');
        } else if (!isValidEmail.test(newEmail)) {
            showPopup('descriptionEditUserEmailFormat');
        } else if (newEmail.length < 11) {
            showPopup('descriptionEditUserEmailLength');
        } else if (newPhone < 0 || newPhone.length < 10 || newPhone.length > 12) {
            showPopup('descriptionEditUserPhone');
        } else if (newAddress.length < 5) {
            showPopup('descriptionEditUserAdress');
        } else if (oldPassword && oldPassword.length < 7) {
            showPopup('descriptionEditUserPassword');
        } else if (oldPassword && !newPassword) {
            showPopup('descriptionEditUserNewPasswpord');
        } else if (oldPassword && newPassword && oldPassword === newPassword) {
            showPopup('descriptionEditUserOldPassAndNewPassNotMatch');
        } else if (newPassword && newPassword.length < 7) {
            showPopup('descriptionEditUserPassword');
        } else if (newPassword !== reNewPassword) {
            showPopup('descriptionEditUserNewPasswpordNotMatch');
        } else {
            const newUser = {
                fullname: newfullname,
                email: newEmail,
                phone: newPhone,
                address: newAddress,
                oldPassword: oldPassword,
                newPassword: newPassword,
            };

            updateUser(user?.accessToken, dispatch, user?._id, axiosJWT, newUser);
            setIsShowPopup(true);
        }
    };

    useEffect(() => {
        if (!user) {
            navigate('/dang-nhap');
        } else {
            if (isShowPopup) {
                setPopup({
                    isShow: true,
                    type: msg.code === 200 ? 'success' : msg.code === 404 ? 'warning' : 'failed', //Lỗi 200 thì đúng, 404 sai pass,còn lại là lỗi hệ thống
                    description:
                        msg.code === 200
                            ? 'descriptionEditUser'
                            : msg.code === 404
                            ? 'descriptionOldPasswordFailed'
                            : 'descriptionErrSystem',
                });
                setTimeout(() => {
                    setPopup({
                        isShow: false,
                        type: msg.code === 200 ? 'success' : msg.code === 404 ? 'warning' : 'failed', //Lỗi 200 thì đúng, 404 sai pass,còn lại là lỗi hệ thống
                        description:
                            msg.code === 200
                                ? 'descriptionEditUser'
                                : msg.code === 404
                                ? 'descriptionOldPasswordFailed'
                                : 'descriptionErrSystem',
                    });
                }, 3000);
            }
        }
    }, [msg]);

    return (
        <div className="edituser-container">
            <Notification isShow={popup.isShow} type={popup.type} description={popup.description} />
            <div className="edituser-wrapper">
                <User />
                <div className="edituser-right">
                    <p>
                        Hồ Sơ Của Tôi
                        <span>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
                    </p>
                    <div className="edituser-right-info">
                        <div className="edituser-right-info-right edituser-right-info-right-500">
                            <img src={logoUser} alt="logo" />
                            <input type="file" id="edituser-file-input" />
                            <div className="edituser-file-input-desciption">
                                <label htmlFor="edituser-file-input">Chọn ảnh</label>
                                <span>Dụng lượng file tối đa 1 MB Định dạng:.JPEG, .PNG</span>
                            </div>
                        </div>
                        <div className="edituser-right-info-left">
                            <div className="edituser-right-info-left-item">
                                <p>Họ và tên </p>
                                <input
                                    type="text"
                                    value={newfullname}
                                    maxLength="30"
                                    onChange={(e) => setNewFullname(e.target.value)}
                                    disabled
                                />
                            </div>
                            <div className="edituser-right-info-left-item">
                                <p>Email</p>
                                <input
                                    type="text"
                                    value={newEmail}
                                    maxLength="40"
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    disabled
                                />
                            </div>
                            <div className="edituser-right-info-left-item">
                                <p>Số điện thoại</p>
                                <input
                                    type="number"
                                    value={newPhone}
                                    maxLength="12"
                                    onChange={(e) => setNewPhone(e.target.value)}
                                    disabled
                                />
                            </div>
                            <div className="edituser-right-info-left-item">
                                <p>Địa chỉ</p>
                                <input
                                    type="text"
                                    value={newAddress}
                                    maxLength="40"
                                    onChange={(e) => setNewAddress(e.target.value)}
                                    disabled
                                />
                            </div>
                            <div className="edituser-right-info-left-item edituser-right-info-left-item-1">
                                <p>Mật khẩu cũ</p>
                                <input
                                    type="password"
                                    value={oldPassword}
                                    maxLength="40"
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    disabled
                                />
                                <FontAwesomeIcon
                                    className="eye-1"
                                    icon={faEye}
                                    onClick={() => handleShowPassword('1')}
                                />
                            </div>
                            <div className="edituser-right-info-left-item edituser-right-info-left-item-2">
                                <p>Mật khẩu mới</p>
                                <input
                                    type="password"
                                    value={newPassword}
                                    maxLength="40"
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    disabled
                                />
                                <FontAwesomeIcon
                                    className="eye-2"
                                    icon={faEye}
                                    onClick={() => handleShowPassword('2')}
                                />
                            </div>
                            <div className="edituser-right-info-left-item edituser-right-info-left-item-3">
                                <p>Nhập lại mật khẩu mới</p>
                                <input
                                    type="password"
                                    value={reNewPassword}
                                    maxLength="40"
                                    onChange={(e) => setReNewPassword(e.target.value)}
                                    disabled
                                />
                                <FontAwesomeIcon
                                    className="eye-3"
                                    icon={faEye}
                                    onClick={() => handleShowPassword('3')}
                                />
                            </div>
                            <div className="edituser-right-info-left-btn">
                                <button style={{ opacity: 0.6, cursor: 'default' }} onClick={handleUpdateUser}>
                                    Lưu
                                </button>
                                <button onClick={(e) => handleEditInfo(e.target.value)}>Chỉnh sửa</button>
                            </div>
                        </div>
                        <div className="edituser-right-info-right edituser-right-info-right-1512">
                            <img src={logoUser} alt="logo" />
                            <input type="file" id="edituser-file-input" />
                            <label htmlFor="edituser-file-input">Chọn ảnh</label>
                            <span>Dụng lượng file tối đa 1 MB Định dạng:.JPEG, .PNG</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditUser;
