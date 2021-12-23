class CartRenderer {
    constructor(containerSelector = 'cart-window') {
        this.cartContainer = document.getElementById("cart-window");
        this.cartCloseButton = this.cartContainer.querySelector('.cart-close-btn');
        this.listContainer = this.cartContainer.querySelector('.cart-content');
        this.cartCloseButton.addEventListener('click', this.close.bind(this));
    }

    open() {
        this.cartContainer.style.display = 'block';
    }

    close() {
        console.log('closing');
        this.cartContainer.style.display = 'none';
    }

    render(list) {
        this.listContainer.textContent = '';
        let stacksList = list.map((item) => {
            return `<div><h3>${item.getGood().getTitle()} x${item.getCount()}</h3><p>${item.getGood().getPrice() * item.getCount()}</p></div>`
        }).join('');
        this.listContainer.insertAdjacentHTML('afterbegin', stacksList);
    }
}


function getCounter() {
    let last = 0;

    return () => ++last;
}

const stackIDGenerator = getCounter();


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
        this.id = stackIDGenerator();
        this.good = good;
        this.count = 1;
    }

    getGoodId() {
        return this.good.id
    }

    getGood() {
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
    constructor() {
        this.list = [];
        this.renderer = new CartRenderer();
    }

    open() {
        this.renderer.render(this.list);
        this.renderer.open();
    }

    close() {
        this.renderer.close();
    }

    add(good) {
        const idx = this.list.findIndex((stack) => stack.getGoodId() === good.id);

        if (idx >= 0) {
            this.list[idx].add();
        } else {
            this.list.push(new GoodStack(good));
        }
        this.renderer.render(this.list);
    }

    remove(id) {
        const idx = this.list.findIndex((stack) => stack.getGoodId() === id);

        if (idx >= 0) {
            this.list[idx].remove();

            if (this.list[idx].getCount() <= 0) {
                this.list.splice(idx, 1)
            }
        }
        this.renderer.render(this.list);
    }
}

class Showcase {
    constructor(cart) {
        this.list = [];
        this.cart = cart;

        this.renderer = new ShowCaseRenderer()
    }

    fetchGoods() {
        this.list = [
            new Good({id: 1, title: 'Футболка', price: 140}),
            new Good({id: 2, title: 'Брюки', price: 320}),
            new Good({id: 3, title: 'Галстук', price: 24})
        ];
        this.renderer.render(this.list)
    }

    addToCart(id) {
        const idx = this.list.findIndex((good) => id === good.id);

        if (idx >= 0) {
            this.cart.add(this.list[idx])
        }
    }
}

class GoodRender {
    constructor(good) {
        this.good = good;
    }

    render() {
        return `<div class="goods-item"><h3>${this.good.getTitle()}</h3><p>${this.good.getPrice()}</p></div>`;
    }

}

class ShowCaseRenderer {
    constructor(list_class = ".goods-list") {
        this.list_class = list_class;
    }

    render(items) {
        const goodList = document.querySelector(this.list_class);
        let itemsList = items.map(
            (item) => {
                return new GoodRender(item).render();
            }).join('');

        goodList.insertAdjacentHTML('beforeend', itemsList);
    }
}


const cart = new Cart();
const showcase = new Showcase(cart);
const cartButton = document.querySelector('.cart-button');

cartButton.addEventListener('click', cart.open.bind(cart));

showcase.fetchGoods();

showcase.addToCart(1);
showcase.addToCart(1);
showcase.addToCart(1);
showcase.addToCart(3);
cart.remove(1);


console.log(showcase, cart);