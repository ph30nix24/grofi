import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Grofi - Smart Financial Growth Partner",
    short_name: "Grofi",
    description:
      "Compare and apply for top personal loans, home loans, business loans, and credit cards across leading Indian banks and NBFCs.",
    start_url: "/",
    display: "standalone",
    background_color: "#FDFBF7",
    theme_color: "#02474D",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
