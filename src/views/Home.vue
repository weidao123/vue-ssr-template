<template>
    <div>
        <h1 class="title">as Home Page</h1>
        <router-link to="/">To Index</router-link>
    </div>
</template>

<script>
    export default {
        name: "Home",
        mounted() {
            console.log(process.env.NODE_ENV);
        }
    }
</script>

<style scoped>
.title {
    color: blue;
    background-color: green;
}
</style>
