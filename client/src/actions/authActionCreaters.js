import axios from 'axios';
import * as actionsType from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/auth/user');
    console.log(res.data);
    dispatch({
        type: actionsType.FETCH_USER,
        payload: res.data
    });
}

export const loginUser = (email, password) => async dispatch => {
    const res = await axios.post('/api/auth/login', {
        email: email,
        password: password
    });
    console.log(res.data);
    dispatch({
        type: actionsType.FETCH_USER,
        payload: res.status === 200 ? res.data : false
    });
}

export const signUp = (name, email, password) => async dispatch => {
    const res = await axios.post('/api/auth/register', {
        name: name,
        email: email,
        password: password
    });
    console.log(res.data);
    dispatch({
        type: actionsType.FETCH_USER,
        payload: res.status === 200 ? res.data : false
    });
}

export const logOut = () => async dispatch => {
    await axios.get('/api/auth/logout');
    dispatch({
        type: actionsType.FETCH_USER,
        payload: false
    });
}