# OcamlでCLIツールを作りたい

OcamlでCLIを作りたくなったのでその過程をまとめる

## パッケージ

あるにはあるけど微妙に古いので、サポートがしっかりしていそうな公式のモジュール[Arg](https://v2.ocaml.org/releases/5.1/api/Arg.html)を使う

大まかな流れとしては、

- 引数を格納したい変数を予め宣言しておく。この変数は破壊的な代入が行われるので`ref`を用いて宣言する。
- 次に、`speclist`と呼ばれる配列で引数を定義する。後で説明する。
- `Arg.parse`で引数をパースする。戻り値が無いことに注意。
- 最初に宣言した変数を`!`を付けて値を取り出す。

## speclist

OcamlのArgモジュールでは、受け付けるコマンドライン引数を**speclist**という形式で宣言する。
speclistは

```ml
let speclist =
  [("-verbose", Arg.Set verbose, "Output debug information");
   ("-o", Arg.Set_string output_file, "Set output file name")]
```

のように、

[(オプション, 受け付ける値の型 受け取る変数名, 説明);]

という形式で宣言する。

## 匿名関数
`Arg.parse`は匿名関数を引数として受け付ける。この匿名関数は、コマンドラインで匿名引数が指定された際に呼び出される。

匿名引数というのは、`cmd -o option`ではなく`cmd option`の様に、そのままの状態でコマンドに与えられる引数を指す。
サブコマンドと言うのが一番近いかもしれない。実際、関数が呼び出されるのでサブコマンドのような挙動を実装するのも想定されている気がする。

ただし、Argモジュールは`Arg.parse_dynamic`という動的に引数の解析を行う関数を提供しているので、そちらを使ったほうが良い。
この関数は`speclist`が参照型(先述したref)である事を除いて引数・戻り値は`Arg.parse`関数と同じになっている。

## サンプル

公式の[Arg](https://v2.ocaml.org/releases/5.1/api/Arg.html)にあるサンプルコードを一部改変したもの。

```ml
(* 引数を格納したい変数 *)
let verbose = ref false
let input_files = ref []
let output_file = ref ""

let usage_msg = "append [-verbose] <file1> [<file2>] ... -o <output>"
let anon_fun filename =
        input_files := filename::!input_files

let speclist =
        [("-verbose", Arg.Set verbose, "Output debug information");
        ("-o", Arg.Set_string output_file, "Set output file name")]

let () =
        Arg.parse speclist anon_fun usage_msg;
```
