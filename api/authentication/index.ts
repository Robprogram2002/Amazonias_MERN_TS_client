import axios from 'axios';

type registerRequestPayload = {
  username: string;
  email: string;
  password: string;
};

type loginRequestPayload = {
  email: string;
  password: string;
};

export const loginRequest = (data: loginRequestPayload) =>
  axios.post('/auth/local-signin', { ...data });

export const registerRequest = async (data: registerRequestPayload) =>
  axios.post('/auth/sign-up', { ...data });

export const meRequest = () => axios.get('/auth/me');
