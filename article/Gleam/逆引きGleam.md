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

## Elixirと連携したい
ここではElixirの`IO.puts()`をGleamから呼び出してみる。
```rust
pub external fn puts(text) -> atom.Atom() =
"Elixir.IO" "puts"
```
**external**というキーワードで、バックエンドの関数を呼び出すことができる。`IO.puts`はElixirのIOモジュールで宣言されているため、

- まず１つめの引数で`Elixir.IO`と指定する。
- その次に**puts**という関数を呼び出すため、2つめの引数で`puts`を指定する。

この最初の引数の`Elixir`の部分を指定せず関数のみを指定すると、Erlangの関数を呼び出すことができる。(GleamはErlangにコンパイルされるため、デフォルトでErlangの関数を呼び出す仕様にしたと考えられる)

ちなみにGleamは**JavaScriptにもコンパイル出来る**。その場合は以下のように、
```rust
pub external fn run() -> Int =
  "./my-module.js" "run"
```
Elixirでモジュールを指定したように**JavaScriptのファイル名**を指定する。その次の関数名の指定は同じ。

### Elixirのライブラリを使いたい
ElixirのライブラリをGleamから使うには、
- `gleam add パッケージ名`でパッケージを追加
- `external`で関数を宣言
この順番で行う。
Gleamには**配下のElixirプログラムを自動でコンパイルする**というとても便利な機能があるので、`gleam add`でGleamパッケージと同じようにパッケージをインストールすることができる。

パッケージをインストールした後はexternalで宣言することで呼び出す事ができる。
この際、`iex -S mix`などでパッケージの関数を呼び出したりして調べながら書いていくと分かりやすい。
以下はElixirの[Pandex](https://hex.pm/packages/pandex)パッケージの`gfm_to_html`関数を呼び出す例。
```rust
pub external fn gfm_to_html(text) -> Result(String, String) =
"Elixir.Pandex" "gfm_to_html"
```


また、外部の関数には型付けのラベルを付ける事が可能。これを行うことでより堅牢なプログラムを書くことができる。
```rust
pub external fn any(in: List(a), satisfying: fn(a) -> Bool) =
  "my_external_module" "any"
```
