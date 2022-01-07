const API_URL = 'http://localhost:8011/api/v1/';

new Vue({
  el: '#app',
  data: {
    showcase: [],
    cart: [],
    is_cart_visible: false,
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
});