<template>
    <button @click="onClick" class="btn"><i :class="['fas', icon]"></i></button>
</template>

<script>
export default {
    name: 'Button',

    props: ['icon']
    ,

    methods:{
        onClick() {
            this.$emit('btn-click')
        },
    }
}
</script>

<style lang="scss" scoped>
      button{
          margin: 0 10px;
          border-radius: 13px;
          &:hover{
              cursor: pointer;
          }
      }
  .fas{
    font-size: 25px;
    margin: 0 10px;
  }
</style>