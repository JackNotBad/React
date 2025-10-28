export function nettoyerTexte(input) {
  const str = input == null ? "" : String(input);
  return str.replace(/\r\n/g, "<br/>").replace(/\n/g, "<br/>");
}

export const uploadsPublicPath = "https://mspr2-symfony.alwaysdata.net/uploads/";
export const sitePublicPath = "https://mspr2-symfony.alwaysdata.net";