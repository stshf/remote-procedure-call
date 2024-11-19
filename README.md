# Remote Procedure Call

このプロジェクトは、PythonクライアントとNode.jsサーバーを使用してリモートプロシージャコール（RPC）を実装しています。クライアントはJSON形式のデータをサーバーに送信し、サーバーは指定された関数を実行して結果を返します。

## 仕様

## RequestとResponseの形式
- Request
```json
{
   "method": "subtract", 
   "params": [42, 23], 
   "param_types": [int, int],
   "id": 1
}
```

- Response
```json
{
   "results": "19",
   "result_type": "int",
   "id": 1
}
```
## サーバが提供するRPC関数
- subtract(int a, int b): 2つの整数a, b を入力して受け取り、その差を返す
- floor(double x): 10 進数 x を最も近い整数に切り捨て、その結果を整数で返す
- nroot(int n, int x): 方程式 rn = x における、r の値を計算する
- reverse(string s): 文字列 s を入力として受け取り、入力文字列の逆である新しい文字列を返す
- validAnagram(string str1, string str2): 2 つの文字列を入力として受け取り，2 つの入力文字列が互いにアナグラムであるかどうかを示すブール値を返す
- sort(string[] strArr): 文字列の配列を入力として受け取り、その配列をソートして、ソート後の文字列の配列を返す

## Client Side
- 使用言語
    - Python
- socketの実装
    - socketライブラリを使用

## Server Side
- 使用言語
    - JavaScript (Node.js)
- socketの実装
    - 標準ライブラリ Netを使用

## 使用方法

### リポジトリをクローン
```bash
git clone https://github.com/your-repo/remote-procedure-call.git
cd remote-procedure-call
```

- サーバの起動
```bash
node.js js/server.js
```
- クライアントの実行
```bash
python3 py/client.js
```

- テストの実行
ユニットテストを実行して、クライアントとサーバーの通信を確認する
```bash
python3 test/test_rpc.py
```