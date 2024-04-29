import {formatNumberThousand, formatTimeAgo} from "./locale";

const BACKEND_URL = 'http://localhost:8000/api/posts'

const PAGE_LIMIT = 9
export type PostResult = {
    count: number,
    totalPages: number,
    limit: number,
    currentPage: number,
    next: string,
    previous: string,
    results: Post[]
}

export type Post = {
    id: number,
    title: string,
    content: string,
    author_id: string,
    image_preview: string,
    publication_date: Date,
    relative_time: string,
    views: number
    formatted_views: string;
}

export const fetchPosts = (access_token: string, page: number, limit: number = PAGE_LIMIT) => {
    return fetch(`${BACKEND_URL}/?page=${page}&limit=${limit}`, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        },
    })
        .then(async data => data.json())
        .then(data => data as PostResult)
        .then(data => {
            data.totalPages = Math.ceil(data.count / limit)
            data.limit = limit
            data.currentPage = page
            return data
        }).then(data => {
            data.results.forEach(post => {
                post.publication_date = new Date(post.publication_date)
                post.relative_time = formatTimeAgo(post.publication_date) || '?'
                post.views = 933240
                post.formatted_views = formatNumberThousand(post.views)
            })
            return data
        })
}