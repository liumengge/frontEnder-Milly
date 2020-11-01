// 请求服务器接口的统一前缀地址（此处的地址要和后台启动服务的地址保持一致）
axios.defaults.baseURL = 'http://127.0.0.1:8888';
// 允许跨域资源共享的时候携带资源凭证（很重要：因为项目中我们要携带cookie信息给服务器，这个必须设置为TRUE）
axios.defaults.withCredentials = true;
// 根据后台的规则，要求传递给服务器的数据格式都是x-www-form-urlencoded
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
// 基于POST向服务器发送请求，把请求主体中传递的信息进行拦截处理，处理成为x-www-form-urlencoded这种格式的
axios.defaults.transformRequest = function (data) {
	if (!data) return data;
	let result = ``;
	for (let attr in data) {
		if (!data.hasOwnProperty(attr)) break;
		result += `&${attr}=${data[attr]}`;
	}
	return result.substring(1);
};
// 响应拦截器：把从服务器获取的结果response进行处理
axios.interceptors.response.use(function onFulfilled(response) {
	// 只返回响应主体的信息
	// response: {config/request/headers/data...} 
	return response.data;
}, function onRejected(reason) {
	// 失败：返回状态码是4/5开头的，再或者根本就没有发送到服务器上（在这里统一处理此类型失败的提示）
	return Promise.reject(reason);
});
// 自定义响应状态码：axios认为只有状态码是2开头的才是成功，但是我们可以自己定义，此处我定义的是2/3开头都算成功
axios.defaults.validateStatus = function (status) {
	return /^(2|3)\d{2}$/.test(status);
}

// 关于axios中的响应拦截器： (请求拦截器也是一样的道理)
	// axios中 transformResponse 把取到的结果进行格式化(结果本身就是请求主体的信息)
	// axios中真正的响应拦截器是axios.interceptors.response