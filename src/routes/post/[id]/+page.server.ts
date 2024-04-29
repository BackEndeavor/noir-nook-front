import type {PageServerLoad} from './$types';

export const load = (async (event) => {
    const postId = event.params.id;
    return {
        postId
    }
}) satisfies PageServerLoad;