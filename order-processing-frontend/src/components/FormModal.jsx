import { X } from 'lucide-react';

const FormModal = ({ isOpen, title, onClose, onSubmit, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="space-y-4"
        >
          {children}
          <div className="flex justify-end gap-2 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:text-black">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
