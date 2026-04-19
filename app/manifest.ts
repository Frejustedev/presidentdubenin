import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Le Septennat",
    short_name: "Septennat",
    description:
      "Gouvernez le Bénin pendant 7 ans. Chaque décision compte.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0b1018",
    theme_color: "#0b1018",
    lang: "fr",
    categories: ["games", "simulation", "entertainment"],
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
