<script lang="ts">
    import Card from "$lib/ui/card/Card.svelte";
    import CardBody from "$lib/ui/card/CardBody.svelte";
    import Divider from "$lib/ui/Divider.svelte";
    import Join from "$lib/ui/layout/Join.svelte";
    import CardImage from "$lib/ui/card/CardImage.svelte";
    import CardTitle from "$lib/ui/card/CardTitle.svelte";

    export let data;
</script>

<div class="flex flex-col w-full">
    <Card class="self-center my-4"></Card>
    <Divider class="w-4 self-center"></Divider>
    <Card class="self-center w-96 my-4">
        <CardBody class="items-center">
            <p class="font-light">Advertisement</p>
            <h2 class="card-title">You can place ads!</h2>
            <p class="font-light">400x200</p>
        </CardBody>
    </Card>
    <div class="flex flex-col self-center my-16">
        <p class="font-bold">Latest Post</p>
        <Divider></Divider>
        <div class="grid grid-cols-3 gap-4 self-center">
            {#await data.products}
                <Card class="col-span-3 lg:col-span-1"></Card>
                <Card class="col-span-3 lg:col-span-1"></Card>
                <Card class="col-span-3 lg:col-span-1"></Card>
                <Card class="col-span-3 lg:col-span-1"></Card>
                <Card class="col-span-3 lg:col-span-1"></Card>
                <Card class="col-span-3 lg:col-span-1"></Card>
            {:then products}
                {#each products as product}
                    <Card class="col-span-3 lg:col-span-1">
                        <CardImage>
                            <img src="{product.thumbnail}" alt="{product.description}">
                        </CardImage>
                        <CardBody>
                            <CardTitle>{product.title}</CardTitle>
                            <p>{product.description}</p>
                        </CardBody>
                    </Card>
                {/each}
            {:catch error}
                <p>Error {error}</p>
            {/await}
        </div>
    </div>
    <Join class="self-center">
        <button class="join-item btn">1</button>
        <button class="join-item btn">2</button>
        <button class="join-item btn btn-disabled">...</button>
        <button class="join-item btn">99</button>
        <button class="join-item btn">100</button>
    </Join>
    <Divider class="w-4 self-center my-16"></Divider>
    <Card class="w-72 self-center">
        <CardBody class="items-center">
            <p class="font-light">Advertisement</p>
            <h2 class="card-title">You can place ads!</h2>
            <p class="font-light">400x200</p>
        </CardBody>
    </Card>
</div>