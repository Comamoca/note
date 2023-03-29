[README](programs/README.md)に大体書いちゃってるけど、Elixirを始めたくなったときに参考になりそうな情報を書いていく。

## スペック

- インタプリタ言語・**強い**動的型付け言語(型チェックは可能。[型チェック](#型チェック)参照)
- 分散処理・並列処理が得意
- 実行速度は**Goより遅いがRubyよりは速い**
  (スクリプト言語ながら他のスクリプト言語より速い)
- すっごく堅牢。簡単には落ちない。
- 誕生から10年が経過しており、エコシステムも成熟し始めてるように感じる(主観)

## で、結局何ができるの

**全てのサーバを用いるシステムの開発**が可能。
具体的には、

- Webサーバー
- エッジサーバー
- ゲームサーバー
- デスクトップアプリケーション(Phoenix使用)
- モバイルアプリケーション(Phoenix使用)
- AIを使ったシステムの開発(Pythonの呼び出しが可能)

など

また、Erlang VMはVM上で動作するプログラムの

- メモリ
- プロセス
- 通信

などを管理しており、さながら1つのOSのような働きをしている。
この設計思想はJS/Go/Pythonなどを触っている人にとっては奇異なものに見えるけども、この前提を意識した上でプログラムを書くとうまく書いていける...気がする。

主な文法はRubyに大きく影響を受けており(開発者がRailsコミッターらしい)、Rubyに近い感覚で書くことができる。
```elixir
def something(name) do
    "Hello #{name}!"
    |> IO.puts
end
```

`#{}`は文字列埋め込み(Jsでいう$`{}`)、`IO.puts`は文字を標準出力する。
`|>`はパイプ演算子と呼ばれていて、**戻り値を接続先の関数の第一引数に渡せる**(Nimの`.`演算子に近い)

また、Elixirは動的型付けだけど、イミュータブルなので**一度変数に代入された値は変更することが出来ない。**

## 開発で使うツール郡

## Mix
MixはElixirのタスクランナー・ビルドツール・パッケージマネージャーを兼ねているツール。
プロジェクトの作成、依存関係の管理、ドキュメントの作成の全てをこのツールで行うことができる。


### LSP
ググれば出てくる。Vimで困らなかったので、VSCode使ってる人は困らないのでは。

### 型チェック
[dialyxir](https://hex.pm/packages/dialyxir)と呼ばれるツールで静的型チェックをすることができる。
また、この項目は[この](https://qiita.com/Papillon6814/items/bf01072f1c96f4abc3d2)記事と[この](https://zenn.dev/snamiki1212/scraps/10f121b487a7b6)を参照して書いている。

まず前提に、**この型チェックはGo/Rustなどと同レベルの型安全性を担保するものでは無い**という事を頭に入れておいたほうが良さそう。そもそもが動的型付けのため、型チェックによる型安全性の担保は限界がある。(Pythonなんかが良い例)

すでに書いているように、Elixirは動的型付けのため静的型チェックをするには型アノテーションを書く必要がある。Elixirではspecと呼ばれている。

## dialyxirの導入
通常のパッケージと同じように導入できる。
パッケージ管理については[Mix事始め](Mix事始め.md)を参照。

`mix.exs`の`deps()`内のリストに以下を追加する。
`{:dialyxir, "~> 1.2"}`

このバージョンは時間が経つごとに変化していくので、最新の

### specの書き方
[ここ](https://elixirschool.com/ja/lessons/advanced/typespec)が詳しい。
Elixirの基本的な型については[こちら](https://elixir-lang.jp/getting-started/basic-types.html)

以前サンプルにしたElixirプログラムにspecを付けてみる。
```elixir
  @spec something(String.t()) :: atom
  def something(name) do
    "Hello #{name}!"
    |> IO.puts()
  end
```

主な書き方は`@spec 関数名(引数の型) :: 戻り値の型`という感じ。

## 独自の型を書きたい

独自の型を型アノテーションに記述する際、とても冗長になってしまうため`@type`を使って書いていくのが良いらしい。

```elixir
defmodule Person do
  defstruct name: String.t(), age: integer
  @type t :: %Person{name: integer, age: integer}
end
```

[Elixir School](https://elixirschool.com/ja/lessons/advanced/typespec)では2つの定義例が出てきているけど、この両者の違いは、
- `@type t(first, last) :: %Examples{first: first, last: last}`


- `@type t :: %Examples{first: integer, last: integer}`