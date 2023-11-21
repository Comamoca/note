## shrsとは
site: https://mrpicklepinosaur.github.io/shrs/

**RustでShellを構築できるフレームワーク**  
フレームワークなので自由自在にロジックを構築することができる。

> Of course it is blazingly fast  

Rust製なのでもちろんめちゃくちゃ速いよ

例えば最低限動くshellの実装はこんな感じ

```rust
use shrs::prelude::*;

fn main() {
    let shell = ShellBuilder::default().build().unwrap();

    let _ = shell.run();
}
```

## 使い方
[ドキュメント](https://mrpicklepinosaur.github.io/shrs/docs/getting-started/quick-start/)に詳しく書いてある

まず始めにCargo init/newで新しいプロジェクトを作成する。
次に`Cargo.toml`の**dependencies**に`shrs = { version = "0" }`と追記して依存関係を追加する。

そして`./src/main.rs`に冒頭に記載したサンプルコードを書く。

その後`cargo run`を実行するとshellが起動する。`ls`とか`cat`とかPOSIXにあるコマンドは大体使えそう。

設定に必要なものは全て`use shrs::prelude::*;`を経由してexportされてるっぽいので、これだけuseすれば大丈夫そう

## alias
こんな感じでaliasの設定ができる。
```rust
    let alias = Alias::from_iter([
        ("ls", "lsd"),
    ]);

    let shell = ShellBuilder::default().with_alias(alias).build().unwrap();
    let _ = shell.run();
```

aliasにはPATHにあるコマンドとかも普通に書けるらしい。

## Hooks
Shellで特定のイベントが発生した際に任意の処理を実行できる機構。結構使えそう。
```rust
let mut hooks = Hooks::new();
let startup_msg: HookFn<StartupCtx> = |_sh: &Shell,
                                       _sh_ctx: &mut Context,
                                       _sh_rt: &mut Runtime,
                                       _ctx: &StartupCtx|
-> anyhow::Result<()> {
    let welcome_str = "Welcome!";
    println!("{welcome_str}");
    Ok(())
};
hooks.register(startup_msg);

// with_aliasを書いた場所のすぐ下に追記する。
.with_hooks(hooks)
```

これで起動したときに**Welcome!**と表示される。
これの使い道として、起動時にネットから取得した情報を表示するとかがありそう。

// 時間があったら他にも追加していきます
## 所感
- ドキュメントと実際の挙動に齟齬があるので、ドキュメントの方を読んでイメージを掴んでその後docs.rsの方を読むと良さそう。構造体の名前とかはドキュメントよりもLSPの方が信頼できる。
- 「設定を読み込みが遅いなら、埋め込んでしまえば良いじゃない」を地で行く戦法
- 補完が効くとはいえスクリプトと比べてちょっと書きづらい気もする
- それでも起動速度が爆速なのでスピードを求めるならかなり有力な選択肢になりそう
