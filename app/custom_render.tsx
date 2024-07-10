import { pagefind } from "./pagefind";
import { HasIslands } from "honox/server";

const Header = (props: { title: string }) => {
  return (
    <head>
      <meta charset="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />
      <link rel="icon" href="/static/favicon.svg" type="image/svg+xml" />
      <title>{props.title}</title>
      {import.meta.env.PROD
        ? (
          <>
            {
              /*
            <HasIslands>
              <script type="module" src="/static/client.js"></script>
            </HasIslands>
		    */
              <link rel="stylesheet" href="/static/assets/style.css" />
            }
          </>
        )
        : (
          <>
            <script type="module" src="/app/client.ts" />
            <link rel="stylesheet" href="/app/style.css" />
          </>
        )}
      {pagefind()}
    </head>
  );
};

export function md_renderer(content: any, title: string) {
  return (
    <html lang="ja">
      <Header title={title} />
      <body>
        <div class="flex justify-center mx-auto my-5">
          <div class="prose">{content}</div>
        </div>
      </body>
    </html>
  );
}

export function index_renderer(content: any, title: string) {
  return (
    <html lang="ja">
      <head>
        <Header title={title} />
      </head>
      <body>{content}</body>
    </html>
  );
}
