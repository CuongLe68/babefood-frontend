import './ListComments.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '../../../createInstance';
import { deleteComment, getAllComment, updateComment } from '../../../redux/apiRequest';
import { loginSuccess } from '../../../redux/authSlice';
import Admin from '../../Admin/Admin';
import moment from 'moment';

function ListComments() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    //Lấy tất cả bình luận
    const listComments = useSelector((state) => state.users.users?.allComments);

    const [idComment, setIdComment] = useState();
    const [currentUser, setCurrentUser] = useState();
    const [currentProduct, setCurrentProduct] = useState();
    const [rating, setRating] = useState();
    const [comment, setComment] = useState('');
    const [reComment, setReComment] = useState('');
    const [dateComment, setDateComment] = useState(Date);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //refresh token
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    useEffect(() => {
        if (!user?.admin) {
            navigate('/');
        }
        if (user?.accessToken) {
            getAllComment(dispatch);
        }
        // eslint-disable-next-line
    }, []);

    //Xóa người dùng
    const handleDelete = (id) => {
        deleteComment(id, dispatch, axiosJWT);
    };

    //Hiện form chỉnh sửa
    const handleShowEdit = (comment) => {
        setIdComment(comment._id);
        setCurrentUser(comment.user);
        setCurrentProduct(comment.currentProduct);
        setRating(comment.rating);
        setComment(comment.comment);
        setReComment(comment.reComment);
        setDateComment(comment.dateComment);

        document.querySelector('.list-comment-box').style.display = 'flex';
    };

    //đóng form chỉnh sửa
    const handleClearEdit = () => {
        document.querySelector('.list-comment-box').style.display = 'none';
    };

    //Phản hồi bình luận
    const handleEdit = () => {
        const dateReComment = new Date();

        const commentAddmin = {
            user: currentUser,
            rating: rating,
            comment: comment,
            reComment: reComment,
            dateComment: dateComment,
            dateReComment: dateReComment,
            currentProduct: currentProduct,
        };

        if (reComment === '') {
            alert('Lỗi: Không được để trống nội dung phản hồi');
        } else {
            console.log(idComment);
            updateComment(idComment, commentAddmin, axiosJWT, dispatch);
        }
    };

    // reFormatdate YYYY-MM-DD
    function reFormatDate(date) {
        const formattedDate = moment(date).format('YYYY-MM-DD');

        return formattedDate;
    }

    return (
        <>
            <div className="list-comment-box">
                <div className="wrapper">
                    <h3>Phản hồi người dùng</h3>
                    <div className="wrapper-item">
                        <span>Id người dùng</span>
                        <input className="wrapper-item-read-only" type="text" value={currentUser?._id} readOnly />
                    </div>
                    <div className="wrapper-item">
                        <span>Tên người dùng</span>
                        <input className="wrapper-item-read-only" type="text" value={currentUser?.fullname} readOnly />
                    </div>
                    <div className="wrapper-item">
                        <span>Số điện thoại</span>
                        <input className="wrapper-item-read-only" type="text" value={currentUser?.phone} readOnly />
                    </div>
                    <div className="wrapper-item">
                        <span>Email</span>
                        <input className="wrapper-item-read-only" type="text" value={currentUser?.email} readOnly />
                    </div>
                    <div className="wrapper-item">
                        <span>Id sản phẩm</span>
                        <input className="wrapper-item-read-only" type="text" value={currentProduct?.id} readOnly />
                    </div>
                    <div className="wrapper-item">
                        <span>Tên sản phẩm</span>
                        <input
                            className="wrapper-item-read-only"
                            type="text"
                            value={currentProduct?.description}
                            readOnly
                        />
                    </div>
                    <div className="wrapper-item">
                        <span>Giá sản phẩm</span>
                        <input
                            className="wrapper-item-read-only"
                            type="text"
                            value={Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(
                                currentProduct?.price,
                            )}
                            readOnly
                        />
                    </div>
                    <div className="wrapper-item">
                        <span>Nội dung phản hồi</span>
                        <input
                            type="text"
                            minLength={2}
                            maxLength={150}
                            placeholder="Nhập nội dung phản hồi"
                            value={reComment}
                            onChange={(e) => setReComment(e.target.value)}
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

            <div className="list-comment-container">
                <Admin />
                <div className="list-comment-header">Danh sách ý kiến người dùng</div>
                <table>
                    <tr>
                        <th>Id bình luận</th>
                        <th>Ngày gửi</th>
                        <th>Ý kiến từ người dùng</th>
                        <th>Phản hồi</th>
                        <th>Ngày phản hồi</th>
                    </tr>
                    {listComments?.map((item) => {
                        return !item.admin ? (
                            <tr key={item._id}>
                                <td>{item._id}</td>
                                <td>{reFormatDate(item.dateComment)}</td>
                                <td>{item.comment}</td>
                                <td>{item.reComment}</td>
                                <td>{!item.dateReComment ? '' : reFormatDate(item.dateReComment)}</td>
                                <td className="buttons">
                                    <button className="btn-edit" onClick={(e) => handleShowEdit(item)}>
                                        Phản hồi
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

export default ListComments;
