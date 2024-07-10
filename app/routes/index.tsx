import { Hono } from "hono";
import { html } from "hono/html";
import { serveStatic } from "@hono/node-server/serve-static";
import { index_renderer, md_renderer } from "../custom_render";

// TODO: 後で指定するロジックを書く
export const title = "Note";

const app = new Hono();

const outer = (children: any) =>
  html`
<!DOCTYPE html>
${children}
`;

app.use("/static/*", serveStatic({ root: "./static" }));

app.use("/*", async (ctx, next) => {
  ctx.setRenderer((content) => {
    return ctx.html(outer(md_renderer(content, title)));
  });

  await next();
});

app.use("/", async (ctx, next) => {
  ctx.setRenderer((content) => {
    return ctx.html(outer(index_renderer(content, title)));
  });

  await next();
});

app.get("/", (ctx) => {
  return ctx.render(
    <>
      <h1 class="text-4xl text-center mt-5">index</h1>

      <div class="mx-48 mt-5">
        <div id="search"></div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
	  window.addEventListener('DOMContentLoaded', (event) => {
		  new PagefindUI({
			  element: "#search",
			  showSubResults: true,
			  baseUrl: "/",
		  });
	  });`,
        }}
      />
    </>,
  );
});

export default app;
