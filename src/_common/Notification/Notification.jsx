import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Notification.scss';
import { faCircleCheck, faTriangleExclamation, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';

function Notification(props) {
    const data = {
        success: {
            title: 'Thành Công',
            icon: faCircleCheck,
            color: 'greenyellow',
            descriptionAddCart: 'Thêm sản phẩm vào giỏ hàng thành công',
            descriptionDeleteCart: 'Xoá sản phẩm thành công',
            descriptionRegister: 'Đăng ký tài khoản thành công',
            descriptionPayment: 'Đặt hàng thành công!',
            descriptionEditUser: 'Cập nhật thông tin thành công',
        },
        warning: {
            title: 'Lưu ý',
            icon: faTriangleExclamation,
            color: 'orange',
            descriptionAddCart: 'Cảnh báo thêm sản phẩm',
            descriptionRegister: 'Thông tin bạn nhập chưa chính xác',
            descriptionComment: 'Bạn cần đăng nhập trước khi bình luận',
            descriptionCommentRate: 'Vui lòng chọn số sao muốn đánh giá',
            descriptionCommentText: 'Vui lòng nhập nội dung bình luận',
            descriptionPaymentChoseProduct: 'Bạn phải chọn ít nhất 1 sản phẩm để đặt hàng!',
            descriptionEditUser: 'Không được để trống thông tin',
            descriptionEditUserFullname: 'Độ dài tên phải từ 5 - 30 ký tự',
            descriptionEditUserEmailFormat: 'Email không đúng định dạng',
            descriptionEditUserEmailLength: 'Độ dài email từ 11 - 40 ký tự',
            descriptionEditUserPhone: 'số điện thoại không hợp lệ',
            descriptionEditUserAdress: 'Độ dài địa chỉ phải từ 5 - 40 ký tự',
            descriptionEditUserPassword: 'Độ dài mật khẩu từ 7 - 40 ký tự',
            descriptionOldPasswordFailed: 'Mật khẩu cũ không chính xác',
            descriptionEditUserNewPasswpord: 'Không được để trống mật khẩu mới',
            descriptionEditUserOldPassAndNewPassNotMatch: 'Mật khẩu cũ và mật khẩu mới không được trùng nhau',
            descriptionEditUserNewPasswpordNotMatch: 'Mật khẩu mới không trùng nhau',
        },
        failed: {
            title: 'Thất bại',
            icon: faXmarkCircle,
            color: 'red',
            descriptionAddCart: 'Thêm sản phẩm thất bại',
            descriptionDeleteCart: 'Xoá sản phẩm thất bại',
            descriptionRegister: 'Đăng ký tài khoản thất bại',
            descriptionEditUser: 'Cập nhật thông tin thất bại',
            descriptionErrSystem: 'Hệ thống đang bảo trì, vui lòng quay lại sau!',
        },
    };

    return (
        <div className="notification-container" style={{ display: `${props?.isShow ? 'block' : 'none'}` }}>
            <div className="notification-container-wrapper">
                <h2>{data[props?.type]?.title}</h2>
                <FontAwesomeIcon icon={data[props?.type]?.icon} style={{ color: data[props?.type]?.color }} />
                <p>{data[props?.type][props.description]}</p>
            </div>
        </div>
    );
}

export default Notification;
