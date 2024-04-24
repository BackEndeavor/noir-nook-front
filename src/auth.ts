import {SvelteKitAuth} from "@auth/sveltekit"
import GitHub from "@auth/sveltekit/providers/github"
import Google from "@auth/sveltekit/providers/google"

async function authenticate(provider: string, access_token: string) {
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

export const {handle, signIn, signOut} = SvelteKitAuth({
    providers: [Google, GitHub],
    callbacks: {
        async session({session, token}) {
            return {...session, access_token: token.access_token}
        }, async jwt({token, account}) {
            if (!account || !account.access_token)
                return token
            if (account.provider === 'google') {
                const response = authenticate(account.provider, account.access_token).then(data => data.json())
                token.access_token = response.access
            }
            if (account.provider === 'github') {
                const response = authenticate(account.provider, account.access_token).then(data => data.json())
                token.access_token = response.access
            }
            return token;
        },
    }
})