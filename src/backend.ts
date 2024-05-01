import {formatNumberThousand, formatTimeAgo} from "./locale";

const BACKEND_URL = 'http://localhost:8000/api/posts'

const PAGE_LIMIT = 9

export type Response = {
    ok: boolean,
    errorMessage?: string,
}

export type PostListResponse = {
    count: number,
    totalPages: number,
    limit: number,
    currentPage: number,
    next: string,
    previous: string,
    results: Post[],
}

export type PostResponse = Post & Response

export type SummaryPostResponse = {
    summary: string
}

export type Post = {
    id: number,
    title: string,
    content: string,
    author: User,
    image_preview: string,
    publication_date: Date,
    relative_time: string,
    views: number,
    formatted_views: string
}

export type User = {
    id: number,
    username: string,
    first_name: string,
    last_name: string,
    avatar_url: string
}

function wrapPost(post: Post) {
    post.publication_date = new Date(post.publication_date);
    post.relative_time = formatTimeAgo(post.publication_date) || '???';
    post.views = 10;
    post.formatted_views = formatNumberThousand(post.views);
    return post
}

export const fetchPosts = (access_token: string, page: number, limit: number = PAGE_LIMIT) => {
    return fetch(`${BACKEND_URL}/?page=${page}&limit=${limit}`, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        },
    })
        .then(async data => {
            if (data.status !== 200) {
                const jsonData = await data.json();
                jsonData.ok = false;
                jsonData.errorMessage = data.statusText;
                return jsonData;
            }
            return data.json();
        })
        .then(data => data as PostListResponse & Response)
        .then(data => {
            data.totalPages = Math.ceil(data.count / limit);
            data.limit = limit;
            data.currentPage = page;
            return data;
        }).then(data => {
            if (data.results)
                data.results.forEach(post => wrapPost(post))
            return data
        })
}

export const updatePost = (access_token: string, post: Post) => {
    return fetch(`${BACKEND_URL}/${post.id}/`, {
        method: "PATCH",
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: post.title,
            content: post.content,
        })
    }).then(response => {
        console.log(response.ok)
        console.log(response.status)
        console.log(response.statusText)
        console.log(response.json())
        return response
    })
}

export const fetchPost = (access_token: string, post_id: number) => {
    return fetch(`${BACKEND_URL}/${post_id}`, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        },
    })
        .then(async data => {
            const jsonData = await data.json();
            if (data.status !== 200) {
                jsonData.ok = false;
                jsonData.errorMessage = data.statusText;
                return jsonData;
            }
            jsonData.ok = true;
            return jsonData;
        })
        .then(data => data as PostResponse)
        .then(post => wrapPost(post) as PostResponse)
}

export const deletePost = (access_token: string, post_id: number) => {
    return fetch(`${BACKEND_URL}/${post_id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${access_token}`
        },
    }).then(data => {
        const response: Response = {
            ok: data.status === 204, // 204 No content
            errorMessage: data.statusText
        }
        return response
    })
}

export const summaryPost = (access_token: string, post_id: number) => {
    return fetch(`${BACKEND_URL}/summary/${post_id}`, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        },
    }).then(async data => {
        const jsonData = await data.json();
        const summaryText = jsonData['summary'].map((summary: { summary_text: string; }) => summary.summary_text).join(" ")
        const response: SummaryPostResponse & Response  = {
            summary: summaryText,
            ok: false,
            errorMessage: undefined
        }
        if (data.status !== 200) {
            response.ok = false;
            response.errorMessage = data.statusText;
            return response;
        }
        response.ok = true;
        return response;
    })
}