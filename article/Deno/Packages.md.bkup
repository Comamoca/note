Denoで使えるライブラリ集

## 型関連
型に関係するライブラリ

### Dataclass
Typescript/Javascriptで構造体に近いデータ型を定義するための糖衣構文。

https://github.com/alexeyraspopov/dataclass

### ts-pattern
TypeScriptでパターンマッチをするためのライブラリ。

https://github.com/gvergnaud/ts-pattern

### monads
TypeScriptでRust likeなResult型などを提供するライブラリ。

https://github.com/sniptt-official/monads

### unknownutil
Denoでunknownな型を扱うためのライブラリ。

https://github.com/lambdalisue/deno-unknownutil

### TheAlgorithms
あらゆる言語でのアルゴリズムの実装例がまとまっているプロジェクトのTheAlgorithmsではTypeScriptもサポートされている。

https://github.com/TheAlgorithms/TypeScript

### Zod
言わずと知れたTypeScriptのバリデーションライブラリ。

https://github.com/colinhacks/zod

## フロントエンド
Webサイトの構築などで使えるライブラリ/ツールなど

### twind
つい最近バージョンがアップして破壊的変更があった。
古めのプロジェクトではマイグレーションがされていないものもあるので注意。
また、検索すると一番上に出てくる[`https://twind.dev`](https://twind.dev)は旧バージョンの公式サイトなので注意。
最新版のサイトは[`https://twind.style`](https://twind.style)。

https://github.com/tw-in-js/twind

### Fresh
Deno公式のフルスタックWebフレームワーク。
同じくDeno公式が提供しているデプロイサービス[Deno Deploy](https://deno.com/deploy)にてデプロイされることを想定して設計されている。

- Astroなどで採用されている**Islands Architecture**を採用
- エッジで実行される想定から**SSGをサポートしていない**
- フロントエンドライブラリには**Preactを採用**

などの特徴がある。特に最後のPreactを採用していることに関しては、Reactのライブラリが使えない可能性があるので要注意。

### Hono
CloudFlare WorkersなどのEdge環境で実行される事を想定している軽量で高速なWebフレームワーク。
そのシンプルな設計と実効速度からEdgeでのAPI開発において採用するケースが増えている。

https://github.com/honojs/hono

- Lume
Deno公式が開発しているDenoで作られたSSG。
(FreshがSSG出来ないのでその補完で作られたと予想)

https://lume.land

### SaaSKit
DenoとFreshで構築されているSaasテンプレート。SupabaseやStripeなどもサポートされている。

https://deno.com/saaskit

## Terminal
ターミナルアプリケーションをつくるためのライブラリなど

### Cliffy
Denoでコマンドライン引数をパースするためのライブラリ。

https://github.com/c4spar/deno-cliffy

### Tool
DenoのためのツールやDenoで作られたツールなど

### dnt
Deno公式が開発しているDenoで作られたパッケージをnpm向けに変換するためのツール。
これを使うことでDeno firstなパッケージ開発をすることが出来るようになる。

拙作のDeno/npmパッケージ`miauth.js`はこのツールを使ってDeno/npm両対応を実現している。
これについては[Misskeyアドカレの記事](https://zenn.dev/comamoca/articles/about-miauthjs)でも触れているのでぜひ

https://github.com/denoland/dnt

## API/サービス
Denoで実装されたAPIやDenoに関連するAPIなど。

### Deno Avatar
良サービスなのにイマイチ知名度が低いサービス。
アクセスするとランダムでかわいいDenoのアバター(アイコン)が返ってくる。
自分はフロントのアバター画像のモックなどで使っている。

https://deno-avatar.deno.dev/

### Deno sheld
GitHubのREADMEの上部によく貼ってあるバッジのDeno版を取得できるサービス。

https://shield.deno.dev

### nest.land
ブロックチェーンベースのパッケージレジストリ。一度公開されたファイルは**決して変更されない**などの特徴がある。

https://nest.land

### emoji2svg
拙作の絵文字をTwemoji SVGに変換するAPI。
リンクがSVGに置換される仕様なので、Markdownなのどに好きなサイズのTwemojiをSVGとして埋め込むことが出来る。
自分のリポジトリのアイキャッチのほとんどはこのAPIを使って絵文字を埋め込んでいる。

https://emoji2svg.deno.dev
