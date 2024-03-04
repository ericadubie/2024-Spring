<script setup lang="ts">
    import { ref } from 'vue'
    import {type Product, getProducts } from '@/model/products'

    const products = ref([] as Product[])

    products.value = getProducts()


</script>

<template>
    <!-- <div class="hero is-primary">
        <div class="hero-body">
            <h1>Products</h1>
        </div>

    </div> -->

    <div class="product-list">
        <div class="card" v-for="product in products" :key="product.id">
            <div class="card-image">
                <!-- <figure class="image is-4by3">
                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
                </figure>
            </div>
            <div class="card-content">
                <div class="media">
                <div class="media-left">
                    <figure class="image is-48x48">
                    <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                    </figure>
                </div>
                <div class="media-content">
                    <p class="title is-4">John Smith</p>
                    <p class="subtitle is-6">@johnsmith</p>
                </div>
                </div>

                <div class="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                <a href="#">#css</a> <a href="#">#responsive</a>
                <br>
                <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                </div>
            </div> -->

            <img :src="product.thumbnail" :alt="product.title"/>
            </div>

            <div class="card-content">
                <p class="price"> ${{ product.price }}</p>
                <h3> {{ product.title }}</h3>
                <p> {{ product.description }}</p>
            </div>
        </div> 
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

</style>