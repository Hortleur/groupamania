<template>
    <div>

    </div>
</template>

<script>
let gpc = localStorage.getItem('gpc')
const nom = JSON.parse(gpc).name
const UserId= JSON.parse(gpc).id
console.log(nom, UserId)

</script>

<style>

</style>