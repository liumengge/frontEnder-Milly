// 单例模式
let userListModule = (function () {  
  let $deleteAll = $('.deleteAll'),
      $selectBox = $('.selectBox'),
      $searchInp = $('.searchInp'),
      $tableBox = $('.tableBox'),
      $tbody = $tableBox.find('tbody'),
      $checkAll = $('#checkAll'),
      $checkList = null;

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
                  <td class="w3"><input type="checkbox" userId = "${id}"></td>
                  <td class="w10">${name}</td>
                  <td class="w5">${parseInt(sex) === 0 ? '男' : '女'}</td>
                  <td class="w10">${department}</td>
                  <td class="w10">${job}</td>
                  <td class="w15">${email}</td>
                  <td class="w15">${phone}</td>
                  <td class="w20">${desc}</td>
                  <td class="w12" userId = "${id}">
                    <a href="useradd.html?userId=${id}">编辑</a>
                    <a href="javascript:;">删除</a>
                    <a href="javascript:;">重置密码</a>
                  </td>
                </tr>`;
      })
      $tbody.html(str);
      $checkList = $tbody.find('input[type="checkbox"]');
      $checkAll.prop('checked', false);
      return;
    }

    // 走到这里表示没有获取到数据,tbody清空或者显示无数据的提示信息
    $tbody.html('');
    $checkList = $tbody.find('input[type="checkbox"]');
    $checkAll.prop('checked', false);
  };

  // 筛选处理
  let handleFilter = function () {  
    $selectBox.on('change', queryUserList);
    $searchInp.on('keydown', function (ev) {  
      if (ev.keyCode === 13) {  // ENTER
        queryUserList();
      }
    });
  };

  // 删除操作
  let handleDelete = function () {  
    // 事件委托 - 单一删除
    $tbody.click(ev => {
      let target = ev.target,
        targetTagName = target.tagName,
        targetText = target.innerHTML,
        $target = $(target);
      
        // 删除的事件源
      if (targetTagName === 'A' && targetText === '删除') {
        let userId = $target.parent().attr('userId');
        alert(`您确定要删除编号为 ${userId} 的员工信息吗？`, {
          confirm: true,
          handled: async type => {
            // 点击确定
            if (type === 'CONFIRM') {
              let result = await axios.get('/user/delete', {
                params: {
                  userId
                }
              })

              if (parseInt(result.code) === 0) {
                alert('删除成功!');
                // 删除整行员工数据
                $target.parent().parent().remove();
                return;
              }
              alert('删除失败，请稍后重试!');
            }
          }
        });
        return;
      }

      // 复选框的事件源
      if (targetTagName === 'INPUT') {
        let flag = true;  // 假设都是选中的
        _each($checkList, item => {
          if (!$(item).prop('checked')) {
            flag = false;
            return false; // 结束循环
          }
        })
        $checkAll.prop('checked', flag);
      }
    });

    // 实现全选和全不选
    $checkAll.click(function () {  
      $checkList.prop('checked', $checkAll.prop('checked'));
    });

    // 批量删除
    $deleteAll.click(function () {  
      // 获取选中的ID集合
      let arr = [];
      _each($checkList, item => {
        let $item = $(item);
        if ($item.prop('checked')) {
          arr.push($item.attr('userId'));
        }
      });

      // 删除之前做判断
      if (arr.length === 0) {
        alert('请选择要删除的项！');
        return;
      }

      // 删除
      alert(`您确定要删除编号为 ${arr.join(',')} 的员工项吗？`, {
        confirm: true,
        handled: type => {
          if (type === 'CONFIRM') {
            recursionDelete(arr);
          }
        }
      });
    });

  };

  // 递归删除
  let recursionDelete = async function (arr) {  
    // 递归结束条件,都删除了，重新从服务器拉取员工列表信息
    if (arr.length === 0) {
      alert('批量删除成功!', {
        handled: _ => {
          queryUserList();
        }
      });
      
      return;
    }
    // 获取第一项，即为要删除的那一项
    let userId = arr[0];
    let result = await axios.get('/user/delete', {
      params: {
        userId
      }
    }); 

    if (parseInt(result.code) !== 0) {
      // 终止之前可能已经删除一部分了，重新获取一下
      alert(`删除编号为 ${userId} 的员工失败， 删除终止！`, {
        handled: _ => {
          queryUserList();
        }
      });
      return;
    }

    arr.shift();
    recursionDelete(arr);
  };

  return {
    init() {
      queryDepartmentList();
      queryUserList();
      handleFilter();
      handleDelete();
    }
  }
})();

userListModule.init();
