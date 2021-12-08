<template>
    <footer>
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
        background-color: darken(#f52c09, 18);
        justify-content: center;
        align-items: center;
        height: 250px;
    }
    img{
        width: 200px;
        height: auto;
        border-radius: 50%;
    }

</style>
