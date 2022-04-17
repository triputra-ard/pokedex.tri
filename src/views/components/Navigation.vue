<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light pokedex-nav">
      <button class="btn btn-default mobile" type="button" name="button" @click="historyBack()"><i class="fas fa-chevron-left"></i> </button>
      <router-link class="navbar-brand" :to="{ name: 'Home'}"><img class="logo" src="@/assets/pokedex-logo.png" alt=""></router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Home'}" active-class="poke-active" exact-active-class="poke-exact-active">Home</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="javascript:void(0)" @click="scrollTo('#footer')">About</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  methods:{
    scrollTo(element){
      $(element).get(0).scrollIntoView();
    },
    historyBack(){
      window.history.back();
    }
  },
  mounted(){
    
  }
}
</script>

<style lang="css" scoped>
  .pokedex-nav{
    position: fixed;
    width: 100%;
    background: var(--poke-nav-background);
    z-index: 1000;
    box-shadow: 0px 5px 7px 0px rgba(0,0,0,0.25);
    -webkit-box-shadow: 0px 5px 7px 0px rgba(0,0,0,0.25);
    -moz-box-shadow: 0px 5px 7px 0px rgba(0,0,0,0.25);
  }
  .pokedex-nav .navbar-brand img.logo{
    width: 120px;
    height: auto;
  }
  .poke-active,
  .poke-exact-active{
    font-weight: 700;
  }
  .btn.mobile{
    display: none;
  }
  @media only screen and (max-width:993px) {
    .btn.mobile{
      display: block;
      font-size: 26px;
      padding: 5px;
    }
  }
</style>
