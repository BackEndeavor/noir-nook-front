import {SvelteKitAuth} from "@auth/sveltekit"
import GitHub from "@auth/sveltekit/providers/github"
import Google from "@auth/sveltekit/providers/google"

const AVAILABLE_PROVIDERS = ['google', 'github']

async function authenticate(provider: string, access_token: string | undefined) {
    return await fetch(`http://localhost:8000/api/auth/${provider}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'access_token': access_token
        })
    })
}

async function refreshAccessToken(refreshToken: string) {
    return await fetch('http://localhost:8000/api/auth/token/refresh/', {
        method: 'POST',
        headers: {
            'Content-Type': `application/json`
        },
        body: JSON.stringify({
            refresh: refreshToken
        })
    })
}

export type CreateTokenResponse = {
    access: string,
    refresh: string,
    access_expiration: string,
    refresh_expiration: string
}

export type RefreshTokenResponse = {
    access: string,
    access_expiration: string
}

export const {handle, signIn, signOut} = SvelteKitAuth({
    providers: [Google, GitHub],
    callbacks: {
        async session({session, token}) {
            return {...session, access_token: token.access_token, error: token.error}
        }, async jwt({token, account}) {
            const accessExpirationDate = token.access_expiration as number | undefined
            const refreshExpirationDate = token.refresh_expiration as number | undefined
            const refreshToken = token.refresh_token as string | undefined
            if (account && AVAILABLE_PROVIDERS.includes(account.provider)) {
                const response = await authenticate(account.provider, account.access_token).then(data => data.json()).then(data => data as CreateTokenResponse)
                token.access_token = response.access
                token.refresh_token = response.refresh
                token.access_expiration = new Date(response.access_expiration).getTime()
                token.refresh_expiration = new Date(response.refresh_expiration).getTime()
            } else if (accessExpirationDate && Date.now() < accessExpirationDate) {
                return token;
            } else if (refreshExpirationDate && Date.now() < refreshExpirationDate) {
                // TODO: Handle refresh token expiration through throwing error
                return token
            } else if (refreshToken) {
                const response = await refreshAccessToken(refreshToken).then(data => data.json()).then(data => data as RefreshTokenResponse)
                token.access_token = response.access
                token.access_expiration = new Date(response.access_expiration).getTime()
                return token;
            }
            return token;
        },
    }
})