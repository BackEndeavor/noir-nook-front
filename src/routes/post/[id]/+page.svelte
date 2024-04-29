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

    export let data;

    let reportModal: HTMLDialogElement;
    let selectedReportType: string;
    let reportDetails: string;

    let deleteConfirmationModal: HTMLDialogElement;

    function sharePostLink() {
        navigator.clipboard.writeText(document.URL);
        toast.addInfo('Post link copied!', {newToast: {duration_ms: 2500}});
    }

    function reportPost() {
        if (!selectedReportType)
            return;
        let report = selectedReportType;
        if (report === 'Something else')
            report = reportDetails;

        if(!report)
            return;
        // TODO: Send the report
    }

    function updateReportSelection(event: CustomEvent) {
        selectedReportType = event.detail.value
    }
</script>

<Post>
    <PostHeader>
        <div class="justify-self-start">
            <Tooltip data="Summarize the content">
                <button class="btn btn-accent">
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
        </div>
    </PostHeader>
    <Divider></Divider>
    <PostBody>
        <PostTitle>The Impact of Technology on the Workplace: How Technology is Changing</PostTitle>
        <PostMetadata/>
        <PostImage>
            <img src="https://wallpaperaccess.com/full/1871775.jpg" alt=""/>
        </PostImage>
        Traveling is an enriching experience that opens up new horizons, exposes us to different cultures, and creates memories that last a lifetime. However, traveling can also be stressful and overwhelming,
        especially
        if you don't plan and prepare adequately. In this blog article, we'll explore tips and tricks for a memorable journey and how to make the most of your travels.

        One of the most rewarding aspects of traveling is immersing yourself in the local culture and customs. This includes trying local cuisine, attending cultural events and festivals, and interacting with locals.
        Learning a few phrases in the local language can also go a long way in making connections and showing respect.
    </PostBody>
</Post>

<dialog class="modal" bind:this={deleteConfirmationModal}>
    <div class="modal-box">
        <h3 class="font-bold text-lg">Hello!</h3>
        <p class="py-4">Press ESC key or click the button below to close</p>
        <div class="modal-action">
            <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn">Close</button>
            </form>
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