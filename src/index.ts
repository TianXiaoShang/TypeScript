/*
*   定义参数类型
*/
function greeter(person: string) {
    return 'hello ' + person
}
let user = 'shang'
console.log(greeter(user))     //类型必须为字符串并且只能有一个参数


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
console.log(greeter1(user1))    //传入对象 



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
console.log(greeter2(user2))        //传入对象



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
// let unusble: void = null                  //声明一个值为void是没有意义的，而且除了赋值null和undefined会报错
let unusble2: void = undefined            //另外null跟undefined分别也是两种数据类型，且该数据类型的值为且仅为自身



/*
* 父子类型与联合类型
*/
let num: number = 3
// num = null               // --stricNullChecks    在运行tsc命令时不做该处理不会报错，我们知道undefined跟null是所有类型的子类型，
// 而作为子类型是可以赋值给父类型的。这也就解释了为什么null跟undefined可以赋值给void类型
//但是这里我们通过strictNullChecks严格模式防止了这种事情发生，所以同样会报错

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
*  数组解构赋值
*/
let input: [number, number] = [1, 2]             //下面形参使用了元祖类型的声明，则这里也必须声明为元祖类型
function f([first, second]: [number, number]) {
    console.log(first)
    console.log(second)
}
f(input)



/*
*  对象解构赋值
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

type readOnly = {
    readonly arr: readOnly[]    //既不能重新赋值也不能更改数组元素
}

//------只读对象
let p2: Point = { x: 10, y: 20 };     //point代表对象及中的属性不可被修改
//  ps:一般来讲，针对变量我们用const，针对属性我们用欧冠Readonly


/*
*  接口-额外属性检查（类型兼容性）
*/
interface Square {                 //返回值的类型检查接口
    color: string
    area: number
}
interface SquareConfig {
    color?: string
    width?: number
    [propName: string]: any       //这种方式表示允许其他多余属性传入并且可以是任意类型，可以解决使用对象字面量传参时多余属性的类型检查报错
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
let config = {         //这样传值只需要接口指定的属性类型对应满足即可；不会特别严格；
    color: 'black',
    age: 50,
    width: 100
}
let mySquare = createSquare({ color: 'black', width: 100 })    //这种对象字面量的传参会更严格的检查，不允许传递多余的参数，会报错。
// let mySquare = createSquare({ color: 'black', width: 100, age: 35})    //如上propName可以帮助我们传多余的任意类型的参数
// let mySquare = createSquare({ color: 'black', width: 100, age:50 } as SquareConfig)    //通过类型断言可以避开这种检查，但是这并不是最好的解决办法；
// 另外尽管使用非对象字面量传参的方式可以避开检查，但是我们使用ts的意义并不是来满足ts不报错，所以我们真正使用的时候哪怕他不会报错，我们都应在接口里面定义预料之中的值或者propName来进行规则的定义，以使得代码更加严谨！



/*
*  接口-函数类型
*/
interface SearchFunc {                    //定义一个函数的参数和返回值类型
    (source: string, subString: string): boolean
}
let mySearch: SearchFunc
mySearch = function (src: string, sub: string): boolean {    //这里的参数名只要顺序对应也可以，不需要对应形参名一样，后面的boolean定义也可以不要；
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


/* 
* 字面量约束
*/
let mySex: "男" | "女";    //只能取其中的值
mySex = "女"



/*
*  类型别名  对已知的一些类型定义名称,简化重复代码
*/
type Gender = '男' | '女'
type isUser = {
    name: string
    age: number
    gender: Gender
}
let u: isUser
u = {
    name: 'shang',
    gender: '男',
    age: 19
}
function getUsers(): User[] {
    return []
}



/* 
*  函数重载   在函数调用前对函数的多种可能进行声明，以约束函数的返回结果在可控范围内同时帮助ts更好的检查类型
*/
/** 
 * 得到a*b的结果 
 * @param a 
 * @param b 
 */
function combine(a: number, b: number): number;
/** 
 * 得到a拼接b的结果 
 */
function combine(a: string, b: string): string;
function combine(a: number | string, b: number | string): number | string {
    if (typeof a == 'number' && typeof b == 'number') {
        return a * b
    }
    else if (typeof a == 'string' && typeof b == 'string') {
        return a + b
    }
    throw Error('参数传递错误！')
}
const combineResult = combine('1', '2')     //当以上进行函数重载后，此处不符合两种传参规则的情况都将会报错，并且此时ts已经可以准确的判断返回值为number或者string



/*
* 定义枚举，枚举的值只能是字符串或者数字，不能为其他
* 
*/
enum Color {
    Red = 1,        //自定义编号,左边为逻辑涵义，右边则为真实的值
    Green = 2,
    Blue
}

let c: Color = 3                     // 数字枚举的变量可以直接赋值为数字，但不提倡这样做
let d: Color = Color.Green           // 2 --> 获取枚举值
let e: Color = Color.Blue            // 3 ---> 数字枚举会自动递增，如果第一个都没有就是从0开始
let ColorName: string = Color[2]     // Green  --> (仅数字枚举)可以通过枚举值来反查   -- 编译原理 --> Color[Color["Red"] = 1] = "Red"  --> 给Color同时增加两个属性
console.log(ColorName, c, d, e)
/**
 * 关于枚举补充--首先解决改变字面内容同时要改变很多后面赋值的逻辑内容的地方，产生很多的修改操作；
 * 其次最重要的他解决了如下定义范围在编译后消失的问题（在js中找不到我们所定义的EmunGender的取值范围，ts被编译后是不存在的；失去了他反过来查询可选范围的功能）
 * 枚举是会存在编译结果中的，是可查的，编译完为对象
 */
type EnumGender = '帅哥' | '美女'
let enumGender: EnumGender
enumGender = '帅哥'
enumGender = '美女'
function searchUsers(g: EnumGender) { }

/**
 * 枚举-拓展知识，位运算（把数字换算成二进制后进行的运算）
 */
enum Permission {      //使用2的n次幂,巧妙的构成如下二进制表现规律
    Read = 1,    //   => 0001
    Write = 2,   //   => 0010
    Create = 4,  //   => 0100
    Delete = 8   //   => 1000
}
// 1.如何组合权限
// 使用或运算（位运算的一种）
// 具体为把两者二进制的相同位数来进行比较，其中有一个为1（真）则返回真，如下
// 0001
// 或
// 0010
// 返回
// 0011

let p = Permission.Read | Permission.Write;
p = p | Permission.Delete;     //也可以这样继续添加权限，最终为1011
console.log(p, 375)             // => 11 (打印出11，而11在二进制中表现为1011)

//2.如何判断是否拥有某个权限
function hasPermission(target: Permission, per: Permission) {
    // & 且运算（位运算的一种），与或运算相反，当二进制中对应的位数来比较最后返回布尔值，其比较的位数同时都为1则返回真，否则一个1也会返回假
    // 如下判断p中是否拥有Write权限：
    // 1011
    // 且
    // 0010
    // 返回
    // 0010
    return (target & per) === per;
}
let per = hasPermission(p, Permission.Read)
console.log(per, 389)         //打印为true

// 3.如何删除某个权限
// ^ 异或运算（位运算的一种），二进制中相同位数相同则取0，不同则取1；
// 如下：给p去除Write权限
// 1011
// 异或
// 0010
// 返回
// 1001
p = p ^ Permission.Write;
console.log(p, 400)   // ==> 9 在二进制中表现为1001
console.log(hasPermission(p, Permission.Write))   //false   删除成功



/**
 * 模块化，跟普通的es6标准一样使用（重点在编译后的模块化规范）
 */
import { sum, name } from './module'
console.log(sum(2, 4), name, 409)



/**
 * 接口类型，用来约束类，对象，函数（跟type类型别名差不多，暂时建议在约束对象时尽量都用interface）
 */
interface myUser {
    name: string
    age: string
    sayHello: () => void
}
let isU: myUser = {
    name: 'sdfds',
    age: '33',
    sayHello() {
        console.log('hello world')
    }
}
isU.sayHello()

/**
 * 函数类型接口
 * @param numbers 
 * @param callBack 
 * 显然，以下type跟interface两者都可以作为约束。但是更推荐interface接口类型
 */
// type Condition = (n:number)=>boolean
interface Condition {
    (n: number, i: number): boolean
}
function mySum(numbers: number[], callBack: Condition): number {
    let s = 0;
    numbers.forEach((n, i) => {
        if (callBack(n, i)) {
            s += n;
        }
    })
    return s;
}
let s = mySum([1, 2, 2, 3, 1, 4], (a) => {         //这里可以只用一个参数，虽然规定传两个
    return a > 2
})
console.log(s)


/**
 * 接口的继承(如下一看就懂)
 * 可以通过多种接口组合新的契约
 */
interface AA {
    T1: string
}
interface BB extends AA {
    T2: number
}
interface CC extends AA, BB {
    T3: boolean
    // T1:number              //接口中子接口不能覆盖父接口的类型（除非类型不变）
}
let DD: CC = {
    T1: 'ds',
    T2: 15,
    T3: true
}


/**
 * 类型别名实现“继承”
 * 类型别名也可以通过交叉类型实现继承的效果，但是更推荐使用接口来完成
 */
type EE = {
    T1: string
}
type FF = {
    T2: number
}
type JJ = {
    T3: boolean
    // T1:number  //与接口不同，覆盖时不会报错，但是如果类型改变，最后的T1类型将会合并，导致赋值啥都不行。所以这是一个类型别名实现继承的缺点
} & EE & FF       //交叉类型，实现继承.

let HH: JJ = {
    T1: 'dss',
    T2: 155,
    T3: true
}



/**
 * 类  class
 * ts中类的属性需要使用属性列表首先定义，不允许随意给类添加未定义的属性；直接写在类中，写法如下：
 */
class classUser {
    // 属性列表规定实例所能拥有的属性
    readonly id: number
    age: number
    gender:'男' | '女' = '男'    //默认的则可以不传递值，构造函数中也可以不写this.gender
    pid?:string                 //可选属性

    private _publishNumber:number = 3     //(private私有访问修饰符表示属性只能在类中使用，无法在外面访问)每天一共可以发布的文章数量
    currentNumner:number = 0    //当前可以发布的文章数量

    constructor(public name:string, age:number) {    //这里的访问修饰符（公开的）是触发ts的语法糖，这种直接赋值没有经过任何处理的属性，可以使用这种简写，对比age属性省去两行代码；
        this.age = age;
        this.id = Math.random()
        // this.gender = gender
        // this.pid = pid
    }
    publish(title:string){
        if(this.currentNumner < this._publishNumber){
            console.log('发布一篇文章：' + title)
            this.currentNumner ++
        }else{
            console.log('今日发布文章数量已达上限')
        }
    }

    set publishNumber(value){               //访问器（间接控制私有属性，但是受到控制），用于控制属性的读取。是语法糖，其实还是调用函数返回结果,如isu.getpublishNumber()
        if(value > 0 && value < 10){
            this._publishNumber = value
        }else[
            this._publishNumber = 3    //默认三条
        ]
    }
    get publishNumber(){
        return Math.floor(this._publishNumber)
    }
}
const isu = new classUser('shang',12)
isu.gender = '女'
isu.publishNumber = -9
console.log(isu)
// 由私有属性控制只能发几张
isu.publish('文章1')
isu.publish('文章2')
isu.publish('文章3')
isu.publish('文章4')
isu.publish('文章5')
isu.publish('文章6')



