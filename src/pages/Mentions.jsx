import legalMentionsFile from "/docs/Mentions_legales_Canopees.pdf";

export default function legalMentions() {
  return (
    <div className="max-w-300 mx-auto px-5 py-12">
      <iframe
        src={legalMentionsFile}
        title="Mentions Légales"
        className="w-full h-[80vh] border rounded"
      />
    </div>
  );
}