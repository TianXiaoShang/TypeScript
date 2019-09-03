/*
*   定义参数类型
*/
function greeter(person: string) {
    return 'hello ' + person
}
let user = 'shang'
console.log(greeter(user))    //类型必须为字符串并且只能有一个参数



/*
*   定义一个接口，通过接口限制参数类型
*/
interface Person {     //定义一个接口，定义传入的参数及参数类型
    firstName: string
    lastName?: string    //可选属性
}
function greeter1(person: Person) {       //指定需要遵守的接口类型
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

interface Person2 {                 //定义一个接口，定义传入的参数及参数类型
    firstName: string
    lastName: string
}
function greeter2(person: Person2) {
    return 'hello ' + person.firstName + '=' + person.lastName
}

class User {
    firstName: string
    lastName: string
    constructor(firstName: string, lastName: string) {
        this.firstName = firstName
        this.lastName = lastName
    }
}

let user2 = new User('tian', 'shang')
console.log(greeter(user))        //传入对象



/*
* 数组类型定义
*/
let isLlist: number[] = [1, 2, 3]                //规定为数组并且全部由number组成
// let isList2 : Array<number> = [1,2,3,4,'9']   //数组泛型，同上，出现非number数据类型会报错，推荐上一种书写方式



/*
* 定义元组  ——  表示一个已知元素数量和类型的数组
*/
let x: [string, number]          //定义元组 
x = ['hello', 10]                //按照指定位置的数据类型定义，顺序跟数据类型都必须对应上
console.log(x[0].substr(1))
// console.log(x[1].substr(1))     //使用非指定数据类型上的方法会报错
// x[3] = 1                        //当访问一个越界元素则用联合类型代替，也就是string | number（3.1版本开始也会报错，应该弃用此特征，如下同理）
// x[3] = true                     //不可以，没有指定过Boolean的数据类型
// x[5].toString()                 //不会报错，虽然不存在，但为以上定义的string与number都存在tostring方法
// x[6].substr()                   //报错，与上反之



/*
* 定义枚举
*/
enum Color {
    Red = 1,        //自定义编号
    Green = 2,
    Blue
}

let c: Color = Color.Green           // 2 --> 获取枚举值
let ColorName: string = Color[2]     // Green  --> 可以通过枚举值来反查   -- 编译原理 --> Color[Color["Red"] = 1] = "Red"  --> 给Color同时增加两个属性
console.log(ColorName, c)



/*
* 定义any，如下例子都不报错，也就是随意数据类型，在不确定的时候使用，ts会跳过检查。
*/
let notSure: any = 4
notSure = '1222'
notSure = false
let list: any[] = [1, true, 'free']    //未知数组时可以使用



/*
* void类型，通常在函数使用，当函数没有返回值时这个函数的返回值类型就是void
*/
function warnUser(): void {
    console.log('This i my waring message')
}
let unusble: void = null                  //声明一个值为void是没有意义的，而且除了赋值null和undefined会报错
let unusble2: void = undefined            //另外null跟undefined分别也是两种数据类型，且该数据类型的值为且仅为自身



/*
* 父子类型与联合类型
*/
let num: number = 3
num = null               // --stricNullChecks    在运行tsc命令时不做该处理不会报错，我们知道undefined跟null是所有类型的子类型，
// 而作为子类型是可以赋值给父类型的。这也就解释了为什么null跟undefined可以赋值给void类型

let num1: number | null = 3     //使用联合类型即可在--stricNullChecks模式下正常执行
num1 = null



/*
* naver类型，表示永远不存在的类型，常用于函数中，他也跟undefined一样属于所有类型的子类型，但是他自己没有子类型
*/
function error(message: string): never {   //它必须有无法到达的终点，才不会报错
    throw new Error(message)
}
function inifiniteLoop(): never {           //它必须有无法到达的终点，才不会报错
    while (true) {
    }
}


/*
* object类型,表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。
*/
// declare function create(o: object | null): void;    //declare声明一个函数，并且没有返回值
// create({ prop: 0 })
// create(null)
// create(4)           //error 只能传object类型的值或者null 
// create('string')    //error 只能传object类型的值或者null        



/*
*  类型断言,强制转成某种类型来解析，如下两种写法都可以
*/
let someValue: any = 'this is a string'
let strLength: number = (<string>someValue).length
let strLength2: number = (someValue as string).length



/*
*  数组结构赋值
*/
let input: [number, number] = [1, 2]             //下面形参使用了元祖类型的声明，则这里也必须声明为元祖类型
function f([first, second]: [number, number]) {
    console.log(first)
    console.log(second)
}
f(input)



/*
*  对象结构赋值
*/
let o = {
    a: 'foo',
    b: 12,
    c: 'bar',
    d: 15
}
let { a: isa, b: isb, ...rest }: { a: string, b: number } = o    // 前面为重命名，其后才是指定数据类型
console.log(isa, isb, rest)



/*
*  函数传参默认值
*/
function keepWholeObject(wholeObject: { a: string, b?: number }) {    //b?意思是b可以不传
    let { a, b = 1001 } = wholeObject
}
keepWholeObject({ a: 'da', b: 11 })



/*
*  函数传参默认值2(type语法)
*/
type C = { a: string, b?: number }
function keepWholeObject2({ a, b = 0 }: C): void { }               //这里可以用type单独定义规则后在这里使用，就不用写很长一串在这里
keepWholeObject2({ a: 'da' })                                      //b?  b可以不传，但是a必须传     

function keepWholeObject3({ a, b = 0 } = { a: '11' }): void { }   //默认参数，不仅传入的对象有默认参数，对象的属性也同时有默认参数
keepWholeObject3({ a: 'da' })                                     //b可以不传，但a不能不传，因为上面默认对象中有a。一旦传了对象就必须包含a




/*
*  接口-定义只读类型
*/
interface Point {
    readonly x: number
    readonly y: number
}
let p1: Point = { x: 10, y: 20 }
// p1.x = 5         //readonly定义的只读类型不能再更改会报错

// -----只读数组
let a: number[] = [1, 2, 3]
let ro: ReadonlyArray<number> = a        //进行类型转换成只读数组
// ro[1] = 2          //不能再改变
// ro[0].push(1)      //push方法也不能用
// a = ro             //类型不匹配，也无法再重新赋值回去
a = ro as number[]    //可通过类型断言来强制转换并赋值

//------只读对象
let p2: Point = { x: 10, y: 20 };     //point代表对象及中的属性不可被修改
//  ps:一般来讲，针对变量我们用const，针对属性我们用欧冠Readonly

/*
*  接口-额外属性检查
*/
interface Square {                 //返回值的类型检查接口
    color: string
    area: number
}
interface SquareConfig {
    color?: string
    width?: number
    [propName: string]: any    //这种方式表示允许其他多余属性传入并且可以是任意类型，可以解决使用对象字面量传参时多余属性的类型检查报错
}
function createSquare(config: SquareConfig): Square {
    let newSquare = { color: 'white', area: 100 }
    if (config.color) {
        newSquare.color = config.color
    }
    if (config.width) {
        newSquare.area = config.width * config.width
    }
    return newSquare
}
let config = {        //这样传值只需要接口指定的属性类型对应即可；不会特别严格；
    color:'black',
    age:50,
    width: 100
}
let mySquare = createSquare({ color: 'black', width: 100})    //这种对象字面量的传参会更严格的检查，不允许传递多余的参数，会报错。
// let mySquare = createSquare({ color: 'black', width: 100, age: 35})    //如上propName可以帮助我们传多余的任意类型的参数
// let mySquare = createSquare({ color: 'black', width: 100, age:50 } as SquareConfig)    //通过类型断言可以避开这种检查，但是这并不是最好的解决办法；
// 另外尽管使用非对象字面量传参的方式可以避开检查，但是我们使用ts的意义并不是来满足ts不报错，所以我们真正使用的时候哪怕他不会报错，我们都应在接口里面定义预料之中的值或者propName来进行规则的定义，以使得代码更加严谨！



/*
*  接口-函数类型
*/
interface SearchFunc {                    //定义一个函数的参数和返回值类型
    (source:string,subString:string):boolean
}
let mySearch : SearchFunc
mySearch = function(src: string, sub: string):boolean{    //这里的参数名只要顺序对应也可以，不需要对应形参名一样，后面的boolean定义也可以不要；
    let result = src.search(sub)
    return result > -1
}



/*
*  接口-索引类型
*/
interface StringArray {
    [index: number]: string
}
let myArray: StringArray
myArray = ['bob', 'fred']
let myStr: string = myArray[0]