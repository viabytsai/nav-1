const $siteList= $('.siteList')
const $lastLi = $siteList.find('li.last')
const x =localStorage.getItem('x') //读取key为x的本地字符串
const xObject = JSON.parse(x)//把字符串x转化为对象
const hashMap =xObject || [
    {logo:'A',url:'https://www.acfun.cn'},
    {logo:'B',url:'https://www.bilibili.com'}
]
const simplifyUrl=(url)=>{
    return url.replace('https://','')
    .replace('http://','')
    .replace('www.','')
    .replace(/\/.*/,'')//删除 / 开头的内容，直到结尾
}
const render = ()=>{
    $siteList.find('li:not(.last)').remove() //除了最后一个li以外的所有li移除
    hashMap.forEach((node,index) =>{
        const $li =$(`<li>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                    <svg class="icon">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
            </div>
     </li>`).insertBefore($lastLi) //插入到最后一个li前面
     $li.on('click',()=>{
         window.open(node.url)
     })
     $li.on('click','.close',(e)=>{
         e.stopPropagation() //阻止冒泡
         hashMap.splice(index,1) //删除数组中的一项
         render() //重新渲染
     })
    })
}
render()
$('.addButton').on('click',()=>{
    let url = window.prompt('请问你要添加的网址是啥？')
    if(url.indexOf('http')!==0){
        url = 'https://'+url
    }
    hashMap.push({
        logo:simplifyUrl(url)[0].toUpperCase(),
        url:url
    })
    render()
})
//离开的时候把hashMap转为字符串保存到本地
window.onbeforeunload = ()=>{
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x',string)
}
$(document).on('keypress',(e)=>{
    const {key} = e 
    console.log(key);//key = e.key 变量名和属性名一样可以简写
    for(let i=0;i<hashMap.length;i++){
        if(hashMap[i].logo.toLowerCase()===key){
            window.open(hashMap[i].url)
        }
    }
})