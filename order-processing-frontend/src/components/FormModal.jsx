import { X } from 'lucide-react';

const FormModal = ({ isOpen, title, onClose, onSubmit, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-white hover:text-grey-200 bg-blue-600 rounded hover:bg-blue-700">
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
            <button type="button" onClick={onClose} className="px-4 py-2 text-white hover:text-grey-200 bg-blue-600 rounded hover:bg-blue-700">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600  text-white rounded hover:bg-blue-700 hover:text-grey-200">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
