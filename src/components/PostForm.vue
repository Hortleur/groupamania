/* eslint-disable */
<template>
    <div class="border-2 border-solid border-black bg-pink-100 p-8 rounded-xl sm:w-screen">
        <div class=" my-4">
            <input v-model="title" type="text" name="postTitle" id="postTitle" placeholder=" Titre" class=" w-full rounded-2xl border-blackGroupo border-2 py-2 px-5">
            <span v-if="!title" class=" text-redGroupo">le titre est requis</span>
        </div>
        <div class="">
            <textarea v-model="content" name="content" id="content" cols="60" rows="5" class=" border-2 border-blackGroupo rounded-2xl py-2 px-5 sm:w-4/5"></textarea>
        </div>
        <div class=" my-4">
            <input v-model="imageAltText" type="text" name="imageAltText" id="imageAltText" placeholder=" Description de l'image" class=" w-full rounded-2xl border-2 border-black py-2 px-5
            ">
            <span v-if=" selectedFile" class=" text-redGroupo">La description est requise</span>
            <input @change="onFileSelected" type="file" name="image" id="image" class=" my-4">
            <span v-if="!selectedFile" class=" text-redGroupo">l'image est requise</span>
        </div>
        <div class=" my-4">
            <button @click="onPost" :disabled="!title" class=" button border-2 border-blackGroupo rounded-full w-1/4 p-4 hover:bg-greenGroupo bg-blackGroupo text-white" type="submit">
               <i class="fas fa-paper-plane text-2xl"></i>
            </button>
        </div>
    </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
let gpc = localStorage.getItem('gpc')
const UserId= JSON.parse(gpc).id

export default {
    name:'PostForm',
    data: function() {
        return{
            v$: useVuelidate(),
            title:'',
            content:'',
            userId: UserId,
            imageAltText:'',
            selectedFile: null,
            isDisabled: true
        }
    },
    methods:{
        onFileSelected(event){
           this.selectedFile = event.target.files[0]
        },
        onPost(){
                const formContent = {
                title: this.title,
                content: this.content,
                image: this.selectedFile,
                imageAltText: this.imageAltText,
                userId: this.userId,
                }
                this.$emit('changement', formContent)                
        }
    }
}
</script>

<style lang="scss" scoped>

</style>