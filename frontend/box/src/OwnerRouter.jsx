import {useSelector} from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom';

const OwnerRouter = () => {

    const {token} = useSelector((state) => state.auth)

    return token? <Outlet/> : <Navigate to='/sign-in'/>;
}

export default OwnerRouter;

