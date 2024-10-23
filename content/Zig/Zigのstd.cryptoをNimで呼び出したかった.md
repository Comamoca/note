断念したのでこのタイトル。

## 動機
Zigのstdにはcryptoライブラリがあって、これをNimで読み込ませる事でNimでも高度な暗号化処理が可能になるのでは...？
という期待から取り組んでいた。
## Zigからexport
`export`というキーワードが付いた関数はCから呼び出すことができる。
この手の手順でよくやるno mangleはやらないらしい。これ意外だった。

以下はサンプル
```zig
export fn add(a: i32, b: i32) i32 {
    return a + b;
}
```

これをコンパイルするのだけど、Nimは

- ヘッダファイル
- 静的ライブラリ
- 共有ライブラリ

の3つに対応しているので、今回は動的ライブラリとして出力してみる。
以下のコマンドを実行。
`zig build-lib ./src/main.zig -lc -dynamic`

するとカレントディレクトリに共有ライブラリが出力される。
## Nimでimport
Nimでは`dynlib`プラグマを使うことで共有ライブラリを読み込むことができる。
`proc add(x: cint, y: cint): int {.dynlib: path, importc: "add".}`

`dynlib`にはライブラリの**絶対パスを指定する。**
`importc`には関数名を指定する。

関数宣言部分では、呼び出す関数の型を指定する。この際、Cとの互換性がある`cint`を使う。[^1]

## NimからZig stdを呼び出す

```zig
export fn print(text: [*:0]const u8) void {
    std.debug.print("{s}", .{text});
}
```
ZigとC間で文字列を受け渡すためには、`[*:0]const u8`を使うらしい。センチネルというやつらしい。
Nimではこんな感じで呼び出せる。

```nim
proc print(text: cstring): void {.dynlib: path, importc: "print".}
print("もじれつ\n")
```

## std.cryptoを呼び出したい
さてここからが本題。Zigには`std.crypto`という暗号化処理向けのモジュールがあって、その中にはなんと楕円曲線暗号の関数がある。
これをNimから呼び出せれば行けるのでは...！と思った。

```zig
export fn getseckey() *const [32] u8 {
    const pair = crypto.sign.ecdsa.EcdsaP256Sha256.KeyPair.create(null) catch unreachable;

    const secret = pair.secret_key;
    return &secret.toBytes();
}
```

秘密鍵のバイト配列のポインタを返すようにしている。
Nim側はこんな感じ。
```nim
proc getseckey(): pointer {.dynlib: path, importc: "getseckey".}
let seckey = getseckey();

echo repr(seckey)
```

これを実行するとメモリ番地らしき値が表示される。ここから値にアクセスしようとしたけど、Nimでポインタを扱う情報が意外と少なくて断念した。ソースコードは[ここに](https://github.com/Comamoca/sandbox/tree/main/zig-nim)公開しておくので、気になる人は試してみて欲しい。

[^1]: 別にintでも行けるらしい。また、cintは大抵の場合int32になるんだそう。