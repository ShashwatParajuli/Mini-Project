
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Brain, UserRound, Mail, Lock, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

function GoogleIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 48 48"
      aria-hidden="true"
    >
      <path
        fill="#EA4335"
        d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.2 5.3-4.6 6.9l7.4 5.7c4.3-4 6.9-9.9 6.9-17.1z"
      />
      <path
        fill="#FBBC05"
        d="M10.5 28.7c-.5-1.4-.8-2.9-.8-4.7s.3-3.3.8-4.7l-7.9-6.1C.9 16.4 0 20.1 0 24s.9 7.6 2.6 10.8l7.9-6.1z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.4-5.7c-2.1 1.4-4.8 2.3-8.5 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"
      />
    </svg>
  );
}

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const learners = JSON.parse(
      localStorage.getItem("learners") || "[]"
    );

    const normalizedEmail = email.trim().toLowerCase();

    const exists = learners.some(
      (user) => user.email.toLowerCase() === normalizedEmail
    );

    if (exists) {
      setError("An account with this email already exists.");
      return;
    }

    const learner = {
      id: String(Date.now()),
      name: name.trim(),
      email: normalizedEmail,
      password,
      createdAt: new Date().toISOString(),
    };

    learners.push(learner);

    localStorage.setItem("learners", JSON.stringify(learners));

    toast.success("Account created successfully! Please sign in.");
    navigate("/login", { state: { email: normalizedEmail } });
  }

  function handleGoogleSignup() {
    setError("");

    // Redirect to Google OAuth in the Flask backend.
    window.location.href = "http://localhost:5000/auth/google";
  }

  const fieldShell =
    "flex items-center gap-3 rounded-xl bg-white px-4 border border-gray-200 shadow-sm transition-all focus-within:border-gray-900 focus-within:ring-2 focus-within:ring-black/10";

  const inputClass =
    "w-full bg-transparent py-3.5 text-sm text-gray-900 outline-none placeholder:text-gray-400";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f3f3f3] p-4 lg:p-8">
      <div className="mx-auto grid min-h-[640px] w-full max-w-6xl items-center gap-8 lg:grid-cols-2">

        {/* Left: Registration form */}
        <div className="mx-auto w-full max-w-md px-2 py-6">
          <div className="inline-flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white shadow-sm">
              <Brain size={22} />
            </div>

            <span className="text-xl font-bold tracking-tight text-gray-900">
              Memolearn
            </span>
          </div>

          <h1 className="mt-8 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
            Create account
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Start your learning journey with us today.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">

            {/* Full name */}
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-700"
              >
                Full Name
              </label>

              <div className={fieldShell}>
                <UserRound size={18} className="shrink-0 text-gray-400" />

                <input
                  id="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your full name"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-700"
              >
                Email Address
              </label>

              <div className={fieldShell}>
                <Mail size={18} className="shrink-0 text-gray-400" />

                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-700"
              >
                Password
              </label>

              <div className={fieldShell}>
                <Lock size={18} className="shrink-0 text-gray-400" />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="At least 6 characters"
                  className={inputClass}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="cursor-pointer shrink-0 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <p
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            {/* Create account */}
            <button
              type="submit"
              className="w-full cursor-pointer rounded-xl bg-gray-950 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-black active:scale-[0.99]"
            >
              Create account
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300/70" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#f3f3f3] px-3 font-medium text-gray-500">
                or continue with
              </span>
            </div>
          </div>

          {/* Google sign-up */}
          <div>
            <button
              type="button"
              onClick={handleGoogleSignup}
              className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 shadow-sm transition hover:bg-gray-50 hover:border-gray-300 active:scale-[0.99]"
            >
              <GoogleIcon />
              Continue with Google
            </button>
          </div>

          {/* Sign in link */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-gray-950 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Right: Welcome panel */}
        <aside className="relative hidden min-h-[640px] overflow-hidden rounded-[2.5rem] bg-[#070707] text-white shadow-xl lg:flex lg:flex-col lg:justify-between p-10">
          <div className="pointer-events-none absolute -right-24 top-24 h-[3px] w-[620px] -rotate-45 bg-gradient-to-r from-transparent via-gray-500/60 to-gray-300/70" />
          <div className="pointer-events-none absolute -right-28 top-36 h-[6px] w-[620px] -rotate-45 bg-gradient-to-r from-transparent via-gray-500/50 to-gray-400/70" />
          <div className="pointer-events-none absolute -left-10 bottom-40 h-px w-72 -rotate-45 bg-gradient-to-r from-transparent to-indigo-400/60" />

          <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 text-neutral-800/80">
            <Brain size={280} strokeWidth={0.7} />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white">
              <Brain size={22} />
              Memolearn
            </div>
          </div>

          <div className="relative z-10 mt-auto pt-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Welcome to Memolearn
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-gray-300">
              Memolearn helps you remember what you learn with smart practice
              and spaced review. Join us and start building lasting knowledge
              today.
            </p>

            <div className="mt-8 rounded-3xl border border-white/10 bg-neutral-900/90 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold leading-snug text-white">
                Remember more, forget less. Start practicing now
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                Be among the first learners to experience the easiest way
                to improve your retention.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Register;
