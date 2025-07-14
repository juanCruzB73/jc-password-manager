import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    username:yup.string().required("username is necesary"),
    email:yup.string().required("email is necesary"),
    password:yup.string().required("password is necesary"),
    confirPassword:yup.string().required("confir you pasword"),
});