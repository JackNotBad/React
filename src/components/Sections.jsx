import parse from "html-react-parser";
import { nettoyerTexte, uploadsPublicPath } from '../utils';

export default function Section({
  title,
  text,
  imgSrc,
  imgAlt = "",
  imgFirst = false,
  containerClass = "",
  imgClass = "",
  textClass = "",
  children,
  details = [],
  onOpenDetails = () => {},
}) {
  const baseContainer = `
    flex flex-col text-center
    max-w-300 mx-auto p-5 box-content
    lg:flex-row lg:text-left lg:max-w-300 lg:py-26
  `;
  

  const baseImgClass = `
    object-contain
    max-w-88 w-full
    mx-auto mt-11
    lg:mt-0 lg:mx-0 lg:mr-26 lg:max-w-135 lg:w-135 lg:max-h-130 lg:h-130
  `;

  const baseTextClass = `
    mb-0 mt-5
    lg:mt-0 lg:mx-0 lg:mr-26 lg:max-w-135 lg:w-135 lg:max-h-130 lg:h-70
    flex flex-col justify-start
  `;

  const buttonClass = `
    inline-block bg-[var(--orange)] text-center
    text-white px-4 py-2 rounded shadow hover:bg-[var(--pink)] transition
  `;

  const TextBlock = (
    <div className={`${baseTextClass} ${textClass}`}>
      {children ?? <>{title}</>}
      <div className="mt-3">{parse(nettoyerTexte(text))}</div>

      {/* bouton */}
      {details && details.length > 0 && (
        <div className="mt-6">
          <button
            className={`${buttonClass}`}
            onClick={onOpenDetails}
            type="button"
            aria-label={`Voir les réalisations (${details.length})`}
          >
            Réalisations
          </button>
        </div>
      )}
    </div>
  );

  return (
    <section className={`${baseContainer} ${containerClass}`}>
      {imgFirst ? (
        <>
          {imgSrc && (
            <img
              src={`${uploadsPublicPath}${String(imgSrc).replace(/^\//, "")}`}
              alt={imgAlt}
              className={`${baseImgClass} ${imgClass}`}
            />
          )}
          {TextBlock}
        </>
      ) : (
        <>
          {TextBlock}
          {imgSrc && (
            <img
              src={`${uploadsPublicPath}${String(imgSrc).replace(/^\//, "")}`}
              alt={imgAlt}
              className={`${baseImgClass} ${imgClass}`}
            />
          )}
        </>
      )}
    </section>
  );
}