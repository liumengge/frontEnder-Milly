// 单例模式
let userAddModule = (function () {
  let isUpdate = false,
      userId = null;
  // 获取需要的元素
  let $userdepartment = $('.userdepartment'),
      $userjob = $('.userjob'),
      $username = $('.username'),
      $man = $('#man'),
      $woman = $('#woman'),
      $useremail = $('.useremail'),
      $userphone = $('.userphone'),
      $userdesc = $('.userdesc'),
      $submit = $('.submit'); 

  // 获取部门信息
  let queryDepartmentList = function () {  
    return new Promise(async resolve => {
      let result = _checkStore('departmentList', 24*60*60*1000);
      if (result === false) {
        result = await axios.get('/department/list');
        if (parseInt(result.code) === 0) {
          result = result.data;
          _store('departmentList', result);
        }
      }

      // 循环绑定到部门的下拉框中
      let str = ``;
      _each(result, item => {
        str += `<option value="${item.id}">${item.name}</option>`;
      });
      $userdepartment.html(str);
      resolve();
    });
  };

  // 获取职务信息
  let queryJobList = function () {  
    return new Promise(async resolve => {
      let result = _checkStore('jobList', 24*60*60*1000);
      if (result === false) {
        result = await axios.get('/job/list');
        if (parseInt(result.code) === 0) {
          result = result.data;
          _store('jobList', result);
        }
      }
      
      // 循环绑定到职务的下拉框中
      let str = ``;
      _each(result, item => {
        str += `<option value="${item.id}">${item.name}</option>`;
      });
      $userjob.html(str);
      resolve();
    });
  };

  // 获取员工基本信息
  let queryUserInfo = async function () {  
    let result = await axios.get('/user/info', {
      params: {
        userId
      }
    });

    if (parseInt(result.code) === 0) {
      // 解构获取到的参数
      let {
        name,
        sex,
        email,
        phone,
        departmentId,
        jobId,
        desc
      } = result.data;

      // 将对应参数绑定到页面
      $username.val(name);
      parseInt(sex) === 0 ? $man.prop('checked', true) : $woman.prop('checked', true);
      $useremail.val(email);
      $userphone.val(phone);
      $userdepartment.val(departmentId);
      $userjob.val(jobId);
      $userdesc.val(desc);
    }
  };

  // 表单校验
  // 1. 用户名不能为空
  let checkUserName = function () {  
    let text = $username.val().trim(),
        $spanusername = $('.spanusername');

    if (text.length === 0) {
      $spanusername.html('用户名不能为空！');
      return false;
    }

    $spanusername.html('');
    return true;
  };
  // 鼠标失去焦点的时候开始校验
  $username.on('blur', checkUserName);

  // 2. 邮箱校验 - 不能为空 + 格式校验
  let checkUserEmail = function () {  
    // 非空校验
    let text = $useremail.val().trim(),
        $spanuseremail = $('.spanuseremail');

    if (text.length === 0) {
      $spanuseremail.html('邮箱不能为空！');
      return false;
    }

    // 邮箱格式校验 - 正则
    let reg = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    if (!reg.test(text)) {
      $spanuseremail.html('邮箱格式不正确！');
      return false;
    }

    $spanuseremail.html('');
    return true;
  };
  $useremail.on('blur', checkUserEmail);

  // 3. 手机号码校验 - 不能为空 + 格式校验
  let checkUserPhone = function () {  
    // 非空校验
    let text = $userphone.val().trim(),
        $spanuserphone = $('.spanuserphone');

    if (text.length === 0) {
      $spanuserphone.html('手机号码不能为空！');
      return false;
    }

    // 手机号码格式校验 - 正则
    let reg = /^[1]([3-9])[0-9]{9}$/;
    if (!reg.test(text)) {
      $spanuserphone.html('手机号码格式不正确！');
      return false;
    }

    $spanuserphone.html('');
    return true;
  };
  $userphone.on('blur', checkUserPhone);

  // 4. 自我介绍校验 - 不能为空
  let checkUserDesc = function () {  
    let text = $userdesc.val().trim(),
        $spanuserdesc = $('.spanuserdesc');

    if (text.length === 0) {
      $spanuserdesc.html('用户名不能为空！');
      return false;
    }

    $spanuserdesc.html('');
    return true;
  };
  $userdesc.on('blur', checkUserDesc);


  // 点击提交的时候需要完成的工作
  let handleSubmit = function () {  
    $submit.click(async function () {  
      // 1. 表单校验
      if (!checkUserName() || !checkUserEmail() || !checkUserPhone() || !checkUserDesc()) {
        return;
      }

      // 2. 获取用户输入的信息
      let data = {
        name: $username.val().trim(),
        sex: $man.prop('checked') ? 0 : 1,
        email: $useremail.val().trim(),
        phone: $userphone.val().trim(),
        departmentId: $userdepartment.val().trim(),
        jobId: $userjob.val().trim(),
        desc: $userdesc.val().trim()
      };
      isUpdate ? data.userId = userId : null;

      // 3. 新增或者修改
      let result = isUpdate ? await axios.post('/user/update', data) : await axios.post('/user/add', data);

      if (parseInt(result.code) === 0) {
        alert(`${isUpdate ? '修改' : '新增'}成功，即将跳转到首页！`, {
          handled: _ => {
            window.location.href = 'userlist.html';
          }
        });
        return;
      }
      alert('当前操作失败，请稍后重试！');
      return;
    });
  }; 

  return {
    async init() {
      // 获取部门信息和职务欣喜
      await Promise.all([queryDepartmentList(), queryJobList()]);

      // 获取传递进来的userId，如果没有就是新增员工，如果有就是修改/编辑员工信息
      let params = window.location.href.queryURLParams();
      if (params.hasOwnProperty('userId')) {
        isUpdate = true;
        userId = params.userId;
        // alert('修改！');
        // 如果是修改用户信息，则需要获取该员工的原信息应该显示在该页面中
        queryUserInfo();
      }
      // alert('新增!');
      // 点击提交按钮完成新增与修改
      handleSubmit();

    }
  }
})();

userAddModule.init();
