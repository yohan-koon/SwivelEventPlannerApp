import * as Yup from 'yup';
import { translate } from '../../i18n';

export const getPersonalInfoFormValidationSchema = () => {
    return Yup.object().shape({
        firstName: Yup.string()
            .required(translate('commonValidations.required', { fieldName: translate('personalInfoScreen.firstNameLabel') })),
        lastName: Yup.string()
            .required(translate('commonValidations.required', { fieldName: translate('personalInfoScreen.lastNameLabel') })),
        email: Yup.string()
            .required(translate('commonValidations.required', { fieldName: translate('personalInfoScreen.emailLabel') }))
            .email(translate('commonValidations.email')),
        phoneNumber: Yup.string()
            .required(translate('commonValidations.required', { fieldName: translate('personalInfoScreen.phoneLabel') })),
        address: Yup.string()
            .required(translate('commonValidations.required', { fieldName: translate('personalInfoScreen.addressLabel') })),
    })
};