/*
*   定义参数类型
*/
// function greeter(person: string){
//     return 'hello ' + person
// }
// let user = 'shang'
// console.log(greeter(user))    //类型必须为字符串并且只能有一个参数
/*
*   定义一个接口，通过接口限制参数类型
*/
// interface Person{     //定义一个接口，定义传入的参数及参数类型
//     firstName: string
//     lastName: string
// }
// function greeter(person: Person){       //指定需要遵守的接口类型
//     return 'hello ' + person.firstName + '=' + person.lastName
// }
// let user = {
//     firstName: 'shang',
//     lastName: 'tian'
// }
// console.log(greeter(user))    //传入对象 
/*
*   通过类的方式定义一个接口，通过接口限制参数类型
*/
// class User {
//     firstName : string
//     lastName: string
//     constructor(firstName:string, lastName:string){
//         this.firstName = firstName
//         this.lastName = lastName
//     }
// }
// interface Person{                 //定义一个接口，定义传入的参数及参数类型
//     firstName: string
//     lastName: string
// }
// function greeter(person: Person){
//     return 'hello ' + person.firstName + '=' + person.lastName
// }
// let user = new User('tian','shang')
// console.log(greeter(user))        //传入对象
/*
* 数组类型定义
*/
// let list :number[] = [1,2,3]     //规定为数组并且全部由number组成
// let list2 : Array<number> = [1,2,3,4,'9']   //数组泛型，同上，出现非number数据类型会报错，推荐上一种书写方式
/*
* 定义元组
*/
// let x:[string, number]          //定义元组 
// x = ['hello',10]                //按照指定位置的数据类型定义，顺序跟数据类型都必须对应上
// console.log(x[0].substr(1))    
// console.log(x[1].substr(1))     //使用非指定数据类型上的方法会报错
// x[3] = 1                        //这样是可以的，增加数据的数据类型有定义过
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
var ColorName = Color[2]; // Green  --> 可以通过枚举值来反查
console.log(ColorName, c);

