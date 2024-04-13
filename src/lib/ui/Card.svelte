<script>
    export let loading = true;
    export let content = {
        image: '',
        title: '',
        subTitle: '',
        mainTag: '',
        tags: []
    };
</script>

<div class="card w-80 bg-base-200 border border-base-300 border-solid shadow-xl {$$props.class || ''}">
    {#if loading}
        <figure>
            <div class="skeleton w-full h-32 rounded-b-none"></div>
        </figure>
        <div class="card-body">
            <h2 class="card-title">
                <div class="skeleton w-24 h-5"></div>
                <div class="skeleton w-16 h-6"></div>
            </h2>
            <div class="skeleton h-4"></div>
            <div class="card-actions justify-end">
                <div class="skeleton w-16 h-5"></div>
                <div class="skeleton w-16 h-5"></div>
            </div>
        </div>
    {:else}
        <figure>
            <!-- Optionally add an <img> or other content element here -->
            <img src="{content.image}" alt="{content.subTitle}" class="h-48 w-full"/>
        </figure>
        <div class="card-body">
            <h2 class="card-title">
                <div class="text-start m-0 p-0 box-border">
                    {content.title}
                </div>
                {#if content.mainTag}
                    <div class="badge badge-secondary line-clamp-1">{content.mainTag}</div>
                {/if}
            </h2>
            <p>{content.subTitle}</p>
            <div class="card-actions justify-end">
                {#each content.tags as tag}
                    <div class="badge badge-outline">{tag}</div>
                {/each}
            </div>
        </div>
    {/if}
</div>