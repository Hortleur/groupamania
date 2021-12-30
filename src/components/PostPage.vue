<template>
    <div class=" flex flex-col flex-nowrap h-screen justify-between">
        <div>
            <Header/>
        </div>
        <div>
            <div class=" flex flex-col flex-nowrap border-r-4 border-orangeGroupo justify-center">
            <div class="likes mx-4">
                <i class="fas fa-heart"></i>
                <span>{{post.Likes.length}}</span>
            </div>
        </div>
        <div class=" w-full">
            <div>
                <div class="title border-b-4 border-orangeGroupo my-3 flex content-center justify-start pl-2">
                    <h2 class=" text-2xl font-bold">{{post.title}}</h2>
                </div>
            </div>
            <div>
                <div class="content">
                    <div v-if="post.image" class="image mx-auto p-6 border-b-4 border-orangeGroupo">
                        <img :src="post.image" :alt="post.imageAltText" loading="lazy">
                    </div>
                    <div v-if="post.content" class=" border-b-4 border-orangeGroupo p-3">
                        {{post.content}}
                    </div>
                </div>
            </div>

            <div class="postFooter flex flex-row flex-nowrap justify-between p-4">
                <div class="userName">
                    <span>
                        <!--Ajouter photo de profil-->{{post.user.name}}</span>
                </div>
                <div class="comments">
                        <div>
                            <p class=" hover:text-green-600">commentaire(s) : {{post.Commentaire.length}} commentaire(s)
                            </p>
                        </div>
                </div>
            </div>
        </div>
        </div>
        <div>
            <Footer/>
        </div>
    </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
const axios = require('axios')
const instance = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("gpc")).token}`
              }
})

    export default {
        components:{
            Header,
            Footer
        },
        data() {
            return{
                id: this.$route.params.id,
                post:{}
            }
        },
        created(){
           /* instance.get('http://localhost:3000/api/post/onePost/' + this.id)
            .then(function(post){
                console.log(post.data.data)
                return Promise.resolve(this.post = post.data.data)
            })
            .catch(function(error){
                console.log(error)
            })*/
            return new Promise((resolve, reject) => {
                instance.get('/post/onePost/' + this.id)
                .then(function(res) {
                    console.log(res)
                    this.post = res.data.data
                    
                resolve(res)
                })
                .catch(function(error){
                    reject(error)
                })
            })
        }
    }
</script>

<style lang="scss" scoped>

</style>