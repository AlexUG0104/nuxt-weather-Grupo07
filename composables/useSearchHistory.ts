import { ref } from 'vue';
import type { WeatherHistory } from '~/types/weather';

export const useSearchHistory = () => {
  const history = ref<WeatherHistory[]>([]);

  // Load from localStorage on client side
  const loadHistory = () => {
    if (import.meta.client) {
      const stored = localStorage.getItem('weatherSearchHistory');
      if (stored) {
        try {
          history.value = JSON.parse(stored);
        } catch (e) {
          console.error('Error parsing search history', e);
        }
      }
    }
  };

  const saveSearch = (city: string) => {
    const newEntry: WeatherHistory = {
      city,
      date: new Date().toISOString()
    };
    
    // Remove duplicates (case insensitive)
    const filtered = history.value.filter(h => h.city.toLowerCase() !== city.toLowerCase());
    
    // Add to beginning and limit to 5
    filtered.unshift(newEntry);
    history.value = filtered.slice(0, 5);
    
    if (import.meta.client) {
      localStorage.setItem('weatherSearchHistory', JSON.stringify(history.value));
    }
  };

  const removeSearch = (city: string) => {
    history.value = history.value.filter(h => h.city.toLowerCase() !== city.toLowerCase());
    if (import.meta.client) {
      localStorage.setItem('weatherSearchHistory', JSON.stringify(history.value));
    }
  };

  const clearHistory = () => {
    history.value = [];
    if (import.meta.client) {
      localStorage.removeItem('weatherSearchHistory');
    }
  };

  // Initialize
  loadHistory();

  return {
    history,
    saveSearch,
    removeSearch,
    clearHistory
  };
};
