<template>
    <div>
        <Header />  
    </div>
    <div v-if="error">{{error}}</div>
    <div>
        <Suspense>
            <PostList />
        </Suspense>
    </div>
</template>

<script>
import Header from "../components/Header.vue";
import PostList from "../components/PostList.vue";
import { ref, onErrorCaptured } from "vue";


export default {
    name: 'Post',
    setup(){
        const error = ref(null)

            onErrorCaptured(e => {
                error.value = e
            })
        return {error}
    },
    components: {
        Header,
        PostList,
    },
}
</script>

<style lang="scss" scoped>

</style>