<script>
    import CardImage from "$lib/ui/card/CardImage.svelte";
    import CardBody from "$lib/ui/card/CardBody.svelte";
    import CardTitle from "$lib/ui/card/CardTitle.svelte";
    import CardActions from "$lib/ui/card/CardActions.svelte";
</script>

<div class="card w-80 bg-base-200 border border-base-300 border-solid border- shadow-xl {$$props.class || ''}">
    <slot>
        <CardImage></CardImage>
        <CardBody>
            <CardTitle></CardTitle>
            <div class="skeleton h-4"></div>
            <CardActions></CardActions>
        </CardBody>
    </slot>
</div>