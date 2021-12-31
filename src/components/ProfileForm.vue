<template>
    <div class="border-2 border-solid border-black bg-pink-100 p-8 rounded-xl">
        <div class="my-4">
            <label for="bio"> bio:</label>
            <textarea v-model="bio" name="bio" id="bio" cols="30" rows="5" class=" px-2"></textarea>
        </div>
        <div>
            <input @change="onFileSelected" type="file" name="image" id="image">
        </div>
        <div>
            <button @click="createProfile" type="submit" class="my-4 bg-orange-200 p-4 rounded-xl border-black border-2 shadow-lg">Créer son Profile</button>
        </div>
    </div>
</template>

<script>
    let gpc = localStorage.getItem('gpc')
    const UserId= JSON.parse(gpc).id
    const token= JSON.parse(gpc).token
    const axios = require('axios')
    export default {
        name: "ProfileForm",
        data: function(){
            return{
                bio: '',
                userId: UserId,
                selectedFile: null
            }
        },
        methods: {
            onFileSelected(event){
                this.selectedFile = event.target.files[0]
            },
            createProfile(){
                const instance = axios.create({
                    baseURL: "http://localhost:3000/api",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    },
                })
                let fd = new FormData();
                fd.append('image', this.selectedFile)

                const formContent = {
                    bio: this.bio,
                    userId: this.userId,
                    image: this.selectedFile
                }
                console.log(formContent)
                fd.append('formContent', JSON.stringify(formContent))
                instance.post('/createProfile', fd)
                .then(res => {
                    return res
                })
            }
        } 
    }


</script>

<style>

</style>