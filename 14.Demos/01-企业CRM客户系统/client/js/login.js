/* DOMContentLoaded && 闭包 */
$(function () {
	let $userName = $('.userName'),
		$userPass = $('.userPass'),
		$submit = $('.submit');

	$submit.click(async function () {
		let userNameText = $userName.val().trim(),
			userPassText = $userPass.val().trim();
		// 表单校验（非空校验 自己可以做更详细的校验）
		if (userNameText.length === 0) {
			alert('账号不能为空，请输入！');
			return;
		}
		if (userPassText.length === 0) {
			alert('密码不能为空，请输入！');
			return;
		}

		// 给密码进行MD5加密
		userPassText = md5(userPassText);

		// 发送AJAX请求
		// 请求成功和失败：首先是网络状态码上的成功和失败(决定是否能从服务器获取到数据); 
		// 其次是拿到数据后，根据返回的结果，验证登录成功还是失败；
		let result = await axios.post('/user/login', {
			account: userNameText,
			password: userPassText
		});

		if (parseInt(result.code) === 0) {
			// 登录成功
			alert('恭喜您，已经登录成功！', {
				handled: _ => {
					window.location.href = 'index.html';
				}
			});
			return;
		}
		// 登录失败
		alert('账号和密码不匹配，请重新输入！');
		$userName.val('');
		$userPass.val('');
	});
});