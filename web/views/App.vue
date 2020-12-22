<template>
    <div class="container">
        <h1>Vue SSR Template</h1>
        <router-view />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                msg: 'hello typescript'
            }
        },
    }
</script>

<style>
    * {
        margin: 0;
        padding: 0;
        text-align: center;
    }
    html, body {
        width: 100%;
        height: 100%;
    }
    .container {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
</style>
