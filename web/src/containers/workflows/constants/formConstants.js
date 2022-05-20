/**
 * FORM GENERATOR TYPES
 *
 * if you need to create a new form with new features, you can create a new generator for it
 */
const GENERATE_FORMS_TYPE_SIMPLE = 'GENERATE_FORMS_TYPE_SIMPLE';
const GENERATE_FORMS_TYPE_WITH_CHILDREN = 'GENERATE_FORMS_TYPE_WITH_CHILDREN';

/**
 *  FORM SECTION GENERATOR TYPES
 *
 * if you need to create a new form with new sections, you can create a new generator for this section
 *
 */
const GENERATE_FORM_SECTION_TYPE_SIMPLE = 'GENERATE_FORM_SECTION_TYPE_SIMPLE';

/**
 *  FORM SECTION  TYPES
 *
 *
 */
const FORM_SECTION_INCLUDE_NEW = 'FORM_SECTION_INCLUDE_NEW';
const FORM_SECTION_INCLUDE_COMPONENT = 'FORM_SECTION_INCLUDE_COMPONENT';
const FORM_SECTION_INCLUDE_UPLOAD_PUBLISH = 'FORM_SECTION_INCLUDE_UPLOAD_PUBLISH';

/*
FORM TYPES

you need to use these constants to define which type of form you need to create
*/
const FORM_TYPE_SINGLE_PAGE = 'FORM_TYPE_SINGLE_PAGE';
const FORM_TYPE_WITH_TABS = 'FORM_TYPE_WITH_TABS';

export {
    GENERATE_FORMS_TYPE_SIMPLE,
    GENERATE_FORMS_TYPE_WITH_CHILDREN,
    GENERATE_FORM_SECTION_TYPE_SIMPLE,
    FORM_SECTION_INCLUDE_NEW,
    FORM_SECTION_INCLUDE_COMPONENT,
    FORM_SECTION_INCLUDE_UPLOAD_PUBLISH,
    FORM_TYPE_SINGLE_PAGE,
    FORM_TYPE_WITH_TABS
};
