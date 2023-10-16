import waitForElements from "../../../shared/utils/waitForElements";
import {
  lyricsAnimationName,
  lyricsAnimationTimingFunction,
  lyricsAnimationDurationMsMax,
  lyricsAnimationDurationStepMs,
  lyricsAnimationDurationStepMultiplier,
  lyricsAnimationDelayMsMax,
  lyricsAnimationDelayStepMs,
  lyricsAnimationDelayStepMultiplier,
  lyricsContentProviderSelector,
  lyricsLinesSelecor,
} from "../constants/constants";
import getTextLineDirection from "../helpers/getTextLineDirection";

function setLyricsLinesStyle(): void {
  waitForElements([lyricsContentProviderSelector], () => {
    const lyricsLines = Array.from(
      document.querySelectorAll(lyricsLinesSelecor) as NodeListOf<HTMLElement>,
    );
    let positionIndex = 0;

    lyricsLines.forEach((lyricsLine) => {
      if (lyricsLine.textContent) {
        const { style } = lyricsLine;
        positionIndex += 1;

        if (window.getComputedStyle(lyricsLine).textAlign !== "center") {
          style.transformOrigin =
            getTextLineDirection(lyricsLine.textContent) === "rtl" ? "right" : "left";
        } else {
          style.transformOrigin = "center";
        }

        let animationDelay =
          lyricsAnimationDelayStepMs + positionIndex * lyricsAnimationDelayStepMultiplier;
        if (animationDelay > lyricsAnimationDelayMsMax) {
          animationDelay = lyricsAnimationDelayMsMax;
        }

        let animationDuration =
          lyricsAnimationDurationStepMs + positionIndex * lyricsAnimationDurationStepMultiplier;
        if (animationDuration > lyricsAnimationDurationMsMax) {
          animationDuration = lyricsAnimationDurationMsMax;
        }

        style.animationDelay = `${animationDelay}ms`;
        style.animationDuration = `${animationDuration}ms`;
        style.animationTimingFunction = lyricsAnimationTimingFunction;
        style.animationName = lyricsAnimationName;
      }
    });
  });
}

export default setLyricsLinesStyle;
