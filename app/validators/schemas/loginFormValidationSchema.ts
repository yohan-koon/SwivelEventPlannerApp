import * as Yup from 'yup';
import { translate } from '../../i18n';

export const getLoginFormValidationSchema = () => {
    return Yup.object().shape({
        email: Yup.string()
            .required(translate('commonValidations.required', { fieldName: translate('loginScreen.emailLabel') }))
            .email(translate('commonValidations.email')),
        password: Yup.string()
            .required(translate('commonValidations.required', { fieldName: translate('loginScreen.passwordLabel') }))
            .min(8, translate('commonValidations.minLength', { fieldName: translate('loginScreen.passwordLabel'), min: 8 }))
            .max(50, translate('commonValidations.minLength', { fieldName: translate('loginScreen.passwordLabel'), min: 8 })),
    })
};