
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserRound, Mail, LogOut, Save } from "lucide-react";
import toast from "react-hot-toast";
import PageHeader from "../components/PageHeader";

function Profile() {
  const navigate = useNavigate();

  function getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem("currentUser") || "{}");
    } catch {
      return {};
    }
  }

  const [user, setUser] = useState(getCurrentUser);
  const [name, setName] = useState(user.name || "");
  const [message, setMessage] = useState("");

  function saveProfile(event) {
    event.preventDefault();

    const updatedUser = {
      ...user,
      name: name.trim(),
    };

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    const learners = JSON.parse(
      localStorage.getItem("learners") || "[]"
    );

    const updatedLearners = learners.map((learner) =>
      learner.id === updatedUser.id ? updatedUser : learner
    );

    localStorage.setItem("learners", JSON.stringify(updatedLearners));
    setUser(updatedUser);
    setName(updatedUser.name);
    setMessage("Your profile has been updated.");
    toast.success("Profile updated successfully!");
  }

  function logout() {
    localStorage.removeItem("currentUser");
    toast.success("Logged out successfully.");
    navigate("/login", { replace: true });
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Profile"
        description="Manage your student account details."
      />

      <div className="max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-white shadow-sm">
            <UserRound size={30} />
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight text-gray-950">
              {user.name || "Student"}
            </h2>
            <p className="text-xs text-gray-500">Student account</p>
          </div>
        </div>

        <form onSubmit={saveProfile} className="space-y-5">
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-700">
              Full name
            </label>
            <input
              required
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setMessage("");
              }}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-700">
              Email address
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50/80 px-4 py-3 text-gray-500">
              <Mail size={18} className="text-gray-400" />
              <span className="text-sm">{user.email || "No email available"}</span>
            </div>
            <p className="mt-1 text-xs text-gray-400">
              Email editing is not available in this demo.
            </p>
          </div>

          {message && (
            <p role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-neutral-800 active:scale-[0.99]"
          >
            <Save size={16} />
            Save changes
          </button>
        </form>

        <div className="mt-8 border-t border-gray-100 pt-6">
          <button
            type="button"
            onClick={logout}
            className="cursor-pointer inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 shadow-xs transition hover:bg-red-50 hover:border-red-300"
          >
            <LogOut size={16} />
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
