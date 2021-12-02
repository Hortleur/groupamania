<template>
    <button @click="onClick" class="btn"><i class="fas fa-user-plus"></i></button>
</template>

<script>
export default {
    name: 'Button',

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