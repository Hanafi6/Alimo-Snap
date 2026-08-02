import ProfilePage from '@/components/profile/account-settings'

import { getSessionServer } from '@/lib/session';

async function page() {
  const session = await getSessionServer();
  return (
    <div>
      <ProfilePage session={session} />
    </div>
  )
}

export default page