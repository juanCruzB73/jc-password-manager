import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    username:yup.string().required("username is necesary"),
    password:yup.string().required("password is necesary"),
});