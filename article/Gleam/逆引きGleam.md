## 変数

変数は基本イミュータブル
```rust
let num = 100
let name = "gleam"

// 定数はconstで宣言 
const const_string = "This is constant string."
```

## 型

一般的な型名 | Gleamでの型名 | Gleamでの表現 | ライブラリ
-------------|--------------|---------------|----------------
整数 | Int | 1234 | [gleam/int](https://hexdocs.pm/gleam_stdlib/gleam/int.html#module-name)
文字列 | String | "Gleam" | [gleam/string](https://hexdocs.pm/gleam_stdlib/gleam/string.html)
リスト | List | [] | [gleam/list](https://hexdocs.pm/gleam_stdlib/gleam/list.html)
タプル | Tuple | #("Langage", "Gleam") | [gleam/map](https://hexdocs.pm/gleam_stdlib/gleam/map.html)
浮動小数点型 | float | -12.5 |　[gleam/float](https://hexdocs.pm/gleam_stdlib/gleam/float.html)
真偽値 | Bool | true | [gleam/bool](https://hexdocs.pm/gleam_stdlib/gleam/bool.html#module-name)
動的型 | Dynamic | ———————— | [gleam/dynamic](https://hexdocs.pm/gleam_stdlib/gleam/dynamic.html) |


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
let Ok(text) = // Resultを返す処理
```

例えばこんな感じ(`gleam_stdlib`と`gleam_erlang`パッケージをインストールする必要がある。)
```rust
import gleam/io
import gleam/erlang/file

let Ok(text) = file.read(path)
io.println(text)
```

しかし、この方法だと`Error()`が返された場合に例外が発生する。これを避けるには[`result.unwrap`](https://hexdocs.pm/gleam_stdlib/gleam/result.html#unwrap)を使う。

### `gleam/result`を使う
Gleamには、`Result型`を扱う際に便利なメソッドが用意されている。
これらを使うことでよりシンプルに`Result型`を操作することができる。
ドキュメントは[ここから](https://hexdocs.pm/gleam_stdlib/gleam/result.html)見ることができる。

このライブラリに含まれている、`result.unwrap()`を使うことで`Result()`から簡単に値を取り出すことが出来る。

[Gleam Playground](https://johndoneth.github.io/gleam-playground/?s=JYWwDg9gTgLgBAcwDYFMCGID0wIChSSyKoaZQoDOArkjLrmFQEZwBmAdnCGsOwBQBKOAG9ccOKngUYUOAF441JoLFwcAOjBReMJP3LVa6quwDuUNGD7SoAGjgAiBwIG4AvvUYsOi5oLgAtAB8cABKlDQwfADKMrwI9gBywEhCopiYcADyANZ8DhA5AITOuACiUFDQfMmp7kA)
```rust
import gleam/io
import gleam/result

pub fn main() {
  let str = sub()
  io.println(result.unwrap(str, ""))
}

pub fn sub() -> Result(String, Nil) {
// Ok("ok!")
Error(Nil)
}
```

`unwrap()`には2つの引数を指定する必要があり、それぞれ
- `Result型`の値
- `Error()`だった場合の値
を指定する。Rustの`unwrap()`と動作が違うので注意。(どちらかというと`unwrap_or_default()`に近い挙動をする。)

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

## 他のBEAM言語との連携

2024/01/22追記

Gleamで他のBEAM言語の関数を呼び出す方法が変更されている。
Pythonのデコレータのように、関数の上に`@external`キーワードを書いて宣言する。

[公式ドキュメント](https://gleam.run/book/tour/external-functions.html)


```rust
// Erlangのrand:uniform()を呼び出す場合
@external(erlang, "rand", "uniform")
pub fn random() -> Float
```

```
```

---

他のBEAM系言語(Ex. Erlang/Elixir)の関数を呼び出すには、`external`キーワードを使って関数を宣言する。

Erlangの場合
```rust
pub external fn random_float() -> Float =
	"rand" "uniform"
```

Elixirの場合
```rust
external fn puts(text: String) -> =
"Elxir.IO" "puts"

fn main() {
	puts("Hello Elixir!")
}
```
JavaScriptの場合
```rust
pub external fn run() -> Int =
	"./my-module.js" "run"
```
関数を定義する際には以下のように引数に型を付けることも出来る。これを行うことでより堅牢なプログラムを書くことができる。ただしGleamはこの型付けを**完全に信用**する。
もし**型付けが間違っている場合は実行時エラーが発生する**ので気をつける。
```rust
pub external fn any(in: List(a), satisfying: fn(a) -> Bool) =
  "my_external_module" "any"
```
GleamとElixirの相互運用についてはこの[サンプルプロジェクト](https://github.com/gleam-lang/mix_gleam/tree/main/test_projects/basic_project)が参考になる。


### Elixirのライブラリを使いたい

<div style="color: red; font-size: 2rem; font-weight: bold;">
Gleamのバージョンアップに伴いこの方法は使えなくなりました。<br>
こちらで新しい方法について解説しています。
</div>

https://zenn.dev/comamoca/articles/interop-of-gleam-and-elixir

ElixirのライブラリをGleamから使うには、
- `gleam add パッケージ名`でパッケージを追加
- `external`で関数を宣言
この順番で行う。
Gleamは[Hex]()に対応しているので`gleam add`でGleamパッケージと同じようにパッケージをインストールすることができる。
また、Gleamには**配下のElixirプログラムを自動でコンパイルする**というとても便利な機能があるので、プロジェクトの一部をElixirで書きそれをGleamから利用する事も可能。Elixirライブラリのグルーコードを書く場面で便利だと感じた。

パッケージをインストールした後はexternalで宣言することで呼び出す事ができる。
この際、`iex -S mix`などでパッケージの関数を呼び出したりして調べながら書いていくと分かりやすい。
以下はElixirの[Pandex](https://hex.pm/packages/pandex)パッケージの`gfm_to_html`関数を呼び出す例。
```rust
pub external fn gfm_to_html(text) -> Result(String, String) =
"Elixir.Pandex" "gfm_to_html"
  ```

## Javascriptターゲット

GleamはJavascriptをターゲットにコンパイルすることが出来る。
GleamをJavascriptにコンパイルするのは以下の2通りの方法で行うことが出来る。

### ビルドオプションにJavascriptを指定

`gleam run `
