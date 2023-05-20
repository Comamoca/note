## 変数

変数は基本イミュータブル
```rust
let num = 100
let name = "gleam"

// 定数はconstで宣言 
const const_string = "This is constant string."
```

## 型

```rust

```

## 型変換(キャスト)

### Int -> String

```rust
import gleam/int

let str = 100
int.to_string(100)
```

## ファイルIO
`gleam_erlang`をインストール
`gleam add gleam_erlang`

### ファイル書き込み
[read](https://hexdocs.pm/gleam_erlang/gleam/erlang/file.html#read)
`pub fn read(from path: String) -> Result(String, Reason)`

### ファイル読み込み
[write](https://hexdocs.pm/gleam_erlang/gleam/erlang/file.html#write)
`pub fn write(contents contents: String, to path: String) -> Result( Nil, Reason, )`

### デバッグ出力
`stdlib`をimportすると使える
`pub fn debug(term: a) -> Nil`

## Result型から値を取得したい
GleamにはRustのような[Result型](https://hexdocs.pm/gleam_experimental_stdlib/gleam/result/#Result)がある。
```rust
pub type Result(success, error) =
  Result(success, error)
```

以下のようにすればResult型から値を取得出来る。
```rust
let assert Ok(text) = // Resultを返す処理
```

例えばこんな感じ(`gleam_stdlib`と`gleam_erlang`パッケージをインストールする必要がある。)
```rust
import gleam/io
import gleam/erlang/file

let assert Ok(text) = file.read(path)
io.println(text)
```