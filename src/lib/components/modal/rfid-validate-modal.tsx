type RfIdValidateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  status?: "loading" | "success" | "error";
  children?: React.ReactNode;
};

export function RfIdValidateModal({
  isOpen,
  onClose,
  title = "RFID Validation",
  message = "Waiting for card reading...",
  status = "loading",
  children,
}: RfIdValidateModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div style={styles.overlay} onClick={handleBackdropClick}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2 style={styles.title}>{title}</h2>
          <button
            onClick={onClose}
            style={styles.closeButton}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div style={styles.content}>
          <div style={styles.iconContainer}>
            {status === "loading" && <div style={styles.spinner} />}
            {status === "success" && <span style={styles.successIcon}>✓</span>}
            {status === "error" && <span style={styles.errorIcon}>✕</span>}
          </div>

          {status === "loading" && <p style={styles.message}>{message}</p>}

          {children}
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 1000,
    animation: "fadeIn 0.2s ease-out",
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
    minWidth: "320px",
    maxWidth: "90vw",
    overflow: "hidden",
    animation: "slideUp 0.3s ease-out",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 20px",
    borderBottom: "1px solid #e5e7eb",
    backgroundColor: "#f9fafb",
  },
  title: {
    margin: 0,
    fontSize: "18px",
    fontWeight: 600,
    color: "#1f2937",
  },
  closeButton: {
    background: "none",
    border: "none",
    fontSize: "18px",
    color: "#6b7280",
    cursor: "pointer",
    padding: "4px 8px",
    borderRadius: "4px",
    transition: "all 0.2s",
  },
  content: {
    padding: "32px 24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "64px",
    height: "64px",
  },
  spinner: {
    width: "48px",
    height: "48px",
    border: "4px solid #e5e7eb",
    borderTopColor: "#3b82f6",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  successIcon: {
    fontSize: "48px",
    color: "#3b82f6",
    fontWeight: "bold",
  },
  errorIcon: {
    fontSize: "48px",
    color: "#ef4444",
    fontWeight: "bold",
  },
  message: {
    margin: 0,
    fontSize: "16px",
    color: "#4b5563",
    textAlign: "center",
  },
};
