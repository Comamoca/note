マクロとテンプレート

- テンプレート
単純な文字列置換。Cのプリプロセスに近いがASTが考慮される。オーバーヘッドが無いので便利。

- マクロ
ASTを操作できる。強力。扱いに注意。

### 生成方法

- AST直ざわり
プログラマブルにプログラムを構築できる。可読性は低い。デバッグが困難。

- 文字列をASTに起こす
生成するプログラム部分が全て文字列なためデバッグが困難。インデントも揃わない。地獄。

- quoteマクロを使う
生成するマクロをそのまま書き込める。可読性が一番高い。デバッグしやすい。最有力手。

### サンプル
```nim
macro outerProc(name, block: untyped): untyped =
  quote do:
    proc `name`() =
      `body`
outerProc myfunc:
  echo "hey!"

myfunc

# stdout: hey!
```