<script lang="ts">
    import Card from "$lib/ui/card/Card.svelte";
    import CardBody from "$lib/ui/card/CardBody.svelte";
    import Divider from "$lib/ui/Divider.svelte";
    import Join from "$lib/ui/layout/Join.svelte";
    import CardImage from "$lib/ui/card/CardImage.svelte";
    import CardTitle from "$lib/ui/card/CardTitle.svelte";
    import CardActions from "$lib/ui/card/CardActions.svelte";
    import Alert from "$lib/ui/feedback/Alert.svelte";
    import Tooltip from "$lib/ui/feedback/Tooltip.svelte";

    export let data;
</script>

<div class="flex flex-col w-full">
    <Card class="self-center my-4"></Card>
    <Divider class="w-4 self-center"></Divider>
    <Card class="self-center w-1/3 my-4">
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
                {#each Array(6) as _}
                    <Card class="col-span-3 lg:col-span-1"></Card>
                {/each}
            </div>
            <Join class="self-center p-8">
                <button class="join-item btn">1</button>
                <button class="join-item btn">2</button>
                <button class="join-item btn btn-disabled">...</button>
                <button class="join-item btn">99</button>
                <button class="join-item btn">100</button>
            </Join>
        {:then postResult}
            {#if postResult}
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
                                <div class="flex items-center gap-1">
                                    <Tooltip data="Read time" class="flex">
                                        <iconify-icon class="neutral" icon="mdi:clock" width="32" height="32"></iconify-icon>
                                    </Tooltip>
                                    <span class="font-medium pr-2 line-clamp-1">{post.relative_time}</span>
                                    <Tooltip data="View count" class="flex">
                                        <iconify-icon class="neutral" icon="mdi:eye" width="32" height="32"></iconify-icon>
                                    </Tooltip>
                                    <span class="font-medium pr-2 line-clamp-1">{post.formatted_views}</span>
                                </div>
                                <p>{post.content}</p>
                                <CardActions>
                                    <a class="btn btn-primary my-4" href="/post/{post.id}">Read More...</a>
                                </CardActions>
                                <div class="flex items-center gap-1 justify-end">
                                    <iconify-icon class="neutral" icon="material-symbols:comment" width="32" height="32"></iconify-icon>
                                    <span class="pr-2">0</span>
                                    <iconify-icon class="neutral" icon="material-symbols:star" width="32" height="32"></iconify-icon>
                                    <span class="pr-2">5.0</span>
                                </div>
                            </CardBody>
                        </Card>
                    {:else}
                        <Alert type="alert-info" class="col-span-3">
                            <iconify-icon icon="material-symbols:search-off" width="32" height="32"></iconify-icon>
                            <span>Nothing found</span>
                        </Alert>
                    {/each}
                </div>
                <Join class="self-center m-8">
                    {#each Array(postResult.totalPages) as _, idx}
                        {#if (idx + 1) !== postResult.currentPage}
                            <a href="/?limit={postResult.limit}&page={idx + 1}" class="join-item btn">{idx + 1}</a>
                        {:else}
                            <button class="join-item btn btn-disabled">{idx + 1}</button>
                        {/if}
                    {/each}
                </Join>
            {:else}
                <Alert type="alert-error">
                    <iconify-icon icon="material-symbols:error" width="32" height="32"></iconify-icon>
                    <div>
                        <h3 class="font-bold">Cannot load posts!</h3>
                        <div class="text-xs">Undefined error, maybe server is down :(</div>
                    </div>
                </Alert>
            {/if}
        {:catch error}
            <p>Error {error}</p>
            <Alert type="alert-error">
                <iconify-icon icon="material-symbols:error" width="32" height="32"></iconify-icon>
                <div>
                    <h3 class="font-bold">Cannot load posts!</h3>
                    <div class="text-xs">Error found: {error}</div>
                </div>
            </Alert>
        {/await}
    </div>
    <Divider class="w-4 self-center my-16"></Divider>
    <Card class="w-1/3 self-center">
        <CardBody class="items-center">
            <p class="font-light">Advertisement</p>
            <h2 class="card-title">You can place ads!</h2>
            <p class="font-light">400x200</p>
        </CardBody>
    </Card>
</div>
