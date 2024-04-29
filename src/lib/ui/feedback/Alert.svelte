<script lang="ts">
    export let type: 'alert-info' | 'alert-success' | 'alert-warning' | 'alert-error' | undefined;
</script>

<div role="alert" class="alert {type || ''} {$$props.class || ''}">
    <slot></slot>
    <div>
        <slot name="actions">
        </slot>
    </div>
</div>