import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("users"));
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);

  const logout = () => {
    localStorage.clear("users");
    navigate("/login");
  };

  const navList = (
    <ul className="flex space-x-3 text-white font-medium text-md px-5">
      <li><Link to={"/"}>Home</Link></li>
      <li><Link to={"/allproduct"}>All Product</Link></li>

      {!user && (
        <>
          <li><Link to={"/signup"}>Signup</Link></li>
          <li><Link to={"/login"}>Login</Link></li>
        </>
      )}

      {user?.role === "user" && (
        <li><Link to={"/user-dashboard"}>User</Link></li>
      )}

      {user?.role === "admin" && (
        <li><Link to={"/admin-dashboard"}>Admin</Link></li>
      )}

      {user && (
        <li className="cursor-pointer" onClick={logout}>Logout</li>
      )}

      <li><Link to={"/cart"}>Cart({cartItems.length})</Link></li>
    </ul>
  );

  return (
    <nav className="bg-purple-500 sticky top-0 z-50 py-3">
      <div className="container mx-auto px-4">

        
        <div className="
          grid grid-cols-1 
          lg:grid-cols-3
          items-center
          gap-4
        ">
          
          <div className="flex justify-center lg:justify-start">
            <Link to="/">
              <h2 className="font-bold text-white text-2xl">Your-BaaZaar</h2>
            </Link>
          </div>

          
          <div className="flex justify-center order-3 lg:order-none">
            {navList}
          </div>

          
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-xs md:max-w-md lg:max-w-sm">
              <SearchBar />
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
