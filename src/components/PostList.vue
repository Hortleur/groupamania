<template>
<router-link to="/PostPage" >
    <div v-if="error">{{error}}</div>
    
    <div v-else v-for="post in posts.data" :key="post.id" class="posts flex flex-row flex-nowrap bg-pink-100 my-10 rounded-2xl mx-auto w-2/3">
        <div class=" flex flex-col flex-nowrap border-r-4 border-orangeGroupo justify-center">
            <div class="likes mx-4">
                <i class="fas fa-heart"></i>
                <span>{{post.Likes.likeCount}}</span>
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
                <span><!-- Ajouter photo de profil--></span> {{post.user.name}}
            </div>
            <div class="comments">
                <div>
                    <p>commentaire(s) : {{post.Commentaire.length}} commentaire(s)</p>
                </div>
                <div class="commentaires">

                </div>
            </div>
        </div>
        </div>
        
    </div>
    </router-link>
</template>

<script>
    import {
        ref
    } from "vue";
    export default {
        name: "post",
        components: {

        },
        method: {

        },
        async setup() {
            const posts = ref(null)
            const error = ref(null)
            try {
                const postsResponse = await fetch('http://localhost:3000/api/post', {
                    headers: {
                        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("gpc")).token}`
                    }
                })
                posts.value = await postsResponse.json()
            } catch (err) {
                error.value = err
            }
            return {
                posts,
                error
            }
        }


    }
</script>

<style lang="scss" scoped>

</style>