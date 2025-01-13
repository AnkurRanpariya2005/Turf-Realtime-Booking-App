import {useSelector} from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom';

const UserRouter = () => {

    const {token} = useSelector((state) => state.auth)

    return token? <Outlet/> : <Navigate to='/'/>;
}

export default UserRouter;

