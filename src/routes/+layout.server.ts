import type {LayoutServerLoad} from "./$types"
import type {SessionWithToken} from "../auth";

export const load: LayoutServerLoad = async (event) => {
    const session = await event.locals.auth() as SessionWithToken

    return {
        session
    }
}