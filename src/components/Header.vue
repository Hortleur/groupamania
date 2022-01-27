<template>
  <header class="h-44">
    <img
      src="../assets/groupomania_logo.webp"
      alt="Logo groupamania"
    >
  </header>
</template>

<script>
export default {
  name: "Header",
  components: {},
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  width: 100%;
}
</style>
