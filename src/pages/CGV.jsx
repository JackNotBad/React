import CGVFile from "/docs/CGV_Canopees.pdf";

export default function CGV() {
  return (
    <div className="max-w-300 mx-auto px-5 py-12">
      <iframe
        src={CGVFile}
        title="Conditions Générales de vente"
        className="w-full h-[80vh] border rounded"
      />
    </div>
  );
}