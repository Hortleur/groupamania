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
        <div v-if="!profileTrue" class=" border-pink-100 border-2">
            <div >
                <button @click="openModal = !openModal" class=" bg-pink-100 my-4 p-3 rounded">Créer son profile</button>
            </div>
            <div v-if="openModal"
                class=" fixed z-50 overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center ">
                <div class=" relative mx-auto w-auto">
                    <button @click="openModal = !openModal && getProfile()">
                        <i class="fas fa-times-circle text-4xl text-orangeGroupo"></i>
                    </button>
                    <ProfileForm />
                </div>
            </div>
            <div v-if="openModal" class=" absolute inset-0 z-40 opacity-90 bg-white">
            </div>
        </div>
        <div v-else>
            <div class=" bg-white w-1/2 mx-auto">
                <div>
                    <div class=" w-1/3">
                        <img :src="profile.image" alt="Photo de Profile" class=" rounded-full w-1/3 ">
                    </div>
                    <div> <h1>{{user.name}}</h1></div>
                </div>
            </div>
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
    let gpc = localStorage.getItem('gpc')
    const UserId = JSON.parse(gpc).id
    import  axios  from "axios";
    const instance = axios.create({
        baseURL: "http://localhost:3000/api",
        headers: {
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem("gpc")).token}`
        }
    })
    export default {
        name: 'Profile',

        components: {
            Header,
            Footer,
            ProfileForm,
        },
        data() {
            return {
                openModal: false,
                userId: UserId,
                profileTrue: false,
                profile:'',
                user:''
            }
        },
        methods: {
            logOut() {
                localStorage.clear()
            },
            getProfile(){
                instance.get('/user/Profile', {
                    id: this.userId
                })
                .then((res) => {
                    let profileData = res.data.data.profile
                    let userData = res.data.data
                    if(profileData != null){
                        this.profileTrue = !this.profileTrue
                        this.profile = profileData
                        this.user = userData
                    }
                        
                })
                .catch((error) => {
                    return error
                })
            }
        },
        created(){
            this.getProfile()
        }
    }
</script>


<style lang="scss" scoped>

</style>