import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { me } from '../services/auth.service';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = async () => {
    try {
      const { data } = await me();
      setUser(data.user);
    } catch (error) {
      setUser(null);
      localStorage.removeItem('smartmove_token');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  const value = useMemo(() => ({ user, setUser, loading, refreshUser: fetchMe }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
