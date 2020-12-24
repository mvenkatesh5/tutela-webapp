import Page from '@components/page';
import { META_DESCRIPTION } from '@constants/page';
export default function SignIn(){
    const meta = {
        title: 'Sign In',
        description: META_DESCRIPTION
      };
    return (
        <Page meta={meta}>
            <h1>Sign In</h1>
        </Page>
    )
}