<template>
    <div class="home">
        <header>
            <button v-on:click="onShowCart" id="cart-button" class="cart-button" type="button">Корзина</button>
        </header>
        <main>
            <showcase :list="showcase" v-on:addtocart="onAddToCart"></showcase>
            <cart v-if="is_cart_visible" :list="cart" v-on:cartclose="onShowCart"
                  v-on:deletefromcart="onDeleteFromCart"></cart>
        </main>
    </div>
</template>

<script>
  const API_URL = '/api/v1/';

  import cart from '../components/Cart'
  import showcase from '../components/Showcase'

  export default {
    components: {
      cart,
      showcase,
    },
    name: 'Home',
    data() {
      return {
        showcase: [],
        cart: [],
        is_cart_visible: false
      }
    },
    methods: {
      onShowCart() {
        this.is_cart_visible = !this.is_cart_visible;
      },

      onAddToCart(id) {
        const product = this.showcase.find((good) => good.id === id);
        fetch(`${API_URL}cart`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json;charset=utf-8'},
          body: JSON.stringify(product),
        })
          .then((response) => {
            if (response.status === 201) {
              this.cart.push(product);
            }
          })
      },

      onDeleteFromCart(id) {
        const product_id = this.cart.findIndex((good) => good.id === id);
        fetch(`${API_URL}cart`, {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json;charset=utf-8'},
          body: JSON.stringify(this.cart[product_id]),
        })
          .then((response) => {
            if (response.status === 200) {
              this.cart.splice(product_id, 1);
            }
          })
      }
    },

    mounted() {
      fetch(`${API_URL}showcase`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.showcase = data
        });
      fetch(`${API_URL}cart`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.cart = data
        });
    }
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
