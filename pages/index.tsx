import { useRouter } from 'next/router';
// import { SkipNavContent } from '@reach/skip-nav';

import Page from '@components/page';
import { META_DESCRIPTION } from '@constants/page';

export default function Conf() {
  const { query } = useRouter();
  const meta = {
    title: 'Tutela',
    description: META_DESCRIPTION
  };


  return (
    <Page meta={meta}>
        <h1>Hello</h1>
    </Page>
  );
}