
import { NavLink } from "react-router-dom";
import {
  Brain,
  LayoutDashboard,
  BookOpen,
  TrendingUp,
  History,
  UserRound,
  GraduationCap,
  X,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "My Courses", path: "/courses", icon: BookOpen },
  { name: "Predictions", path: "/predictions", icon: TrendingUp },
  { name: "Learning History", path: "/history", icon: History },
  { name: "My Profile", path: "/profile", icon: UserRound },
];

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-200 md:sticky md:top-0 md:h-screen md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-gray-100 px-6">
          <div className="flex items-center gap-3">
            <img
              src="/brainicon.png"
              alt="Brain Icon"
              className="h-9 w-9 object-contain"
            />
            <div>
              <h1 className="font-bold tracking-tight text-gray-900">Memolearn</h1>
              <p className="text-xs text-gray-500">Smart Retention</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-4 pt-6">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Learning Menu
          </p>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                      isActive
                        ? "bg-black text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-100 hover:text-black"
                    }`
                  }
                >
                  <Icon size={19} />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-4">
          <div className="rounded-2xl border border-gray-200/80 bg-neutral-900 p-4 text-white">
            <div className="mb-1.5 flex items-center gap-2 text-white">
              <GraduationCap size={20} />
              <span className="text-sm font-semibold">Keep Learning!</span>
            </div>
            <p className="text-xs leading-5 text-gray-300">
              Practice regularly to strengthen recall and maximize your retention.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
