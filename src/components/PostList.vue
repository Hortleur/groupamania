<template>
    <div v-if="error">{{error}}</div>
    <div v-else v-for="post in posts.data" :key="post.id" class="posts">
            <div class="title">
                <h2>{{post.title}}</h2>
            </div>
            <div class="content">
                <div class="image">
                    {{post.Image.imageUrl}}
                </div>
                <div class="texte">
                    {{post.content}}
                </div>
            </div>
            <div class="postFooter">
                <div class="userName">
                    <span>Posté par:</span>  {{post.user.name}}
                </div>
                <div class="likes">
                    <i class="fas fa-heart">{{post.Likes.likeCount}}</i> 
                </div>
            </div>
            <div class="comments">
                <div>
                    <p>commentaires</p>
                </div>
                <div class="commentaires">
                    
                </div>
            </div>
    </div>
</template>

<script>
    import { ref } from "vue";
    export default {
        name: "post",
        components: {

        },
        method: {
            
        },  
        async setup(){
            const posts = ref(null)
            const error = ref(null)
            try {
                const postsResponse = await fetch('http://localhost:3000/api/auth/post', {
                    headers: {
                        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("gpc")).token}`
                    }
                })
            posts.value = await postsResponse.json()
            } catch (err) {
                error.value = err
            }
            
            return {posts, error}
        }

        
    }
</script>

<style lang="scss" scoped>
    .posts{
        border: 2px solid black;
        width: 100%;
        margin: 40px auto;
        border-radius: 15px;
        .title{
            border: 1px solid black;
            border-radius: 15px;
        }
        .content{
            border: 1px solid black;
            border-radius: 15px;
        }
        .postFooter{
            border: 2px solid black;
            border-radius: 15px;
            display: flex;
            justify-content: center;
            
            div{
                margin: 0 20px
            }

        }
    }
</style>