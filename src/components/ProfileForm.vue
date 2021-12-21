<template>
    <div class="border-2 border-solid border-black bg-pink-100 p-8 rounded-xl">
        <div class="my-4">
            <label for="name"> Pseudo: </label>
            <input v-model="name" type="text" name="name" id="name" placeholder= " Pseudo">
        </div>
        <div class="my-4">
            <label for="bio"> bio:</label>
            <textarea name="bio" id="bio" cols="30" rows="5"></textarea>
        </div>
        <div>
            <input type="text" name="imageAltText" id="imageAltText" placeholder="description de la photo">
            <input type="file" name="image" id="image">
        </div>
        <div>
            <button type="submit" class="my-4 bg-orange-200 p-4 rounded-xl border-black border-2 shadow-lg">Créer son Profile</button>
        </div>
    </div>
</template>

<script>
    let gpc = localStorage.getItem('gpc')
    const nom = JSON.parse(gpc).name
    const UserId= JSON.parse(gpc).id
    console.log(nom, UserId)
    export default {
        name: "ProfileForm",
        methods: {
            
        }
        
    }


</script>

<style>

</style>