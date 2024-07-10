export function pagefind() {
  if (import.meta.env.PROD) {
    return (
      <>
        <link href="/pagefind/pagefind-ui.css" rel="stylesheet" />
        <script src="/pagefind/pagefind-ui.js"></script>
      </>
    );
  } else {
    return (
      <>
        <link href="/static/pagefind-ui.css" rel="stylesheet" />
        <script src="/static/pagefind-ui.js"></script>
      </>
    );
  }
}
