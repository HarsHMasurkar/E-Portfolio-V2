/**
 * usePortfolioData Hook
 * Fetches all portfolio data from backend on mount
 */

import { useEffect } from 'react';
import { usePortfolioStore } from '../store/portfolioStore';
import { projectsAPI, skillsAPI, profileAPI } from '../services/api';

export const usePortfolioData = () => {
  const {
    setProjects, setSkills, setProfile,
    setLoading, setError,
  } = usePortfolioStore();

  useEffect(() => {
    const fetchAll = async () => {
      // Fetch projects
      setLoading('projects', true);
      try {
        const res = await projectsAPI.getAll();
        setProjects(res.data || []);
      } catch (err) {
        setError('projects', err.message);
        console.error('Failed to fetch projects:', err.message);
      } finally {
        setLoading('projects', false);
      }

      // Fetch skills
      setLoading('skills', true);
      try {
        const res = await skillsAPI.getAll();
        setSkills(res.data || []);
      } catch (err) {
        setError('skills', err.message);
        console.error('Failed to fetch skills:', err.message);
      } finally {
        setLoading('skills', false);
      }

      // Fetch profile
      setLoading('profile', true);
      try {
        const res = await profileAPI.get();
        setProfile(res.data);
      } catch (err) {
        setError('profile', err.message);
        console.error('Failed to fetch profile:', err.message);
      } finally {
        setLoading('profile', false);
      }
    };

    fetchAll();
  }, []);
};
