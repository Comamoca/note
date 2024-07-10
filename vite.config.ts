import { defineConfig } from "vite";
import ssg from "@hono/vite-ssg";
import client from "honox/vite/client";
import mdx from "@mdx-js/rollup";
import honox from "honox/vite";
import rehypeShiki from "@shikijs/rehype";
import gfm from "remark-gfm";

const entry = "./app/server.ts";

export default defineConfig(({ mode }) => {
  if (mode == "client") {
    return {
      build: {
        rollupOptions: {
          // external: ["@pagefind/default-ui"],
          input: ["/app/style.css"],

          output: {
            assetFileNames: "static/assets/[name].[ext]",
          },
          target: ["es2022", "edge89", "firefox89", "chrome89", "safari15"],
        },
      },
      plugins: [
        honox(),
        client(),
        ssg({ entry }),
        mdx({
          jsxImportSource: "hono/jsx",
          rehypePlugins: [gfm, [rehypeShiki, {
            theme: "github-light",
          }]],
        }),
      ],
    };
  } else {
    return {
      build: {
        rollupOptions: {
          // external: ["@pagefind/default-ui"],
          input: ["/app/style.css"],

          output: {
            assetFileNames: "static/assets/[name].[ext]",
          },
        },
        target: ["es2022", "edge89", "firefox89", "chrome89", "safari15"],
      },
      plugins: [
        honox(),
        client(),
        ssg({ entry }),
        mdx({
          jsxImportSource: "hono/jsx",
          rehypePlugins: [gfm, [rehypeShiki, {
            theme: "github-light",
          }]],
        }),
      ],
    };
  }
});
