<template>
    <div>
        <h1>Home Page</h1>
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

</style>
