elliはGleamでWebサーバーを構築するためのシンプルなフレームワークです。
ここではelliでサーバーを構築する方法を書いていきます。

## 公式のサンプル
ぶっちゃけこれが全て
```rust
import gleam/http/elli
import gleam/http/request.{Request}
import gleam/http/response.{Response}
import gleam/bit_builder.{BitBuilder}

// Define a HTTP service
//
pub fn my_service(req: Request(BitString)) -> Response(BitBuilder) {
  let body = bit_builder.from_string("Hello, world!")

  response.new(200)
  |> response.prepend_header("made-with", "Gleam")
  |> response.set_body(body)
}

// Start it on port 3000!
//
pub fn main() {
  elli.become(my_service, on_port: 3000)
}
```

reqには[`Request型`](https://hexdocs.pm/gleam_http/gleam/http/request.html#Request)のデータが格納されているので、そのデータに応じて処理を書いていく。
一例としてURL Queryを取得してみる。
Query parametorはの`query`に格納されている。これは`request.get_query()`関数で取得することができる。(というかこの程度は補完が効いてくれるのでわざわざ調べるまでもないかもしれない)

`get_query()`は[`Tuple`](https://gleam.run/book/tour/tuples.html)を返すので、`.0`のようにインデックスで取得する。
```rust

```