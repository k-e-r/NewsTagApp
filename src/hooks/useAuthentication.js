import { useContext } from 'react';

import AuthContext from '../store/AuthProvider';

export default function useAuthentiation() {
  return useContext(AuthContext);
}
