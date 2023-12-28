import { NavLink, useNavigate } from 'react-router-dom';
import { IoHome, IoDocument, IoPerson, IoLogOut } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { LogOut, reset } from '../../features/authSlice';

const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const logOut = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate('/');
  };

  return (
    <div>
      <aside className="menu pl-3 has-shadow">
        <p className="menu-label">General</p>
        <ul className="menu-list">
          <li>
            <NavLink to={'/dashboard'}>
              <IoHome /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to={'/subjects'}>
              <IoDocument /> Subject
            </NavLink>
          </li>
          <li>
            <NavLink to={'/students'}>
              <IoDocument /> Student
            </NavLink>
          </li>
          <li>
            <NavLink to={'/criteria'}>
              <IoDocument /> Criteria
            </NavLink>
          </li>
        </ul>
        {user && user.roles === 'admin' && (
          <div>
            <p className="menu-label"> Admin</p>
            <ul className="menu-list">
              <li>
                <NavLink to={'/users'}>
                  <IoPerson /> Users
                </NavLink>
              </li>
            </ul>
          </div>
        )}
        <p className="menu-label">Setting</p>
        <ul className="menu-list">
          <li>
            <button onClick={logOut} className="button is-white">
              <IoLogOut /> Logout
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default SideBar;
