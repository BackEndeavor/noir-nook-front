<script>
    import Sun from "$lib/icon/Sun.svelte";
    import Moon from "$lib/icon/Moon.svelte";
</script>

<label class="swap swap-rotate btn btn-ghost {$$props.class || ''}">
    <!-- this hidden checkbox controls the state -->
    <input type="checkbox" class="theme-controller" value="light"/>

    <div class="swap-off fill-current w-10 h-10">
        <Sun/>
    </div>
    <div class="swap-on fill-current w-10 h-10">
        <Moon/>
    </div>

</label>