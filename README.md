# Javascript跨域演示

## 安装方法
```
git clone https://github.com/forclan/cross-domain-playground.git
```

## 运行
```
npm start
```

## 跨域方法
* [CORS](#CORS)
* [JSONP](#JSONP)

### <span id="CORS">CORS</span>

[CORS跨域原理](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)
默认在地址 *localhost:9889/xhr* 提供ajax的服务.
chrome浏览器打开任何一个<font color=red>http</font>(使用CORS跨域不允许不同的协议，http无法实现与https的域名进行跨域)的网站，在其console中输入：
```
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:9889/xhr', true);
xhr.send();
```
如果跨域成功，则可以通过`responseText`访问跨域的结果:
```
xhr.responseText;
// results
// "{"name":"forclan","age":1080,"port":9889,"requestReferer":"http://blog.csdn.net/fdipzone/article/details/46390573"}"
```

### <span id="JSONP">JSONP</span>

[JSONP跨域原理](http://stackoverflow.com/questions/2067472/what-is-jsonp-all-about)
使用JSONP的核心是*script*, *img*标签是没有同源策略的。也就是说不论当前的地址是多少，在*script*标签中必然能够访问的src所指向的内容，也就实现了跨域。

在该项目中使用的一个jsonp请求可以是这样子的：
*http://localhost:9889/jsonp.js?callback=console.log&id=1090*

http://localhost:9889/jsonp.js 是请求的地址，本次采用jsonp.js表示该此请求为jsonp请求。
'?'后面的参数callback=console.log&id=1090表示请求的信息。其中
- callback=console.log 表示返回给用户的回调函数名。
- id=1090 表示需要请求的数据。

服务器在接收到请求后的处理流程是这样的:
- 判断是jsonp请求
- 从请求的url中找出用户想要返回的数据，并查询结果,将其转换为json对象
- 从url中找到用户需要的回调函数，将其放在查询结果前面
- 返回结果给用户

等同于用户请求上面的url后，得到了一个jsonp.js文件，文件内容是:
```
// 浏览器接收到到文件jsonp.js
console.log({
  id: 1090,
  // 查询的name
  name: go1123,
  // 查询到的性别
  sex: male
})
```

#### JSONP使用方法
启动服务器
```
npm start
```
现在jsonp的服务器在*http://localhost:9889/jsonp.js*上运行。
你可以直接访问http://localhost:9889/jsonp.js，界面会是这样的：
![jsonp](/images/jsonp.js-capture.png)

网页显示这个是由于直接访问jsonp.js而没有传入任何参数，于是服务器直接返回`({})`,后面的console.log是用于debug的语句，服务器一定会返回这条语句。
如果你将访问的地址改成`http://localhost:9889/jsonp.js?name=zmsj`，界面上显示的结果为：
```
({"name":"zsmj44"});console.log("jsonp received")
```
服务器在接收到请求后，会截取'?'后面的字符串。并对该字符串以‘&’符号切割不同的属性值，‘=’前面的转化为对象的属性名，‘=’后面的设置为属性值。
```
// example
id=zsmj&port=9889
// transmite to 
/*
  {
    'id': 'zsmj',
    'port': '9889'
  }
*/
```
并在这个对象的属性值后面添加一个随机的数值（模拟查询操作）,所以访问`http://localhost:9889/jsonp.js?name=zmsj`得到结果为`({"name":"zsmj44"});console.log("jsonp received")`.44是随机添加的数字。
值得一提的是callback属性，callback后面的参数会被当做回调函数的名字被添加到返回文件的前面
```
http://localhost:9889/jsonp.js?name=zsmj&callback=myCallback
// result
// myCallback({"name":"zsmj59"});console.log("jsonp received")
```
打开一个网页(http协议的)。然后在console进行一下操作
```
// 定义回调函数
function myCallback(obj) {
  console.log(obj);
}
```
创建script节点
```
var src = document.createElement('script');
// 设置传入的参数，回调函数名
src.setAttribute('src', 'http://localhost:9889/jsonp.js?callback=myCallback&id=azz');
```
将节点插入DOM（运行）
```
document.body.appendChild(src);
// result
// Object {id: "azz90"}
```

如果你不想使用本地的服务器，可以访问*http://www.forclan.com:9889/jsonp.js*,这个地址提供jsonp服务。
使用方法：在你的html文件中添加
```
<script src='http://www.forclan.com:9889/jsonp.js&callback=myCallback&testAttr=13'></script>
```
## TODO
- [x] ADD jsonp
- [ ] ADD window.name
- [ ] ADD document.domain
- [ ] ADD CSS