export const getUser = () => {
  if (typeof window !== 'undefined') {
    const userStorage = localStorage.getItem('user-storage');
    if (userStorage) {
      const parsedStorage = JSON.parse(userStorage);
      return parsedStorage.state?.user;
    }
  }
  return null;
};
