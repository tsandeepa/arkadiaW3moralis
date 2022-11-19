import Navbar from "./navbar";

const Layout = ({ children }) => {
  return (
    <>
      <div className="main-view"></div>
      <div className="container-main" >
        <Navbar />
        {children}
      </div>

    </>
  );
}

export default Layout;