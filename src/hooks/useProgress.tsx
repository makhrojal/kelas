import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

interface Progress {
  post_id: string;
  completed: boolean;
  score: number | null;
}

export const useProgress = () => {
  const { user } = useAuth();
  const [progressMap, setProgressMap] = useState<Record<string, Progress>>({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchProgress = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    const { data } = await supabase
      .from('user_progress')
      .select('post_id, completed, score')
      .eq('user_id', user.id);
    if (data) {
      const map: Record<string, Progress> = {};
      data.forEach((p) => { map[p.post_id] = p; });
      setProgressMap(map);
    }
    setIsLoading(false);
  }, [user]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const markComplete = async (postId: string, score?: number) => {
    if (!user) return;
    const { error } = await supabase
      .from('user_progress')
      .upsert(
        { user_id: user.id, post_id: postId, completed: true, score: score ?? null },
        { onConflict: 'user_id,post_id' }
      );
    if (!error) {
      setProgressMap((prev) => ({
        ...prev,
        [postId]: { post_id: postId, completed: true, score: score ?? null },
      }));
    }
  };

  const isCompleted = (postId: string) => progressMap[postId]?.completed ?? false;
  const getScore = (postId: string) => progressMap[postId]?.score ?? null;
  const completedCount = Object.values(progressMap).filter((p) => p.completed).length;

  return { progressMap, isCompleted, getScore, completedCount, markComplete, isLoading, refetch: fetchProgress };
};
