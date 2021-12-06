<template>
    <div v-if="error">{{error}}</div>
    <div v-else v-for="post in posts.data" :key="post.id">
        <div class="post">
            <div class="title">
                <h2>{{post.title}}</h2>
            </div>
            <div class="content">
                <div class="image">
                    
                </div>
                <div class="texte">
                    {{post.content}}
                </div>
            </div>
            <div class="postFooter">
                <div class="userName">
                    
                </div>
                <div class="likes">
                    <i class="fas fa-heart"></i> 
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
                const postsResponse = await fetch('http://localhost:3000/api/auth/post')
            posts.value = await postsResponse.json()
            } catch (err) {
                error.value = err
            }
            
            return {posts, error}
        }

        
    }
</script>

<style lang="scss" scoped>

</style>