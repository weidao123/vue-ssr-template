<template>
    <div>
        <h1 class="index-page">Index Page?</h1>
        <img src="../assets/test.jpg"  alt=""/>
        <router-link to="/home">To Home</router-link>
    </div>
</template>

<script>
    export default {
        name: "Index"
    }
</script>

<style scoped>
.index-page {
    color: red;
    transform: translateX(190px);
}
</style>
