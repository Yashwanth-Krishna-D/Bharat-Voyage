// postcss.config.mjs
import postcssImport from "postcss-import";
import tailwindPostcss from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";

export default {
  plugins: [
    postcssImport(),
    tailwindPostcss(),   // <--- @tailwindcss/postcss plugin (new location)
    autoprefixer()
  ]
};
