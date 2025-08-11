import './App.css';
import { useReducer, useRef, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Diary from './pages/Diary';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Notfound from './pages/Notfound';

const mokData = [
    {
        id: 1,
        createdDate: new Date().getTime(),
        emotionId: 1,
        content: '1번 감정일기장',
    },
    {
        id: 2,
        createdDate: new Date().getTime(),
        emotionId: 2,
        content: '2번 감정일기장',
    },
];

function reducer(state, action) {
    switch (action.type) {
        case 'CREATE':
            return [action.data, ...state];
        case 'UPDATE':
            return state.map((item) => (String(item.id) === String(action.data.id) ? action.data : item));
        case 'DELETE':
            return state.filter((item) => String(item.id) !== String(action.id));
        default:
            return state;
    }
}

const DiaryStateContext = createContext();
const DiaryDispatchContext = createContext();

function App() {
    const [data, dispatch] = useReducer(reducer, mokData);
    const idRef = useRef(3);

    // 새로운 일기 추가
    const onCreate = (createdDate, emotionId, content) => {
        dispatch({
            type: 'CREATE',
            data: {
                id: idRef.current++,
                createdDate,
                emotionId,
                content,
            },
        });
    };

    // 기존 일기 수정
    const onUpdate = (id, createdDate, emotionId, content) => {
        dispatch({
            type: 'UPDATE',
            data: {
                id,
                createdDate,
                emotionId,
                content,
            },
        });
    };

    // 기존 일기 삭제
    const onDelete = (id) => {
        dispatch({
            type: 'DELETE',
            id,
        });
    };

    return (
        <>
            <button
                onClick={() => {
                    onCreate(new Date().getTime(), 3, 'HELLO');
                }}
            >
                일기 추가 테스트
            </button>
            <button
                onClick={() => {
                    onUpdate(1, new Date().getTime(), 4, '수정된 일기입니다.');
                }}
            >
                일기 수정 테스트
            </button>
            <button
                onClick={() => {
                    onDelete(2);
                }}
            >
                일기 삭제 테스트
            </button>
            <DiaryStateContext.Provider value={data}>
                <DiaryDispatchContext.Provider
                    value={{
                        onCreate,
                        onUpdate,
                        onDelete,
                    }}
                >
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/new" element={<New />}></Route>
                        <Route path="/diary/:id" element={<Diary />}></Route>
                        <Route path="/edit/:id" element={<Edit />}></Route>
                        <Route path="*" element={<Notfound />}></Route>
                    </Routes>
                </DiaryDispatchContext.Provider>
            </DiaryStateContext.Provider>
        </>
    );
}

export default App;
