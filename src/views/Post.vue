<template>
    <div class=" flex flex-col justify-between h-screen ">
        <div class="header flex flex-col flex-nowrap md:flex md:flex-row md:flex-nowrap md:justify-between md:items-center  lg:mx-40 2xl:mx-52 md:mr-10">
            <div>
                <Header />
            </div>
            <div class=" md:mr-32 2xl:mr-56">
                <router-link to="/Profile">
                    <i @click="goToProfile" class="fas fa-user-astronaut text-3xl text-orangeGroupo mr-8"></i>
                </router-link>
                <button @click="toggleModal = !toggleModal">
                    <i class="fas fa-plus-circle text-orangeGroupo text-3xl "></i>
                </button> 
            </div>
        </div>
        <router-view />
        <div v-if="toggleModal" class=" fixed z-50 overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center ">
            <div class=" relative mx-auto w-auto">
                <button @click="toggleModal = !toggleModal"> 
                    <i class="fas fa-times-circle text-4xl text-orangeGroupo"></i>
                </button>
                <PostForm />
            </div>
        </div>
        <div v-if="toggleModal" class=" absolute inset-0 z-40 opacity-90 bg-black">
            
        </div>
        <div class=" mx-auto sm:flex sm:flex-row-reverse sm:flex-nowrap my-8 sm:justify-around">
            <div v-if="error">{{error}}</div>
            <div class="">
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
        data(){
            return{
                toggleModal: false
            }
        },
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