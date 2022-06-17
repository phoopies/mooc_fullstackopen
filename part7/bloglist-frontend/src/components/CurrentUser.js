import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../reducers/userReducer';
import { setNotification } from '../reducers/notificationReducer';

const CurrentUser = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(setNotification(`${user.name} logged out`, 'orange', 5));
    };

    return (
        <div>
            <p>{user.name} logged in</p>
            <button onClick={handleLogout}>logout</button>
        </div>
    );
};

export default CurrentUser;
