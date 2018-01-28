import AV from 'leancloud-storage'
var APP_ID = 'ocrSJozH38C3PNDabkposIX9-gzGzoHsz';
var APP_KEY = 'g8OKmsdHmDvLDS2IlEmLSy4M';
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
})
export function signUp(username, password, successFn, errorFn) {
    // 新建 AVUser 对象实例
    var user = new AV.User()
    // 设置用户名
    user.setUsername(username)
    // 设置密码
    user.setPassword(password)
    // 设置邮箱
    user.signUp().then(function (loginedUser) {
        let user = getUserFromAVUser(loginedUser)
        successFn.call(null, user)
    }, function (error) {
        errorFn.call(null, error)
    })

    return undefined

}
function getUserFromAVUser(AVUser) {
    return {
        id: AVUser.id,
        username: AVUser.username,
        password: AVUser.password
    }
}
export function getCurrentUser() {
    let user = AV.User.current()
    if (user) {
        return getUserFromAVUser(user)
    } else {
        return null
    }
}
export function signOut() {
    AV.User.logOut()
    return undefined
}
export default AV