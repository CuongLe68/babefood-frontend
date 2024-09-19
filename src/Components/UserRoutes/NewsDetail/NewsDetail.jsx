import './NewsDetail.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getInfoCurrentNew, updateNew } from '../../../redux/apiRequest';
import moment from 'moment';
import Sidebar from '../../Sidebar/Sidebar';

function NewsDetail() {
    const currentNew = useSelector((state) => state.users.users?.currentNews);
    const listNews = useSelector((state) => state.users.users?.allNews);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Lấy bài viết hiện tại
    const getCurrentNew = (currentNew) => {
        getInfoCurrentNew(dispatch, navigate, currentNew);
    };

    useEffect(() => {
        const deltailNew = document.querySelector('.news-detail-left .item');
        deltailNew.innerHTML = currentNew.content;

        updateNew(currentNew._id, { eyes: currentNew.eyes + 1 }, dispatch);
    }, [currentNew]);

    // reFormatdate YYYY-MM-DD
    function reFormatDate(date) {
        const formattedDate = moment(date).format('YYYY-MM-DD');

        return formattedDate;
    }

    return (
        <div className="news-detail-container">
            <div className="news-detail-show-sidebar">
                <Sidebar />
            </div>
            <div className="news-detail-wrapper">
                <div className="news-detail-left">
                    <h3 className="page-title">{currentNew.title}</h3>
                    <div className="time-author-views">
                        <div className="time">Ngày đăng: {reFormatDate(currentNew.dateCreate)}</div>
                        <div className="author">Tác giả: {currentNew.author}</div>
                        <div className="views">{currentNew.eyes} lượt xem</div>
                    </div>
                    <h4 className="sub-title">{currentNew.subTitle}</h4>
                    <div className="content">
                        <div className="item"></div>
                    </div>
                </div>
                <div className="news-detail-right">
                    <h3 className="page-title">Các bài viết khác</h3>
                    {listNews?.map((item) => {
                        return (
                            <div className="item" onClick={(e) => getCurrentNew(item)} key={item._id}>
                                <img className="title-photo" src={item.titlePhoto} alt="" />
                                <div className="content">
                                    <h3 className="title">{item.title}</h3>
                                    <div className="time-views">
                                        <div className="time">{reFormatDate(item.dateCreate)}</div>
                                        <div className="views">{item.eyes} lượt xem</div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default NewsDetail;
