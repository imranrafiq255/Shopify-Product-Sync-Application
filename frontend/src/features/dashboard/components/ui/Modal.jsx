export default function ConfirmModal({ title, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-80">
        <p className="mb-4 font-medium">{title}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="border px-4 py-2 rounded cursor-pointer"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
