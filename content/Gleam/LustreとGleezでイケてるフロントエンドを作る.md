ScrapboxをWeb上から編集してるとSKKのCtrl-jがFirefoxの検索バーのキーバインドとバッティングして体験が最悪だったのでこっちで書いていく。

こんなものを作ってみた

<div align="center">
<img alt="Demo image" src="https://raw.githubusercontent.com/Comamoca/sandbox/main/ex_gleam_lustre_gleez/imgs/screenshot.png" />
</div>

Repo:
https://github.com/comamoca/sandbox/tree/main/ex_gleam_lustre_gleez/

## Gleezについて

Gleezのサイト

https://gleez.netlify.app

Lustre向けにTailwindを使ったコンポーネントを提供している。
立ち位置としては[shadcn/ui](https://ui.shadcn.com/)に近い。

## インストール

Lustreと併用する前提で書いていく。

まずはLustre本体をインストールする。

```sh
gleam add lustre
```

次に開発ツールとTailwindをインストールする。

```sh
gleam add lustre_dev_tools --dev
gleam run -m lustre/dev -- add tailwind
```

Gleezのコンポーネントを自動で展開してくれるツールをインストールする。

```sh
gleam add gleez --dev
```

実際にコンポーネントを展開するには、こんな感じでコマンドを実行する。
これらのコマンドはコンポーネントのページにそれぞれ書いてあるので、それを逐次実行する。

```sh
gleam run -m gleez add button
```

Tailwindのinput用のCSSを用意する。
ここでは`global.css`という名前でプロジェクトルートに置くことにする。

中身は以下の通り。

```css
/* global.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
@layer base {
  :root,
  .light {
    --neutral: 240 10% 40%;
    --neutral-foreground: 220 23% 95%;

    --primary: 331 82% 64%;
    --primary-foreground: 220 23% 95%;

    --secondary: 30 81% 63%;
    --secondary-foreground: 220 23% 95%;

    --success: 109 58% 40%;
    --success-foreground: 220 23% 95%;

    --info: 220 91% 54%;
    --info-foreground: 220 23% 95%;

    --warning: 35 77% 49%;
    --warning-foreground: 220 23% 95%;

    --danger: 347 87% 44%;
    --danger-foreground: 220 23% 95%;
  }

  .dark {
    --neutral: 240 10% 60%;
    --neutral-foreground: 240 21% 15%;

    --primary: 331 82% 64%;
    --primary-foreground: 240 21% 15%;

    --secondary: 30 81% 63%;
    --secondary-foreground: 240 21% 15%;

    --success: 115 54% 76%;
    --success-foreground: 240 21% 15%;

    --info: 217 92% 76%;
    --info-foreground: 240 21% 15%;

    --warning: 41 86% 83%;
    --warning-foreground: 240 21% 15%;

    --danger: 343 81% 75%;
    --danger-foreground: 240 21% 15%;
  }
}
```

ファイルを作成したら以下のコマンドを実行する。
`global.css`の部分はさっき作ったCSSファイルを指定する。

```sh
gleam run -m lustre/dev -- start --tailwind-entry=global.css
```

開発サーバが立ち上がったら成功。
[localhost:1234](http://localhost:1234/)にアクセスするとプレビューが見れる。

手元で生じた不具合として、開発サーバーを立ち上げたまま編集を保存してリロードするとCSSが適用されなくなるものがある。
もしその不具合が生じたら面倒だけどもう一度サーバーを起動し直すと良い。
