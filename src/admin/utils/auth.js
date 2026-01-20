export const isAuthenticated = () => {
    const token = localStorage.getItem('admin_token');
    return !!token;
};

export const getCurrentUser = () => {
    const userStr = localStorage.getItem('admin_user');
    return userStr ? JSON.parse(userStr) : null;
};

export const setCurrentUser = (user) => {
    localStorage.setItem('admin_user', JSON.stringify(user));
};

export const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    window.location.href = '/admin/login';
};
