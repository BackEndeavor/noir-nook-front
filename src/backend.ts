const BACKEND_URL = 'http://localhost:8000/api/posts'

const PAGE_LIMIT = 10

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
    image_preview: string
}

export const fetchPosts = (access_token: string, page: number, limit: number = PAGE_LIMIT) => {
    return fetch(`${BACKEND_URL}/?page=${page}&limit=${limit}`, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        },
    }).then(data => data.json()).then(data => data as PostResult).then(data => {
        data.totalPages = Math.ceil(data.count / limit)
        data.limit = limit
        data.currentPage = page
        return data
    })
}