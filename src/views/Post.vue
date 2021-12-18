<template>
    <div class=" flex flex-col flex-nowrap h-screen ">
        <div class="header">
            <Header />
            <button @click="goToProfile">
                <i class="fas fa-user-astronaut "></i>
            </button>
        </div>
        <div class=" md:flex md:flex-row-reverse md:flex-nowrap my-8">
            <div class="lg:top-auto lg:fixed ">
                <PostForm />
            </div>
            <div v-if="error">{{error}}</div>
            <div class=" relative mx-auto">
                <Suspense>
                    <PostList />
                </Suspense>
            </div>
        </div>

        <div>
            <Footer />
        </div>
    </div>

</template>

<script>
    import Header from "../components/Header.vue";
    import PostList from "../components/PostList.vue";
    import Footer from "../components/Footer.vue";
    import PostForm from "../components/PostForm.vue";
    import {
        ref,
        onErrorCaptured
    } from "vue";



    export default {
        name: 'Post',
        setup() {
            const error = ref(null)

            onErrorCaptured(e => {
                error.value = e
            })
            return {
                error
            }
        },
        components: {
            Header,
            PostList,
            Footer,
            PostForm
        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped>

</style>