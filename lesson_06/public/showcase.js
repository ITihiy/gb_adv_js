Vue.component('showcase',
  {
    template: `
    <div class="goods-list">
        <card v-for="item of list" :good="item" v-bind:action="'Купить'" v-bind:key="item.id" v-on:cardaction="onAdd"></card>
    </div>
    `,
    props: ['list'],
    methods: {
      onAdd(id) {
        this.$emit('addtocart', id);
      }
    }
  }
);