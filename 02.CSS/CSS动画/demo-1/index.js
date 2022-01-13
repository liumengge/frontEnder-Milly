import './index.less'

function initializeWaterMark(text) {
  function render() {
    if (!text) return
    $('#water-mark').empty()
    var top = 50
    var win_width = window.innerWidth   // 窗口内部宽度
    var win_height = window.innerHeight
    var itemWidth = 0
    var itemHeight = 0
    var itemHeightAbsolute = 0 // 考虑旋转情况下的真实高度
    while (1) {
      var left = 30
      while (1) {
        var div = document.createElement('div')
        $(div).addClass('printItem').text(text).css({top: top + 'px', left: left + 'px'}).appendTo('#water-mark')
        left += 200
        if (itemWidth === 0) { // 每个 div 大小相同，避免多次计算
          itemWidth = div.offsetWidth
          itemHeight = div.offsetHeight
          itemHeightAbsolute = Math.sqrt(itemWidth * itemWidth * 0.25 + itemHeight * itemHeight * 0.25)
        }
        if (itemWidth + left >= win_width) break // 超出屏幕宽度
      }
      top += 150
      if (top + itemHeightAbsolute >= win_height) break
    }
  }
  $(window).on('resize', render)
  render()
}

initializeWaterMark('Milly')