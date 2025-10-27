export default function Modal({ open, onClose, photos }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
    onClick={onClose}
    >
      <div className="bg-none p-6 rounded-lg w-full relative align-center"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 overflow-y-auto  w-fit mx-auto">
          {photos.map((photo, i) => (
            <img key={i} src={photo} alt="réalisation" className="w-150 h-150 object-cover rounded-lg self-center mx-auto" />
          ))}
        </div>
      </div>
    </div>
  );
}