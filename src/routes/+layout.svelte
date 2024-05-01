<script lang="ts">
    import '../app.css';
    import 'iconify-icon';
    import Logo from "$lib/icon/Logo.svelte";
    import ThemeButton from "$lib/ui/util/ThemeButton.svelte";
    import {SignIn} from "@auth/sveltekit/components";
    import type {PageData} from './$types';
    import {Toaster} from "svelte-daisyui-toast";
    import ScrollToTop from "$lib/ui/util/ScrollToTop.svelte";
    import {signOut} from "@auth/sveltekit/client";

    let searchInput = '';

    function search(): void {
        console.log(`Searching "${searchInput}"...`)
    }

    export let data: PageData;

</script>

<ScrollToTop/>
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
                    <button tabindex="0" class="dropdown-content overflow-hidden z-[1] menu p-2  border border-neutral bg-base-200 rounded-box w-48">
                        <li>
                            <button>{data?.session?.user?.name}</button>
                        </li>
                        <li>
                            <button on:click={signOut}>
                                Sign out
                            </button>
                        </li>
                    </button>
                </div>
            {/if}
        </div>
    </div>
</div>
<slot/>
<Toaster/>
<footer class="footer p-10 bg-base-300 text-base-content mt-16">
    <aside>
        <a class="btn btn-ghost p-0" href="/">
            <Logo/>
        </a>
        <p class="font-normal">Noir Nook<br>Technology blog</p>
    </aside>
    <nav>
        <h6 class="footer-title">Social</h6>
        <div class="grid grid-flow-col gap-4 bg-accent rounded-box p-4">
            <iconify-icon class="neutral" icon="pajamas:twitter" width="24" height="24"></iconify-icon>
            <iconify-icon class="neutral" icon="mdi:youtube" width="24" height="24"></iconify-icon>
            <iconify-icon class="neutral" icon="ic:baseline-telegram" width="24" height="24"></iconify-icon>
        </div>
    </nav>
</footer>