<template>
    <div class="flex flex-col justify-between h-screen">
        <div class=" sm:mb-4 md:flex-row md:justify-between md:items-center md:mx-24">
            <router-link to="/Post">
                <Header />
            </router-link>
            <router-link to="/">
                <button @click="logOut"
                    class=" bg-pink-100 p-4 rounded-tl-xl rounded-br-xl font-semibold hover:bg-pink-500">DECONNEXION
                </button>
            </router-link>
        </div>
        <div>
            <div class=" bg-white w-1/3 mx-auto rounded-xl p-3 sm:w-screen sm:p-4">
                <div class=" flex flex-row flex-nowrap items-center">
                    <div class=" flex flex-col items-center">
                        <div @click="$refs.fileInput.click()"
                        class=" w-16 relative top-1.5 cursor-pointer">
                            <img v-if="profile.image" :src="profile.image" alt="Photo de Profile"
                                class=" rounded-2xl object-cover">
                            <img v-else src="../assets/default.jpg" alt="photo de profile"
                                class=" rounded-2xl object-cover">
                            <input class=" hidden" type="file" @change="changePic" ref="fileInput">
                        </div>
                        <div v-if="updatePic" class=" mt-6 bg-red-400 p-2 rounded-lg border-2 border-gray-400">                          
                            <button type="submit" @click="updateProfilePic">Enregistrer l'image</button>
                        </div>
                    </div>                    
                    
                    <div class=" flex-grow">
                        <div class=" border-b-2 border-orangeGroupo w-1/2 mx-auto mb-2">
                            <h1 class=" font-bold text-5xl">
                                {{userName}}
                            </h1>
                        </div>
                        <div @click="changeBio" class=" mt-2 text-lg cursor-pointer hover:bg-orange-200 w-3/4 mx-auto">
                            <h2 class=" font-bold">Bio :</h2>
                            <p>{{profile.bio}}</p>
                        </div>
                        <div v-show="bioForm">
                            <form class=" flex flex-col">
                                <textarea v-model="bio" cols="20" rows="5" class=" border-2 border-gray-400"></textarea>
                                <button @click=" updateBio" type="submit" class=" bg-pink-100 mt-2 p-2 rounded-lg font-semibold border-2 border-gray-400">Enregistrer</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div class=" flex flex-row justify-evenly mt-3">
                    <button @click="deleteAccount"
                        class=" bg-gray-500 p-3 rounded-lg text-white font-bold hover:text-black hover:bg-red-700 sm:bg-red-700">Supprimer
                        mon compte
                    </button>
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
    import axios from "axios";
    const gpc = localStorage.getItem('gpc')
    const token = JSON.parse(gpc).token

    export default {
        name: 'Profile',

        components: {
            Header,
            Footer,
        },
        data() {
            return {
                userId: JSON.parse(localStorage.getItem('gpc')).id,
                profileTrue: false,
                profile: '',
                userName: JSON.parse(localStorage.getItem('gpc')).name,
                openUpdateModal: false,
                selectedFile: null,
                bio: '',
                bioForm: false,
                updatePic: false

            }
        },
        methods: {
            logOut() {
                localStorage.clear()
            },
            updateBio() {
                const instance = axios.create({
                    baseURL: "http://localhost:3000/api",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                })
                instance.put('/editProfileBio',{
                    bio: this.bio
                } )
                    .then(res => {
                        this.bioForm = !this.bioForm
                        this.getProfile()
                        return res
                    })
            },
            getProfile() {
                const instance = axios.create({
                    baseURL: "http://localhost:3000/api",
                    headers: {
                        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("gpc")).token}`
                    }
                })
                instance.get('/user/Profile')
                    .then((res) => {
                        let profileData = res.data.data.profile
                        if (profileData != null) {
                            this.profileTrue = !this.profileTrue
                            this.profile = profileData
                        }
                    })
                    .catch((error) => {
                        return error
                    })
            },
            deleteAccount() {
                const self = this
                const instance = axios.create({
                    baseURL: "http://localhost:3000/api",
                    headers: {
                        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("gpc")).token}`
                    }
                })
                instance.delete(`/user/delete/${this.userId}`)
                    .then((res) => {
                        this.logOut()
                        self.$router.push('/')
                        return res
                    })
                    .catch((error) => {
                        return error
                    })
            },
            onFileSelected(event) {
                this.selectedFile = event.target.files[0]
            },
            updateProfilePic() {
                const instance = axios.create({
                    baseURL: "http://localhost:3000/api",
                    headers: {
                        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("gpc")).token}`
                    }
                })
                let fd = new FormData()
                fd.append('image', this.selectedFile)
                instance.put('/editProfilePic', fd)
                    .then((res) => {
                        this.getProfile()
                        this.updatePic = false
                        return res
                    })
                    .catch((error) => {
                        return error
                    })
            },
            changePic(event) {
                this.selectedFile = event.target.files[0]
                console.log(this.selectedFile)
                this.updatePic = true
            },
            changeBio(){
                if(this.bioForm === false) {
                    this.bioForm = true
                }else if(this.bioForm === true){
                    this.bioform = false
                }
            }
        },
        created() {
            this.getProfile()
        }
    }
</script>


<style lang="scss" scoped>

</style>