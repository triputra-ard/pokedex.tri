<template>
  <footer id="footer">
    <div class="flex is-wrap in-center copyright">
      <p class="small">Pokedex</p>
      <p>Copyright &copy; 2022 Tri Putra Ardiyansah - All Right Reserved</p>
    </div>
  </footer>
</template>

<script>
export default {
  mounted(){
    
  }
}
</script>

<style lang="css" scoped>
footer{
  min-height: 5vh;
  background:var(--poke-footer-background);
}
@media only screen and (max-width:1200px) {
  footer{
    padding-bottom: 7vh;
  }
}
footer .copyright{
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  color: var(--pure-white);
}
.copyright p.small{
  font-size: 16px!important;
  font-weight: 600!important;
}
.copyright p{
  margin-bottom: 5px;
  font-size: 18px;
  font-weight: 300;
  text-align: center;
}
</style>
