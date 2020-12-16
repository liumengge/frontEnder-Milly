// 单例模式
let customerListModule = (function () {  
  // 定义获取数据的初始值
  let lx = 'my',
      type = '',
      search = '',
      limit = 10,
      _totalPage = 1,
      page = 1;   // 默认展示第一页
  
  // 获取需要的元素
  let $selectBox = $('.selectBox'),
      $searchInp = $('.searchInp'),
      $tableBox = $('.tableBox'),
      $tbody = $tableBox.find('tbody'),
      $pageBox = $('.pageBox');
  
  // 获取数据并动态绑定内容
  let queryData = async function () {
    type = $selectBox.val();
    search = $searchInp.val().trim();
    let result = await axios.get('/customer/list', {
      params: {
        lx,
        type,
        search,
        limit,
        page
      }
    });

    if (parseInt(result.code) !== 0) {
      $tbody.html('');
      $pageBox.html('');
      return;
    }

    // 根据拿到的数据做数据绑定
    let {
      totalPage,
      data
    } = result;
    totalPage = parseInt(totalPage);
    _totalPage = totalPage;  // 赋值给共有变量_totalPage

    // 1. 分页的数据绑定
    let str = ``;

    // 只有总页数大于1页才需要做分页
    if (totalPage > 1) {
      // 如果是第一页，不显示“上一页”
      page !== 1 ? str += `<a href="javascript:;">上一页</a>` : null;
      str += `<ul class="pageNum">
                ${new Array(totalPage).fill(null).map((_, index) => {
                  return `<li class="${index+1 === page ? 'active' : ''}">
                            ${index + 1}
                          </li>`;
                }).join('')}
              </ul>`;

      // 如果当前页与总页数一致，就不显示""下一页"
      page !== totalPage ? str += `<a href="javascript:;">下一页</a>` : null; 
    }
    $pageBox.html(str);

    // 数据的绑定
    str = ``;
    _each(data, item => {
      let {
        id,
        name,
        sex,
        email,
        phone,
        QQ,
        weixin,
        type,
        address,
        userId,
        userName
      } = item;
      str += `<tr>
                <td class="w8">${name}</td>
                <td class="w5">${parseInt(sex) === 0 ? '男' : '女'}</td>
                <td class="w10">${email}</td>
                <td class="w10">${phone}</td>
                <td class="w10">${weixin}</td>
                <td class="w10">${QQ}</td>
                <td class="w5">${type}</td>
                <td class="w8">${userName || '-'}</td>
                <td class="w20">${address}</td>
                <td class="w14">
                  <a href="customeradd.html?customerId=${id}">编辑</a>
                  <a href="javascript:;">删除</a>
                  <a href="visit.html?customerId=${id}">回访记录</a>
                </td>
              </tr>`;
      
      
    });
    $tbody.html(str);

  };

  // 筛选处理
  let handleFilter = function () {  
    $selectBox.on('change', function () {  
      page = 1;
      queryData();
    });

    $searchInp.on('keydown', function (ev) {  
      if (ev.keyCode === 13) {
        page = 1;
        queryData();
      }
    });
  };

  // 点击分页实现切换
  let handlePage = function () {  
    // 事件委托
    $pageBox.click(ev => {  
      let target = ev.target,
          targetTagName = target.tagName,
          targetText = target.innerHTML,
          $target = $(target);
      
      // 页码操作
      if (targetTagName === 'LI') {
        page = parseInt(targetText);
        queryData();
        return;
      }

      // 上一页，下一页 按钮
      if (targetTagName === 'A') {
        if (targetText === '上一页') {
          page--;
          page <= 0 ? page = 1 : null;

        }else {
          page++;
          page >= _totalPage ? page = _totalPage : null;
        }

        queryData();
        return;
      }
      
    });
  };

  return {
    init() {
      // 获取地址中传递的lx参数   my/all
      let params = window.location.href.queryURLParams();
      if (params.hasOwnProperty('lx')) {
        lx = params.lx;
      }

      // 第一次加载页面，发送一次请求
      queryData();

      // 筛选
      handleFilter();

      // 分页切换
      handlePage();
    }
  }
})();

customerListModule.init();