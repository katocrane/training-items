var _id=location.href.split('?')[1].split('=')[1]
// console.log(_id)

var page_title=document.querySelector('.page_title')
var page_classify=document.querySelector('.page_classify')
var page_content=document.querySelector('.page_content')
var page_time=document.querySelector('.page_time')
var input_commend=document.querySelector('.input_commend')
var submitBtn=document.querySelector('.submit')
var commend_list_ul=document.querySelector('.commend_list_ul')

//发起此文章请求
myAjax('GET','/getOneArticle?id='+_id,null).then((e)=>{
    var theOneObj=e[0]

    page_title.innerHTML=theOneObj.title
    page_classify.innerHTML=theOneObj.classify
    page_content.innerHTML=theOneObj.content
    page_time.innerHTML=theOneObj.time
})
myAjax('GET','/getCommendById?id='+_id,null).then((e)=>{
    //e表示所有评论
    console.log(e)
    e.forEach((item,index)=>{
        var li=document.createElement('li')
        li.innerHTML=item.commend
        li.className='commend_item'
        commend_list_ul.appendChild(li)
    })
})

submitBtn.addEventListener('click',function(){
    var value=input_commend.value
    myAjax('POST','/subcommend',{value,_id}).then((e)=>{
        console.log(e)
        if(e.result=='评论提交成功'){
            input_commend.value=''
            commend_list_ul.innerHTML=''
            //获取全部此篇文章的评论
            myAjax('GET','/getCommendById?id='+_id,null).then((e)=>{
                //e表示所有评论
                console.log(e)
                e.forEach((item,index)=>{
                    var li=document.createElement('li')
                    li.innerHTML=item.commend
                    li.className='commend_item'
                    commend_list_ul.appendChild(li)
                    
                })
            })
        }
    })
})