# GoでCLI兼ライブラリを作る

GoでCLI兼ライブラリを作る方法について書いてゆく。

## Goのエントリポイント

Goのエントリポイントは`main.go`のmain関数になっている。
つまり、このファイルと関数が無い場合は	ライブラリとして扱われるという事になる。

## GoでCLI兼ライブラリを作る方法

まず以下のようなディレクトリ構造を作成する。以下は[`Chuno`](https://github.com/Comamoca/chuno)の例。

```
.
├── chuno.go
├── cmd
│   └── chuno
│       └── main.go <- cliツールのエントリポイント
├── css.go
├── go.mod
├── go.sum
├── README.ja.md
├── README.md
├── render.go
└── watch.go
```

ライブラリのリポジトリに`/cmd/ライブラリ名/main.go`というファイルを作成し、そこにcliツールのプログラムを書いてゆく。
ただし`main.go`でライブラリ自身(上の例の場合はChuno)を読み込む場合は`github.com`から始まる形式で読み込む必要がある。

以下は`Chuno`の場合(関係ない部分は省いている)

```go
package main

import (
	"flag"
	"fmt"
	"log"
	"os"

	"github.com/Comamoca/chuno"
)

func main() {
	flag.Parse()

	args := flag.Args()

	log.Println(args)

	if len(args) == 0 {
		// red
		help()
		log.Fatal("No file specified to preview!!")
		os.Exit(1)
	}

	path := args[0]

	var isDark = false

	if contain(args, "--dark") {
		isDark = true
	}

	err := chuno.LaunchPreviewServer(path,
	3535, isDark)
	if err != nil {
		log.Fatal(err)
		os.Exit(1)
	}
}
```
