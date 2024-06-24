import { Routes, Route } from "react-router-dom";
import Container from "../pages/Container";
import MicroApps from "../pages/MicroApps";
import Redirect from './Redirect';
import ErrorInfo from './ErrorInfo';

const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Container />} />
            <Route path="/:microAppId" element={<MicroApps />} />
            <Route path="/*" element={<ErrorInfo />} />
        </Routes>
    )
}
export default Routers;