import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const loggedInUser = localStorage.getItem('currentUser');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
    setLoading(false);
  }, []);

  const register = (userData) => {
    try {
      // Get existing users
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if user already exists
      const existingUser = users.find(u => u.email === userData.email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        password: userData.password, // In production, this should be hashed
        phone: userData.phone || '',
        createdAt: new Date().toISOString(),
        orders: [],
        wishlist: []
      };

      // Save to users array
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // Set as current user (without password)
      const userWithoutPassword = { ...newUser };
      delete userWithoutPassword.password;
      
      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

      return { success: true, user: userWithoutPassword };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const login = (email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);

      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Set as current user (without password)
      const userWithoutPassword = { ...user };
      delete userWithoutPassword.password;

      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

      return { success: true, user: userWithoutPassword };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const loginWithPhone = (phone, otp) => {
    try {
      // In production, verify OTP with backend
      if (otp !== '123456') {
        throw new Error('Invalid OTP');
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      let user = users.find(u => u.phone === phone);

      // If user doesn't exist, create new account
      if (!user) {
        user = {
          id: Date.now().toString(),
          name: 'User',
          email: '',
          phone: phone,
          createdAt: new Date().toISOString(),
          orders: [],
          wishlist: []
        };
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
      }

      const userWithoutPassword = { ...user };
      delete userWithoutPassword.password;

      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

      return { success: true, user: userWithoutPassword };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const loginWithGoogle = () => {
    try {
      // Simulate Google OAuth
      const googleUser = {
        id: Date.now().toString(),
        name: 'Google User',
        email: 'user@gmail.com',
        createdAt: new Date().toISOString(),
        orders: [],
        wishlist: []
      };

      setUser(googleUser);
      localStorage.setItem('currentUser', JSON.stringify(googleUser));

      return { success: true, user: googleUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateProfile = (updates) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex(u => u.id === user.id);

      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updates };
        localStorage.setItem('users', JSON.stringify(users));

        const updatedUser = { ...users[userIndex] };
        delete updatedUser.password;

        setUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));

        return { success: true, user: updatedUser };
      }

      throw new Error('User not found');
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    loading,
    register,
    login,
    loginWithPhone,
    loginWithGoogle,
    logout,
    updateProfile,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
