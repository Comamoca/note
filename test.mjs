import tester from "honkit-tester";

const mermaid = `<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
  mermaid.initialize({ startOnLoad: true });
</script>`;

console.log("Test Start...");
console.log(mermaid);

tester
  .builder()
  .withContent(
    `
	# Honkit Plugin test

	## About

	This text is test content for the Honkit plugin.
	${mermaid}
	`
  )
  .withLocalPlugin("..")
  .withLocalDir("../sample")
  .withBookJson({
    root: "./sample",
    plugins: "honkit-plugin-ningyo",
  })
  .create()
  .then((result) => {
    const index = result.get("index.html");
    console.log(index);
  });
