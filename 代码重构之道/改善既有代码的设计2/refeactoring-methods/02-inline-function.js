// 内联函数
function reportLines(aCustomer) {
  const lines = []
  gatherCustomerData(lines, aCustomer)
  return lines
}

function gatherCustomerData(out, aCustomer) {
  out.push(["name", aCustomer.name])
  out.push(["location", aCustomer.location])
}

// 将函数gatherCustomerData内联到reportLines中
function reportLines(aCustomer) {
  const lines = []
  lines.push(["name", aCustomer.name])
  lines.push(["location", aCustomer.location])
  return lines
}
