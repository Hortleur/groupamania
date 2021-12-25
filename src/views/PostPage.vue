<template>
    <div class=" flex flex-col flex-nowrap justify-between content-between h-screen">
        <div>
            <router-link to="/Post">
            <Header />   
            </router-link> 
        </div>
        <div class=" border-2 rounded-xl border-white m-4">
            <div class=" border-b-2 border-orangeGroupo my-3 mx-auto w-2/3">
                <p> 
                    chat
                </p>
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
export default {
    name: "PostPage",
    components: {
        Header,
        Footer, 
    }

    
}
</script>

<style lang="scss" scoped>

</style>