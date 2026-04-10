import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type Profile = Database['public']['Tables']['profiles']['Row'];
type UserProgress = Database['public']['Tables']['user_progress']['Row'];

const AdminDashboard: React.FC = () => {
  const { user, isAdmin, isLoading } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    if (isAdmin) {
      fetchAllData();
    }
  }, [isAdmin]);

  const fetchAllData = async () => {
    try {
      setLoadingData(true);
      
      // Fetch all profiles
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (profilesError) throw profilesError;
      setProfiles(profilesData || []);
      
      // Fetch all user progress
      const { data: progressData, error: progressError } = await supabase
        .from('user_progress')
        .select('*')
        .order('updated_at', { ascending: false });
      
      if (progressError) throw progressError;
      setUserProgress(progressData || []);
      
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoadingData(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: 'admin' | 'user') => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);
      
      if (error) throw error;
      
      // Refresh data
      fetchAllData();
      alert(`Role updated to ${newRole}`);
    } catch (err) {
      alert('Failed to update role: ' + (err instanceof Error ? err.message : ''));
    }
  };

  const getUserProgressCount = (userId: string) => {
    return userProgress.filter(p => p.user_id === userId && p.completed).length;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-var(--accent) mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-red-50 rounded-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h2>
          <p className="text-red-800">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-var(--bg) p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-var(--ink3)">Manage users and monitor progress</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-var(--border)">
            <h3 className="text-var(--ink3) text-sm font-medium mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-var(--accent)">{profiles.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-var(--border)">
            <h3 className="text-var(--ink3) text-sm font-medium mb-2">Total Admins</h3>
            <p className="text-3xl font-bold text-var(--accent)">
              {profiles.filter(p => p.role === 'admin').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-var(--border)">
            <h3 className="text-var(--ink3) text-sm font-medium mb-2">Total Progress</h3>
            <p className="text-3xl font-bold text-var(--accent)">{userProgress.length}</p>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-sm border border-var(--border) overflow-hidden">
          <div className="px-6 py-4 border-b border-var(--border)">
            <h2 className="text-xl font-bold">Users</h2>
          </div>
          <div className="overflow-x-auto">
            {loadingData ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-var(--accent) mx-auto mb-2"></div>
                <p>Loading users...</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progress</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {profiles.map((profile) => (
                    <tr key={profile.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm">{profile.email}</td>
                      <td className="px-6 py-4 text-sm">{profile.full_name || '-'}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          profile.role === 'admin' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {profile.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {getUserProgressCount(profile.id)} completed
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {profile.created_at ? new Date(profile.created_at).toLocaleDateString() : '-'}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <select
                          value={profile.role || 'user'}
                          onChange={(e) => updateUserRole(profile.id, e.target.value as 'admin' | 'user')}
                          className="border border-gray-300 rounded px-2 py-1 text-xs"
                          disabled={profile.id === user?.id}
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Progress Details */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-var(--border)">
          <div className="px-6 py-4 border-b border-var(--border)">
            <h2 className="text-xl font-bold">Recent Progress</h2>
          </div>
          <div className="overflow-x-auto">
            {loadingData ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-var(--accent) mx-auto mb-2"></div>
                <p>Loading progress...</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Post ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Updated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {userProgress.slice(0, 10).map((progress) => {
                    const userProfile = profiles.find(p => p.id === progress.user_id);
                    return (
                      <tr key={progress.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm">{userProfile?.email || 'Unknown'}</td>
                        <td className="px-6 py-4 text-sm font-mono text-xs">{progress.post_id}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            progress.completed 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {progress.completed ? '✓ Completed' : 'In Progress'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">{progress.score !== null ? progress.score : '-'}</td>
                        <td className="px-6 py-4 text-sm">
                          {progress.updated_at ? new Date(progress.updated_at).toLocaleDateString() : '-'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
