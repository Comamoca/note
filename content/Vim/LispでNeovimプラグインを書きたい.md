Lisp処理系を実装するにあたり、まずはLispをそこそこ書けるようになって挙動を予想できるようにしたいので、Lispで色々作ってみる。
データ型がTableしかないNeovimとLispは前々から相性が良いと思っていて、もしLisp to Luaを実現する言語があればLispでNeovimプラグインが書けそうだとも思っていた。
## あった
検索したらトップに[Fennel](https://github.com/bakpakin/Fennel)という言語のリポジトリが出てきた。
この言語はLuaにトランスパイルされる言語で、

- オーバヘッドゼロ
手書きのLuaと同等の効率

- Luaとの完全な互換性
任意のLua関数を実行可能

- コンパイル時マクロ
コンパイルされたLuaコードはFennelに依存しない

などの特徴がある。

## インストール
[ここに全て書いてある](https://github.com/bakpakin/Fennel/blob/main/setup.md)

Linuxを使っているのでスクリプトをwgetで適当にインストールしてPATHを通してある。ディレクトリにぶち込む。
Masonを使っている人はMasonInstallでLSPをインストール出来る。Treesitterも多分ある。
## Neovimプラグインも作れる
[nfnl](https://github.com/Olical/nfnl)というNeovimプラグインがあったので導入。
READMEに書いてあるとおりのディレクトリ構造を作って、ファイルにプログラムを書き込んでいく。

ディレクトリ構造はこんな感じになればOK
```
.
├── fnl
│   └── fennel_nvim
│       └── main.fnl
├── lua
│    └── fennel_nvim
│        └── main.lua <- コンパイル時に生成される
├── .nfnl.fnl
└── plugin
    └── fennel_nvim.vim <- エントリポイント
```

注意点として、**nfnlはFennelプラグインのローダーも兼ねているので、Filetypeで遅延ロードするとエラーが起きる。遅延ロードはしない方が良さそう。**

## Luaだけで完結させる
公式のサンプルはVimLを使っているけれど、~~どのみちNeovimユーザーしか使わないものに~~わざわざVimScriptを混ぜ込むのが気に食わないので`init.lua`を作ってみる。

```lua
local function setup()
	require("fennel_nvim/main").init()
end

return {
	setup = setup,
}
```
内容は単純で、`.setup()`するとプラグインのメイン処理が呼び出される。これでLua(とFennel)だけで処理を完結できる。