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
/*
*   定义参数类型
*/
function greeter(person) {
    return 'hello ' + person;
}
var user = 'shang';
console.log(greeter(user)); //类型必须为字符串并且只能有一个参数
function greeter1(person) {
    return 'hello ' + person.firstName + '=' + person.lastName;
}
var user1 = {
    firstName: 'shang',
    lastName: 'tian'
};
console.log(greeter(user)); //传入对象 
/*
*   通过类的方式定义一个接口，通过接口限制参数类型
*/
var User = /** @class */ (function () {
    function User(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    return User;
}());
function greeter2(person) {
    return 'hello ' + person.firstName + '=' + person.lastName;
}
var user2 = new User('tian', 'shang');
console.log(greeter(user)); //传入对象
/*
* 数组类型定义
*/
var isLlist = [1, 2, 3]; //规定为数组并且全部由number组成
// let isList2 : Array<number> = [1,2,3,4,'9']   //数组泛型，同上，出现非number数据类型会报错，推荐上一种书写方式
/*
* 定义元组
*/
var x; //定义元组 
x = ['hello', 10]; //按照指定位置的数据类型定义，顺序跟数据类型都必须对应上
console.log(x[0].substr(1));
// console.log(x[1].substr(1))     //使用非指定数据类型上的方法会报错
// x[3] = 1                        //当访问一个越界元素则用联合类型代替，也就是string | number（3.1版本开始也会报错，应该弃用此特征，如下同理）
// x[3] = true                     //不可以，没有指定过Boolean的数据类型
// x[5].toString()                 //不会报错，虽然不存在，但为以上定义的string与number都存在tostring方法
// x[6].substr()                   //报错，与上反之
/*
* 定义枚举
*/
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 3] = "Blue";
})(Color || (Color = {}));
var c = Color.Green; // 2 --> 获取枚举值
var ColorName = Color[2]; // Green  --> 可以通过枚举值来反查   -- 编译原理 --> Color[Color["Red"] = 1] = "Red"  --> 给Color同时增加两个属性
console.log(ColorName, c);
/*
* 定义any，如下例子都不报错，也就是随意数据类型，在不确定的时候使用，ts会跳过检查。
*/
var notSure = 4;
notSure = '1222';
notSure = false;
var list = [1, true, 'free']; //未知数组时可以使用
/*
* void类型，通常在函数使用，当函数没有返回值时这个函数的返回值类型就是void
*/
function warnUser() {
    console.log('This i my waring message');
}
var unusble = null; //声明一个值为void是没有意义的，而且除了赋值null和undefined会报错
var unusble2 = undefined; //另外null跟undefined分别也是两种数据类型，且该数据类型的值为且仅为自身
/*
* 父子类型与联合类型
*/
var num = 3;
num = null; // --stricNullChecks    在运行tsc命令时不做该处理不会报错，我们知道undefined跟null是所有类型的子类型，
// 而作为子类型是可以赋值给父类型的。这也就解释了为什么null跟undefined可以赋值给void类型
var num1 = 3; //使用联合类型即可在--stricNullChecks模式下正常执行
num1 = null;
/*
* naver类型，表示永远不存在的类型，常用于函数中，他也跟undefined一样属于所有类型的子类型，但是他自己没有子类型
*/
function error(message) {
    throw new Error(message);
}
function fail() {
    return error('something failed');
}
function inifiniteLoop() {
    while (true) {
    }
}
/*
* object类型,表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。
*/
// declare function create(o: object | null): void;    //declare声明一个函数，并且没有返回值
// create({ prop: 0 })
// create(null)
// create(4)           //error
// create('string')    //error       
/*
*  类型断言,强制转成某种类型来解析，如下两种写法都可以
*/
var someValue = 'this is a string';
var strLength = someValue.length;
var strLength2 = someValue.length;
/*
*  数组结构赋值
*/
var input = [1, 2]; //下面形参使用了元祖类型的声明，则这里也必须声明为元祖类型
function f(_a) {
    var first = _a[0], second = _a[1];
    console.log(first);
    console.log(second);
}
f(input);
/*
*  对象结构赋值
*/
var o = {
    a: 'foo',
    b: 12,
    c: 'bar',
    d: 15
};
var isa = o.a, isb = o.b, rest = __rest(o, ["a", "b"]); // 前面为重命名，其后才是指定数据类型
console.log(isa, isb, rest);
/*
*  函数传参默认值
*/
function keepWholeObject(wholeObject) {
    var a = wholeObject.a, _a = wholeObject.b, b = _a === void 0 ? 1001 : _a;
}
keepWholeObject({ a: 'da', b: 11 });
function keepWholeObject2(_a) {
    var a = _a.a, _b = _a.b, b = _b === void 0 ? 0 : _b;
} //这里可以用type单独定义规则后在这里使用，就不用写很长一串在这里
keepWholeObject2({ a: 'da' }); //b?  b可以不传，但是a必须穿         
function keepWholeObject3(_a) {
    var _b = _a === void 0 ? { a: '11' } : _a, a = _b.a, _c = _b.b, b = _c === void 0 ? 0 : _c;
} //默认参数，不仅传入的对象有默认参数，对象的属性也同时有默认参数
keepWholeObject3({ a: 'da' }); //b可以不传，但a不能不传，因为上面默认对象中有a。一旦传了对象就必须包含a
var p1 = { x: 10, y: 20 };
// p1.x = 5         //readonly定义的只读类型不能再更改会报错
// -----只读数组
var a = [1, 2, 3];
var ro = a; //进行类型转换成只读数组
// ro[1] = 2          //不能再改变
// ro[0].push(1)      //push方法也不能用
// a = ro             //类型不匹配，也无法再重新赋值回去
a = ro; //可通过类型断言来强制转换并赋值
function createSquare(config) {
    var newSquare = { color: 'white', area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
// let config = {
//     color:'black',
//     width: 100
// }
var mySquare = createSquare({ color: 'black', width: 100 });
