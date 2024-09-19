import './Footer.scss';
import { Link } from 'react-router-dom';

import heart from '../../../src/assets/imgs/footer-heart.png';
import ship from '../../../src/assets/imgs/footer-ship.png';
import genuine from '../../../src/assets/imgs/footer-genuine.png';
import quanlity from '../../../src/assets/imgs/footer-quanlity.png';
import refund from '../../../src/assets/imgs/footer-refund.png';

function Footer() {
    return (
        <footer className="footer-container">
            <div className="footer-list">
                <div className="footer-list-item">
                    <img className="icon" src={heart} alt="heart" />
                    <span>
                        Cùng Ba Mẹ <br />
                        Nuôi Con
                    </span>
                </div>
                <div className="footer-list-item">
                    <img className="icon" src={ship} alt="ship" />

                    <span>
                        Giao Hàng
                        <br />
                        Siêu Tốc 1h
                    </span>
                </div>
                <div className="footer-list-item">
                    <img className="icon" src={genuine} alt="genuine" />
                    <span>
                        100%
                        <br />
                        Chính Hãng
                    </span>
                </div>
                <div className="footer-list-item">
                    <img className="icon" src={quanlity} alt="quanlity" />
                    <span>
                        Bảo Quản
                        <br />
                        Mát
                    </span>
                </div>
                <div className="footer-list-item">
                    <img className="icon" src={refund} alt="refund" />
                    <span>
                        Đổi Trả
                        <br />
                        Dễ Dàng
                    </span>
                </div>
            </div>
            <div className="footer-section">
                <div className="footer-item">
                    <h3>Công ty cổ phần Kids Nuttions Việt Nam</h3>
                    <span>Email: cskh@kidsnuttions.com</span>
                    <span>Điện thoại: 098 9999 9999</span>
                    <span>Văn phòng: Tầng 2 Tòa nhà Phú Mỹ Hưng Tower, 08 Hoàng Văn Thái, P.Tân Phú, Q.7, HCM</span>
                </div>
                <div className="footer-item">
                    <h3>Giới thiệu</h3>
                    <Link to="/gioi-thieu">Giới Thiệu Về Kids Nuttions</Link>
                    <Link to="/tuyen-dung">Chính sách bảo mật</Link>
                    <Link to="/cham-soc-khach-hang">Điều khoản chung</Link>
                    <Link to="/cham-soc-khach-hang">Bảo hành & Bảo trì</Link>
                    <Link to="/cham-soc-khach-hang">Đổi trả & Hoàn tiền</Link>
                </div>
                <div className="footer-item">
                    <h3>Kết Nối Với Chúng Tôi</h3>
                    <a href="https://www.facebook.com/">Facebook</a>
                    <a href="https://www.instagram.com/">Instagram</a>
                    <a href="https://www.tiktok.com/">Tiktok</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
