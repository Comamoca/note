NixOSでxremapの挙動が安定しないので、また変になった時に備えてメモっていく。

## 設定方法の概要

`xremap [yamlのpath]`で起動すると実行できる。
この際ユーザー入力を読み取るので、`inputs`も追加した方が良い。(らしい)

```nix
  users.users.coma = {
    isNormalUser = true;
    description = "Comamoca";
    extraGroups = [
      "networkmanager"
      "wheel"
      "kvm"
      "adbusers"
      "plugdev"
      "inputs" # For xremap
    ];
    packages = with pkgs; [
      #  thunderbird
    ];
    shell = pkgs.fish;
  };

  # configuration.nix
  services.xremap = {
    enable = true;
    serviceMode = "user";
    userName = "coma"; # 自分のユーザー名にする
    config = {
      name = "Global";
      remap = {
        Enter = {
          held = "Alt_R";
          alone = "Enter";
        };
      };
    };
  };
```


