let css1 = `/*
*你好，欢迎来到这里。
*这里展示的是一个动画简历。
*如果你也喜欢这种风格的简历，欢迎互相交流。
*话不多说，动画开始。
*先换个字体
*/
*{
    transition: all 0.2s;
    font-family: Consolas, Monaco, 'Andale Mono';
}
body{
    /*字不要靠边缘太近*/
    padding: 16px;
    overflow: hidden;
    /*再给背景换个颜色*/
    background: rgb(39,40,34);   
}
/*给代码加上高亮*/
.token.comment{ color: white; }
.token.selector{ color: #690; }
.token.punctuation{ color: white; }
.token.property{ color: #905; }
.token.string{ color: rgb(230,219,103); }
.token.function, .token.class-name { color: #DD4A68; }

/*给注释换个颜色*/
.token.comment{ color: rgb(136,132,111)}
/*给字体改颜色*/
#pre{
    color:rgb(102,217,239); 
}

/* 加个呼吸灯
* 3D 效果
*/
#pre{
    border: 1px solid rgb(205, 29, 73);
    width: 50%;
    max-height: 687px;
    animation: breath 1s infinite alternate-reverse;
    padding-left:10px;
    overflow: auto;
    transform: perspective(3500px) rotateY(30deg);
    
}
/*现在开始制作简历*/
/*先来一张白纸*/
/*在右边新建一张白纸*/

#paper{
    overflow: hidden;
}
`

let md = `# 自我介绍
我叫 华翔

1997 年 12 月出生

热爱前端开发

求知若渴

希望应聘前端开发岗位

# 技能介绍
- 熟练 HTML、CSS 的页面布局，能编写合理的 HTML 以及规范化的 CSS
- 熟悉 HTML 5 及语义化，了解 Canvas 动画制作，掌握 CSS 3 动画、过渡效果等常用技术
- 熟悉原生 JavaScript，会使用 ES6+ 常用规范，了解 jQuery 常用 API
- 熟悉 Vue 常用功能，理解如生命周期、组件、双向绑定等功能
- 熟悉小程序开发，理解如生命周期、组件等常用功能
- 熟悉模块化、工程化开发流程，能够配置 Webpack
- 有移动端开发经验，会使用REM、vw/ vh、响应式 等技术制作适配手机设备的页面
- 了解 HTTP 相关知识，了解常见的 Web 性能优化方案
- 熟练使用 VsCode、Sublime、Git、Http-Server 等开发工具

# 项目介绍
1. [Vue.js搭建技术社区](https://hx-angry-panda.github.io/copy-cnode/)
2. [多语种翻译小程序](https://github.com/Hx-angry-panda/translate-miniprogram)
3. [简易在线画图](https://hx-angry-panda.github.io/beginToCanvas/index.html)
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

let css3 = `/*把简历美化一下吧
*换一个背景颜色
*加上边框
*同样加上呼吸灯
*3D 效果接上
*改变字体颜色
*/
`

let css4 = `
#paper{
    max-height: 685px;
    background: rgb(39,40,34);
    margin: 16px;
    border: 1px solid rgb(205, 29, 73);
    animation: breath 1s infinite alternate-reverse;
    transform: perspective(3500px) rotateY(-30deg);
    color: rgb(205, 29, 73);
    padding-left: 10px;
    overflow: auto;
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
    color: rgb(205, 29, 73);
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
    }, 15)
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
    },15)
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