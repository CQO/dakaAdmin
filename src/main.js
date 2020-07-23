
const serverIP = 'http://154.8.196.163:8007'
function getData (url, callBack) {
  fetch(`${serverIP}/${url}`).then((response) => {return response.json();}).then((res) => {
    if (res.err === 0) {
      if (callBack) callBack(res.data)
    } else {
      switch (res.err) {
        case 100:
          owo.tool.toast('认证过期!')
          owo.go('login/view-loginContent=login/moveToLeft/moveFromRight//moveToRight/moveFromLeft')
          break
        case 101:
          owo.tool.toast(res.message)
          window.location.href = ''
          break
        case 102:
          window.userInfo = res.data
          setCookie("userInfo", JSON.stringify(res.data))
          if (callBack) callBack(res.data)
          console.log('用户数据已更新!')
          break
        case 103:
          owo.tool.toast('您的余额不足!')
          owo.go('wallet')
          break
        case 104:
          owo.tool.toast('补签卡数量不足!')
          owo.go('myCard')
          break
        default:
          owo.tool.toast(res.message)
      }
    }
  })
}
let userList = {}
getData('adminGetUser', (data) => {
  let newArr = {}
  data.forEach(element => {
    newArr[element.id] = element
  });
  userList = newArr
})