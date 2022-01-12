const API_URL = 'http://localhost:8011/api/v1/';


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

    getGood() {
        return this.good;
    }

    getCount() {
        return this.count;
    }

    getPrice() {
        return this.good.price * this.count
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
        this.renderer.setRemoveFromCartCartListener(this.remove.bind(this))
    }

    fetchGoods() {
        fetch(`${API_URL}cart`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                data.map((item) => this.add(new Good(item)));
            })
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
        console.log(idx);
        if (idx >= 0) {
            fetch(`${API_URL}cart`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json;charset=utf-8'},
                body: JSON.stringify(this.list[idx].getGood()),
            })
                .then((response) => {
                    if (response.status === 200) {
                        this.list[idx].remove();

                        if (this.list[idx].getCount() <= 0) {
                            this.list.splice(idx, 1)
                        }
                    }
                })
        }
        this.renderer.render(this.list);
    }
}

class Showcase {
    constructor(cart) {
        this.list = [];
        this.cart = cart;
        this.renderer = new ShowCaseRenderer();
        this.renderer.setAddToCartListener(this.addToCart.bind(this));
    }

    _onSuccess(response) {
        response.forEach(product => {
            this.list.push(
                new Good({id: product.id, title: product.title, price: product.price})
            )
        });
        this.renderer.render(this.list);
    }

    _onError(err) {
        console.log(err);
    }

    fetchGoods() {
        return fetch(`${API_URL}showcase`)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                this._onSuccess(response);
                return response;
            }).catch((error) => {
                this._onError(error);
            })
    }

    addToCart(id) {
        const idx = this.list.findIndex((good) => id == good.id);
        if (idx >= 0) {
            fetch(`${API_URL}cart`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json;charset=utf-8'},
                body: JSON.stringify(this.list[idx]),
            })
                .then((response) => {
                    if (response.status === 201) {
                        this.cart.add(this.list[idx]);
                    }
                })
        }
    }
}

class GoodRenderer {
    constructor(good) {
        this.good = good;
    }

    render() {
        return `<div class="goods-item">
                    <h3>${this.good.getTitle()}</h3>
                    <p>${this.good.getPrice()}</p>
                    <button data-id="${this.good.id}">Buy</button>
                </div>`;
    }

}

class ShowCaseRenderer {
    constructor(list_class = ".goods-list") {
        this.goodList = document.querySelector(list_class);
    }

    setAddToCartListener(callback) {
        this.goodList.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                const good_id = event.target.dataset.id;
                callback(good_id);
            }
        })
    }

    render(items) {
        let itemsList = items.map(
            (item) => {
                return new GoodRenderer(item).render();
            }).join('');

        this.goodList.insertAdjacentHTML('beforeend', itemsList);
    }
}

class CartRenderer {
    constructor(containerSelector = 'cart-window') {
        this.cartContainer = document.getElementById("cart-window");
        this.cartCloseButton = this.cartContainer.querySelector('.cart-close-btn');
        this.listContainer = this.cartContainer.querySelector('.cart-content');
        this.cartCloseButton.addEventListener('click', this.close.bind(this));
    }

    setRemoveFromCartCartListener(callback) {
        this.listContainer.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                const good_id = event.target.dataset.id;
                callback(good_id);
            }
        })
    }

    open() {
        this.cartContainer.style.display = 'block';
    }

    close() {
        this.cartContainer.style.display = 'none';
    }

    render(list) {
        this.listContainer.textContent = '';
        let stacksList = list.map((item) => {
            return `<div>
                        <h3>${item.getGood().getTitle()} x${item.getCount()}</h3>
                        <p>${item.getGood().getPrice() * item.getCount()}</p>
                        <button data-id="${item.id}">Delete</button>
                    </div>`
        }).join('');
        this.listContainer.insertAdjacentHTML('afterbegin', stacksList);
    }
}


const cart = new Cart();
const showcase = new Showcase(cart);
const cartButton = document.querySelector('.cart-button');
cartButton.addEventListener('click', cart.open.bind(cart));
showcase.fetchGoods();
cart.fetchGoods();
