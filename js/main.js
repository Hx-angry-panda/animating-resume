let css1 = `/*
*你好，这是我的个人简历。
*先换个字体
*/
*{
    transition: all 0.2s;
    font-family: Consolas, Monaco, 'Andale Mono';
}
body{
    /*给背景换个颜色*/
    background: #f5f2f0;
    /*字不要靠边缘太近*/
    padding: 16px;
    overflow: hidden;
}
/*给代码加上高亮*/
.token.comment{ color: slategray; }
.token.selector{ color: #690; }
.token.punctuation{ color: #999; }
.token.property{ color: #905; }
.token.string{ color: #690; }
/* 加点呼吸灯*/
#pre{
    border: 1px solid #aaa;
    width: 50%;
    max-height: 687px;
    animation: breath 1s infinite alternate-reverse;
    padding-left:10px;
    overflow: auto;
    
}
/*现在开始制作简历*/
/*先来一张白纸*/
/*在右边新建一张白纸*/


`

let md = `# 自我介绍
我叫 XXX

1997 年 12 月出生

XXX 学校毕业

自学前端半年

希望应聘前端开发岗位

# 技能介绍
熟悉 JavaScript CSS
# 项目介绍
1. [苹果风格轮播](https://hx-angry-panda.github.io/appleSlideShow/index.html)
2. [网页简历](https://hx-angry-panda.github.io/resume/index.html)
3. [canvas 画板](https://hx-angry-panda.github.io/beginToCanvas/index.html)
# 联系方式

 QQ xxxxxxxx
 Email xxxxxxxx
 手机 xxxxxxx
`

let css2 = `/*这个简历是用 Markdown 语法写的
*现在还没有呈现出 Markdown 的效果
*让我把格式转成 Markdown
*使用 Marked.js
*转换中......
*马上就好了
*/

`

let css3 = `/*简历的效果不是很好，改变一下它的样式吧*/
`

let css4 = `
#paper{
    max-height: 730px;
    background: #f5f2f0;
}
#paper pre ol{
    list-style: none;
}
#paper pre ol li{
    margin-top: -15px;
}
#paper pre h1{
    margin-left: 10px;
}
#paper pre p{
    margin-left: 10px;
}
#paper a{
    text-decoration: none;
}
#paper #联系方式 p{
    font-size: 18px;
}
`
let css5 = `
/*简历完成啦*/`

function writeCss(prefix,code,fn){
    let n = 0
    var domCode = document.querySelector('#pre')
    let id = setInterval(function () {
        domCode.innerHTML = prefix + code.substring(0, n)
        domCode.innerHTML = Prism.highlight(domCode.innerHTML, Prism.languages.css, 'css');
        styleTag.innerHTML = prefix + code.substring(0, n)
        domCode.scrollTo(0, 10000)
        n += 1
        if (n > code.length) {
            window.clearInterval(id)
            fn()
        }
    }, 30)
}

function createPaper(fn) {
    let paper = document.createElement('div')
    let content = document.createElement('pre')
    document.body.appendChild(paper)
    paper.id = 'paper'
    paper.appendChild(content)
    fn()
}
function writeMarkDown(code,fn){
    let n = 0
    var paperCode = document.querySelector('#paper > pre')
    let id = setInterval(function(){
        paperCode.innerHTML = code.substring(0, n)
        n += 1
        if(n >= code.length){
            window.clearInterval(id)
            fn()
        }
    },30)
}

function makeMarkDown(fn) {
    let content = document.querySelector('#paper > pre')
    content.innerHTML = marked(md);
    fn()
}

writeCss('', css1, ()=>{
    createPaper(()=>{
        writeMarkDown(md, ()=>{
            writeCss(css1, css2, ()=>{
                makeMarkDown(()=>{
                    writeCss(css1 + css2, css3,()=>{
                        writeCss(css1 + css2 + css3, css4, ()=>{
                            writeCss(css1 + css2 + css3 + css4, css5, ()=>{})
                        })
                    })
                })
            })
        })
    })
})