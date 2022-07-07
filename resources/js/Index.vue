<template>
    <div>
      <nav class="navbar navbar-expand-md navbar-dark bg-dark">
          <router-link class="navbar-brand mr-auto" :to="{name: 'home'}">Parsenews</router-link>
      </nav>

        <router-view></router-view>

      <notifications position="top left"/>
  </div>
</template>

<script>
import {mapState, mapGetters} from "vuex";
export default {
    name: "Index",
    data() {
        return {
            search: null,
        };
    },
    computed: {
        ... mapState({
            lastSearchComputed: state => state.lastSearch,
            isLoggedIn: state => state.isLoggedIn,
        }),
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