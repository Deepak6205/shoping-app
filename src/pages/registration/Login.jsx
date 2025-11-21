import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import Loader from "../../components/loader/Loader";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const Login = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const navigate = useNavigate();

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const userLoginFunction = async () => {
    if (userLogin.email === "" || userLogin.password === "") {
      toast.error("All Fields are required");
    }

    setLoading(true);
    try {
      const users = await signInWithEmailAndPassword(
        auth,
        userLogin.email,
        userLogin.password
      );

      try {
        const q = query(
          collection(fireDB, "user"),
          where("uid", "==", users?.user?.uid)
        );
        const data = onSnapshot(q, (QuerySnapshot) => {
          let user;
          QuerySnapshot.forEach((doc) => (user = doc.data()));
          localStorage.setItem("users", JSON.stringify(user));
          setUserLogin({
            email: "",
            password: "",
          });
          toast.success("Login Successfully");
          setLoading(false);
          if (user.role === "user") {
            navigate("/user-dashboard");
          } else {
            navigate("/admin-dashboard");
          }
        });
        return () => data;
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Login Failed");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <Loader />
        </div>
      )}

      <div className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        <div className="hidden md:flex flex-col items-center justify-center p-8 bg-purple-600">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
              
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l9-4 9 4M3 7h18" />
              </svg>
            </div>
            <h3 className="text-white text-2xl font-semibold">Your-BaaZaar</h3>
          </div>

          <p className="text-white/90 text-center max-w-xs">
            Welcome back — sign in to view your orders, manage your account, and continue shopping.
          </p>

          <div className="mt-6 w-full max-w-xs">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyb6eAvGsj1SkCj0MqBqk-jrras0-YWqlZKQ&s"
              alt="shopping"
              className="rounded-lg shadow-sm object-cover w-full h-40"
            />
          </div>
        </div>

        
        <div className="p-8 md:p-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Sign in to your account</p>
            </div>
            
          </div>

          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</span>
              <input
                type="email"
                name="email"
                placeholder="Email..."
                value={userLogin.email}
                onChange={(e) => {
                  setUserLogin({
                    ...userLogin,
                    email: e.target.value,
                  });
                }}
                className="text-white mt-2 block w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-pink-300 outline-none"
              />
            </label>

            <label className="block">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</span>
                
              </div>
              <input
                type="password"
                placeholder="Your password"
                value={userLogin.password}
                onChange={(e) => {
                  setUserLogin({
                    ...userLogin,
                    password: e.target.value,
                  });
                }}
                className="text-white mt-2 block w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-pink-300 outline-none"
              />
            </label>

            <button
              type="button"
              onClick={userLoginFunction}
              className="w-full mt-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow"
            >
              Sign in
            </button>

            <div className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to={"/signup"} className="text-pink-600 font-medium hover:underline">
                Create one
              </Link>
            </div>

            <div className="mt-4 text-center">
              <span className="text-xs text-gray-400">
                By continuing, you agree to our <span className="text-pink-600">Terms</span> and <span className="text-pink-600">Privacy Policy</span>.
              </span>
            </div>
          </div>

          <div className="mt-6 md:hidden text-center">
            <span className="text-sm text-gray-500">New here? </span>
            <Link to="/signup" className="text-sm font-medium text-pink-600 hover:underline">
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
