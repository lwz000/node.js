<template>
    <div id="pop_table" @click="clickfun($event)" @mousemove="move($event)">
        <canvas id="canvas" width="800" height="800"></canvas>
        <span id="score"></span>
    </div>
</template>

<script src="@/js/views/relax.js" />

<style scoped>
@import url(@/style/views/relax.css);
</style>