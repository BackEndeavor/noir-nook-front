<script>
    export let vertical = false;
</script>
<div class="join {vertical ? 'join-vertical' : ''} {$$props.class || ''}">
    <slot></slot>
</div>