import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";

const Signup = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const navigate = useNavigate();

  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const userSignupFunction = async () => {
    if (
      userSignup.name === "" ||
      userSignup.email === "" ||
      userSignup.password === ""
    ) {
      toast.error("All Fields are required");
    }

    setLoading(true);
    try {
      const users = await createUserWithEmailAndPassword(
        auth,
        userSignup.email,
        userSignup.password
      );

      const user = {
        name: userSignup.name,
        email: users.user.email,
        uid: users.user.uid,
        role: userSignup.role,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      const userRefrence = collection(fireDB, "user");

      addDoc(userRefrence, user);

      setUserSignup({
        name: "",
        email: "",
        password: "",
      });

      toast.success("Signup Successfully");

      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setLoading(false);
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
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l9-4 9 4M3 7h18"
                />
              </svg>
            </div>
            <h3 className="text-white text-2xl font-semibold">Your-BaaZaar</h3>
          </div>

          <p className="text-white/90 text-center max-w-xs">
            Create your account and start exploring offers, managing orders, and
            enjoying a personalized shopping experience.
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
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Create an account
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Join Your-BaaZaar in a few simple steps
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </span>
              <input
                type="text"
                placeholder="Enter your full name"
                value={userSignup.name}
                onChange={(e) => {
                  setUserSignup({
                    ...userSignup,
                    name: e.target.value,
                  });
                }}
                className="mt-2 block w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 text-white dark:border-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-pink-300 outline-none"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </span>
              <input
                type="email"
                placeholder="Email..."
                value={userSignup.email}
                onChange={(e) => {
                  setUserSignup({
                    ...userSignup,
                    email: e.target.value,
                  });
                }}
                className="mt-2 block w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-pink-300 outline-none text-white"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </span>
              <input
                type="password"
                placeholder="Create a strong password"
                value={userSignup.password}
                onChange={(e) => {
                  setUserSignup({
                    ...userSignup,
                    password: e.target.value,
                  });
                }}
                className="mt-2 block w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-pink-300 outline-none text-white"
              />
            </label>

            <button
              type="button"
              onClick={userSignupFunction}
              className="w-full mt-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow"
            >
              Sign up
            </button>

            <div className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="text-pink-600 font-medium hover:underline"
              >
                Login
              </Link>
            </div>

            <div className="mt-4 text-center">
              <span className="text-xs text-gray-400">
                By creating an account, you agree to our{" "}
                <span className="text-pink-600">Terms</span> and{" "}
                <span className="text-pink-600">Privacy Policy</span>.
              </span>
            </div>
          </div>

          <div className="mt-6 md:hidden text-center">
            <span className="text-sm text-gray-500">Already a member? </span>
            <Link
              to="/login"
              className="text-sm font-medium text-pink-600 hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
