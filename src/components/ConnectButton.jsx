import { connectWallet } from '../lib/wallet';
import { useUser } from '../context/hooks';
import { Button } from './ui/button';

export default function ConnectButton() {
  const { user } = useUser();
  return (
    <>
      <Button onClick={connectWallet} className='ml-auto tracking-wider '>
        {user ? `Account: ${user.account}` : 'Connect to Metamask'}
      </Button>
    </>
  );
}
