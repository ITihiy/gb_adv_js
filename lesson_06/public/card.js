Vue.component('card',
  {
    template: `
                <div class="goods-item">
                    <h3>{{ good.title }}</h3>
                    <p>{{ good.price }}$</p>
                    <button v-on:click="onClick">{{ action }}</button>
                </div>
    `,
    props: ['good', 'action'],
    methods: {
      onClick() {
        this.$emit('cardaction', this.good.id);
      }
    }
  }
);