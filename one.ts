/*
*   定义参数类型
*/
function greeter(person: string){
    return 'hello ' + person
}
let user = 'shang'
console.log(greeter(user))    //类型必须为字符串并且只能有一个参数



/*
*   定义一个接口，通过接口限制参数类型
*/
interface Person{     //定义一个接口，定义传入的参数及参数类型
    firstName: string
    lastName: string
}
function greeter1(person: Person){       //指定需要遵守的接口类型
    return 'hello ' + person.firstName + '=' + person.lastName
}
let user1 = {
    firstName: 'shang',
    lastName: 'tian'
}
console.log(greeter(user))    //传入对象 



/*
*   通过类的方式定义一个接口，通过接口限制参数类型
*/
class User {
    firstName : string
    lastName: string
    constructor(firstName:string, lastName:string){
        this.firstName = firstName
        this.lastName = lastName
    }
}

interface Person{                 //定义一个接口，定义传入的参数及参数类型
    firstName: string
    lastName: string
}
function greeter2(person: Person){
    return 'hello ' + person.firstName + '=' + person.lastName
}
let user2 = new User('tian','shang')
console.log(greeter(user))        //传入对象



/*
* 数组类型定义
*/
let isLlist :number[] = [1,2,3]                //规定为数组并且全部由number组成
// let isList2 : Array<number> = [1,2,3,4,'9']   //数组泛型，同上，出现非number数据类型会报错，推荐上一种书写方式



/*
* 定义元组
*/
let x:[string, number]          //定义元组 
x = ['hello',10]                //按照指定位置的数据类型定义，顺序跟数据类型都必须对应上
console.log(x[0].substr(1))    
// console.log(x[1].substr(1))     //使用非指定数据类型上的方法会报错
x[3] = 1                           //当访问一个越界元素则用联合类型代替，也就是string | number
// x[3] = true                     //不可以，没有指定过Boolean的数据类型
x[5].toString()                    //不会报错，虽然不存在，但为以上定义的string与number都存在tostring方法
// x[6].substr()                   //报错，与上反之



/*
* 定义枚举
*/
enum Color{
    Red = 1,        //自定义编号
    Green = 2,
    Blue
} 

let c:Color = Color.Green     // 2 --> 获取枚举值
let ColorName: string = Color[2]     // Green  --> 可以通过枚举值来反查   -- 编译原理 --> Color[Color["Red"] = 1] = "Red"  --> 给Color同时增加两个属性
console.log(ColorName,c)



/*
* 定义any，如下例子都不报错，也就是随意数据类型，在不确定的时候使用，ts会跳过检查。
*/
let notSure: any = 4 
notSure = '1222'
notSure = false
let list:any[] = [1, true, 'free']    //未知数组时可以使用



/*
* void类型，通常在函数使用，当函数没有返回值时这个函数的返回值类型就是void
*/
function warnUser(): void{
    console.log('This i my waring message')
}
let unusble: void = null                  //声明一个值为void是没有意义的，而且除了赋值null和undefined会报错
let unusble2: void = undefined            //另外null跟undefined分别也是两种数据类型，且该数据类型的值为且仅为自身



/*
* 父子类型与联合类型
*/
let num:number = 3
num = null               // --stricNullChecks    在运行tsc命令时不做该处理不会报错，我们知道undefined跟null是所有类型的子类型，
                         // 而作为子类型是可以赋值给父类型的。这也就解释了为什么null跟undefined可以赋值给void类型

let num1:number | null = 3     //使用联合类型即可在--stricNullChecks模式下正常执行
num1 = null



/*
* naver类型，表示永远不存在的类型，常用于函数中，他也跟undefined一样属于所有类型的子类型，但是他自己没有子类型
*/
function error(message: string): never{   //它必须有无法到达的终点，才不会报错
    throw new Error(message)
}
function fail(){
    return error('something failed')
}

function inifiniteLoop():never{           //它必须有无法到达的终点，才不会报错
    while(true){
    }
}


/*
* object类型,表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。
*/
declare function create(o: object | null): void;    //declare声明一个函数，并且没有返回值
create({prop: 0})
create( null)
// create(4)           //error
// create('string')    //error       



/*
*  类型断言,强制转成某种类型来解析，如下两种写法都可以
*/
let someValue: any = 'this is a string'
let strLength: number = (<string>someValue).length
let strLength2: number = (someValue as string).length