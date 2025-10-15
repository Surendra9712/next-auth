import {logout} from "@/actions/logout";
import {auth} from "@/auth";

const SettingPage =  async () => {
    // const session = await auth();
    const {user} = await auth();
    return (
        <div>
            {JSON.stringify(user)}
            {/*<form action={logout}>*/}
                <button onClick={logout}>Sign out</button>
            {/*</form>*/}
        </div>
    )
}

export default SettingPage