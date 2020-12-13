// 单例模式
let userListModule = (function () {  
  let $deleteAll = $('.deleteAll'),
      $selectBox = $('.selectBox'),
      $searchInp = $('.searchInp'),
      $tableBox = $('.tableBox'),
      $tbody = $tableBox.find('tbody');

  // 获取部门列表，绑定到下拉框
  let queryDepartmentList = async function () {
    let result = _checkStore('departmentList', 24*60*60*1000);
    if (result === false) {
      result = await axios.get('/department/list');
      if (parseInt(result.code) === 0) {
        result = result.data;
        // 存储到本地做临时缓存
        _store('departmentList', result);
      }
    }
    
    let str = ``;
    result.forEach(element => {
      str += `<option value="${element.id}">${element.name}</option>`;
    });
    $selectBox.append(str);
  };

  // 获取员工列表
  let queryUserList = async function () {  
    // 获取下拉框选中选中的那一个部门项
    let departmentId = $selectBox.val() || 0,
              search = $searchInp.val().trim();
    let result = await axios.get('/user/list', {
      params: {
        departmentId,
        search
      }
    });

    if (parseInt(result.code) === 0) {
      let str = ``;
      _each(result.data, item => {
        let {
          id,
          name,
          sex,
          email,
          phone,
          department,
          job,
          desc
        } = item;
        str += `<tr>
                  <td class="w3"><input type="checkbox"></td>
                  <td class="w10">${name}</td>
                  <td class="w5">${parseInt(sex) === 0 ? '男' : '女'}</td>
                  <td class="w10">${department}</td>
                  <td class="w10">${job}</td>
                  <td class="w15">${email}</td>
                  <td class="w15">${phone}</td>
                  <td class="w20">${desc}</td>
                  <td class="w12">
                    <a href="javascript:;">编辑</a>
                    <a href="javascript:;">删除</a>
                    <a href="javascript:;">重置密码</a>
                  </td>
                </tr>`;
      })
      $tbody.html(str);
      return;
    }

    // 走到这里表示没有获取到数据,tbody清空或者显示无数据的提示信息
    $tbody.html('');
  };

  // 筛选处理
  let handleFilter = function () {  
    $selectBox.on('change', queryUserList);
    $searchInp.on('keydown', function (ev) {  
      if (ev.keyCode === 13) {  // ENTER
        queryUserList();
      }
    });
  }

  return {
    init() {
      queryDepartmentList();
      queryUserList();
      handleFilter();
    }
  }
})();

userListModule.init();