Zigは静的型付けのコンパイル言語。以下の特徴がある。

- 静的型付け
- (Cと比べて)安全。Rustよりかは劣るらしい。
- Rustみたいにツールチェインが統合されている。
- LLVM上で動く。(LLVM依存を剥がす事が検討されいてる)
- GC無し。C/C++みたいにプログラマがメモリを管理する。が、アロケータベースなのでコストは低め。
- Cコンパイラとしても使うことが出来る。
- ヘッダファイルをそのまま読み込めるなど、Cとの高い互換性がある。
## Hello World
zigをインストールしてプロジェクトを作成する。
`zig init-exe`
ボイラープレートが展開されたら実行してみる。
`zig run ./src/main.zig`
文字が表示されたら成功。

## メモリアロケータ
Zigはメモリアロケータでメモリを管理する。メモリアロケータとは、簡単に言うと確保したメモリをプログラム内で変数に割り当てられるオブジェクトの事らしい。(このあたりは自信が無い)

Zigには様々なメモリアロケータが用意されており、それらを入れ替える事でメモリリークを簡単に検知したり様々なことができる。

ファイルを読み込むプログラムはこんな感じ
```zig
const std = @import("std");

fn main() !void {
    const file_name = "./build.zig";
    const file = try std.fs.cwd().openFile(file_name, .{});
    defer file.close();

    const file_size = try file.getEndPos();

    // アロケータを生成
    const alloc = std.heap.page_allocator;
    const content = try file.readToEndAlloc(alloc, file_size);

    const stdout_file = std.io.getStdOut().writer();
    var bw = std.io.bufferedWriter(stdout_file);
    const stdout = bw.writer();

    _ = try stdout.write(content);

    try bw.flush();
}
```