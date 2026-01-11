import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from '../store/userSlice';

/**
 * Custom hook to automatically refresh user data when mining events occur
 * This ensures all components (header, mine page, etc.) show updated values
 */
export const useAutoUpdateUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.selectedUser);
  const miningSuccess = useSelector((state) => state.mining.success);

  useEffect(() => {
    // When mining collection is successful, refresh user data
    if (miningSuccess && user?.id) {
      const timer = setTimeout(() => {
        dispatch(fetchUserById(user.id));
      }, 500); // Small delay to ensure backend has updated

      return () => clearTimeout(timer);
    }
  }, [miningSuccess, user?.id, dispatch]);

  return user;
};

/**
 * Alternative: Listen to custom events for real-time updates
 * Use this if you want event-driven updates instead of polling
 */
export const useMiningEventListener = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.selectedUser);

  useEffect(() => {
    const handleMiningCollected = (event) => {
      if (event.detail?.user) {
        dispatch({
          type: 'users/updateUserCoins',
          payload: event.detail.user
        });
      }
    };

    window.addEventListener('mining:collected', handleMiningCollected);

    return () => {
      window.removeEventListener('mining:collected', handleMiningCollected);
    };
  }, [dispatch]);

  return user;
};

/**
 * Dispatch a mining collected event
 * Call this after successful collection
 */
export const dispatchMiningCollectedEvent = (userData) => {
  const event = new CustomEvent('mining:collected', {
    detail: { user: userData }
  });
  window.dispatchEvent(event);
};