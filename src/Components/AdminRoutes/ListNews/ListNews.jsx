import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Admin from '../../Admin/Admin';
import './ListNews.scss';
import { createNew, deleteNew, getAllNews, updateNew } from '../../../redux/apiRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

function ListNews() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.login?.currentUser);
    //Lấy tất cả người dùng
    const listNew = useSelector((state) => state.users.users?.allNews);

    const [currentId, setCurrentId] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [titlePhoto, setTitlePhotor] = useState('');
    const [eyes, setEyes] = useState(Number);
    const [subTitle, setSubTitle] = useState('');
    const [content, setContent] = useState('');
    const [dateCreate, setDateCreate] = useState(Date);

    const [currentBtn, setCurrentBtn] = useState('');
    const [currentTitle, setCurrentTitle] = useState('');

    const handleShowEdit = (item) => {
        setCurrentId(item._id);
        setAuthor(item.author);
        setCategory(item.category);
        setTitle(item.title);
        setTitlePhotor(item.titlePhoto);
        setEyes(item.eyes);
        setSubTitle(item.subTitle);
        setContent(item.content);
        setDateCreate(item.dateCreate);

        setCurrentBtn('Lưu');
        setCurrentTitle('Chỉnh sửa thông tin');
        document.querySelector('.list-new-box').style.display = 'flex';
    };

    //đóng form chỉnh sửa
    const handleClearEdit = () => {
        document.querySelector('.list-new-box').style.display = 'none';
    };

    //delete product
    const handleDelete = (id) => {
        deleteNew(id, dispatch);
    };

    //show create product
    const handleShowProduct = () => {
        setAuthor('');
        setCategory('');
        setTitle('');
        setTitlePhotor('');
        setEyes(0);
        setSubTitle('');
        setContent('');
        setDateCreate('');

        setCurrentBtn('Thêm');
        setCurrentTitle('Thêm mới');
        document.querySelector('.list-new-box').style.display = 'flex';
    };

    const handleNew = (value) => {
        const date = new Date();
        const newNew = {
            author: author,
            category: category,
            title: title,
            titlePhoto: titlePhoto,
            subTitle: subTitle,
            eyes: eyes,
            dateCreate: date,
            dateUpdate: date,
            content: content,
        };

        if (
            !author.trim().length ||
            !category.trim().length ||
            !title.trim().length ||
            !titlePhoto.trim().length ||
            !subTitle.trim().length ||
            !content.trim().length
        ) {
            alert('Không được để trống thông tin');
        } else {
            if (value === 'Thêm') {
                const date = new Date();
                createNew({ ...newNew, dateCreate: date }, dispatch);
                handleClearEdit();
            } else if (value === 'Lưu') {
                updateNew(currentId, newNew, dispatch);
                alert('Cập nhật bài viết thành công');
                handleClearEdit();
            }
        }
    };

    useEffect(() => {
        if (!user?.admin) {
            navigate('/');
        }
        if (user?.accessToken) {
            getAllNews(dispatch);
        }
        // eslint-disable-next-line
    }, []);

    // reFormatdate YYYY-MM-DD
    function reFormatDate(date) {
        const formattedDate = moment(date).format('YYYY-MM-DD');

        return formattedDate;
    }

    return (
        <>
            <div className="list-new-box">
                <div className="wrapper">
                    <h3>{currentTitle} bài viết</h3>
                    <section className="wrapper-body">
                        <div className="wrapper-item">
                            <span>Tác giả</span>
                            <input
                                type="text"
                                placeholder="Tác giả"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                        </div>
                        <div className="wrapper-item">
                            <span>Tên bài viết</span>
                            <input
                                type="text"
                                placeholder="Tiêu đề"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="wrapper-item">
                            <span>Danh mục</span>
                            <input
                                type="text"
                                placeholder="Danh mục"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </div>
                        <div className="wrapper-item">
                            <span>Ảnh mô tả</span>
                            <input
                                type="text"
                                placeholder="Ảnh mô tả"
                                value={titlePhoto}
                                onChange={(e) => setTitlePhotor(e.target.value)}
                            />
                        </div>
                        <div className="wrapper-item">
                            <span>Tiêu đề phụ</span>
                            <textarea
                                placeholder="Tiêu đề phụ"
                                value={subTitle}
                                onChange={(e) => setSubTitle(e.target.value)}
                            />
                        </div>
                        <div className="wrapper-item">
                            <span>Bài viết</span>
                            <textarea
                                placeholder="Nội dùng bài viết"
                                style={{ minHeight: '300px' }}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>
                    </section>
                    <button className="btn-edit" onClick={(e) => handleNew(currentBtn)}>
                        {currentBtn}
                    </button>
                    <button className="btn-delete" onClick={handleClearEdit}>
                        Hủy
                    </button>
                </div>
            </div>
            <div className="list-new-container">
                <Admin />
                <div className="list-new-header">Quản lí tin tức</div>
                <div className="list-new-container-btn">
                    <button className="btn-add" onClick={(e) => handleShowProduct()}>
                        <FontAwesomeIcon icon={faPlus} />
                        Tạo mới
                    </button>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <th>id bài viết</th>
                            <th>Tên bài viết</th>
                            <th>Danh mục</th>
                            <th>Ảnh mô tả</th>
                            <th>Lượt đọc</th>
                            <th>Ngày tạo</th>
                        </tr>
                        {listNew?.map((item) => {
                            return (
                                <tr key={item._id}>
                                    <td>{item._id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.category}</td>
                                    <td>
                                        <img src={item.titlePhoto} alt="" />
                                    </td>
                                    <td className="list-new-description">{item.eyes}</td>
                                    <td>{reFormatDate(item.dateCreate)}</td>
                                    <td className="buttons">
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

export default ListNews;
