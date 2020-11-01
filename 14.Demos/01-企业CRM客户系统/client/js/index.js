// 校验是否登录
axios.get('/user/login').then(result => {
	console.log(result);
});