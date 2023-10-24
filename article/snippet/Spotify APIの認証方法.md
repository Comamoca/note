## 認証
Spotify APIの認証にはいくつか方法があるけど、最も一般的な方法は恐らく以下のドキュメントに書いてある方法。
クライアントでTokenを取得して、期限が切れたら随時更新できる。
[Authorization Code Flow](https://developer.spotify.com/documentation/web-api/tutorials/code-flow)

## 前準備
Spotifyアカウントを用意する。恐らく無料でも大丈夫。

[Developer Dashboard](https://developer.spotify.com/dashboard)にアクセスして、アプリを一つ作成する。
ここで大事なのが**Redirect URIs**。
ユーザーがアプリのアクセスを許可した際にこのURLに**認証情報のURL Query付きの文字列でリダイレクトされる**ため、自身が構築できるサーバーのURLにする必要がある。
もっともお手軽な`http://localhost:8000/callback`など`localhost`のアドレスにしておくのがオススメ。

## 必要なもの

- Client ID
- Client Secret

## アクセストークンを取る前のトークンを取得する

まずSpotifyに以下のようなデータをで**POST**投げる。

```
```