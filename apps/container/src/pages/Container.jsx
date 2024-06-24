import React  from "react";
import '../style/Container.less';
import { useNavigate } from "react-router-dom";
import ContainerText from '../Components/ContainerText';

const Container = () => {
    const navigate = useNavigate();

    return (
        <>
            <button onClick={() => navigate('/app_1')}>app_1</button>
            <button onClick={() => navigate('/app_2')}>app_2</button>
            <ContainerText />
        </>
    )
}

export default Container;