import './OrdersNotification.scss';
import User from '../User/User';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function OrdersNotification() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            navigate('/dang-nhap');
        }
    }, []);

    return (
        <div className="ordersNotification-container">
            <div className="ordersNotification-wrapper">
                <User />
                <div className="ordersNotification-right">Không có thông báo mới</div>
            </div>
        </div>
    );
}

export default OrdersNotification;
