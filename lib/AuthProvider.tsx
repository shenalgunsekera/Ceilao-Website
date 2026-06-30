'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from './firebase';
import { getCustomerProfile } from './customerAuth';

type Profile = { full_name?: string; phone?: string; role?: string } | null;

type AuthCtx = {
  user: User | null;
  profile: Profile;
  loading: boolean;
};

const Ctx = createContext<AuthCtx>({ user: null, profile: null, loading: true });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        try {
          setProfile((await getCustomerProfile(u.uid)) as Profile);
        } catch {
          setProfile(null);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
  }, []);

  return <Ctx.Provider value={{ user, profile, loading }}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);
