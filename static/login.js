var usernameInput=document.querySelector('.username')
var passwordInput=document.querySelector('.password')
var login=document.querySelector('.login')

login.addEventListener('click',function(){
    var username=usernameInput.value
    var password=passwordInput.value
    myAjax('POST','/login',{username,password}).then((data)=>{
        alert(data)
        location.href='/admin'
    })
})