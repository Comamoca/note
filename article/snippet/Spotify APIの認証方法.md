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

## アクセストークンを取る前のコードを取得する

まずSpotifyに以下のようなURLでアクセスする。`${}`となっている所は必要な値へと置き換える。
`https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URL}&scope=${scope}`

- REDIRECT_URL
Dashboardで設定したリダイレクトURLを設定する

- scope
青丸で囲ったこんな感じの文字列を**空白区切りで連結したもの**を指定する。
権限が必要なAPIにはこんな感じの表示があるので、開発時に必要な時は随時APIを更新するのが良さそう。
![](../imgs/Pasted%20image%2020231024112900.png)

上に書いたURLにアクセスすると、Spotifyの認証画面が出たあと自動的にリダイレクト先へ移動する。
移動した先のURLの`code=`より後の文字列をコピーする。これがトークンを取る際に必要になる。
## アクセストークンを取得する

次にSpotifyへ以下のようなリクエストを送信する。

URL: https://accounts.spotify.com/api/token
Header: Authorization: Basic `${encoded}`
method: "POST"
body: 以下の文字列をURLエンコードしたもの
  grant_type="authorization_code"
  code=code
  redirect_uri=REDIRECT_URL

`${encoded}`には以下の文字列をBase64エンコードしたものを指定する。
`${Client ID}:${Client Secret}`
`:`も必須なので必ず指定する。

認証に成功すると、以下のようなレスポンスが返ってくる。
```
{
  "access_token":"アクセストークン",
  "token_type":"Bearer",
  "expires_in":3600,
  "refresh_token":"リフレッシュトークン",
  "scope":"トークンが保持しているスコープの空白区切りの文字列"
}
```

`access_token`にアクセストークンが入っているので、それを使ってSpotify APIの各エンドポイントを叩いていく。

## トークンのリフレッシュ
これでAPIを叩くのに必要なアクセストークンは取得できた。ただこのトークンは1時間で切れてしまうので、定期的に更新する必要がある。

リフレッシュトークンを取得するには以下のようなリクエストを送信する。

URL: https://accounts.spotify.com/api/token
Header: Authorization: Basic `${encoded}`
method: "POST"
body: 以下の文字列をURLエンコードしたもの
  grant_type: "refresh_token"
  refresh_token: "アクセストークンに含まれていたrefresh_token文字列"