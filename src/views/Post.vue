<template>
    <div class=" flex flex-col justify-between h-screen ">
        <div class="header flex flex-col flex-nowrap md:flex md:flex-row md:flex-nowrap md:justify-between md:items-center  lg:mx-40 2xl:mx-52 md:mr-10">
            <div>
                <Header />
            </div>
            <div class=" md:mr-32 2xl:mr-56">
                <router-link to="/Profile">
                    <i @click="goToProfile" class="fas fa-user-astronaut text-3xl text-orangeGroupo"></i>
                </router-link>
                <button @click="toggleModal = !toggleModal">
                    <i class="fas fa-plus-circle text-orangeGroupo text-3xl mx-8"></i>
                </button>
                <router-link to="/Admin">
                    <i class="fas fa-users-cog text-orangeGroupo text-3xl " v-if="admin"></i>
                </router-link>
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
    

    export default {
        name: 'Post',
        data(){
            return{
                toggleModal: false,
                admin:false
            }
        },
        components: {
            Header,
            PostList,
            Footer,
            PostForm
        },
        methods: {
            isAdmin(){
                const gpc = localStorage.getItem('gpc')
                const gpcAdmin = JSON.parse(gpc).isAdmin
                if(gpcAdmin > 0){
                    this.admin = !this.admin
                }
            }
        },
        created(){
            this.isAdmin()
        }
    }
</script>

<style lang="scss" scoped>

</style>