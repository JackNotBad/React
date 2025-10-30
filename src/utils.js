export function nettoyerTexte(input) {
  const str = input == null ? "" : String(input);
  return str.replace(/\r\n/g, "<br/>")
            .replace(/\n/g, "<br/>")
            .replace(/<div([^>]*)>/g, "<p$1>")
            .replace(/<\/div>/g, "</p>");;
}

export const uploadsPublicPath = "https://mspr2-symfony.alwaysdata.net/uploads/";
export const sitePublicPath = "https://mspr2-symfony.alwaysdata.net";