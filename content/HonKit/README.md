HonKitとは、旧GitBook[^1]をforkして開発されているMarkDownナレッジツールです。
HonKitを使うことでMarkDownベースのドキュメントサイトを簡単に生成することができます。

## ファイル構造
HonKitは以下のようなファイル構造になっているMarkDownファイルをレンダリングしてサイトにする。
```
article
├── README.md
├── SUMMARY.md
├── Deno
│   ├── deno_tui使い方メモ.md
│   └── README.md
├── Denoハンズオン
|   ├── README.md
│   ├── Denoの環境構築.md
│   ├── Denoハンズオン.md
│   ├── Denoハンズオン例題.md
│   └── 簡単TypeScript入門.md
└── VRCメモ
    ├── README.md
    ├── img
    └── Tolass_custom.md
```
主なルールは、
- ディレクトリごとにカテゴライズされている
- それぞれのディレクトリには必ず**README.md**が存在する
- SUMMARY.mdでサイト構造を定義する

の3つ。非常にシンプルになっている。また、このディレクトリ構図はGitHub上で各ディレクトリを見た際に、**README.mdがトップとして表示される**。
宣伝ではあるが、拙作の[wikitool](https://github.com/ablaze-MIRAI/wikitool)でも活用することができる。

3つ目の`SUMMARY.md`はサイドバーに表示されるリンクを定義するもので、**これを正しく設定しないと記事のリンクが表示されずアクセス出来ない**ので気をつける。
ただとてつもなく面倒なので、[後述するように](#プラグイン)`SUMMARY.md`を自動生成するプラグインを導入するのがオススメ。

## セットアップ
npmプロジェクトをセットアップ
- `npm init`
HonKitプロジェクトを作成
- `npx honkit init`
HonKitをプレビューする。[http://localhost:4000](http://localhost:4000)で見ることができる。
- `npx honkit serve`
HonKitをビルドする。ビルド成果物は`_book`ディレクトリに格納されています。
- `npx honkit build`

## ビルド
前述の通り、HonKitで作成されたサイトはビルドしてGitHub Pagesなどに静的サイトとしてホストできる。
しかし、**何故か任意のディレクトリに出力することが出来ない**ので、自分は`build.sh`というスクリプトを作成してビルド処理を実行している。スクリプトは以下の通り
```sh
#! /usr/bin/env bash

rm -r ./docs
npx honkit build
mv _book ./docs
```
## 設定
HonKitはプロジェクト内にある`book.json`というファイルを読み込むので、そこに設定を記述することでHonKitの挙動を制御出来る。
以下は自分のHonKitの設定。特に難しいものは無いけれど、簡単な説明も添えておく。
```
{
  "title": "Note",
  "author": "Comamoca",
  "root": "./article",
  "language": "ja",
  "plugins": [
    "honkit-plugin-mermaid",
    "summary"
  ]
}
```
- title
ドキュメントサイトのタイトル
- author
ドキュメントを作成した人を指定する
- root
ドキュメントのルートになるディレクトリを指定する
- language
サイトの言語を設定する
- plugins
読み込むプラグインを指定する。詳しくは[プラグイン](#プラグイン)を参照。

## プラグイン
HonKitのプラグインは単一のnpmパッケージになっている。
また、HonKitはGitBookをforkしているので、**GitBookのプラグインをそのまま読み込むことが出来る**。

プラグインのセットアップ手順は以下の通り
- `npm install プラグイン名のパッケージ名`
`book.json`を作成して、以下のように記述する。
```json
{
  "plugins": [
    "プラグイン名",
  ]
}
```
プラグイン名はプラグインのパッケージ名と異なっていることが多いので、READMEなどを読んでよく確認する。

自分は以下のプラグインを使っている。
- honkit-plugin-mermaid
HonKitにmermaidのレンダリング機能を追加する
- gitbook-plugin-summary
SUMMARY.mdを自動生成する

[^1]: 現在最新版は非公開になり、GitBookはクラウドベースのサービスになっています。