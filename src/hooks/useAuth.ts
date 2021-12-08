import { useEffect, useMemo } from 'react';
import auth from '@react-native-firebase/auth';
import { useRecoilState } from 'recoil';
import { User, userSlice } from '@/store/user.slice';

type UseAuthHookReturn = {
  login(email: string, password: string): Promise<void>;
  logout(): Promise<void>;
  user: User;
  isLogged: boolean;
};

export function useAuth(): UseAuthHookReturn {
  const [user, setUser] = useRecoilState(userSlice);

  async function login(email: string, password: string) {
    try {
      const { user } = await auth().signInWithEmailAndPassword(email, password);

      setUser({
        name: 'Davi',
        email: user.email,
        id: user.uid,
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  async function logout() {
    setUser(null);
  }

  const isLogged = useMemo(() => !!user, [user]);

  useEffect(() => {
    const unSubscribed = auth().onAuthStateChanged((user) => {
      if (user) {
        setUser({
          name: 'Davi',
          id: user.uid,
          email: user.email,
        });
      } else {
        setUser(null);
      }
    });

    return unSubscribed;
  }, []);

  return {
    login,
    user,
    isLogged,
    logout,
  };
}
