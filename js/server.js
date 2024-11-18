import fs from 'node:fs';
import net from 'node:net';

// subtract(int a, int b): 2つの整数a, b を入力として受け取り、その差を返す
let subtract = ((a, b) => {
    // error handling: Invalid Input
    if (typeof a !== 'number' || typeof b !== 'number') {
        return 'Error: Invalid Input Type, Expect Integer';
    }
    return a - b;
})

// floor(double x): 10 進数 x を最も近い整数に切り捨て、その結果を整数で返す
let floor = ((x) => {
    // error handling: Invalid Input
    if (typeof x !== 'number') {
        return 'Error: Inavlid Input Type, Expect Double';
    }
    return Math.floor(x);
})

// nroot(int n, int x): 方程式 rn = x における、r の値を計算する
let nroot = ((n, x) => {
    // error handling: Invalid Input
    if (typeof n !== 'number' || typeof x !== 'number') {
        return 'Error: Invalid Input Type, Expect Integer';
    }
    return Math.pow(x, 1 / n);
})

// reverse(string s): 文字列 s を入力として受け取り、入力文字列の逆である新しい文字列を返す
let reverse = ((s) => {
    // error handling: Invalid Input
    if (typeof s !== 'string') {
        return 'Error: Invalid Input Type, Expect String';
    }
    return s.split("").reverse().join("");
})


// validAnagram(string str1, string str2): 2 つの文字列を入力として受け取り，2 つの入力文字列が互いにアナグラムであるかどうかを示すブール値を返す
let validAnagram = ((s1, s2) => {
    // error handling Invalid Input
    if (typeof s1 !== 'string' || typeof s2 !== 'string') {
        return 'Error: Invalid Input Type, Expect String';
    }
    return s1.split("").sort().join("") === s2.split("").sort().join("");
})

// sort(string[] strArr): 文字列の配列を入力として受け取り、その配列をソートして、ソート後の文字列の配列を返す
let sort = ((strArr) => {
    // error handling Invalid Input
    if (!Array.isArray(strArr)) {
        return 'Error: Invalid Input Type, Expect Array';
    }
    return strArr.sort();
})

let hashMap = {
    "subtract": subtract,
    "floor": floor,
    "nroot": nroot,
    "reverse": reverse,
    "validAnagram": validAnagram,
    "sort": sort,
}

// create a server
const server_address = 'tmp/socket_file'
// const server_port = 3000;
const server = net.createServer((connection) => {
    // connectionが確立された時の処理
    console.log('client connected');
    // connectionがデータを受信した時の処理
    connection.on('data', (data) => {
        console.log("Client -> :")
        console.log(data.toString());
        // dataのパラメーターに応じて、関数を実行する
        let json_data = JSON.parse(data.toString());
        let method = json_data["method"];
        let params = json_data["params"];
        let param_types = json_data["param_types"];
        let id = json_data["id"];

        const func = hashMap[method];
        let result = method == 'sort' ? func(params) : func(...params);
        console.log(result);
        let response = {
            "results": result,
            "result_type": typeof result,
            "id": id,
        }
        let response_json = JSON.stringify(response);
        connection.write(response_json);
        connection.end();
    });
    // connectionがエラーを起こした時の処理
    connection.on('error', (err) => {
        console.log(err);
    });
    // connectionが切断された時の処理
    connection.on('close', () => {
        console.log('client disconnected');
    });

});

// if last connection is alive, close it
if (fs.existsSync(server_address)) {
    fs.unlinkSync(server_address)
}

server.listen(server_address, () => {
    console.log(`Server bind on ${server_address}`);
});
