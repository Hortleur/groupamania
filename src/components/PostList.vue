<template>
    <div v-if="error">{{error}}</div>
    <div v-else v-for="post in posts" :key="post.id"
        class="posts flex flex-row flex-nowrap bg-pink-100 my-10 rounded-2xl sm:mx-4">
        <div class=" flex flex-col flex-nowrap border-r-4 border-orangeGroupo justify-center">
            <div class="likes mx-2">
                <div v-if="isLiked">
                    <i @click="onDislike(post.id)" class="fas fa-heart text-red-700 cursor-pointer text-2xl"></i>
                </div>
                <div v-else>
                    <i @click="onLike(post.id)" class="fas fa-heart cursor-pointer text-2xl"></i>
                </div>
                <span>{{post.Likes.length}}</span>
            </div>
        </div>
        <div class=" w-full">
            <div>
                <div class="title border-b-4 border-orangeGroupo my-3 flex content-center justify-between p-2">
                    <h2 class=" text-2xl font-bold">{{post.title}}</h2>
                    <i @click="deletePost(post.id, post.image)" class="fas fa-trash self-center text-red-600" v-if=" isAdmin === 1 || userId == post.user.id"></i>
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

            <div class="postFooter flex flex-row flex-nowrap justify-between p-4 sm:flex-col sm items-center">
                <div class="userName flex flex-row">                    
                    <img v-if="post.user.profile.image" :src="post.user.profile.image" alt="photo de profile" class=" w-9 h-9 object-cover rounded-full">
                    <img v-else src="../assets/default.jpg" alt="photo de profile" class=" w-9 h-9 object-cover rounded-full">
                    <span>{{post.user.name}}</span>
                </div>
                <div class="comments">
                    <router-link :to="'/Post/' + post.id">
                        <div>
                            <p class=" hover:text-green-600">commentaire(s) : {{post.Commentaire.length}} commentaire(s)
                            </p>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    const instance = axios.create({
        baseURL: "http://localhost:3000/api",
        headers: {
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem("gpc")).token}`
        }
    })
    export default {
        name: "Post",
        data() {
            return {
                posts: [],
                newPost: null,
                isLiked: false,
                postId: '',
                isAdmin : JSON.parse(localStorage.getItem('gpc')).isAdmin,
                userId : JSON.parse(localStorage.getItem('gpc')).id,
                Likes:'',
                error:''
                
            }
        },
        watch: {
            posts(){
                return this.posts
            }
        } ,
        components: {

        },
        methods: {
            getPosts(){
                instance.get('/post')
                .then((res) => {
                    this.posts = res.data.data
                    this.userLiked()
                })
                .catch((error) => {
                    return this.error = error
                })
            },
            deletePost(id, image){
                instance.delete(`/post/delete/${id}`, image)
                .then((res) => {
                    this.getPosts()
                     return res
                })
                .catch((error) => {
                    return this.error = error
                })
            },
            onLike(id){ 
                instance.post('/like', {
                    id : Number(id)
                })
                .then((res) => {
                    this.getPosts()
                   return res
                    
                })
                .catch((error) => {
                    return this.error = error
                })    
                   
            },
            userLiked(){
                instance.get('/user/likes')
                    .then((res) => {
                        const likes = res.data.data.Likes
                        likes.forEach(like => {
                            this.posts.forEach(post => {
                                if (like.postId == post.id &&like.userId == this.userId) {
                                    this.isLiked = !this.isLiked
                                }
                            });
                        });
                        
                        return this.Likes = likes
                        
                    })
                    .catch((error) => {
                        return this.error = error
                    })
                
            },
            onDislike(id){
                const likeId = this.Likes.find(item => item.postId == id).id
                instance.delete(`/like/deletelike/${likeId}`)
                .then((res) => {
                    this.getPosts()
                    return res
                })
                .catch((error) => {
                    return this.error = error
                })
                
            },
        },
        created() {
            this.getPosts()
            }
                
    }
</script>

<style lang="scss" scoped>

</style>