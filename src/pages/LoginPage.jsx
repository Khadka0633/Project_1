import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [mode, setMode] = useState("signin"); // "signin" | "signup"
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    let result;
    if (mode === "signin") {
      result = login({ email: form.email, password: form.password });
    } else {
      if (!form.name.trim()) {
        setError("Please enter your name.");
        setLoading(false);
        return;
      }
      result = register({ name: form.name, email: form.email, password: form.password });
    }

    if (result?.error) {
      setError(result.error);
    } else {
      navigate(from, { replace: true });
    }
    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        {/* Logo */}
        <div style={styles.logo}>
          <div style={styles.logoCircle}>H</div>
          <div>
            <div style={styles.logoName}>HIMSAMA</div>
            <div style={styles.logoSub}>LUXURY BAGS</div>
          </div>
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          <button
            style={{ ...styles.tab, ...(mode === "signin" ? styles.tabActive : {}) }}
            onClick={() => { setMode("signin"); setError(""); }}
          >
            Sign In
          </button>
          <button
            style={{ ...styles.tab, ...(mode === "signup" ? styles.tabActive : {}) }}
            onClick={() => { setMode("signup"); setError(""); }}
          >
            Create Account
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          {mode === "signup" && (
            <div style={styles.field}>
              <label style={styles.label}>Full Name</label>
              <input
                style={styles.input}
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={update}
                required
              />
            </div>
          )}

          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              style={styles.input}
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={update}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={update}
              required
              minLength={6}
            />
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? "Please wait..." : mode === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>

        {/* Switch mode link */}
        <p style={styles.switchText}>
          {mode === "signin" ? "New to Himsama? " : "Already have an account? "}
          <button
            style={styles.switchLink}
            onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(""); }}
          >
            {mode === "signin" ? "Create an account" : "Sign in"}
          </button>
        </p>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#1a1008",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 16px",
  },
  card: {
    background: "#faf8f3",
    borderRadius: "16px",
    padding: "48px 40px",
    width: "100%",
    maxWidth: "420px",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "32px",
    justifyContent: "center",
  },
  logoCircle: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "#2a1a08",
    color: "#c9a96e",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
    fontSize: "18px",
  },
  logoName: {
    fontWeight: "600",
    fontSize: "16px",
    letterSpacing: "3px",
    color: "#2a1a08",
  },
  logoSub: {
    fontSize: "10px",
    letterSpacing: "2px",
    color: "#888",
  },
  tabs: {
    display: "flex",
    borderBottom: "1px solid #e0d8cc",
    marginBottom: "28px",
  },
  tab: {
    flex: 1,
    background: "none",
    border: "none",
    padding: "10px",
    cursor: "pointer",
    fontSize: "14px",
    color: "#888",
    fontWeight: "400",
    borderBottom: "2px solid transparent",
    marginBottom: "-1px",
    transition: "color 0.2s",
  },
  tabActive: {
    color: "#2a1a08",
    fontWeight: "600",
    borderBottom: "2px solid #c9a96e",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "12px",
    fontWeight: "500",
    letterSpacing: "0.5px",
    color: "#555",
    textTransform: "uppercase",
  },
  input: {
    padding: "12px 14px",
    border: "1px solid #d8cfc4",
    borderRadius: "8px",
    fontSize: "14px",
    color: "#2a1a08",
    background: "#fff",
    outline: "none",
    transition: "border-color 0.2s",
  },
  error: {
    color: "#b94040",
    fontSize: "13px",
    margin: "0",
    padding: "10px 14px",
    background: "#fdf0f0",
    borderRadius: "8px",
    border: "1px solid #f0c8c8",
  },
  btn: {
    background: "#2a1a08",
    color: "#c9a96e",
    border: "none",
    borderRadius: "8px",
    padding: "14px",
    fontSize: "14px",
    fontWeight: "600",
    letterSpacing: "1px",
    cursor: "pointer",
    marginTop: "4px",
    transition: "opacity 0.2s",
  },
  switchText: {
    textAlign: "center",
    fontSize: "13px",
    color: "#888",
    marginTop: "20px",
  },
  switchLink: {
    background: "none",
    border: "none",
    color: "#c9a96e",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
    textDecoration: "underline",
  },
};
