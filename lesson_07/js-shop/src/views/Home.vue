<template>
    <div class="home">
        <header>
            <button v-on:click="onShowCart" id="cart-button" class="cart-button" type="button">Корзина</button>
            <sort></sort>
        </header>
        <main>
            <showcase></showcase>
            <cart v-if="is_cart_visible" :list="cart" v-on:cartclose="onShowCart"
                  v-on:deletefromcart="onDeleteFromCart"></cart>
        </main>
    </div>
</template>

<script>

  import cart from '../components/Modal'
  import showcase from '../components/Showcase'
  import sort from "../components/Filter";

  export default {
    components: {
      sort,
      cart,
      showcase,
    },
    name: 'Home',
    data() {
      return {
        is_cart_visible: false
      }
    },
    methods: {
      onShowCart() {
        this.is_cart_visible = !this.is_cart_visible;
      },
    },
  }
</script>

<style lang="css">
    .cart-button {
        background-color: #4CAF50; /* Green */
        border: none;
        border-radius: 6px;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 40px;
    }
</style>
