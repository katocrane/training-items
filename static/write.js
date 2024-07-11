var add_article=document.querySelector('.add_article')
var control_article=document.querySelector('.control_article')
var article=document.querySelector('.article')
var list=document.querySelector('.list')
var list_ul=document.querySelector('.list_ul')
var input_title=document.querySelector('.input_title')
var input_classify=document.querySelector('.input_classify')
var input_content=document.querySelector('.input_content')
var input_submit=document.querySelector('.input_submit')


add_article.addEventListener('click',function(){
    add_article.className='add_article active'
    control_article.className='control_article'
    article.style.zIndex='100'
    list.style.zIndex='0'
})

control_article.addEventListener('click',function(){
    add_article.className='add_article'
    control_article.className='control_article active'
    article.style.zIndex='0'
    list.style.zIndex='100'
})

//获取全部的文章列表

myAjax('GET','/admin/getAllArticleList',null).then((e)=>{
    //e表示全部文章列表
    console.log(e)
    e.forEach((item,index)=>{{
        var li=document.createElement('li')
        var span=document.createElement('span')
        var button=document.createElement('button')
        span.innerHTML=item.title
        button.innerHTML='删除'
        span.className='item_title'
        button.className='item_delete'
        button.setAttribute('data-id',item._id)
        button.addEventListener('click',function(){
            var _id=this.getAttribute('data-id')
            myAjax('POST','/admin/deleteArticle',{_id}).then((e)=>{
                console.log(e)

            })
        })

        li.appendChild(span)
        li.appendChild(button)
        li.className='list_item'
        list_ul.appendChild(li)
    }})
})

//给添加文章提交按钮设置监听器

input_submit.addEventListener('click',function(){
    myAjax('POST','/admin/addArticle',{
        title:input_title.value,
        classify:input_classify.value,
        content:input_content.value
        
    }).then((e)=>{
        alert('文章添加成功')
        console.log(e)
        input_title.value = ''
        input_classify.value = ''
        input_content.value = ''
    })
})