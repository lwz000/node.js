<template>
    <div id="weather">
        <i class="iconfont icon-weizhitianqi"></i>
        <div>
            <span>{{ msg.city }}</span>
            <span>今日天气~</span>
            <span>{{ msg.weather }} <i :class="icon"></i></span>
            <span>气温 {{ msg.temperature }}℃</span>
            <span>风向 {{ msg.winddirection }}</span>
            <span>风力 {{ msg.windpower }}</span>
            <span>空气湿度 {{ msg.humidity }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    name: "weather",
    props: {},
    setup(props) {
        let address = "杭州";
        let msg = ref({
            province: "",
            city: "",
            adcode: "",
            weather: "",
            temperature: "",
            winddirection: "",
            windpower: "",
            humidity: "",
            reporttime: "",
        });
        let icon = ref("iconfont ");

        // 天气判断
        let nowWeather = (data: string) => {
            switch (data) {
                case "晴":
                    icon.value += "icon-qingtian1";
                    break;
                case "阴":
                    icon.value += "icon-yintian";
                    break;
                case "未知":
                    icon.value += "icon-weizhitianqi";
                    break;
            }
            for (let i = 0; i < data.length; i++) {
                for (const e of data) {
                    switch (e) {
                        case "云":
                            icon.value += "icon-duoyun";
                            break;
                        case "风":
                            icon.value += "icon-dafeng";
                            break;
                        case "霾":
                            icon.value += "icon-qingduwumai";
                            break;
                        case "雨":
                            icon.value += "icon-dayu";
                            break;
                        case "雪":
                            icon.value += "icon-baoxue";
                            break;
                        case "尘":
                            icon.value += "icon-shachen";
                            break;
                        case "雾":
                            icon.value += "icon-wu";
                            break;
                        case "平":
                            icon.value += "icon-qingtian1";
                            break;
                        case "沙":
                            icon.value += "icon-shachen";
                            break;
                        case "冷":
                            icon.value += "icon-baoxue";
                            break;
                        case "热":
                            icon.value += "icon-qingtian1";
                            break;
                    }
                }
            }
        };

        // 天气接口
        let getWeather = () => {
            fetch(
                `https://restapi.amap.com/v3/weather/weatherInfo?city=${address}&key=ec47b272b9ec3132f011f7cd144add7f`
            )
                .then((r) => r.json())
                .then((res) => {
                    if (res.status) {
                        msg.value = res.lives[0];
                        nowWeather(res.lives[0].weather);
                    }
                });
        };
        getWeather();

        // 每分钟更新当前天气
        setTimeout(() => {
            getWeather();
        }, 60000);

        return {
            address,
            msg,
            icon,
        };
    },
});
</script>

<style scoped>
#weather {
    width: 30px;
    height: 30px;
    overflow: hidden;
    position: fixed;
    text-align: center;
    left: 10px;
    top: 70%;
    border-radius: 50%;
    transition: all 0.5s;
    background-color: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(6px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
    color: rgba(255, 255, 255);
}
#weather > i {
    line-height: 30px;
}
#weather:hover {
    height: 170px;
    width: 100px;
    border-radius: 12px;
}
#weather:hover > i {
    display: none;
}

#weather:hover > div {
    display: flex;
}

#weather > div {
    display: none;
    flex-direction: column;
    align-items: center;
    padding: 5px 10px;
    font-size: 14px;
}

#weather span {
    margin: 2px 0;
}
</style>
