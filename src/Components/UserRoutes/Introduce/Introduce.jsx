import './Introduce.scss';
import { useEffect, useState } from 'react';

function Introduce() {
    // Xoá phần nãy
    const [text, setText] = useState('');
    const originalText = 'Trang này đang bảo trì, vui lòng quay lại sau!';

    useEffect(() => {
        let currentIndex = 0;
        let timeout;

        const animateText = () => {
            setText(originalText.slice(0, currentIndex));
            currentIndex = (currentIndex + 1) % (originalText.length + 1); // Lặp lại vòng lặp từ đầu sau khi hiển thị hết text

            const intervalTime = currentIndex === 0 ? 2000 : 100; // Thời gian delay khi kết thúc một chuỗi text hoặc khi đang hiển thị chuỗi text
            timeout = setTimeout(animateText, intervalTime);
        };

        animateText();

        return () => {
            clearTimeout(timeout); // Xóa timeout khi component unmount (không còn tồn tại)
        };
    }, [originalText]);

    return (
        <div className="introduce-container">
            <div className="introduce-wrapper">
                <div className="maintenance-text">{text}</div>
            </div>
        </div>
    );
}

export default Introduce;
