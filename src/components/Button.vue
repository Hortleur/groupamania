<template>
    <button class="btn"><i :class="['fas', icon]"></i></button>
</template>

<script>
export default {
    name: 'Button',

    props: ['icon']
    ,

    methods:{

    }
}
</script>

<style lang="scss" scoped>
      button{
          margin: 0 10px;
          border-radius: 10px;
          &:hover{
              cursor: pointer;
          }
      }
  .fas{
    font-size: 25px;
    margin: 0 10px;
  }
</style>