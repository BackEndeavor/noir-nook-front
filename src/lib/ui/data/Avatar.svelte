<script>
    export let size = 12;
</script>

<div class="avatar">
    <div class="w-{size} rounded-full">
        <slot>
            <div class="skeleton w-{size} h-{size}"></div>
        </slot>
    </div>
</div>