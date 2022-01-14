<template>
    <div id="cart-window" class="cart-window">
        <span class="cart-close-btn" v-on:click="onClick">&times;</span>
        <div class="cart-content">
            <card v-for="item of list" :good="item" :key="item.id" v-bind:action="'Удалить'"
                  v-on:cardaction="onDelete"></card>
        </div>
    </div>
</template>

<script>
  import card from './Card'

  export default {
    components: {
      card,
    },
    name: 'cart',
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
</script>

<style lang="css" scoped>
    .cart-window {
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgb(0, 0, 0);
        background-color: rgba(0, 0, 0, 0.4);
    }

    /* Modal Content/Box */
    .cart-content {
        background-color: #fefefe;
        margin: 15% auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
    }

    .cart-close-btn {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }

    .cart-close-btn:hover,
    .cart-close-btn:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
    }
</style>