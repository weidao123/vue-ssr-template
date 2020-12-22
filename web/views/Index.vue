<template>
    <div>
        <h1 class="index-page">this index page</h1>
        <router-link to="/home">to home</router-link>
    </div>
</template>

<script>
    export default {
        name: "Index"
    }
</script>

<style scoped>
.index-page {
    color: blue;
}
</style>
