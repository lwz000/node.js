<template>
    <div class="home">
        <div id="home_title">{{ poem }}</div>
        <happy_box :cover="cover" @show_cover="show_cover"></happy_box>
        <div v-show="cover" id="cover"></div>
    </div>
</template>

<style scoped>
@import "@/style/views/home.css";
</style>

<script src="@/js/views/home.js"></script> 