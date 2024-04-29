import type {PageServerLoad} from './$types';
import {fetchPosts} from "../backend";

export const load = (async (event) => {
    const data = await event.parent();

    if (!data.session)
        return {}

    const page = Number(event.url.searchParams.get('page')) || 1

    const posts = fetchPosts(data.session.access_token, page)
    return {
        posts
    }
}) satisfies PageServerLoad;