import React, { useEffect, useRef } from "react";

/**
 * Modal qui :
 * - bloque le scroll du body quand open === true
 * - permet de scroller à l'intérieur de la modal
 * - ferme la modal en cliquant n'importe où (dans la modal ou sur le backdrop)
 *   sauf si l'utilisateur a fait un mouvement > THRESHOLD entre pointerdown et pointerup
 *
 * Props :
 * - open (bool)
 * - onClose (fn)
 * - photos (array string | {src, alt})
 * - imageMaxHeight (string) optionnel, ex "220px" ou "60vh"
 */

export default function ModalClickAnywhere({
  open = false,
  onClose = () => {},
  photos = [],
  imageMaxHeight = null,
}) {
  const contentRef = useRef(null);
  const pointerRef = useRef({
    isDown: false,
    startX: 0,
    startY: 0,
    moved: false,
  });

  const MOVE_THRESHOLD = 10;

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow || "";
      document.body.style.paddingRight = prevPaddingRight || "";
    };
  }, [open]);

  if (!open) return null;

  const handlePointerDown = (e) => {
    pointerRef.current.isDown = true;
    pointerRef.current.moved = false;

    const p = e.touches ? e.touches[0] : e;
    pointerRef.current.startX = p.clientX;
    pointerRef.current.startY = p.clientY;
  };

  const handlePointerMove = (e) => {
    if (!pointerRef.current.isDown) return;
    const p = e.touches ? e.touches[0] : e;
    const dx = Math.abs(p.clientX - pointerRef.current.startX);
    const dy = Math.abs(p.clientY - pointerRef.current.startY);
    if (dx > MOVE_THRESHOLD || dy > MOVE_THRESHOLD) {
      pointerRef.current.moved = true;
    }
  };

  const handlePointerUp = (e) => {
    if (!pointerRef.current.moved) {
      onClose();
    }
    pointerRef.current.isDown = false;
    pointerRef.current.moved = false;
  };

  const stopBackdropWheel = (e) => {
    const el = contentRef.current;
    if (!el || el.scrollHeight <= el.clientHeight) {
      e.stopPropagation();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onTouchStart={handlePointerDown}
      onMouseDown={handlePointerDown}
      onTouchMove={(e) => {
        handlePointerMove(e);
        stopBackdropWheel(e);
      }}
      onMouseMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
      onMouseUp={handlePointerUp}
      // wheel sur backdrop
      onWheel={stopBackdropWheel}
      role="dialog"
      aria-modal="true"
      aria-label="Galerie images"
    >
      {/* La card */}
      <div
        className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded shadow-lg overflow-hidden"
        onClick={(e) => {
          e.stopPropagation();
        }}
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        {/* header sticky */}
        <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm flex items-center justify-between gap-4 px-4 py-3 border-b">
          <div className="text-sm text-gray-700">Cliquer n'importe où pour fermer</div>
        </div>

        {/* zone scrollable interne */}
        <div
          ref={contentRef}
          className="p-4 overflow-auto"
          style={{
            maxHeight: imageMaxHeight ? imageMaxHeight : "calc(90vh - 4.5rem)",
            WebkitOverflowScrolling: "touch",
          }}
          onWheel={(e) => {
            const el = contentRef.current;
            if (el && el.scrollHeight > el.clientHeight) {
              e.stopPropagation();
            }
          }}
          onTouchMove={(e) => {
            const el = contentRef.current;
            if (el && el.scrollHeight > el.clientHeight) {
              e.stopPropagation();
            }
          }}
        >
          {(!photos || photos.length === 0) && (
            <div className="text-center py-16 text-gray-500">Aucune image disponible</div>
          )}

          {photos && photos.length > 0 && (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2">
              {photos.map((p, i) => {
                const src = typeof p === "string" ? p : p?.src;
                const alt = typeof p === "string" ? `image-${i}` : p?.alt || `image-${i}`;
                const key = (src ? src : `img-${i}`) + `-${i}`;

                return (
                  <div
                    key={key}
                    className="rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center"
                  >
                    {src ? (
                      <img
                        src={src}
                        alt={alt}
                        loading="lazy"
                        className="block w-full"
                        style={{
                          maxHeight: imageMaxHeight ? imageMaxHeight : "calc(90vh - 8rem)",
                          objectFit: "contain",
                        }}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          const parent = e.currentTarget.parentNode;
                          if (parent && !parent.querySelector(".modal-fallback")) {
                            const fallback = document.createElement("div");
                            fallback.className =
                              "modal-fallback w-full py-8 bg-gray-300 flex items-center justify-center text-sm text-gray-600";
                            fallback.textContent = "Image non disponible";
                            parent.appendChild(fallback);
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full py-12 bg-gray-300 flex items-center justify-center text-sm text-gray-600">
                        Aucune image
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}