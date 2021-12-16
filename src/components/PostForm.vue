<template>
    <div class="formPost">
        <div class="form-row">
            <input v-model="title" type="text" name="postTitle" id="postTitle" placeholder="Titre">
        </div>
        <div class="form-row">
            <textarea v-model="content" name="content" id="content" cols="35" rows="5"></textarea>
        </div>
        <div class="form-row image">
            <input v-model="imageAltText" type="text" name="imageAltText" id="imageAltText" placeholder="Description de l'image">
            <input @change="onFileSelected" type="file" name="image" id="image">
        </div>
        <div class="form-row">
            <button @click="onPost" class="button" type="submit"><i class="fas fa-share"></i></button>
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
                baseURL: "http://localhost:3000/api/auth",
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
                console.log(res)
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>