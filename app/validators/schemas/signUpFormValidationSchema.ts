import * as Yup from 'yup';
import { translate } from '../../i18n';

export const getSignUpFormValidationSchema = () => {
    return Yup.object().shape({
        email: Yup.string()
            .required(translate('commonValidations.required', { fieldName: translate('signUpScreen.emailLabel') }))
            .email(translate('commonValidations.email')),
        password: Yup.string()
            .required(translate('commonValidations.required', { fieldName: translate('signUpScreen.passwordLabel') }))
            .min(8, translate('commonValidations.minLength', { fieldName: translate('signUpScreen.passwordLabel'), min: 8 }))
            .max(50, translate('commonValidations.minLength', { fieldName: translate('signUpScreen.passwordLabel'), min: 8 })),
        confirmPassword: Yup.string()
            .required(translate('commonValidations.required', { fieldName: translate('signUpScreen.confirmPasswordLabel') }))
            .min(8, translate('commonValidations.minLength', { fieldName: translate('signUpScreen.confirmPasswordLabel'), min: 8 }))
            .max(50, translate('commonValidations.minLength', { fieldName: translate('signUpScreen.confirmPasswordLabel'), min: 8 }))
            .oneOf([Yup.ref('password'), null], translate('commonValidations.passwordsDoNotMatch')),
    })
};