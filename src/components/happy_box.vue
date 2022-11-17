<template>
    <div class="happy_day">
        <div class="time_box" v-if="page_num == 0">
            <h1>
                我在等时间，你在等什么?你问我为啥不换算成时分秒？那可是我特意弄的秒数。
            </h1>
            <h1>啊？你说你无聊啊，无聊去玩游戏呀，右上角那个娱乐点下试试？</h1>
            <p>剩余时间：{{ time }} 秒</p>
        </div>
        <div
            class="page_one"
            v-if="page_num == 1"
            data-index="1"
            @click="next_page(2)"
        >
            <h1>
                嘿，这有个漂亮的路牌（大概）无人问津，真的不来按一下试试吗？
            </h1>
            <div>
                <img src="@/assets/路牌.png" alt="" />
                <span>嘘 ~</span>
            </div>
        </div>
        <div class="page_two">
            <p>{{ page_two_text }}</p>
            <img src="@/assets/蜡烛.png" alt="" />
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
export default defineComponent({
    props: {
        cover: Boolean,
    },
    emits: {
        show_cover: null,
    },
    setup(props, context) {
        let time = ref();
        let page_num = ref(2); //页数
        let page_two_text = ref("");

        let need_show = () => {
            let nowtime = new Date(), //获取当前时间
                endtime = new Date("2022/11/19"); //定义结束时间
            let lefttime = endtime.getTime() - nowtime.getTime(), //距离结束时间的毫秒数
                lefts = Math.floor(lefttime / 1000); //计算秒数
            time.value = lefts; //返回倒计时的字符串
        };

        need_show();

        // 判断是否到时间
        let countDown;
        if (time.value > 0) {
            countDown = setInterval(() => {
                need_show();
            }, 1000);
        } else {
            show_box.value = true;
            clearInterval(countDown);
        }

        // 下一页
        let next_page = (e) => {
            page_num.value = e;
        };

        // 打字
        let write = (dom, text) => {
            let i = 0;
            let str = text;
            let str_ = "";
            return new Promise((resolve, reject) => {
                let timer = setInterval(() => {
                    if (str_.length < str.length) {
                        str_ += str[i++];
                        dom.value = str_ + "_";
                    } else {
                        clearInterval(timer);
                        dom.value = str_;
                        resolve();
                    }
                }, 300);
            });
        };

        // 删除
        let clear = (dom) => {
            let str_ = dom.value;
            return new Promise((resolve, reject) => {
                let text1 = dom.value;
                let clear_title = setInterval(() => {
                    if (str_.length > 0) {
                        text1 = text1.slice(0, -1);
                        str_ = text1;
                        dom.value = str_ + "_";
                    } else {
                        clearInterval(clear_title);
                        dom.value = str_;
                        resolve();
                    }
                }, 100);
            });
        };

        // 切换黑屏
        let clickSend = () => {
            context.emit("show_cover");
        };

        // 第二页
        async function asyncFunc() {
            await clickSend();
            await write(page_two_text, "咦，怎么黑屏了，坏了不会是有bug吧");
            await clear(page_two_text);
            await write(
                page_two_text,
                "不可能，绝对不可能，我弄了好久了都，嘶~让我检查一下先"
            );
            await clear(page_two_text);
            await write(
                page_two_text,
                "emmm，好像找不到。对了，这么黑的话，不如我们先点个蜡烛吧"
            );
        }
        asyncFunc();

        return {
            time,
            page_num,
            page_two_text,
            next_page,
            clickSend,
        };
    },
});
</script>

<style scoped>
.happy_day {
    position: relative;
    z-index: 1;
    text-align: center;
    margin: 0 auto;
    padding: 50px;
    background-color: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
    -webkit-box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
    border-radius: 12px;
    -webkit-border-radius: 12px;
    color: rgba(255, 255, 255);
}
.time_box > p {
    margin-top: 50px;
    font-size: 20px;
}
.page_one > div {
    position: relative;
    cursor: pointer;
}
.page_one img {
    width: 300px;
}
.page_one span {
    position: absolute;
    left: 50%;
    top: 27%;
    transform: rotate(-6deg);
    color: #000;
    font-weight: 600;
}
.page_two {
    position: relative;
}
.page_two > p {
    position: relative;
}

.page_two img {
    margin-top: 50px;
    width: 400px;
}
</style>