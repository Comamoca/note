年末が近づいてきたのでそろそろ考えていきたい。
プラグインの数も増えてきていて設定が複雑になってきているので、ここで一旦ゼロから設定を組み直したい。
## 無いと困るもの
Vimを使う上で生命線となる機能を挙げてみる。

- 補完(nvim-cmp)
- スニペット(Ultisnips, luasnip)
- ハイライト(TreeSitter)
- 独自のキーバインド
- パッケージマネージャ(dein.vim)
- フォーマッタ(conform.nvim)
- ファジーファインダー(fzf.lua, Telescope)
- Git(lazygit.nvim)

最近は新しいプラグインも出てきているので、ここに挙げたプラグインをそれらで代替してみる。

- 補完(ddc.vim)
- スニペット(luasnip.nvim)
- ハイライト(TreeSitter)
- 独自のキーバインド
- パッケージマネージャ(dpp.vim)
- フォーマッタ(conform.nvim)
- ファジーファインダー(ddu.vim)
- Git(lazygit.nvim)

## 使ってみたいもの

次になくても困らないけど、あったら便利なプラグインと使ってみたいプラグインを挙げてみる

- mr.vim
- deol.vim

## 今回の方針

### denops依存

以前はLuaファーストなプラグイン構成でいたけども、

- denops界隈が良い感じになってきた
- denopsの扱いがそこそこ理解ってきた
- いくらLuaで高速化しても処理のブロッキングは避けられない

という観点からdenopsを用いたプラグインを多めに盛り込んでいる。

## バックアップ

init.luaを爆散させて泣く泣く再構築するのはもう懲りごりなので、一旦バックアップ用の環境を作成する。

## ddc.vim
今まではnvim-cmpを使っていたけれど、満を持してddc.vimへ移行した。
と言ってもnvim-cmp自体に特に不満点はないので、LuaLuaしたい人には以前オススメできるプラグイン。

ddc.vimは

- ui
- source
- matcher
- sorter

などがそれぞれ分離されていて、それらを自身で選んで設定を組んでいく必要がある。

自分は以下のプラグインをインストールした。

// インストールしたプラグインを列挙


## Build in LSPとの連携
専用のプラグインがあるのでそれを導入。


ddc-nvim-lsp-setupという`forceComplationPattern`という補完が発動する文字列を指定してくれるプラグインをあわせて使うと便利。
https://github.com/uga-rosa/ddc-nvim-lsp-setup

forceComplationPatternについて
例えば、ddc.vimで`console.log()`と入力することを考えてみる。
以下カーソルの位置を`|`で表現する。

(1) |
空行から入力を開始した時点では、`console`などのグローバルオブジェクトが候補として表示される。

(2) console.|
ドットが入力された時点で、`.log` などの補完を表示させたい。

この場合の`.`のような**補完を表示させたい文字列**が`forceComplationPattern`で、先述したプラグインはそれを自動的に設定してくれる。
つまり、**言語ごとに補完を発火させたい文字列を考慮する必要が無くなる**。
## vim-vsnip
スニペットプラグインはddc.vimとの組み合わせの情報量が多いことから、vim-vsnipを採用した。

ddc.vimとの統合プラグインは変遷していて、執筆時点ではddc-source-vsnipとddc-source-vsnipを使うのが良さそう。

https://github.com/uga-rosa/ddc-source-vsnip

