## 前端文件上传

> 前端文件上传是工作中经常接触的功能，希望通过本篇文章详细整理有关于前端文件上传的知识点和实现方式。


## 基础

### Blob

原本，JavaScript无法处理二进制数据，ECMAScript 5引入了Blob对象，允许直接操作二进制数据。Blob对象是一个代表二进制数据的基本对象，在它的基础上，又衍生出一系列相关的API，用来操作文件。

Blob构造函数，接受两个参数。第一个参数是一个包含实际数据的数组，第二个参数是数据的类型，这两个参数都不是必需的。Blob对象的slice方法，将二进制数据按照字节分块，返回一个新的Blob对象。在Ajax操作中，如果xhr.responseType设为blob，接收的就是二进制数据。Blob对象有两个只读属性：size：二进制数据的大小，单位为字节；type：二进制数据的MIME类型，全部为小写，如果类型未知，则该值为空字符串。



### File

FileList：针对表单的file控件。当用户通过file控件选取文件后，这个控件的files属性值就是FileList对象。它在结构上类似于数组，包含用户选取的多个文件。
File:
FileReader:


参考：http://javascript.ruanyifeng.com/htmlapi/file.html
https://wangdoc.com/javascript/bom/file.html
https://github.com/zhaopeiym/BlogDemoCode/tree/master/%E4%B8%8A%E4%BC%A0%E4%B8%8B%E8%BD%BD/%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E4%B8%8B%E8%BD%BD
