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
=======



## TODO
- [x] ADD jsonp
- [ ] ADD window.name
- [ ] ADD document.domain
- [ ] ADD CSS