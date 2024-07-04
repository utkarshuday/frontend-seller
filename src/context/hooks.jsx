import { useContext } from 'react';
import { UserContext } from './contexts';

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error('UserContext is used outside of UserProvider');
  return context;
}
