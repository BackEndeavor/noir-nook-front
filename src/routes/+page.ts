import type {PageLoad} from './$types';

export type Product = {
    title: string,
    description: string,
    brand: string,
    thumbnail: string
}

export const load = ( async ({ fetch }) => {
    const response = fetch('https://dummyjson.com/products')

    const products = response.then(data => data.json()).then(data => data.products as Product[])
    return {
        products
    }
}) satisfies PageLoad;