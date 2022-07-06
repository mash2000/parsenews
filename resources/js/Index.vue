<template>
    <div>
      <nav class="navbar navbar-expand-md navbar-dark bg-dark">
          <router-link class="navbar-brand mr-auto" :to="{name: 'home'}">Parsenews</router-link>

          <ul class="navbar-nav ms-auto">
              
          </ul>
          <form class="form-inline mt-2 mt-md-0">
            <input class="form-control mr-sm-2" type="text" placeholder="Поиск" aria-label="Search">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Поиск</button>
          </form>
      </nav>

      <div class="container my-3">
          <router-view></router-view>
      </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from "vuex";
export default {
    name: "Index",
    computed: {
        ... mapState({
            lastSearchComputed: state => state.lastSearch,
            isLoggedIn: state => state.isLoggedIn,
        }),
        ... mapGetters({
            itemsInBasket: 'itemsInBasket',
        })
    },
    methods: {
        
    }
}
</script>

<style scoped>
    .alert-basket {
        background-color: #227dc7;
        color: #ffffff;
        font-weight: bold;
        border-radius: 50%;
    }
</style>