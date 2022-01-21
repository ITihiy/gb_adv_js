<template>
    <div class="goods-item">
        <h3>{{ good.title }}</h3>
        <p>{{ good.price }}$</p>
        <button v-on:click="onClick">{{ action }}</button>
    </div>
</template>

<script>
  export default {
    name: 'card',
    props: ['good', 'action'],
    methods: {
      onClick() {
        this.$emit('cardaction', this.good);
      }
    }
  }
</script>

<style lang="css">
    .goods-item {
        flex: 1;
        border: 1px solid black;
        border-radius: 6px;
        margin-left: 20px;
        padding: 10px;
        background-color: lightyellow;
    }
</style>