<template>
    <div class="home">
        <header>
            <h1>Cart</h1>
        </header>
        <main>
            <cart></cart>
        </main>
    </div>
</template>

<script>

  import cart from '../components/Cart'

  export default {
    components: {
      cart,
    },
    name: 'CartPage',
  }
</script>

<style lang="css">

</style>
