<script lang="ts">
    import {createEventDispatcher} from "svelte";

    export let id: string;
    export let type: 'radio' | 'btn' = 'radio';
    export let checked: boolean = false;
    export let label: string;
    export let value: string | null = null;
    let radioElement: HTMLInputElement;

    const dispatch = createEventDispatcher();

    function updateRadio() {
        dispatch('update', {
            value: value || label,
            checked: radioElement.checked
        })
    }
</script>
<input type="radio" name={id} class="{type} {$$props.class || ''}" aria-label={label} value={value || label} bind:this={radioElement} on:change={() => updateRadio()} {checked}/>