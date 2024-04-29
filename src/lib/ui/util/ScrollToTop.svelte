<script lang="ts">
    export let scrollHeightTrigger = 10;
    let button: HTMLButtonElement;

    function scrollToTop() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    function handleScroll() {
        const shown = document.body.scrollTop > scrollHeightTrigger || document.documentElement.scrollTop > scrollHeightTrigger;
        button.style.opacity = shown ? '1' : '0';
    }
</script>

<svelte:window on:scroll={handleScroll}/>

<div class="fixed right-0 bottom-0 m-8">
    <button class="btn btn-accent btn-circle transition duration-300 {$$props.class || ''}" on:click={() => scrollToTop()} bind:this={button}>
        <iconify-icon class="neutral" icon="mdi:arrow-top-bold" width="32" height="32"></iconify-icon>
    </button>
</div>