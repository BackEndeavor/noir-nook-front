import type {PageServerLoad} from './$types';
import {fetchPost} from "../../../backend";

export const load = (async (event) => {
    const { session } = await event.parent()
    const postId = event.params.id;

    if (!session)
        return {
            postId,
        }

    const post = await fetchPost(session.access_token, Number.parseInt(postId))

    return {
        postId,
        post
    }
}) satisfies PageServerLoad;