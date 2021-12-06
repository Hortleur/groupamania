<template>
<h2>Connectez vous !</h2>
    <div class="container">
        <form class="loginForm">
            <div class="form-control">
                <label for="email">Saisissez votre email: </label>
                <input type="email" name="email" id="email" placeholder="exemple@email.com">
            </div>
            <div class="form-control">
                <label for="password">Saisissez votre mot de passe</label>
                <input type="password" name="password" id="password" placeholder="entrez votre mot de passe">
            </div>
            <div class="form-control">
                <input type="submit" value="Se connecter" class="btn btn-block">
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Login'
}
</script>

<style lang="scss" scoped>
.form-control{
    margin: 0 10px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    label{
        margin-bottom: 10px;
    }
    input{
        margin-bottom: 10px;
    }
}
.loginForm{
 border: 2px solid black;
 box-shadow: 0 0 4px 2px black;
}
.container{
    display: flex;
    justify-content: center;
}

</style>