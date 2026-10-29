
import { Link, useLocation } from "react-router-dom";
import { Menu, UserRound } from "lucide-react";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/courses": "My Courses",
  "/predictions": "Retention Predictions",
  "/history": "Learning History",
  "/profile": "My Profile",
  "/quiz-result": "Quiz Results",
};

function Navbar({ onMenuClick }) {
  const location = useLocation();

  const title =
    pageTitles[location.pathname] ||
    (location.pathname.startsWith("/courses/")
      ? "Course Details"
      : location.pathname.startsWith("/quiz/")
        ? "Take Quiz"
        : "Learning");

  let currentUser = {};

  try {
    currentUser = JSON.parse(
      localStorage.getItem("currentUser") || "{}"
    );
  } catch {
    currentUser = {};
  }

  const initials = (currentUser.name || "Student")
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 md:hidden"
        >
          <Menu size={22} />
        </button>

        <div>
          <h2 className="font-semibold text-gray-900 sm:text-lg">
            {title}
          </h2>
          <p className="hidden text-xs text-gray-500 sm:block">
            Learn, practice, and improve your retention
          </p>
        </div>
      </div>

      <Link
        to="/profile"
        className="flex items-center gap-3 rounded-xl p-1.5 hover:bg-gray-50"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 font-semibold text-white shadow-sm">
          {initials || <UserRound size={18} />}
        </div>

        <div className="hidden text-left sm:block">
          <p className="text-sm font-semibold text-gray-800">
            {currentUser.name || "Student"}
          </p>
          <p className="text-xs text-gray-500">Student Account</p>
        </div>
      </Link>
    </header>
  );
}

export default Navbar;
