import { useState } from 'react';
import './register.scss';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../redux/apiRequest';
import logo from '../../assets/imgs/logo-blue.png';

const Register = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errorfullname, setErrorFullname] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPhone, setErrorPhone] = useState('');
    const [errorAddress, setErrorAddress] = useState('');
    const [errorUsername, setErrorUsername] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const newUser = {
            fullname: fullname,
            email: email,
            phone: phone,
            address: address,
            username: username,
            password: password,
        };
        if (fullname === '') {
            setErrorFullname('(*) không được để trống họ tên');
        } else if (email === '') {
            setErrorFullname('');
            setErrorEmail('(*) không được để trống email');
        } else if (phone === '') {
            setErrorEmail('');
            setErrorPhone('(*) không được để trống số điện thoại');
        } else if (address === '') {
            setErrorPhone('');
            setErrorAddress('(*) không được để trống địa chỉ');
        } else if (username === '') {
            setErrorAddress('');
            setErrorUsername('(*) không được để trống tài khoản');
        } else if (password === '') {
            setErrorUsername('');
            setErrorPassword('(*) không được để trống mật khẩu');
        } else {
            setErrorPassword('');
            registerUser(newUser, dispatch, navigate);
        }
    };
    return (
        <section className="register-container">
            <div className="register-logo">
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
            </div>
            <div className="register-wrapper">
                <div className="register-title"> Đăng ký</div>
                <form onSubmit={handleRegister}>
                    <div className="register-form register-email">
                        <label>Họ tên</label>
                        <input
                            type="text"
                            placeholder="Họ và tên của bạn"
                            onChange={(e) => setFullname(e.target.value)}
                        />
                        <span>{errorfullname}</span>
                    </div>
                    <div className="register-form register-email">
                        <label>Email</label>
                        <input type="email" placeholder="Email của bạn" onChange={(e) => setEmail(e.target.value)} />
                        <span>{errorEmail}</span>
                    </div>
                    <div className="register-form register-phone">
                        <label>Số điện thoại</label>
                        <input type="number" placeholder="Số điện thoại" onChange={(e) => setPhone(e.target.value)} />
                        <span>{errorPhone}</span>
                    </div>
                    <div className="register-form register-username">
                        <label>Địa chỉ</label>
                        <input type="text" placeholder="Địa chỉ" onChange={(e) => setAddress(e.target.value)} />
                        <span>{errorAddress}</span>
                    </div>
                    <div className="register-form register-username">
                        <label>Tài khoản</label>
                        <input type="text" placeholder="Tên đăng nhập" onChange={(e) => setUsername(e.target.value)} />
                        <span>{errorUsername}</span>
                    </div>
                    <div className="register-form register-password">
                        <label>Mât khẩu</label>
                        <input type="password" placeholder="Mật khẩu" onChange={(e) => setPassword(e.target.value)} />
                        <span>{errorPassword}</span>
                    </div>
                    <button className="btn btn-submit" type="submit">
                        Đăng ký
                    </button>
                </form>
                <div className="register-register">
                    Bạn đã có tài khoản?
                    <Link className="register-register-link" to="/dang-nhap">
                        Đăng nhập
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Register;
