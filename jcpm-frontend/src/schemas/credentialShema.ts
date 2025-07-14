import * as yup from 'yup';

export const credentialSchema = yup.object().shape({
    title:yup.string().required("please name your credential"),
    email:yup.string().email().required("email is requiered"),
    password:yup.string().required("password is required"),
    webLink:yup.string().required("the website is required"),
});