<script>
    export let size = 12;
</script>

<div class="avatar">
    <div class="w-{size} rounded-full">
        <slot>
            <div class="skeleton w-12 h-12"></div>
        </slot>
    </div>
</div>