import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../Button/Button';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">TaskMaster Pro</h1>
          </div>
          {user && (
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <Button variant="secondary" onClick={logout}>
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
