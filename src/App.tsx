import { useState } from "react";
import { RfIdValidateModal, useRFIDReader } from "./lib/main";

function App() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [rfidCode, setRfidCode] = useState("");

  const { inputRef, handleKeyDown } = useRFIDReader({
    minLength: 8,
    maxLength: 12,
    timeoutDuration: 500,
    active: isOpenModal,
    onRead: (code) => {
      setRfidCode(code);
      setStatus("success");

      setTimeout(() => {
        setIsOpenModal(false);
      }, 300);
    },
  });

  const handleOpenModal = () => {
    setIsOpenModal(true);
    setStatus("loading");
  };

  return (
    <>
      <section style={styles.container}>
        <div style={styles.card}>
          <div style={styles.iconWrapper}>
            <svg
              style={styles.icon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="2" y="5" width="20" height="14" rx="3" />
              <path d="M7 15h2" />
              <path d="M15 15h2" />
              <circle cx="12" cy="12" r="3" />
              <path d="M12 9v0" />
            </svg>
          </div>

          <header style={styles.header}>
            <h2 style={styles.title}>RFID Reader</h2>
            <p style={styles.subtitle}>Scan your card to continue</p>
          </header>

          <div style={styles.inputGroup}>
            <input
              ref={inputRef}
              onKeyDown={handleKeyDown}
              value={rfidCode}
              type="text"
              placeholder="RFID card code"
              style={styles.input}
              readOnly
            />
            <button style={styles.button} onClick={handleOpenModal}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 7V5a2 2 0 012-2h2" />
                <path d="M17 3h2a2 2 0 012 2v2" />
                <path d="M21 17v2a2 2 0 01-2 2h-2" />
                <path d="M7 21H5a2 2 0 01-2-2v-2" />
                <circle cx="12" cy="12" r="4" />
              </svg>
              Scan
            </button>
          </div>

          <p style={styles.hint} onClick={handleOpenModal}>
            Click "Scan" and hold your card near the reader
          </p>
        </div>

        <footer style={styles.footer}>
          <span style={styles.footerText}>React RFID Reader Library</span>
        </footer>
      </section>

      {isOpenModal && (
        <RfIdValidateModal
          isOpen={isOpenModal}
          onClose={() => setIsOpenModal(false)}
          status={status}
        />
      )}
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    width: "100%",
    background:
      "linear-gradient(145deg, #f8fafc 0%, #e2e8f0 50%, #f8fafc 100%)",
    padding: "20px",
    boxSizing: "border-box",
  },

  card: {
    padding: "40px",
    borderRadius: "24px",
    backgroundColor: "#ffffff",
    width: "100%",
    maxWidth: "420px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow:
      "0 25px 60px -15px rgba(0, 0, 0, 0.1), 0 0 50px rgba(56, 189, 248, 0.05)",
    border: "1px solid rgba(226, 232, 240, 0.8)",
  },

  iconWrapper: {
    width: "80px",
    height: "80px",
    borderRadius: "20px",
    background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "24px",
    boxShadow: "0 10px 30px -5px rgba(14, 165, 233, 0.3)",
  },

  icon: {
    width: "40px",
    height: "40px",
    color: "white",
  },

  header: {
    textAlign: "center",
    marginBottom: "32px",
  },

  title: {
    margin: 0,
    fontSize: "1.75rem",
    fontWeight: 700,
    color: "#1e293b",
    letterSpacing: "-0.02em",
  },

  subtitle: {
    margin: "8px 0 0",
    fontSize: "0.95rem",
    color: "#64748b",
    fontWeight: 400,
  },

  inputGroup: {
    display: "flex",
    gap: "12px",
    width: "100%",
    marginBottom: "20px",
  },

  input: {
    flex: 1,
    padding: "14px 18px",
    fontSize: "0.95rem",
    borderRadius: "12px",
    border: "2px solid #e2e8f0",
    backgroundColor: "#f8fafc",
    color: "#1e293b",
    outline: "none",
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    letterSpacing: "0.5px",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },

  button: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "14px 20px",
    fontSize: "0.95rem",
    fontWeight: 600,
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
    color: "white",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 4px 15px -3px rgba(14, 165, 233, 0.3)",
    whiteSpace: "nowrap",
  },

  hint: {
    margin: 0,
    fontSize: "0.8rem",
    color: "#94a3b8",
    textAlign: "center",
  },

  footer: {
    marginTop: "40px",
  },

  footerText: {
    fontSize: "0.75rem",
    color: "#94a3b8",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  },
};

export default App;
