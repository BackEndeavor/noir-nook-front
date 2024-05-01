<script>
    import Avatar from "$lib/ui/data/Avatar.svelte";
</script>

<div class="flex flex-row items-center gap-4 mt-4">
    <slot>
        <Avatar></Avatar>
        <p class="skeleton w-32 h-4"></p>
        <p class="skeleton w-16 h-4"></p>
    </slot>
</div>