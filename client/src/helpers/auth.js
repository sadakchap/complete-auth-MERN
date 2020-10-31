import cookie from 'js-cookie';

export const setCookie = (key, value) => {
    if(window !== 'undefined'){
        cookie.set(key, value);
    }
};

export const removeCookie = key => {
    if(window !== 'undefined'){
        cookie.remove(key);
    }
};

export const setLocalStorage = (key, value) => {
    if(window !== 'undefined'){
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export const removeLocalStorage = (key) => {
    if(window !== 'undefined'){
        localStorage.removeItem(key);
    }
};

// set user & token in browser's localStorage & cookie respectively
export const Authenticate = (response, next) => {
    setCookie('token', response.data.token);
    setLocalStorage('user', response.data.user);
    next();
};

export const isAuth = () => {
    if(window !== 'undefined'){
        if(cookie.get('token')){
            const currentUser = localStorage.getItem('user');
            if(currentUser){
                return JSON.parse(currentUser);
            }
            return false;
        }
    }
};

export const updateUser = (response, next) => {
    if(window !== 'undefined'){
        let currentUser = localStorage.getItem('user');
        currentUser = response.data; // updated user data
        localStorage.setItem('user', JSON.stringify(currentUser))
    }
};

export const signout = next => {
    removeCookie('token');
    removeLocalStorage('user');
    next();
};