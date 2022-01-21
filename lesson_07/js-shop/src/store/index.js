import {createStore} from 'vuex'

const API_URL = '/api/v1/';

export default createStore({
  state: {
    showcase: [],
    cart: [],
    searchString: '',
  },
  getters: {
    getCart: state => state.cart.slice(),
    getShowcase: state => state.showcase.filter((product) => new RegExp(state.searchString, 'i').test(product.title)),
    getSearchString: state => state.searchString,
  },
  mutations: {
    setShowcase: (state, payload) => state.showcase = payload,
    addToCart: (state, payload) => state.cart.push(payload),
    removeFromCart: (state, id) =>  {
      state.cart = state.cart.filter((product) => product.id != id)
    },
    setSearchString: (state, payload) => state.searchString = payload,
  },
  actions: {
    loadShowcase({commit}) {
      fetch(`${API_URL}showcase`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          commit('setShowcase', data);
        });
    },

    loadCart({commit}) {
      fetch(`${API_URL}cart`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          data.forEach((product) => commit('addToCart', product))
        });
    },

    addToCart({commit}, product) {
      fetch(`${API_URL}cart`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify(product),
      })
        .then((response) => {
          if (response.status === 201) {
            commit('addToCart', product);
          }
        })
    },

    removeFromCart({commit}, product) {
      fetch(`${API_URL}cart`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify(product),
      })
        .then((response) => {
          if (response.status === 200) {
            commit('removeFromCart', product.id);
          }
        })
    }
  },
})
