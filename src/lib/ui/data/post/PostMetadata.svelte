<script>
    import Avatar from "$lib/ui/data/Avatar.svelte";
</script>

<div class="flex flex-row items-center gap-4 mt-4">
    <slot>
        <Avatar></Avatar>
        <p class="text-base-content/75">Tracey Wilson</p>
        <p class="text-sm text-base-content/75">August 20, 2022</p>
    </slot>
</div>