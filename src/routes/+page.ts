import type {PageLoad} from './$types';
import {fetchPosts} from "../backend";

export const load = ( async ({ url, parent }) => {
    const data = await parent()

    const page = Number(url.searchParams.get('page')) || 1
    const posts = fetchPosts(data.session.access_token, page)
    return {
        posts
    }
}) satisfies PageLoad;