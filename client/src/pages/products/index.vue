<script setup lang="ts">
    import { ref, computed } from 'vue'
    import { type Product, getProducts } from '@/model/products'

    const products = ref([] as Product[])

    products.value = getProducts()

    type CartItem = {
        product: Product,
        quantity: number
    }
    const cart = ref([] as CartItem[])

    function addToCart(product: Product){
        const itemPredicate = (item: CartItem) => item.product.id === product.id
        const item = cart.value.find(item => item.product.id === product.id)
        if (item){
            item.quantity++
        }
        else{
            cart.value.push({ product, quantity: 1 })
        }
    }

    const total = computed( () => cart.value.reduce((total, item) => total + item.product.price * item.quantity, 0) )
</script>

<template>
    <div class="product-list">
        <div class="card" v-for="product in products" :key="product.id">
            <div class="card-image">
                <img :src="product.thumbnail" :alt="product.title"/>
            </div>

            <div class="card-content">
                <p class="price"> ${{ product.price }}</p>
                <h3> {{ product.title }}</h3>
                <i> {{ product.brand }}</i>
                <p> {{ product.description }}</p>
                <button @click="addToCart(product)" class="button is-primary"> Add to Cart</button>
            </div>
        </div> 
    </div>

    <div class="flyout">
        <h1 class="title">
            The Cart
        </h1>
        <u1 class="cart">
            <li v-for="item in cart" :key="item.product.id">
                <img :src="item.product.thumbnail" :alt="item.product.title" />
                {{ item.product.title }} x {{ item.quantity }} = ${{ item.product.price }}
            </li>
        </u1>
        <!-- {{ cart.length }} items totaling ${{ cart.reduce((total, item) => total + item.product.price * item.quantity, 0) }} -->
        {{ cart.length }} items totaling ${{ total }}
    </div>
</template>

<style scoped>
    .product-list{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .card{
        flex-basis: 15rem;
        margin: 0.5rem;
        flex-grow: 1;
    }

    h3{
        font-weight: bold;
    }

    .price{
        font-weight: bold;
        font-size: xx-large;
        color: hotpink;
        float: right;
    }

    .flyout{
        position: fixed;
        top: 0;
        right: 0;
        width: 20rem;
        height: 100%;
        background-color: white;
        border: 1px solid hotpink;
        z-index: 100;
        box-shadow: -1px 0 5px 0 rgba(0,0,0,.5);
        transform: translateX(80%);
        transition: transform 1s;
        padding: 1rem;
    }

    .flyout.open, .flyout:hover{
        transform: translateX(0);
    }

    .cart li {
        display: flex;
        align-items: center;
        margin: 1rem 0;
    }

    .cart img {
        width: 3rem;
        height: 3rem;
        margin-right: 1rem;
    }

</style>