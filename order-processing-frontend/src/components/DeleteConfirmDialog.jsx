// src/components/DeleteConfirmDialog.jsx
import { XCircle } from "lucide-react";

const DeleteConfirmDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <div className="flex items-center mb-4">
          <XCircle className="text-red-600 mr-2" size={24} />
          <h2 className="text-lg font-semibold">Confirm Deletion</h2>
        </div>
        <p className="mb-6 text-gray-700">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmDialog;
