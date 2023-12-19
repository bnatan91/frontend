import Navbar from '../../components/utils/Navbar';
import SideBar from '../../components/utils/SideBar';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="columns mt-6" style={{ minHeight: '100vh' }}>
        <div className="column is-2">
          <SideBar />
        </div>
        <div className="column has-background-light">
          <main>{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
