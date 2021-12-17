function getCounter() {
  let last = 0;

  return () => ++last;
}

const stackIDGenrator = getCounter();


class Good {
  constructor({id, title, price}) {
    this.id = id;
    this.title = title;
    this.price = price;
  }

  getId() {
    return this.id;
  }

  getPrice() {
    return this.price;
  }

  getTitle() {
    return this.title;
  }
}

class GoodStack {
  constructor(good) {
    this.id = stackIDGenrator();
    this.good = good;
    this.count = 1;
  }

  getGoodId() {
    return this.good.id
  }

  getGood(){
    return this.good;
  }

  getCount() {
    return this.count;
  }

  add() {
    this.count++;
    return this.count;
  }

  remove() {
    this.count--;
    return this.count;
  }
}

class Cart {
  constructor(){
    this.list = []
  }

  add(good) {
    const idx = this.list.findIndex((stack) => stack.getGoodId() === good.id);

    if(idx >= 0) {
      this.list[idx].add()
    } else {
      this.list.push(new GoodStack(good))
    }

  }

  remove(id) {
    const idx = this.list.findIndex((stack) => stack.getGoodId() === id);

    if(idx >= 0) {
      this.list[idx].remove();

      if(this.list[idx].getCount() <= 0) {
        this.list.splice(idx, 1)
      }
    } 

  }
}

class Showcase {
  constructor(cart){
    this.list = [];
    this.cart = cart;
  }

  fetchGoods() {
    this.list = [
      new Good({id: 1, title: 'Футболка', price: 140}),
      new Good({id: 2, title: 'Брюки', price: 320}),
      new Good({id: 3, title: 'Галстук', price: 24})
    ]
  }

  addToCart(id) {
    const idx = this.list.findIndex((good) => id === good.id);

    if(idx >= 0) {
      this.cart.add(this.list[idx])
    }
  }
}

class GoodRender {
  constructor(good) {
    this.good = good;
  }

  render() {
    return `<div class="goods-item"><h3>${this.good.title}</h3><p>${this.good.price}</p></div>`;
  }

}

class ShowCaseRenderer {
  constructor(showCase, list_class = ".goods-list") {
    this.showCase = showCase;
    this.list_class = list_class;
  }

  render() {
    const goodList = document.querySelector(this.list_class);
    let itemsList = this.showCase.list.map(
        (item) => {

          return new GoodRender(item).render();
        }).join('');

    goodList.insertAdjacentHTML('beforeend', itemsList);
  }
}


const cart = new Cart();
const showcase = new Showcase(cart);

showcase.fetchGoods();

showcase.addToCart(1);
showcase.addToCart(1);
showcase.addToCart(1);
showcase.addToCart(3);
cart.remove(1);

const showCaseRenderer = new ShowCaseRenderer(showcase);
showCaseRenderer.render();


console.log(showcase, cart);