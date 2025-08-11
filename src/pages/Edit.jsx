import { useParams } from 'react-router-dom';

const Edit = () => {
    const params = useParams();
    console.log(params);

    return <div>{params.id}번째 일기 수정 페이지</div>;
};

export default Edit;
