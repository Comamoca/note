## Denoとは

DenoとはNode.jsの作者Ryan dahl氏により開発されているJavaSctiptランタイムです。Node.jsの反省点などを踏まえ開発されています。

## Node.jsとの主な違い

- TopLevel awaitが可能
DenoはデフォルトでTopLevel awaitニ対応しています。非同期関数を使うためにasyncで囲う必要はもうありません。

- Web標準のAPIが使用可能
Denoの組み込み関数はWeb標準に則って実装されているため、ブラウザと同じAPIを使うことができます。例えばURL関数を用いてURLの生成・操作が可能です。

- エッジでの実行が可能
DenoはデプロイサービスDeno Deployなどがあり、エッジでの実行で有利です。

- ランタイムがシングルバイナリ
Denoのランタイムは一つのバイナリに集約されています。これによりインストールが非常に簡単になっています。

- パッケージマネージャが存在しない
Node.jsの反省点としてnpmが挙げられていたこともあり、Denoにはパッケージマネージャが存在しません。
なのでDenoには~~忌まわしき~~node_modulesが存在しません。常にクリーンな開発環境で開発することができます。

- デフォルトでTypeScriptが実行可能
Denoはデフォルトかつ設定無しでのTypeScriptの実行をサポートしています。tsconfig.jsなどでプロジェクトがごたつくこともありません。

- 開発に用いるツールがランタイムに集約されている
DenoはLSP、フォーマッタ、テスター、ドキュメント生成、タスクランナーが全てDenoコマンドで実行可能です。スクリプトをフォーマットするために新たにツールをインストールする手間はありません。

- リモートファイルを実行できる
Denoはパッケージマネージャが無いという特性から、リモートにあるスクリプトをいきなり実行することが可能です。これを活用してセットアップスクリプトをGistで公開してしてユーザーに実行させる、なんて事も可能です。

## Hello World
早速DenoでHello Worldしてみましょう。Denoの[公式のインストールガイド](https://deno.land/manual@v1.28.0/getting_started/installation)にアクセスしてインストールするための環境に合ったワンライナーをコピーして実行します。

実行が完了したら早速実行してみましょう！

コンソールで`deno`と打ってみて下さい。Nodeの様に対話型の実行環境が起動します。そしてそのプロンプトに
```ts
console.log("Hello Woeld!")
```
と打って実行してください。画面にHello World!と表示されるはずです。

次はファイルで実行してみましょう。`server.ts`というファイルを作成し、エディタを起動して次のスクリプトを書き込んでください。

```ts
import { serve } from "https://deno.land/std@0.164.0/http/server.ts";

const host = "0.0.0.0"
const port = 8080

const server = serve({ hostname: host, port: port });
console.log(`HTTP webserver running.  Access it at:  http://localhost:${port}/`);

//リクエストを待ち続ける
for await (const request of server) {
  let bodyContent = "Hello!🦕\nYour user-agent is:\n\n";
  bodyContent += request.headers.get("user-agent") || "Unknown";

  request.respond({ status: 200, body: bodyContent });
}
```
次に`deno run server.ts`を実行してください。するとエラーが発生するはずです。これはDenoがスクリプトの権限を指定しないとアクセスできない仕様になっているからです。この仕組みのお陰で安全性が担保出来無いスクリプトが危険な操作を行うことを防止できます。
Denoで権限が必要なプログラムを実行するには`--allow`フラグが必要です。ネット接続の場合は`--allow-net`と指定することで許可出来ます。
ここまでの話を踏まえ、server.tsをネット接続を許可して実施してみましょう。以下のコマンドを実行してください。
```
deno run --allow-net server.ts
```
すると以下のメッセージが表示されます。
```
HTTP webserver running.  Access it at:  http://localhost:8080
```
一番下にURLが表示されているのでそのURLにブラウザでアクセスしてみてください。するとブラウザの画面に
```
Hello!🦕
Your user-agent is:

ユーザーエージェント
```
と表示されるはずです。ユーザーエージェントの部分は環境によって変わります。複数のブラウザをインストールしている方は別のブラウザでアクセスしてみても良いでしょう。