import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function UserDropdown() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Not logged in → show a plain "Sign In" link
  if (!user) {
    return (
      <button style={styles.signInBtn} onClick={() => navigate("/login")}>
        Sign In
      </button>
    );
  }

  // Logged in → show avatar with dropdown
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div style={styles.wrap} ref={ref}>
      <button style={styles.avatar} onClick={() => setOpen((o) => !o)} title={user.name}>
        {initials}
      </button>

      {open && (
        <div style={styles.dropdown}>
          <div style={styles.dropHeader}>
            <div style={styles.dropName}>{user.name}</div>
            <div style={styles.dropEmail}>{user.email}</div>
          </div>
          <div style={styles.divider} />
          <button style={styles.dropItem} onClick={() => { setOpen(false); navigate("/"); }}>
            My Account
          </button>
          <button
            style={{ ...styles.dropItem, color: "#b94040" }}
            onClick={() => { logout(); setOpen(false); navigate("/"); }}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  wrap: {
    position: "relative",
    display: "inline-block",
  },
  signInBtn: {
    background: "none",
    border: "1px solid currentColor",
    borderRadius: "6px",
    padding: "5px 12px",
    fontSize: "12px",
    letterSpacing: "1px",
    cursor: "pointer",
    color: "inherit",
    fontWeight: "500",
  },
  avatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "#2a1a08",
    color: "#c9a96e",
    border: "none",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "0.5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  dropdown: {
    position: "absolute",
    right: 0,
    top: "calc(100% + 10px)",
    background: "#fff",
    border: "1px solid #e0d8cc",
    borderRadius: "10px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
    minWidth: "200px",
    zIndex: 999,
    overflow: "hidden",
  },
  dropHeader: {
    padding: "14px 16px 10px",
  },
  dropName: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#2a1a08",
  },
  dropEmail: {
    fontSize: "12px",
    color: "#888",
    marginTop: "2px",
  },
  divider: {
    height: "1px",
    background: "#e0d8cc",
  },
  dropItem: {
    display: "block",
    width: "100%",
    background: "none",
    border: "none",
    textAlign: "left",
    padding: "12px 16px",
    fontSize: "13px",
    cursor: "pointer",
    color: "#2a1a08",
    transition: "background 0.15s",
  },
};
