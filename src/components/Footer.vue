<template>
    <footer>
            <h2>Copyright:</h2>
            <img src="../assets/logo_groupamania.webp" alt="logo groupamania">
    </footer>
</template>

<script>
export default {
    name: 'Footer',    
}
</script>

<style lang="scss" scoped>
    footer{
        display: flex;
        flex-flow: row wrap;
        margin-top: 30px;
        background-color: darken(red, 30);
        justify-content: center;
        align-items: center;
        height: 200px;
    }
    img{
        width: 200px;
        height: auto;
    }
    h2{
        margin-right: 20px;
    }
</style>
