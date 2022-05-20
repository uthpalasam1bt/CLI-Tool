import { UPLOAD_FILE_TYPES } from '../../../../../UILibrary/constants/fileUploaderConstants';
import { DOC_NAMES } from './constants';

const { PDF, DOC } = UPLOAD_FILE_TYPES;

export const formFields = props => {
    return [
        {
            label: '$tmntinltrs$ (Multiple files may be added)',
            field: {
                name: DOC_NAMES.MTL,
                options: {
                    accept: [PDF, DOC],
                    isPublic: false
                },
                validationModules: [
                    {
                        moduleName: 'RequiredValidate',
                        options: { message: 'Required' }
                    }
                ],
                disabled: false,
                generate: true,
                isMultiple: true
            }
        }
    ];
};
