**アドカレ原稿の下書きです。大きく変更されることがあるのであしからず**

前座

### 想定する読者
- Denoの基本的な使い方を理解している
- TypeScriptの基本的な構文を理解している
- Misskeyアカウントを所持している

## DenoではMisskey公式SDKが使える

該当のノート

公式でサポートはしていませんが、Misskeyの公式JavaSctipt SDK [misskey.js](https://github.com/syuilo/misskeyjs)はDenoからでも使う事が出来ます。今回はこれを使って簡単なMisskeyアプリを作ってみましょう。

## 認証方法には2種類ある

Misskeyにはトークンによる認証とMiAuthによる認証の2種類の方法があります。

## トークンによる認証

## MiAuthによる認証
MisskeyではOAuth認証ではなく、独自形式の[MiAuth](https://misskey-hub.net/ja/docs/for-developers/api/token/miauth/)という認証形式を使ってユーザー認証を行ないます。
以前はOAuthだったらしいです。


さて、これからMiAuthによる認証を行いますが、misskey.jsには認証を行う機能が存在しません。(執筆当時)
そこで、MiAuthを簡単に実行できるラッパーを[用意しました。](https://github.com/Comamoca/miauth.js)
(ちなみにNode.jsにも対応しています。)
今回はこれを用いて認証処理を書いていきます。

まず始めに認証を試して見るため、以下のスクリプトを実行してみてください。


try_miauth.ts
```ts
// exsampleのスクリプト
```
`deno run -A try_miauth.ts`
以下のようなURLが表示されるので、ブラウザからアクセスして、権限を許可してください。
その後ターミナルに戻り、Enterを押してください。

すると以下のようなメッセージと共に英数字が表示されます。これがあなたのトークンです。これを用いてMisskeyのAPIを操作することができます。
