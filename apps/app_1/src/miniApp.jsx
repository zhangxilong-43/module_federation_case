import React  from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from 'antd';

const { Title } = Typography;

const MiniApp = () => {
    const navigate = useNavigate();

    return (
        <>
            <Title>mini-web-app_1</Title>
            <button onClick={() => navigate('/Page')}>to Page</button>
        </>
    )
}

export default MiniApp;