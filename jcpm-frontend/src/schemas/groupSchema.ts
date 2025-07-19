import * as yup from 'yup';

export const groupSchema = yup.object().shape({
    titleGroup:yup.string().required("please name your group"),
});