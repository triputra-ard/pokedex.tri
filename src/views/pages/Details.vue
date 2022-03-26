<template>
  <section class="details">
    <div class="poke-loader"><div></div></div>
    <div class="error-information" v-if="found != true">
      <h2>Pokemons : <span>"{{$route.query.pokemons}}"</span> Not Found !</h2>
    </div>
    <div class="col-xl-12">
      <div class="pokemon-details-wrap">
        <div class="col-xl-5">
          <div class="card shadow pokemon-thumbs" :style="'--thumbs:url('+pokemons_details.thumbs+')'"></div>
        </div>
        <div class="col-xl-5">
          <div class="pokemon-info">
            <h2 class="pokemon-name">
              <span class="pokemon-keys">#{{pokemons_details.key}}</span> 
              {{pokemons_details.name}} 
              <span class="pokemon-species">
                ({{ pokemons_details.species }})
              </span>
            </h2>
            <div class="pokemon-xp">
              <p class="title">base experience</p>
              <div class="badge pokemon badge-xp big">{{pokemons_details.base_experience}} XP</div>
            </div>
            <div class="info-wrap">
              <label class="info-title">Height</label>
              <p>{{ pokemons_details.height }}</p>
            </div>
            <div class="info-wrap">
              <label class="info-title">Weight</label>
              <p>{{ pokemons_details.weight }}</p>
            </div>
            <div class="pokemon-types">
              <label :class="'badge pokemon capitalize ml-1 mr-1 badge-'+item.type.name" v-for="(item, index) in pokemons_details.types">
                {{item.type.name}}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="pokemon-details-wrap flex in-end">
        <div class="col-xl-7">
          <div class="pokemon-info">
            <div class="info-wrap">
              <label class="info-title">abilities</label><br>
              <div class="badge pokemon capitalize ml-1 mr-1 badge-primary" v-for="(item,index) in pokemons_details.abilities">
                {{item.ability.name}}
              </div>
            </div>
            <div class="info-wrap">
              <label class="info-title">stats</label>
              <div class="pokemon-progress" v-for="(item,index) in pokemons_details.stats">
                <label class="progress-title">{{item.stat.name}}<span class="progress-value">{{item.base_stat}}%</span></label>
                <div class="progress">
                  <div :class="'progress-bar progress-bar-striped progress-bar-animated '+item.stat.name" role="progressbar" :aria-valuenow="item.base_stat" aria-valuemin="0" aria-valuemax="100" :style="'width:'+item.base_stat+'%'"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
  name:'Details',
  data(){
    return{
      pokemons_details:'',
      pokemonUrl:'',
      found:0
    }
  },
  methods:{
    getPokemons(){
      let requestPokemon = new requestUrl(this.pokemonUrl);
      this.axios.get(requestPokemon.url)
      .then((results)=>{
        this.found = true;
        let resultArray = [results.data];
        let pokemonMapped = resultArray.map((
          {abilities,base_experience,height,weight,id,name,species,stats,types})=>
          ({
          ['key']:id,
          ['thumbs']:process.env.VUE_APP_IMAGE_API_URL+id+'.png',
          ['name']:name,
          ['height']:height/10+'m',
          ['weight']:weight/10+'kg',
          ['base_experience']:base_experience,
          ['abilities']:abilities,
          ['species']:Object.values(species)[0],
          ['stats']:stats,
          ['types']:types
        }));
        this.pokemons_details = pokemonMapped[0];
      })
      .then((success)=>{
        $('body').find('.poke-loader').hide();
      })
      .catch((Error)=>{
        console.log(Error);
      });
    },
    colors(value){
      return '--bg:rgba('+value[0]+','+value[1]+','+value[2]+');'
    }
  },
  created(){
    this.pokemonUrl = process.env.VUE_APP_API_URL+this.$route.query.pokemons;
    this.getPokemons();
  },
  mounted(){
    toTop();
  },
  updated(){
    
  }
}
</script>

<style scoped>
.details{
  min-height: 100vh;
  padding-top: 20vh;
  background: var(--poke-background);
}
@media only screen and (max-width:993px){
  .details{
    padding-top: 10vh;
  }
}
.error-information{
  padding: 30px;
}
.error-information h2{
  text-align: center;
}
</style>
