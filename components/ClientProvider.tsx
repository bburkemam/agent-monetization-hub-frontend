'use client';

import React, { ReactNode } from 'react';
import { AuthProvider } from '@/lib/auth-context';

interface ClientProviderProps {
  children: ReactNode;
}

export const ClientProvider: React.FC<ClientProviderProps> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
