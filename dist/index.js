"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
function greeter(person) {
    return 'hello ' + person;
}
let user = 'shang';
console.log(greeter(user));
function greeter1(person) {
    return 'hello ' + person.firstName + '=' + person.lastName;
}
let user1 = {
    firstName: 'shang',
    lastName: 'tian'
};
console.log(greeter1(user1));
function greeter2(person) {
    return 'hello ' + person.firstName + '=' + person.lastName;
}
class User {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
let user2 = new User('tian', 'shang');
console.log(greeter2(user2));
let isLlist = [1, 2, 3];
let x;
x = ['hello', 10];
console.log(x[0].substr(1));
let notSure = 4;
notSure = '1222';
notSure = false;
let list = [1, true, 'free'];
function warnUser() {
    console.log('This i my waring message');
}
let unusble2 = undefined;
let num = 3;
let num1 = 3;
num1 = null;
function error(message) {
    throw new Error(message);
}
function inifiniteLoop() {
    while (true) {
    }
}
let someValue = 'this is a string';
let strLength = someValue.length;
let strLength2 = someValue.length;
let input = [1, 2];
function f([first, second]) {
    console.log(first);
    console.log(second);
}
f(input);
let o = {
    a: 'foo',
    b: 12,
    c: 'bar',
    d: 15
};
let { a: isa, b: isb } = o, rest = __rest(o, ["a", "b"]);
console.log(isa, isb, rest);
function keepWholeObject(wholeObject) {
    let { a, b = 1001 } = wholeObject;
}
keepWholeObject({ a: 'da', b: 11 });
function keepWholeObject2({ a, b = 0 }) { }
keepWholeObject2({ a: 'da' });
function keepWholeObject3({ a, b = 0 } = { a: '11' }) { }
keepWholeObject3({ a: 'da' });
let p1 = { x: 10, y: 20 };
let a = [1, 2, 3];
let ro = a;
a = ro;
let p2 = { x: 10, y: 20 };
function createSquare(config) {
    let newSquare = { color: 'white', area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
let config = {
    color: 'black',
    age: 50,
    width: 100
};
let mySquare = createSquare({ color: 'black', width: 100 });
let mySearch;
mySearch = function (src, sub) {
    let result = src.search(sub);
    return result > -1;
};
let myArray;
myArray = ['bob', 'fred'];
let myStr = myArray[0];
let mySex;
mySex = "女";
let u;
u = {
    name: 'shang',
    gender: '男',
    age: 19
};
function getUsers() {
    return [];
}
function combine(a, b) {
    if (typeof a == 'number' && typeof b == 'number') {
        return a * b;
    }
    else if (typeof a == 'string' && typeof b == 'string') {
        return a + b;
    }
    throw Error('参数传递错误！');
}
const combineResult = combine('1', '2');
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 3] = "Blue";
})(Color || (Color = {}));
let c = 3;
let d = Color.Green;
let e = Color.Blue;
let ColorName = Color[2];
console.log(ColorName, c, d, e);
let enumGender;
enumGender = '帅哥';
enumGender = '美女';
function searchUsers(g) { }
var Permission;
(function (Permission) {
    Permission[Permission["Read"] = 1] = "Read";
    Permission[Permission["Write"] = 2] = "Write";
    Permission[Permission["Create"] = 4] = "Create";
    Permission[Permission["Delete"] = 8] = "Delete";
})(Permission || (Permission = {}));
let p = Permission.Read | Permission.Write;
p = p | Permission.Delete;
console.log(p, 375);
function hasPermission(target, per) {
    return (target & per) === per;
}
let per = hasPermission(p, Permission.Read);
console.log(per, 389);
p = p ^ Permission.Write;
console.log(p, 400);
console.log(hasPermission(p, Permission.Write));
const module_1 = require("./module");
console.log(module_1.sum(2, 4), module_1.name, 409);
let isU = {
    name: 'sdfds',
    age: '33',
    sayHello() {
        console.log('hello world');
    }
};
isU.sayHello();
function mySum(numbers, callBack) {
    let s = 0;
    numbers.forEach((n, i) => {
        if (callBack(n, i)) {
            s += n;
        }
    });
    return s;
}
let s = mySum([1, 2, 2, 3, 1, 4], (a) => {
    return a > 2;
});
console.log(s);
let DD = {
    T1: 'ds',
    T2: 15,
    T3: true
};
let HH = {
    T1: 'dss',
    T2: 155,
    T3: true
};
class classUser {
    constructor(name, age) {
        this.name = name;
        this.gender = '男';
        this._publishNumber = 3;
        this.currentNumner = 0;
        this.age = age;
        this.id = Math.random();
    }
    publish(title) {
        if (this.currentNumner < this._publishNumber) {
            console.log('发布一篇文章：' + title);
            this.currentNumner++;
        }
        else {
            console.log('今日发布文章数量已达上限');
        }
    }
    set publishNumber(value) {
        if (value > 0 && value < 10) {
            this._publishNumber = value;
        }
        else
            [
                this._publishNumber = 3
            ];
    }
    get publishNumber() {
        return Math.floor(this._publishNumber);
    }
}
const isu = new classUser('shang', 12);
isu.gender = '女';
isu.publishNumber = -9;
console.log(isu);
isu.publish('文章1');
isu.publish('文章2');
isu.publish('文章3');
isu.publish('文章4');
isu.publish('文章5');
isu.publish('文章6');
function take(arr, n) {
    if (n > arr.length) {
        return arr;
    }
    const newArr = [];
    for (let i = 0; i < n; i++) {
        newArr.push(arr[i]);
    }
    return newArr;
}
const isArr = [2, 3, 4, 5, 6, 7, 8];
const newArr = take(isArr, 2);
console.log(newArr);
function filter(arr, callback) {
    const newArr = [];
    arr.forEach((n, i) => {
        if (callback(n, i)) {
            newArr.push(n);
        }
    });
    return newArr;
}
const myArr = [3, 5, 4, 6, 8, 5, 4];
console.log(filter(myArr, n => n % 2 !== 0));
class ArrayHelper {
    take(arr, n) {
        if (n > arr.length) {
            return arr;
        }
        const newArr = [];
        for (let i = 0; i < n; i++) {
            newArr.push(arr[i]);
        }
        return newArr;
    }
    getRandom(min, max) {
        const dec = max - min;
        return Math.floor(Math.random() * dec + min);
    }
    suffle(arr) {
        for (let i = 0; i < arr.length; i++) {
            const targetIndex = this.getRandom(0, arr.length);
            const temp = arr[i];
            arr[i] = arr[targetIndex];
            arr[targetIndex] = temp;
        }
    }
}
