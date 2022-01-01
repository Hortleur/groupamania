<template>
    <div class="flex flex-col justify-between h-screen">
        <div>
            <div
                class=" flex flex-col justify-center items-center md:flex-row md:justify-between md:items-center md:mx-24">
                <router-link to="/Post">
                    <Header />
                </router-link>
                <router-link to="/">
                    <button @click="logOut" class=" bg-pink-100 p-4 rounded-tl-xl rounded-br-xl font-semibold hover:bg-pink-500">DECONNEXION</button>
                </router-link>
            </div>
        </div>
        <div v-if="!profileTrue" class=" border-pink-100 border-2">
            <div>
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
            <div class=" bg-white w-1/3 mx-auto rounded-xl p-3">
                <div class=" flex flex-row flex-nowrap items-center">
                    <div class=" w-28 relative top-1.5">
                        <img :src="profile.image" alt="Photo de Profile" class=" rounded-2xl object-cover">
                    </div>
                    <div class=" flex-grow">
                        <div class=" border-b-2 border-orangeGroupo w-1/2 mx-auto mb-2">
                            <h1 class=" font-bold text-5xl">
                                {{user.name}}
                            </h1>
                        </div>
                        <div class=" mt-2 font-semibold text-lg">
                            <p>{{profile.bio}}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <button @click="deleteAccount" class=" bg-gray-500 p-3 rounded-lg text-white font-bold hover:text-black hover:bg-red-700">Supprimer mon compte</button>
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
    import axios from "axios";
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
                profile: '',
                user: ''
            }
        },
        methods: {
            logOut() {
                localStorage.clear()
            },
            getProfile() {
                instance.get('/user/Profile', {
                        id: this.userId
                    })
                    .then((res) => {
                        let profileData = res.data.data.profile
                        let userData = res.data.data
                        if (profileData != null) {
                            this.profileTrue = !this.profileTrue
                            this.profile = profileData
                            this.user = userData
                        }

                    })
                    .catch((error) => {
                        return error
                    })
            },
            deleteAccount(){
                instance.delete('/user/delete', {
                    id: this.userId
                })
                .then((res) => {
                    return res
                    
                })
                .catch((error) => {
                    return error
                })
            }
        },
        created() {
            this.getProfile()
        }
    }
</script>


<style lang="scss" scoped>

</style>