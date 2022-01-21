<template>
    <div class="goods-list">
        <card v-for="item of list" :good="item" v-bind:action="'Удалить'" v-bind:key="item.id"
              v-on:cardaction="onRemove"></card>
    </div>
</template>

<script>
  import card from "./Card";

  export default {
    components: {
      card,
    },
    name: 'cartlist',
    methods: {
      onRemove(product) {
        this.$store.dispatch('removeFromCart', product);
      }
    },
    computed: {
      list() {
        return this.$store.getters.getCart
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