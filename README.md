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




## TODO
- [ ] ADD jsonp
- [ ] ADD window.name
- [ ] ADD document.domain
- [ ] ADD CSST
