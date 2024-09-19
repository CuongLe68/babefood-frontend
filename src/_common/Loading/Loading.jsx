import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Loading.scss';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function Loading() {
    return (
        <div className="loading-container">
            <div className="wrapper">
                <FontAwesomeIcon icon={faSpinner} />
                <p>Đang tải dữ liệu...</p>
            </div>
        </div>
    );
}

export default Loading;
