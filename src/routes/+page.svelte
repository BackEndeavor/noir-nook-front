<script lang="ts">
    import Card from "$lib/ui/card/Card.svelte";
    import CardBody from "$lib/ui/card/CardBody.svelte";
</script>

<div class="flex flex-col w-full">
    <Card class="self-center my-4"></Card>
    <div class="divider w-4 self-center"></div>
    <Card class="self-center w-96 my-4">
        <CardBody class="items-center">
            <p class="font-light">Advertisement</p>
            <h2 class="card-title">You can place ads!</h2>
            <p class="font-light">400x200</p>
        </CardBody>
    </Card>
    <div class="flex flex-col self-center my-16">
        <p class="font-bold">Latest Post</p>
        <div class="divider"></div>
        <div class="grid grid-cols-3 gap-4 self-center">
            <Card class="col-span-3 lg:col-span-1"></Card>
            <Card class="col-span-3 lg:col-span-1"></Card>
            <Card class="col-span-3 lg:col-span-1"></Card>
            <Card class="col-span-3 lg:col-span-1"></Card>
            <Card class="col-span-3 lg:col-span-1"></Card>
            <Card class="col-span-3 lg:col-span-1"></Card>
        </div>
    </div>
    <div class="join self-center">
        <button class="join-item btn">1</button>
        <button class="join-item btn">2</button>
        <button class="join-item btn btn-disabled">...</button>
        <button class="join-item btn">99</button>
        <button class="join-item btn">100</button>
    </div>
    <div class="divider w-4 self-center my-16"></div>
    <div class="card w-72 self-center bg-base-200 shadow-xl">
        <div class="card-body items-center">
            <p class="font-light">Advertisement</p>
            <h2 class="card-title">You can place ads!</h2>
            <p class="font-light">400x200</p>
        </div>
    </div>
</div>