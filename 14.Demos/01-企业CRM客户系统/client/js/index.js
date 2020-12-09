// 3. 基于发布订阅管控获取基本信息之后逐一做的事情
// 回顾发布订阅模式：03.JavaScript/03-高级/JS设计模式
let $plan = $.Callbacks();

$plan.add(function (baseInfo) {  
	// 在头部右上角展示登录用户的基本信息
	let $baseBox = $('.baseBox'),
	$baseBoxSpan =  $baseBox.find('span'),
	$signOut = $baseBox.find('a');

	$baseBoxSpan.html(`您好：${baseInfo.name}`);

	// 退出登录
	$signOut.click(function () {
		// 提前定义
		let handled = async type => {
			if (type !== 'CONFIRM') return;
			// 点击确定按钮
			let result = await axios.get('/user/signout');
			if (parseInt(result.code) !== 0) {
				alert('退出登录失败，请稍后再试！');
				return;
			}
			alert('退出登录成功，即将退出到登录页面！', {
				handled: _ => {
					window.location.href = 'login.html';
				}
			});
		}

		alert('您确定要退出登录吗？', {
			confirm: true,
			handled  // ES6语法
		});
	});
})


$(async function () {
	// 1. 检验当前用户是否登录, 该URL参看API.TXT文件中的相关设置  --- 必做
	let result = await axios.get('/user/login');
		
	if (parseInt(result.code) !== 0) {
		// 返回结果中的code !== 0， 表示未登录成功，给出提示
		alert('您当前尚未登陆，请先登录！', {
			handled: _ => {
				window.location.href = 'login.html';
			}
		});
		return;
	}

	// 2. 获取当前登录用户的基本信息和权限信息
	// 并发请求数组
	let requestArr = [],
			results;
	
	requestArr.push(
		axios.get('/user/info').then(result => {
			// 获取当前用户的基本信息
			if (parseInt(result.code) === 0) {
				// 请求成功，返回data信息
				return result.data;
			}
			// 未请求成功
			return Promise.reject();
		})
	);

	requestArr.push(
		axios.get('/user/power').then(({code, power}) => {
			// 获取当前用户的权限信息
			// 使用直接结构的形式获取返回信息
			if (parseInt(code) === 0) {
				return power;
			}

			return Promise.reject();
		})
	);

	results = await Promise.all(requestArr);   // 得到的数组元素是：[{xxx}, "xxx"]，第一个元素是用户的基本信息对象，第二个元素是用户权限字符串
	// 将用户权限信息添加到用户基本信息对象中
	results[0]['power'] = results[1];
	results = results[0];   // 现在的results是用户的基本信息对象
	// console.log(results);
	// 通知计划表中的方法执行
	$plan.fire(results);

});



