## Obsidianとは
Obsidianはクロスプラットフォームのメモアプリです。MarkDownを使ったファイルを書いたり別の端末と同期出来ます。

今回は、ObsidianとGitHubを使ってスマホとPCでMarkDownを同期する方法について解説したいと思います。

まずアプリのインストールです。iOSとAndroid両方で提供されているので、環境に合わせたアプリをインストールしてください。

## 同期に使用するプラグイン
ObsidianをGitを用いて同期するにはobsibian-gitというものを使います。Obsidian内からインストール出来ます。

## obsidian-gitの設定
obsidian-gitを使うには設定が必要となります。
このあたりは[リポジトリのWiki](https://publish.obsidian.md/git-doc/Start+here)が詳しいのですが、ここでも簡単に説明します。

**ここではリモートリポジトリがGitHubにある前提で解説します。**

まず始めにアクセストークンを取得します。GitHubのユーザー設定ページから一番下辺にあるDevelopmentにアクセスしてください。するとアクセストークンの発行ボタンが2つあるのが見えると思います。ここではClassicの方を使います。(新しい方は未検証なので出来るか分かりません)
