import { defineComponent , ref ,reactive } from "vue";
// 引入
import HelloWorld from "@/components/HelloWorld.vue";

export default defineComponent({
    name: "HomeView",
    // 组件
    components: {
        HelloWorld,
    },
    setup(props) {
        // 打字机效果
        let poem = ref('网络不通畅哦~');
        (function(){
            let list = ['层波潋滟远山横，一笑一倾城。','窗外日光弹指过，席间花影坐前移。','云想衣裳花想容，春风拂槛露华浓。','满堂花醉三千客，一剑霜寒十四州。','吾生幻梦间，何事绁尘羁。']
            let str = list[Math.round(Math.random()*list.length)]
            let str_ = ''
            let text  = '今天也要开心呀~'
            let i = 0

            new Promise((resolve,reject)=>{
                let timer = setInterval(()=>{
                    if(str_.length<str.length){
                        str_ += str[i++]
                        poem.value = str_ +'_' 
                    }else{ 
                        clearInterval(timer)
                        poem.value = str_
                        resolve()
                    }
                },300)
            }).then(()=>{
                // 删除全部文字
                let text1  = poem.value
                let clear_title = setInterval(() => {
                    if(str_.length > 0){
                        text1 = text1.slice(0,-1)
                        str_ = text1
                        poem.value = str_ +'_' 
                    }else{ 
                        clearInterval(clear_title)
                        poem.value = str_
                        // 添加新文字
                        let i1 = 0
                        let happy = setInterval(() => {
                            if(str_.length<text.length){
                                str_ += text[i1++]
                                poem.value = str_ +'_' 
                            }else{ 
                                clearInterval(happy)
                                poem.value = str_
                            }
                        }, 200);
                    }
                }, 100);
            })
        })()

        return { poem }
    }
});