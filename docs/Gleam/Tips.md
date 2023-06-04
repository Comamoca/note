一つの記事に書くには足らない情報など

## 関数の引数にある`on`や`with`について

Gleamのgun(ErlangのWebsocketライブラリ)ラッパー[nerf](https://hexdocs.pm/nerf/nerf/websocket.html)の[connect関数](https://hexdocs.pm/nerf/nerf/websocket.html#connect)の引数で初めて見つけた。

## 分かっている挙動
- オプショナルな引数ではないらしい。どちらも指定しないとエラーが発生する。
TODO: 本人に聞いてみる