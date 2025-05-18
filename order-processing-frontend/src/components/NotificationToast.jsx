// src/components/NotificationToast.jsx
import { useEffect } from "react";
import { X } from "lucide-react";

const NotificationToast = ({ notifications, onRemove }) => {
  useEffect(() => {
    const timers = notifications.map((_, idx) =>
      setTimeout(() => onRemove(idx), 5000)
    );
    return () => timers.forEach(clearTimeout);
  }, [notifications, onRemove]);

  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {notifications.map((note, idx) => (
        <div
          key={idx}
          className={`flex items-center justify-between p-4 rounded shadow ${
            note.type === "error"
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          <p>{note.message}</p>
          <button onClick={() => onRemove(idx)}>
            <X size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationToast;
