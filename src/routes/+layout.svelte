<script lang="ts">
    import '../app.css';
    import 'iconify-icon';
    import Logo from "$lib/icon/Logo.svelte";
    import ThemeButton from "$lib/ui/theme/ThemeButton.svelte";
    import {SignIn, SignOut} from "@auth/sveltekit/components";
    import type {PageData} from './$types';

    let searchInput = '';

    function search(): void {
        console.log(`Searching "${searchInput}"...`)
    }

    export let data: PageData;
</script>

<div class="navbar bg-base-300">
    <div class="flex-1">
        <a href="/" class="flex flex-row items-center btn btn-ghost">
            <Logo/>
            <p class="text-xl">NoirNook</p>
        </a>
    </div>
    <div class="flex-none gap-2">
        <!-- TODO: Make functional search bar -->
        <form class="form-control" on:submit|preventDefault={() => search()}>
            <input bind:value={searchInput} type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto"/>
        </form>
        <ThemeButton/>
        <div class="flex">
            {#if data.session === null}
                <SignIn signInPage="signin" className="bg-base-100 rounded-lg">
                    <button class="btn btn-ghost" slot="submitButton">
                        Sign in
                    </button>
                </SignIn>
            {:else}
                <div class="dropdown dropdown-bottom dropdown-end">
                    <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar self-center">
                        <div class="w-10 rounded-full">
                            <img alt={data?.session?.user?.name} src={data?.session?.user?.image}/>
                        </div>
                    </div>
                    <ul tabindex="0" class="dropdown-content z-[1] menu p-2  border border-neutral bg-base-200 rounded-box w-48">
                        <li><a>Profile</a></li>
                        <li>
                            <SignOut signOutPage="signout"></SignOut>
                        </li>
                    </ul>
                </div>
            {/if}
        </div>
    </div>
</div>
<slot/>
<footer class="footer p-10 bg-base-300 text-base-content mt-16">
    <aside>
        <a class="btn btn-ghost p-0" href="/">
            <Logo/>
        </a>
        <p class="font-normal">Noir Nook<br>Technology blog</p>
    </aside>
    <nav>
        <h6 class="footer-title">Social</h6>
        <div class="grid grid-flow-col gap-4">
            <iconify-icon icon="pajamas:twitter" width="24" height="24"></iconify-icon>
            <iconify-icon icon="mdi:youtube" width="24" height="24"></iconify-icon>
            <iconify-icon icon="ic:baseline-telegram" width="24" height="24"></iconify-icon>
        </div>
    </nav>
</footer>
