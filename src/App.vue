<template>
    <div>
        <div id="router">
            <nav>
                <router-link to="/">
                    <i class="iconfont icon-home"></i>主页
                </router-link>
                <router-link to="/relax">
                    <i class="iconfont icon-xin"></i>娱乐
                </router-link>
            </nav>
        </div>
        <div id="router_view">
            <router-view />
        </div>
        <weather></weather>
    </div>
</template>

<!-- 样式分离 -->
<style scoped>
@import "@/style/App.css";
</style>

<!-- 逻辑分离 -->
<script src="@/js/App.js" />