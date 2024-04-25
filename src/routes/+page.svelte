<script lang="ts">
    import Card from "$lib/ui/card/Card.svelte";
    import CardBody from "$lib/ui/card/CardBody.svelte";
    import Divider from "$lib/ui/Divider.svelte";
    import Join from "$lib/ui/layout/Join.svelte";
    import CardImage from "$lib/ui/card/CardImage.svelte";
    import CardTitle from "$lib/ui/card/CardTitle.svelte";
    import CardActions from "$lib/ui/card/CardActions.svelte";

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
        <p class="font-bold">Latest Posts</p>
        <Divider></Divider>
        {#await data.posts}
            <div class="grid grid-cols-3 gap-4 self-center">
                <Card class="col-span-3 lg:col-span-1"></Card>
                <Card class="col-span-3 lg:col-span-1"></Card>
                <Card class="col-span-3 lg:col-span-1"></Card>
                <Card class="col-span-3 lg:col-span-1"></Card>
                <Card class="col-span-3 lg:col-span-1"></Card>
                <Card class="col-span-3 lg:col-span-1"></Card>
            </div>
            <Join class="self-center p-8">
                <button class="join-item btn">1</button>
                <button class="join-item btn">2</button>
                <button class="join-item btn btn-disabled">...</button>
                <button class="join-item btn">99</button>
                <button class="join-item btn">100</button>
            </Join>
        {:then postResult}
            <div class="grid grid-cols-3 gap-4 self-center">
                {#each postResult.results as post}
                    <Card class="col-span-3 lg:col-span-1">
                        <CardImage>
                            {#if post.image_preview}
                                <img src="{post.image_preview}" class="h-48" alt="{post.title}">
                            {:else}
                                <div class="skeleton w-full h-32 rounded-b-none"></div>
                            {/if}
                        </CardImage>
                        <CardBody>
                            <CardTitle>{post.title}</CardTitle>
                            <p>{post.content}</p>
                            <CardActions>
                                <button class="btn btn-primary">Read More...</button>
                            </CardActions>
                        </CardBody>
                    </Card>
                {/each}
            </div>
            <Join class="self-center p-8">
                {#each Array(postResult.totalPages) as _, idx}
                    {#if (idx + 1) !== postResult.currentPage}
                        <a href="/?limit={postResult.limit}&page={idx + 1}" class="join-item btn">{idx + 1}</a>
                    {:else}
                        <button class="join-item btn btn-disabled">{idx + 1}</button>
                    {/if}
                {/each}
            </Join>
        {:catch error}
            <p>Error {error}</p>
        {/await}
    </div>
    <Divider class="w-4 self-center my-16"></Divider>
    <Card class="w-72 self-center">
        <CardBody class="items-center">
            <p class="font-light">Advertisement</p>
            <h2 class="card-title">You can place ads!</h2>
            <p class="font-light">400x200</p>
        </CardBody>
    </Card>
</div>
