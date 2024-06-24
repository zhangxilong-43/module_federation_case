/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from '@micro-zoe/micro-app/polyfill/jsx-custom-event'
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

export default function MicroApps() {
    const navigate = useNavigate();
    let params = useParams();
    const [spinning, setSpinning] = useState(true);
    const { microAppId } = params;

    const onErrorCallback = () => {
        setSpinning(false);
        navigate('/404');
    }

    const microAppMap = {
        'app_1': 'http://localhost:3001/',
        'app_2': 'http://localhost:3002/',
    }

    return (
        <>
        {microAppId}
            {
                microAppId ? <micro-app 
                    name={microAppId} 
                    url={microAppMap[microAppId]} 
                    onMounted={() => setSpinning(false)}
                    onUnmount={() => setSpinning(true)}
                    onError={() => onErrorCallback()}
                ></micro-app>
                :
                null
            }
        </>
    )
}