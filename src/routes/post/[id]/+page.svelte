<script lang="ts">
    import PostMetadata from "$lib/ui/data/post/PostMetadata.svelte";
    import Post from "$lib/ui/data/post/Post.svelte";
    import PostTitle from "$lib/ui/data/post/PostTitle.svelte";
    import PostImage from "$lib/ui/data/post/PostImage.svelte";
    import Divider from "$lib/ui/Divider.svelte";
    import PostBody from "$lib/ui/data/post/PostBody.svelte";
    import PostHeader from "$lib/ui/data/post/PostHeader.svelte";
    import Tooltip from "$lib/ui/feedback/Tooltip.svelte";
    import {toast} from "svelte-daisyui-toast";
    import Join from "$lib/ui/layout/Join.svelte";
    import Radio from "$lib/ui/input/Radio.svelte";
    import Avatar from "$lib/ui/data/Avatar.svelte";
    import {deletePost, summaryPost} from "../../../backend";
    import {goto} from "$app/navigation";

    export let data;

    let reportModal: HTMLDialogElement;
    let selectedReportType: string;
    let reportDetails: string;

    let deleteConfirmationModal: HTMLDialogElement;

    let summaryModal: HTMLDialogElement;
    let postSummary: string;

    function sharePostLink() {
        navigator.clipboard.writeText(document.URL);
        toast.addInfo('Post link copied!', {newToast: {duration_ms: 2500}});
    }

    function reportPost() {
        if (!selectedReportType) {
            return;
        }
        let report = selectedReportType;
        if (report === 'Something else') {
            report = reportDetails;

        }
        if (!report) {
            return;
        }
        // TODO: Send the report

    }

    function updateReportSelection(event: CustomEvent) {
        selectedReportType = event.detail.value

    }

    async function showSummary() {
        summaryModal.showModal()
        const summary = await summaryPost(data.session.access_token, parseInt(data.postId))
        if (!summary.ok) {
            console.log(postSummary)
            postSummary = summary.errorMessage || "Unknown error"
            return
        }
        postSummary = summary.summary
        console.log(postSummary)
    }
</script>

<Post>
    <PostHeader>
        <div class="justify-self-start">
            <Tooltip data="Summarize the content">
                <button class="btn btn-accent" on:click={() => showSummary()}>
                    <iconify-icon icon="ph:magic-wand-fill" width="32" height="32"></iconify-icon>
                </button>
            </Tooltip>
            <Tooltip data="Share the post">
                <button class="btn btn-accent" on:click={() => sharePostLink()}>
                    <iconify-icon icon="material-symbols:share" width="32" height="32"></iconify-icon>
                </button>
            </Tooltip>
        </div>
        <div class="justify-self-end">
            <Tooltip data="Report inappropriate content">
                <button class="btn btn-error" on:click={() => reportModal.showModal()}>
                    <iconify-icon icon="material-symbols:report" width="32" height="32"></iconify-icon>
                </button>
            </Tooltip>
            {#if data.session.user_id === data?.post?.author?.id}
                <Tooltip data="Delete the post">
                    <button class="btn btn-error" on:click={() => deleteConfirmationModal.showModal()}>
                        <iconify-icon icon="material-symbols:delete" width="32" height="32"></iconify-icon>
                    </button>
                </Tooltip>
                <Tooltip data="Edit the post">
                    <a class="btn btn-accent" href={`/post/edit/${data.postId}`}>
                        <iconify-icon icon="material-symbols:edit-note" width="32" height="32"></iconify-icon>
                    </a>
                </Tooltip>
            {/if}
        </div>
    </PostHeader>
    <Divider></Divider>
    <PostBody>
        {#if data.post && data.post.ok}
            <PostTitle>{data.post.title}</PostTitle>
            <PostMetadata>
                <Avatar>
                    <img src={data.post.author.avatar_url} alt={data.post.author.username}/>
                </Avatar>
                <p class="text-base-content/75">{data.post.author.username || (`${data.post.author.first_name} ${data.post.author.last_name}`)}</p>
                <p class="text-sm text-base-content/75">August 20, 2022</p>
            </PostMetadata>
            <PostImage>
                <img src={data.post.image_preview} alt=""/>
            </PostImage>
            {data.post.content}
        {:else if !(data?.post?.ok)}
            {data?.post?.errorMessage}
        {:else}
            <PostTitle></PostTitle>
            <PostMetadata>
            </PostMetadata>
            <PostImage></PostImage>
            <div class="skeleton w-full h-4 my-2"></div>
            <div class="skeleton w-1/3 h-4"></div>
        {/if}
    </PostBody>
</Post>

<dialog class="modal" bind:this={deleteConfirmationModal}>
    <div class="modal-box">
        <h3 class="font-bold text-lg">Confirmation!</h3>
        <p class="py-4">Are you sure that you want to delete that post?</p>
        <div class="modal-action">
            <form method="dialog">
                <button class="btn btn-primary">No</button>
            </form>
            <button class="btn" on:click={() => {
                deletePost(data.session.access_token, parseInt(data.postId));
                goto('/')
            }}>Yes
            </button>
        </div>
    </div>
</dialog>

<dialog class="modal" bind:this={reportModal}>
    <div class="modal-box">
        <h3 class="font-bold text-lg">Please select the problem</h3>
        <Divider></Divider>
        <div class="flex p-8 gap-2">
            <Join vertical={true}>
                <Radio id="report-radio" type="btn" class="join-item" on:update={(event) => updateReportSelection(event)} label="Spam"></Radio>
                <Radio id="report-radio" type="btn" class="join-item" on:update={(event) => updateReportSelection(event)} label="Stolen content"></Radio>
                <Radio id="report-radio" type="btn" class="join-item" on:update={(event) => updateReportSelection(event)} label="Offensive content"></Radio>
                <Radio id="report-radio" type="btn" class="join-item" on:update={(event) => updateReportSelection(event)} label="Something else"></Radio>
            </Join>
            <textarea class="textarea textarea-bordered" disabled={selectedReportType!=="Something else"} bind:value={reportDetails} placeholder="Description of the report..."></textarea>
        </div>
        <div class="modal-action">
            <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn">Close</button>
            </form>
            <button class="btn btn-primary" on:click={() => reportPost()}>Report</button>
        </div>
    </div>
</dialog>

<dialog class="modal" bind:this={summaryModal}>
    <div class="modal-box">
        <h3 class="font-bold text-lg">Summary of the "{data?.post?.title || "???"}"</h3>
        <Divider></Divider>
        <div class="grid border border-neutral rounded-box p-8 gap-2">
            {#if postSummary}
                {postSummary}
            {:else}
                <span class="loading loading-ring loading-lg justify-self-center"></span>
            {/if}
        </div>
        <div class="modal-action">
            <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn">Close</button>
            </form>
        </div>
    </div>
</dialog>