ここではTypeScriptの型システムについて簡単に解説をします。

よく使う基本の型
```ts
// 文字列型
const name: string = "Chiwaaa"

// 数字型
const ago: number = 17

// Bool型
const haveCar: bool = False

// 配列型
const gamers: Array<string> = ["fubuki", "mio", "korone", "okayu"]

const holox: string[] = ["laplus", "iroha", "rui", "koyori", "poepoe"]
```

## 複雑な型

### 複合型

- type
既存の型に名前を付けることができる。その型は名前を付けられた型と同じ扱いになる。

```ts
type Name = string

function put_username(name: Name) {
    console.log(name)
}

const name_aqua: Name = "Minato Aqua"
put_username(name_aqua)

const name_subaru = "Oozora subaru"

// 型エラー
put_username(name_subaru)
```