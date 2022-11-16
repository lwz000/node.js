<template>
    <div>
        <div id="router">
            <span>假装是个晴天☀</span>
            <nav>
                <router-link to="/">
                    <i class="iconfont">&#xe602;</i>主页
                </router-link>
                <router-link to="/relax">
                    <i class="iconfont">&#xe6ca;</i>娱乐
                </router-link>
                <router-link to="/about">关于</router-link>
            </nav>
        </div>
        <div id="router_view">
            <router-view />
        </div>
    </div>
</template>

<!-- 样式分离 -->
<style>
@import "@/style/App.css";
</style>

<!-- 逻辑分离 -->
<script src="@/js/App.js" />