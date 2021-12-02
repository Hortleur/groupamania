<template>
    <h2>
        Enregistrez vous !
    </h2>
    <div class="container">
        <form class="signUpForm">
            <div class="form-control">
                <label for="email"> Saisissez votre adresse email: </label>
                <input type="email" name="email" id="email" placeholder="exemple@email.com">
            </div>
            <div class="form-control">
                <label for="name">Saisissez votre nom: </label>
                <input type="text" name="name" id="name" placeholder="Entrez votre nom">
            </div>
            <div class="form-control">
                <label for="password">Saisissez votre mot de passe</label>
                <input type="password" name="password" id="password" placeholder="entrez votre mot de passe">
            </div>
            <div class="form-control">
                <input type="submit" value="Enregistrer" class="btn btn-block">
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name:'Signup'
    
}
</script>

<style lang="scss" scoped>
.form-control{
    margin: 10px;
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
.signUpForm{
 border: 2px solid white;
 box-shadow: 0 0 4px 2px whitesmoke;
}
.container{
    display: flex;
    justify-content: center;
}
</style>