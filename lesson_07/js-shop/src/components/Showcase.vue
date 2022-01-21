<template>
    <div class="goods-list">
        <card v-for="item of list" :good="item" v-bind:action="'Купить'" v-bind:key="item.id"
              v-on:cardaction="onAdd"></card>
    </div>
</template>

<script>
  import card from "./Card";

  export default {
    components: {
      card,
    },
    name: 'showcase',
    methods: {
      onAdd(product) {
        this.$store.dispatch('addToCart', product);
      }
    },
    computed: {
      list() {
        return this.$store.getters.getShowcase
      }
    },
  }
</script>

<style lang="css">
    .goods-list {
        display: flex;
        margin: 20px;
    }
</style>