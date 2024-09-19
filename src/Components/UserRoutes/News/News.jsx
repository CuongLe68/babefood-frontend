import './News.scss';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllNews, getInfoCurrentNew } from '../../../redux/apiRequest';
import moment from 'moment';

function News() {
    const listNews = useSelector((state) => state.users.users?.allNews);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        getAllNews(dispatch);
        // eslint-disable-next-line
    }, []);

    //Lấy bài viết hiện tại
    const getCurrentNew = (currentNew) => {
        getInfoCurrentNew(dispatch, navigate, currentNew);
    };

    // reFormatdate YYYY-MM-DD
    function reFormatDate(date) {
        const formattedDate = moment(date).format('YYYY-MM-DD');

        return formattedDate;
    }

    return (
        <div className="news-container">
            <div className="news-show-sidebar">
                <Sidebar />
            </div>
            <div className="news-wrapper">
                <div className="news-left">
                    <h3 className="page-title">Tin tức</h3>
                    {listNews?.map((item) => {
                        return (
                            <div className="item" onClick={(e) => getCurrentNew(item)}>
                                <img className="title-photo" src={item.titlePhoto} alt="" />
                                <div className="content">
                                    <h3 className="title">{item.title}</h3>
                                    <div className="time-views">
                                        <div className="time">{reFormatDate(item.dateCreate)}</div>
                                        <div className="views">{item.eyes} lượt xem</div>
                                    </div>
                                    <p className="sub-title">{item.subTitle}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="news-right">
                    <h3 className="page-title">Khuyến mãi</h3>
                    <div className="row">
                        {listNews?.map((item) => {
                            return item.category === 'promotion' ? (
                                <>
                                    <div className="item" onClick={(e) => getCurrentNew(item)}>
                                        <img className="title-photo" src={item.titlePhoto} alt="" />
                                    </div>
                                </>
                            ) : (
                                ''
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default News;
