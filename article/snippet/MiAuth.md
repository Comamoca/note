UrlGenerate

```ts
type Scope = string
const Scopes: Record<string, Scope> = {
    ReadAccount: "read:account"
}

class MiAuth{
origin: string
callback: string
Scopes: Array<Scope>

    constructor(origin: string, callback: string, Scopes: Array<Scope>) {
        this.origin = origin
        this.callback = callback
        this.Scopes = scopes             
    }

    AuthUrl(): string {}
    CheckUrl(): string {}
}

const origin = "https://misskey.io"
const miauth = MiAuth(
origin,
[Scope.ReadAccount]
)

const url = miauth.AuthUrl()
const check = miauth.CheckUrl()
```