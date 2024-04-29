<script lang="ts">
    export let data: string;
</script>

<div class="tooltip {$$props.class || ''}" data-tip={data}>
    <slot></slot>
</div>