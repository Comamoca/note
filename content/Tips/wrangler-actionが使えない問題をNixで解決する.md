[ブログ](https://comamoca.dev)をGitHub Actionsからデプロイしようとしてたらこういうエラーにでくわした。


https://github.com/Comamoca/blog/actions/runs/11778908967/job/32806274487

```
Run cloudflare/wrangler-action@v3
  with:
    apiToken: ***
    accountId: ***
    command: pages deploy ./_site --project-name=blog --commit-dirty=true
    quiet: false
  env:
    TMPDIR: /home/runner/work/_temp
🔍 Checking for existing Wrangler installation
  ⚠️ Wrangler not found or version is incompatible. Installing...
📥 Installing Wrangler
Error: Unable to locate executable file: bun. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also check the file mode to verify the file is executable.
Error: 🚨 Action failed
```

なんかよく分からないけどwrangler自体のインストールに失敗する。
数日潰して試行錯誤したけど解決できなかったので全部Nixで解決することにした。

https://github.com/Comamoca/blog/blob/main/.github/workflows/deploy.yaml

30行ないのでここにも全部載せてみる。


```yaml
on:
  workflow_dispatch:
  push:
    branches:
      - "main"

jobs:
  deploy:
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - uses: actions/checkout@v4
      - uses: cachix/install-nix-action@v27
        with:
          github_access_token: ${{ secrets.GITHUB_TOKEN }}
      - name: Build & Deploy
        env:
          RELEASE: 1
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
        run: |
          nix develop --command deno task build-pages
          nix develop --command wrangler pages deploy ./_site --project-name=blog --commit-dirty=true
```

このActionsのミソは`nix develop --command`で、これを使うと`nix develop`の環境で任意のコマンドを実行できる。
つまり、**普段開発に使っている環境をそのままCI持ち込める**。

自分のブログはOGP生成にsharpを使っていてそれがlibvipsっていうネイティブライブラリに依存してるけど、それも全部込み込みで構築された環境を用意できる。
この手のネイティブが絡む環境構築はトラブルが起こりがちだったけど、libvipsがない旨のエラーに遭遇こそすれlibvipsのインストール自体は秒で終えられた。

また、`nix develop --command`は副作用を許容するのでnpmのような他のパッケージマネージャとNixを併用することが用意になる。

この構成だと純粋性こそ失われるものの、ネイティブライブラリとかNode.jsとかインストールが面倒な類のものを確実にインストールして、Nixで構築するのが面倒なnpmパッケージだけnpmでそのままインストールできる。つまり**Nixと既存のパッケージマネージャの良いとこ取り**ができる。

この構成は現状かなり上手くいってるのでこれからも色々試していきたい。
