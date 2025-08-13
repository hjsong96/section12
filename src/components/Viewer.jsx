import './Viewer.css';
import { getEmotionImage } from '../util/get-emotion-image';
import { emotionList } from '../util/constants';

const Viewer = ({ emotionId, content }) => {
    const emotionItem = emotionList.find((item) => String(item.emotionId) === String(emotionId));

    return (
        <div className="Viewer">
            <section className="img_section">
                <h4>오늘의 감정</h4>
                <div className={`emotion_img_wrapper emotion_img_wrapper_${emotionItem.emotionId}`}>
                    {emotionItem ? (
                        <div>
                            <img src={getEmotionImage(emotionItem.emotionId)} />
                            <div>{emotionItem.emotionName}</div>
                        </div>
                    ) : (
                        <div>감정 정보를 찾을 수 없어요.</div>
                    )}
                </div>
            </section>
            <section className="content_section">
                <h4>오늘의 일기</h4>
                <div className="content_wrapper">
                    <p>{content}</p>
                </div>
            </section>
        </div>
    );
};

export default Viewer;
