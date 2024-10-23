Luaにトランスパイル出来るLisp方言。名前の由来は[ウイキョウ](https://ja.wikipedia.org/wiki/%E3%82%A6%E3%82%A4%E3%82%AD%E3%83%A7%E3%82%A6)。

特徴については[LispでNeovimプラグインを書きたい](../Vim/LispでNeovimプラグインを書きたい.md)に書いてある。

## 構文
[ここに全て書いてある](https://fennel-lang.org/reference)。Lispが分かる人はこれで書けるはず。

## サンプル

### FizzBuzz
おなじみのFizzBuzzを書いてみる。これで関数定義・ループ・制御フローがどんな感じかは分かるはず。
```lisp
(fn fizzbuz [times]
(for [i 1 times]
  (if (and (= (% i 3) 0) (= (% i 5) 0))
      (print "FizzBuzz")

      (= (% i 3) 0)
      (print  "Fizz")

      (= (% i 5) 0)
      (print "Buzz")

      (print i)
  )
))

(fizzbuz 30)
```

## Neovim APIを使う
Lispの関数呼び出しのように、呼び出すことが可能。
```
(vim.fn.expand "~/ghq/") -> vim.fn.expand("~/ghq")
```