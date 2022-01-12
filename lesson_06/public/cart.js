Vue.component('cart',
  {
    template: `
    <div id="cart-window" class="cart-window">
        <span class="cart-close-btn" v-on:click="onClick">&times;</span>
        <div class="cart-content">
            <card v-for="item of list" :good="item" :key="item.id" v-bind:action="'Удалить'" v-on:cardaction="onDelete"></card>
        </div>
    </div>
    `,
    props: ['list'],
    methods: {
      onClick() {
        this.$emit('cartclose');
      },
      onDelete(id) {
        this.$emit('deletefromcart', id);
      }
    }
  }
);