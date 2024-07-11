var article_title = document.querySelector('.article_title')
var article_classify = document.querySelector('.article_classify')
var article_content = document.querySelector('.article_content')
var article_time = document.querySelector('.article_time')

var hot_list = document.querySelector('.hot_list')
var footer_list = document.querySelector('.footer_list')
var footer_pages = document.querySelector('.footer_pages')
var article_continue = document.querySelector('.article_continue')
var header_login=document.querySelector('.header_login')
var commend_list=document.querySelector('.commend_list')


// var xml=new XMLHttpRequest()
// xml.open('GET','http://localhost:3000/getArticle',true)
// xml.send()
// xml.onreadystatechange=function(){
//     if(xml.readyState==4&&xml.status==200){
//         var theOneObj=JSON.parse(xml.response)[0]
//         console.log(theOneObj)
//         article_title.innerText=theOneObj.title
//         article_classify.innerHTML=theOneObj.classify
//         article_content.innerHTML=theOneObj.content.slice(0,2)+'...'
//         article_time.innerHTML=theOneObj.time
//     }
// }
header_login.addEventListener('click',function(){
    location.href='/admin'
})



//给继续阅读全文挂在监听器
article_continue.addEventListener('click', function () {
    var _id = this.getAttribute('article-id')
    location.href = '/getPage?id=' + _id
})
//获取最新评论
var renderNewCommend=function(){
    myAjax('GET','/getNewCommendList',null).then((e)=>{
        console.log(e)
        
        e.forEach((item)=>{
            var li=document.createElement('li')
            li.innerHTML=item.commend
            li.className='commend_item'
            li.setAttribute('_id',item.fromId)
            li.addEventListener('click',function(){
                var id=this.getAttribute('_id')
                location.href='/getPage?id='+id
            })
            commend_list.appendChild(li)
    
        })
    })
    
}
renderNewCommend()

//获取最新一篇文章
myAjax('GET', '/getArticle', null).then((e) => {
    var theOneObj = e[0]


    article_title.innerText = theOneObj.title
    article_classify.innerHTML = theOneObj.classify
    article_content.innerHTML = theOneObj.content.slice(0, 5) + '...'
    article_time.innerHTML = theOneObj.time
    article_continue.setAttribute('article-id', theOneObj._id)
})
//获取最热文章列表
myAjax('GET', '/getHotArticleList', null).then((e) => {
    e.forEach((item) => {
        var li = document.createElement('li')
        li.innerHTML = item.title
        li.className = 'hot_item'
        li.setAttribute('_id', item._id)
        li.addEventListener('click', function () {
            var _id = this.getAttribute('_id')
            location.href = '/getPage?id=' + _id
        })
        li.className = 'hot_item'
        hot_list.appendChild(li)

    })
})
//获取最新5篇文章
myAjax('POST', '/getNewArticleList', { groupNum: 1 }).then((e) => {
    e.forEach((item) => {
        var li = document.createElement('li')
        li.innerHTML = item.title
        li.className = 'footer_item'
        li.setAttribute('_id', item._id)
        li.addEventListener('click', function () {
            var _id = this.getAttribute('_id')
            location.href = '/getPage?id=' + _id
        })
        footer_list.appendChild(li)
    })
})

//获取全部文章
myAjax('GET', '/getArticleNumber', null).then((e) => {
    //e表示全部文章数量

    var btnsNum = Math.ceil(e / 5) //向上取整

    for (var i = 1; i <= btnsNum; i++) {
        var newLi = document.createElement('li')
        newLi.className = 'pages'
        newLi.innerHTML = i

        newLi.addEventListener('click', function () {
            var groupNum = this.innerHTML

            myAjax('POST', '/getNewArticleList', { groupNum }).then((e) => {
                footer_list.innerHTML = ''
                // console.log(e)
                e.forEach((item) => {
                    var li = document.createElement('li')
                    li.innerHTML = item.title
                    li.className = 'footer_item'
                    li.setAttribute('_id', item._id)
                    li.addEventListener('click', function () {
                        var _id = this.getAttribute('_id')
                        location.href = '/getPage?id=' + _id
                    })
                    footer_list.appendChild(li)
                })
            })
        })
        footer_pages.appendChild(newLi)
    }
})