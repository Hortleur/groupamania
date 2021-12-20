<template>
    <div class="flex flex-col justify-between h-screen">
        <div>
            <div
                class=" flex flex-col justify-center items-center md:flex-row md:justify-between md:items-center md:mx-24">
                <router-link to="/Post">
                    <Header />
                </router-link>
                <router-link to="/">
                <button @click="logOut" class=" bg-pink-100 p-4 rounded-tl-xl rounded-br-xl">DECONNEXION</button>
                </router-link>
            </div>
        </div>
        <div class=" border-pink-100 border-2">
            <button @click="openModal = !openModal" class=" bg-pink-100 my-4 p-3 rounded">Créer son profile</button>
        </div>
        <div v-if="openModal" class=" fixed z-50 overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center ">
            <div class=" relative mx-auto w-auto">
                <button @click="openModal = !openModal"> 
                    <i class="fas fa-times-circle text-4xl text-orangeGroupo"></i>
                </button>
                <ProfileForm />
            </div>
        </div>
        <div v-if="openModal" class=" absolute inset-0 z-40 opacity-90 bg-white">
        </div>
        <div>
            <Footer />
        </div>
    </div>
</template>

<script>
    import Header from "../components/Header.vue";
    import Footer from "../components/Footer.vue";
    import ProfileForm from "../components/ProfileForm.vue";

    export default {
        name: 'Profile',

        components: {
            Header,
            Footer,
            ProfileForm,
        },
        data(){
            return{
                openModal: false
            }
        },
        methods: {
            logOut(){
                localStorage.clear()
            }
        }
    }
</script>


<style lang="scss" scoped>

</style>