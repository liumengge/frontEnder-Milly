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

			// 清除本地存储的用户信息
			localStorage.removeItem('baseInfo');
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

$plan.add(baseInfo => {
	// 获取元素
	let $navBox = $('.navBox'),
			$menuBox = $('.menuBox'),
			$iframeBox = $('.iframeBox');

	// 构建渲染视图的数据模型
	let renderData = {
		// 权限字段信息
		power: baseInfo.power,
		// 头部导航选中哪一个
		active: 1,
		// 左侧menu数据
		menu: [{
		title: '员工管理',
		icon: 'icon-yuangong',
		children: [{
			name: '员工列表',
			href: 'page/userlist.html'
		}, {
			name: '新增员工',
			href: 'page/useradd.html'
		}]
		}, {
		title: '部门管理',
		icon: 'icon-guanliyuan',
		children: [{
			name: '部门列表',
			href: 'page/departmentlist.html'
		}, {
			name: '新增部门',
			href: 'page/departmentadd.html'
		}]
		}, {
		title: '职务管理',
		icon: 'icon-zhiwuguanli',
		children: [{
			name: '职务列表',
			href: 'page/joblist.html'
		}, {
			name: '新增职务',
			href: 'page/jobadd.html'
		}]
		}, {
		title: '客户管理',
		icon: 'icon-kehuguanli',
		children: [{
			name: '我的客户',
			href: 'page/customerlist.html'
		}, {
			name: '全部客户',
			href: 'page/customerlist.html'
		}, {
			name: '新增客户',
			href: 'page/customeradd.html'
		}]
		}]
	};

	// 根据渲染数据更新视图
	function render() {
		let { power, active, menu} = renderData;

		// 控制显示隐藏：只要把数据改变成需要的数据，渲染的时候是按照数据来渲染的，
		// 即数据驱动视图渲染，通过active控制menu的显示，如果active为1，只保留menu数组中的最后一项；如果active为0，menu中就是前3项
		menu = menu.filter(item => {
			let title = item.title;
			return active === 0 ? /^员工管理|部门管理|职务管理$/.test(title) : /^客户管理$/.test(title); 
		});

		// 根据权限控制筛选
		power = power.split('|');
		!power.includes('userhandle') ? menu = menu.filter(item => item.title !== '员工管理') : null;
		!power.includes('departhandle') ? menu = menu.filter(item => item.title !== '部门管理') : null;
		!power.includes('jobhandle') ? menu = menu.filter(item => item.title !== '职务管理') : null;
		if (!power.includes('departcustomer') && !power.includes('allcustomer')) {
			// 把客户管理中的全部客户筛除掉
			menu = menu.map(item => {
				if (item.title === '客户管理') {
					item.children = item.children.filter(value => value.name !== '全部客户');
				}

				return item;
			});
		}

		// 拼接头部导航字符串
		let navHTML = `
		<a href="javascript:;" class=${active === 0 ? 'active' : ''}>组织结构</a>
		<a href="javascript:;" class=${active === 1 ? 'active' : ''}>客户管理</a>
		`;
		// 头部导航显示
		$navBox.html(navHTML);

		// 左侧导航字符串拼接
		let menuHTML = `
			${menu.map(item => {
				return `<div class="itemBox">
									<h3>
										<i class="iconfont ${item.icon}"></i>
										${item.title}
									</h3>
									<nav class="item">
										${item.children.map(value => {
											return `<a href="${value.href}" target="iframeBox">${value.name}</a>`;
										}).join('')}
									</nav>
								</div>
				`;
			}).join('')}
		`;
		// 
		$menuBox.html(menuHTML);
		
		// 设置iframeBox的默认值
		$iframeBox.attr('src', active === 0 ? 'page/userlist.html' : 'page/customerlist.html');

	}  // end render function

	// 第一次加载页面的时候渲染页面
	render();

	// 事件委托： 点击导航的时候对应显示组结构与客户管理
	$navBox.click(event => {
		// 获取事件源
		let target = event.target,
				text = target.innerHTML;
		// 
		if (target.tagName === 'A') {
			// 点击的时候也做权限校验，如果没有对应权限，给出提示框
			if (text === '组织结构' && !/(userhandle|departhandle|jobhandle)/.test(baseInfo.power)) {
				alert('您当前没有操作组织结构的权限，请联系管理员！');
				return;
			}
			renderData.active = text === '组织结构' ? 0 : 1; 
		}
		// 数据修改完成之后，页面需要根据最新的数据重新渲染
		render();
	});

});

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
	// 优化：使用本地存储进行优化
	let baseInfo = localStorage.getItem('baseInfo');
	if (baseInfo) {
		let {time, data} = JSON.parse(baseInfo);
		if ((new Date().getTime() - time) < 10 * 1000) {
			// 存储的信息没有过期
			$plan.fire(data);
			return;
		}
	}

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
	
	// 存储到客户端本地，注意存储在本地的信息都是字符串
	localStorage.setItem('baseInfo', JSON.stringify({
		time: new Date().getTime(),
		data: results
	}))

	// 通知计划表中的方法执行
	$plan.fire(results);
});



