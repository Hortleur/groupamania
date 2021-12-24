<template>
    <div class="border-2 border-solid border-black bg-pink-100 p-8 rounded-xl">
        <div class=" my-4">
            <input v-model="title" type="text" name="postTitle" id="postTitle" placeholder=" Titre" class=" w-full rounded-2xl border-black border-2 ">
        </div>
        <div class="">
            <textarea v-model="content" name="content" id="content" cols="60" rows="5" class=" border-2 border-black rounded-2xl"></textarea>
        </div>
        <div class=" my-4">
            <input v-model="imageAltText" type="text" name="imageAltText" id="imageAltText" placeholder=" Description de l'image" class=" w-full rounded-2xl border-2 border-black
            ">
            <input @change="onFileSelected" type="file" name="image" id="image" class=" my-4">
        </div>
        <div class=" my-4">
            <button @click="onPost" class="button border-2 border-black rounded-full w-1/4 p-4 hover:bg-orange-600" type="submit">
               <i class="fas fa-paper-plane text-2xl"></i>
            </button>
        </div>
    </div>
</template>

<script>
let gpc = localStorage.getItem('gpc')
const token = JSON.parse(gpc).token
const UserId= JSON.parse(gpc).id
const axios = require('axios')

export default {
    name:'PostForm',
    data: function() {
        return{
            title:'',
            content:'',
            userId: UserId,
            imageAltText:'',
            selectedFile: null
        }
    },
    methods:{
        onFileSelected(event){
           this.selectedFile = event.target.files[0]
        },
        onPost(){
            const instance = axios.create({
                baseURL: "http://localhost:3000/api",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }, 
            })
            let fd = new FormData();
            fd.append('image',this.selectedFile)
            
            const formContent = {
                title: this.title,
                content: this.content,
                image: this.selectedFile,
                imageAltText: this.imageAltText,
                userId: this.userId,
            }
            fd.append('formContent', JSON.stringify(formContent))
            instance.post('/createPost', fd)
            .then(res => {
                res.json()
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>