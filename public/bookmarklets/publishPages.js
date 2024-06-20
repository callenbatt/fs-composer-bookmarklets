const linkTag = document.createElement("link");
linkTag.rel = "stylesheet";
linkTag.href = "https://fs-composer-bookmarks.vercel.app/assets/index.css";
document.body.appendChild(linkTag);

const scriptTag = document.createElement("script");
scriptTag.type = "module";
scriptTag.crossorigin = true;
scriptTag.src = "https://fs-composer-bookmarks.vercel.app/assets/index.js";

scriptTag.onload = () => {
  window.publishPages();
};

document.body.appendChild(scriptTag);

javascript: void (() => {
  const e = document.createElement("link");
  (e.rel = "stylesheet"),
    (e.href = "https://fs-composer-bookmarks.vercel.app/assets/index.css"),
    document.body.appendChild(e);
  const t = document.createElement("script");
  (t.type = "module"),
    (t.crossOrigin = !0),
    (t.src = "https://fs-composer-bookmarks.vercel.app/assets/index.js"),
    (t.onload = () => {
      window.automations.publishPages();
    }),
    document.body.appendChild(t);
})();
