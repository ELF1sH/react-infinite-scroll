export const REFERENCE_WIDTH = 1920;
export const REFERENCE_HTML_FONT_SIZE = 16;

export const remsToPixels = (rems: number): number => {
  if (!window) return rems * REFERENCE_HTML_FONT_SIZE;

  const windowWidth = window.innerWidth;
  const scaleRatio = REFERENCE_WIDTH / windowWidth;
  const adaptiveHtmlFontSize = REFERENCE_HTML_FONT_SIZE / scaleRatio;

  return rems * adaptiveHtmlFontSize;
};

export const pixelsToRems = (pixels: number): number => {
  if (!window) return pixels / REFERENCE_HTML_FONT_SIZE;

  const windowWidth = window.innerWidth;
  const scaleRatio = REFERENCE_WIDTH / windowWidth;
  const adaptiveHtmlFontSize = REFERENCE_HTML_FONT_SIZE / scaleRatio;

  return pixels / adaptiveHtmlFontSize;
};
