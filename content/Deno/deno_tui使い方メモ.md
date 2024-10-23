[boost](https://github.com/Comamoca/boost)のUIが不安定なのが気になって再構築するにあたり、必要になったけれど情報が全く無いので作りならがメモしていく。

## 特徴

- 依存なし(Windowsは依存があるらしい)
- クロスプラットフォーム

Crayonというライブラリを激推ししている。カラー指定にはこれを使うのが無難そう。

repo: https://github.com/Im-Beast/deno_tui
サンプル: https://github.com/Im-Beast/deno_tui/blob/main/examples/demo.ts#L24

Denoなのでサンプルは`deno run ~`で実行可能(ファイルしてはraw contentsにする必要がある)
実行時にパーミッションは必要ない。

## コンポーネント

deno_tuiはtuiインスタンスにコンポーネントを追加してコンポーネントを作っていく。
コンポーネントは[ここから](https://deno.land/x/tui@1.3.4/src/components/mod.ts)見ることが可能。

### TextboxComponent

```ts
new TextboxComponent({
  tui,
  theme: baseTheme,
  multiline: false,
  rectangle: {
    column: 2,
    row: 0,
    height: 1,
    width: 10,
  },
  value: "hi",
});
```

その名の通りテキストボックスを実装してあるコンポーネント
値を取り出すには、