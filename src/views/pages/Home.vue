<template>
  <section class="home">
    <div class="container-fluid">
      <div class="search-wrapper">
        <div class="form-group">
          <input class="form-control poke-search" type="search" name="" placeholder="Search Pokemon" v-model="search" @keyup.enter="searchData()">
        </div>
        <div class="form-group poke-dropdown">
          <button class="btn btn-outline-primary" type="button" data-toggle="dropdown" aria-expanded="false"><i class="fas fa-filter"></i> Filter</button>
          <div class="dropdown-menu">
            <a href="javascript:void(0)" class="dropdown-item">Pokemons Filter</a>
            <input id="paramsValue" type="hidden" name="" :value="$route.query.type != undefined ? $route.query.type:0">
            <div role="separator" class="dropdown-divider"></div>
            <div class="dropdown-group">
              <router-link class="dropdown-item" :data-hover="item.name" :to="{name:'Filter',params:{filter:item.name}}" v-for="(item, index) in typeList">{{item.name}}</router-link>
            </div>
          </div>
        </div>
        <div class="form-group" v-if="$route.query.type != undefined ">
          <button class="btn btn-danger" type="button" name="button" @click="reset()">Reset</button>
        </div>
      </div>
      <div class="pokemons-wrapper">
        <div class="poke-loader"><div></div></div>
        <router-link :to="{name:'Key',params:{key:item.key}}" class="col-xl-3" v-for="(item,index) in pokemons">
          <div class="card pokemon-card">
            <div class="pokemon-images" :style="'--image:url('+item.thumbs+')'"></div>
            <div class="card-body">
              <p class="pokemon-name">{{item.name}}</p>
            </div>
          </div>
        </router-link>
      </div>
      <div class="button-wrapper">
        <button class="btn btn-pokemon" :disabled="isAvailable(prevUrl)" type="button" name="button" @click="prev(prevUrl)"><i class="fas fa-backward"></i></button>
        <button class="btn btn-pokemon" :disabled="isAvailable(nextUrl)" type="button" name="button" @click="next(nextUrl)"><i class="fas fa-forward"></i></button>
      </div>
    </div>
    <div class="scroll-top hide">
      <a class="to-top" href="javascript:void(0)">
        <i class="fas fa-arrow-up"></i>
      </a>
    </div>
  </section>
</template>

<script>

export default {
  name: 'Home',
  data(){
    return{
      pokemons:[],
      typeList:[],
      currentUrl:'',
      typeUrl:'',
      prevUrl:0,
      nextUrl:0,
      search:''
    }
  },
  methods:{
    requestDataByType(){
      let reqLink = new requestUrl(this.typeUrl);
      this.axios.get(reqLink.url)
      .then((results)=>{
        let resultMapped = results.data.results.map(({name,url})=>({
          ['key'] : url.split('/').filter(function(part) { return !!part }).pop(),
          ['name']:name
        }));
        this.typeList=resultMapped;
      })
      .catch((Error)=>{
        console.log(Error);
      });
    },
    requestData(){
      $('body').find('.poke-loader').show();
      let reqLink = new requestUrl(this.currentUrl);
      this.axios.get(reqLink.url)
      .then((results)=>{
        this.prevUrl = results.data.previous != null? results.data.previous: 0;
        this.nextUrl = results.data.next;
        let resultMapped = results.data.results.map(({name,url})=>({
          ['key'] : url.split('/').filter(function(part) { return !!part }).pop(),
          ['name']:name,
          ['thumbs']:process.env.VUE_APP_IMAGE_API_URL+url.split('/').filter(function(part) { return !!part }).pop()+'.png'
        }));
        this.pokemons=resultMapped;
      })
      .then((success)=>{
        $('body').find('.poke-loader').hide();
      })
      .catch((Error)=>{
        console.log(Error);
      });
    },
    requestPokemonsByType(){
      let reqLink = new requestUrl(this.currentUrl);
      this.axios.get(reqLink.url)
      .then((results)=>{
        let pokemonsData = [];
        for (var i = 0; i < results.data.pokemon.length; i++) {
          pokemonsData.push({
            ['key']: results.data.pokemon[i].pokemon.url.split('/').filter(function(part) { return !!part }).pop(),
            ['name']:results.data.pokemon[i].pokemon.name,
            ['thumbs']:process.env.VUE_APP_IMAGE_API_URL+results.data.pokemon[i].pokemon.url.split('/').filter(function(part) { return !!part }).pop()+'.png'
          });
        }
        this.pokemons = pokemonsData;
      })
      .then((success)=>{
        $('body').find('.poke-loader').hide();
      })
      .catch((Error)=>{
        console.log(Error);
      });
    },
    isAvailable(value){
      if (value != 0) {
        return false;
      }else {
        return true;
      }
    },
    prev(url){
      this.currentUrl = url
      this.requestData();
      $(window).scrollTop(0);
    },
    next(url){
      this.currentUrl = url
      this.requestData();
      $(window).scrollTop(0);
    },
    searchData(){
      let paramsText = this.search.toLowerCase();
      this.$router.push({name:'Key',params:{key:paramsText}});
    },
    reset(){
      this.$router.push({name:'Home'});
      this.currentUrl = process.env.VUE_APP_API_URL;
      this.requestData();
    }
  },
  created(){
    this.typeUrl = process.env.VUE_APP_API_URL_TYPE;
    this.requestDataByType();
    
    this.currentUrl = process.env.VUE_APP_API_URL;
    this.requestData();
    
    if (this.$route.query.type != undefined) {
      this.currentUrl = process.env.VUE_APP_API_URL_TYPE + this.$route.query.type.toLowerCase();
      this.requestPokemonsByType();
    }
  },
  mounted(){
    toTop();
  },
  updated(){
    let fetch = $('#paramsValue').val();
    if (fetch != 0) {
      this.currentUrl = process.env.VUE_APP_API_URL_TYPE + fetch.toLowerCase();
      this.requestPokemonsByType();
    }
  }
}
</script>
<style scoped="">

</style>