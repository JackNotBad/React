import CGUFile from "/docs/CGU_Canopees.pdf";

export default function CGU() {
  return (
    <div className="max-w-300 mx-auto px-5 py-12">
      <iframe
        src={CGUFile}
        title="Conditions Générales d’Utilisation"
        className="w-full h-[80vh] border rounded"
      />
    </div>
  );
}