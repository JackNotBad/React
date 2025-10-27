export function nettoyerTexte(input) {
  const str = input == null ? "" : String(input);
  return str.replace(/\r\n/g, "<br/>").replace(/\n/g, "<br/>");
}

export const backPublicPath = "http://localhost:8000/uploads/";