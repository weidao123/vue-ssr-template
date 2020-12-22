<template>
    <div>
        <h1 class="title">this home page</h1>
        <router-link to="/">to index</router-link>
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

<style scoped lang="less">
.title {
    color: blue;
}
</style>
