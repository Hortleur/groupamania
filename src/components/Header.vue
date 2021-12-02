<template>
    <header>
        <img src="../assets/logo_groupamania.webp" alt="Logo groupamania">
        <div class="">
            <Button @btn-click="$emit('toggle-signup-form')" icon="fa-user-plus"/>
            <Button @btn-click="$emit('toggle-login-form')" icon="fa-user-minus" />
        </div>
      
    </header>
</template>

<script>
import Button from './Button.vue'
export default {
    name: 'Header',
    components: {
        Button

    },
    props: {

    },
    methods: {
        
    }
}
</script>

<style lang="scss" scoped>
    header{
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;
        align-items: center;
        width: 100%;
    }
</style>