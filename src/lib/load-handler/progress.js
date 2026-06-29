import { FINISH_EVENT, LOAD_EVENT, TOTAL_RESOURCES_COUNT } from "./constants";

(() => {
  if (typeof window === "undefined") return;

  // this will be 100 once everything is loaded
  window.__progress__ = 0;
})();

// number of resources reported so far
let loaded = 0;

// notify something is loaded
export const onResourceLoaded = (name = "") => {
  loaded = Math.min(loaded + 1, TOTAL_RESOURCES_COUNT);

  const complete = loaded >= TOTAL_RESOURCES_COUNT;

  // round so the bar reaches exactly 100 on the last resource, regardless of
  // how the count divides (e.g. 3 resources -> 33/67/100 instead of 99).
  window.__progress__ = complete
    ? 100
    : Math.round((loaded / TOTAL_RESOURCES_COUNT) * 100);

  document.dispatchEvent(
    new CustomEvent(LOAD_EVENT, {
      detail: {
        name,
        loaded,
        total: TOTAL_RESOURCES_COUNT,
        progress: window.__progress__,
        complete,
      },
    }),
  );

  if (complete) {
    document.dispatchEvent(new CustomEvent(FINISH_EVENT));
  }
};

export const onFinishedLoad = (cb = () => {}) => {
  if (loaded >= TOTAL_RESOURCES_COUNT) {
    return cb();
  }

  document.addEventListener(
    FINISH_EVENT,
    () => {
      setTimeout(cb, 1000);
    },
    { once: true },
  );
};
