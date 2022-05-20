import React from 'react';

const REQUEST_A_FORMAL_PROPOSAL_FROM_US = (
    <p>
        Please provide us with information regarding your scheme’s assets and liabilities, along with details of any
        expected contributions. We will use this information to prepare risk analysis and a funding level projection,
        and to design a bespoke portfolio for your scheme. We can only provide this service to UK defined benefit
        pension schemes with assets of more than £10m.
        <br />
        <br />
        You will also need to tell us who you would like to be responsible for approving or commenting on the proposal
        that we make. You can just select yourself, or if you would like to add others then you can do this through the
        ‘User Management’ tab above. If you do decide to appoint us you will be asked to provide full trustee details at
        that stage.
        <br />
        <br />
        Once you have submitted the required information, we will review it and prepare a formal proposal for you to
        review. You will receive a notification when this is available and will be able to access it at the next step.
    </p>
);

const REVIEW_FORMAL_PROPOSAL_INFORMATION =
    'Review the information provided. If anything looks incorrect then edit it below, or else abort the process to send the form back to the client so that they can resubmit.';

const PUBLISH_FORMAL_PROPOSAL = (
    <p>
        Review the proposal generated to check that everything is correct. If there are problems with the information
        entered then abort the workflow, correct and resubmit. To edit the document text then download the Word
        document, make any necessary changes or additions, and upload a final pdf. <br />
        <br />
        Select ‘Publish’ when you are happy to send the final report to the client.
    </p>
);

const REVIEW_OUR_PROPOSAL = (
    <p>
        Please review the proposal below. It you would like to appoint us then please approve the document to move to
        the next step. You will have the opportunity to choose a different return target and to update or refine any
        asset or liability information entered at a later stage.
        <br />
        <br />
        You can examine the impact different return targets and contribution levels through the ‘Portfolio Analyser’ tab
        above. The Portfolio Analyser tab will remain available until the proposal is approved. <br />
        <br />
        You can see who else has approved the proposal so far and who still needs to approve by clicking on the relevant
        buttons below. <br />
        <br />
        You can comment on the proposal using the box at the bottom of the page. LGIM and other scheme users will be
        able to see these comments and respond to them.
        <br />
        <br />
        You can reject and update the proposal if you would like to change any of the information you have entered so
        far.
    </p>
);

const PROVIDE_SCHEME_REGULATORY_INFORMATION = (
    <p>
        Please provide us with the formal scheme information and documents requested below. We need this information to
        carry out due diligence prior to being appointed. <br />
        <br />
        Please also provide us with the complete list of scheme trustees, and upload the deed of appointment which
        confirms this. <br />
        <br />
        The trustee e-mail addresses provided are important, as trustees will use the e-mail address supplied below to
        log into this site, and to approve and digitally sign legal documents. Please confirm e-mail addresses with
        individual trustees before submitting the information below.
        <br />
        <br />
        Once you have submitted the required information, we will review it and prepare legal documents for you to
        review and sign. You will receive a notification when these are available and will be able to access them at the
        next step.
    </p>
);

const APPROVE_TRUSTEES_KYC_AML = (
    <p>
        Review the scheme details provided and approve once all necessary KYC and AML checks have been completed.
        <br />
        <br />
        Select ‘Reject’ to send the form back to the client so that they can enter new information.
    </p>
);

const GENERATE_IAA_AND_MANAGER_LETTERS = (
    <p>
        Select which LGIM Directors will be asked to sign the Investment Advisory Agreement. <br />
        <br />
        Review the Investment Advisory Agreement generated to check that everything is correct. If there are problems
        with the information entered then abort the workflow, correct and resubmit. To edit the document text then
        download the Word document, make any necessary changes or additions, and upload a final pdf. Select ‘continue’
        to send the final document for internal review.
        <br />
        <br />
        If a scheme currently has assets managed externally, at this stage you can also provide the trustees with draft
        letters instructing the external managers to liaise with LGIM for the purposes of arranging the asset
        transition.
    </p>
);

const APPROVE_IAA = (
    <p>
        Confirm that the Investment Advisory Agreement is correct and complete. The document will not be published to
        the client at this stage. <br />
        <br />
        If there are any problems then reject the document to send it back to the previous step for correction.
    </p>
);

const PUBLISH_IAA_AND_MANAGER_LETTERS = 'Select the documents to be sent for client review, and then click ‘Publish’.';

const REVIEW_INVESTMENT_ADVISORY_AGREEMENT = (
    <p>
        Please review the Investment Advisory Agreement below, which will appoint LGIM as the scheme’s investment
        advisor. The document can be downloaded below if you wish to send it to be reviewed by others. <br />
        <br />
        If you are satisfied with the Investment Advisory Agreement then please select ‘Approve’. We will then e-mail
        final copies for the trustees to sign. <br />
        <br />
        If the scheme currently has assets held with managers other than LGIM, then please inform them that we are being
        appointed as your investment consultant, and that they are authorised to provide us with information about your
        mandates. Template notification letters can be downloaded below.
        <br />
        <br />
        Next steps: Once the Investment Advisory Agreement has been signed we will be able to provide formal investment
        advice. Following review of that advice, the trustees will be asked to sign an Investment Management Agreement
        so that LGIM can manage the assets.
    </p>
);

const SIGN_INVESTMENT_ADVISORY_AGREEMENT = (
    <p>
        Final copies of the Investment Advisory Agreement have been e-mailed to all required signatories. Please follow
        the instructions in the e-mail to sign the document.
        <br />
        <br />
        The table below shows who has signed the Investment Advisory Agreement, and who has yet to do so.
    </p>
);

const PROVIDE_DATA_FOR_INVESTMENT_ADVICE = (
    <p>
        Please provide us with the information below so that we can provide you with formal investment advice and
        prepare your Investment Management Agreement.
        <br />
        <br />
        The asset and liability information provided at the proposal stage has been used to pre-populate the relevant
        fields below, but you can refine or adjust the inputs at this stage.
        <br />
        <br />
        The target return is a particularly important input, as this will determine the level of risk we take in the
        portfolio. However, you will have the opportunity to adjust this and consider the impact of alternative return
        targets once we have completed our analysis.
        <br />
        <br />
        Once you have submitted the required information, we will review it and prepare our formal investment advice for
        you to review. You will receive a notification when this is available and will be able to access it at the next
        step.
    </p>
);

const APPROVE_DATA_FOR_INVESTMENT_ADVICE =
    'Review the information provided. If anything looks incorrect then edit it below, or else abort the process to send the form back to the client so that they can resubmit.';

const GENERATE_ADVICE_AND_PMC_LEGAL_DOCS = (
    <p>
        Select which PMC Directors will be asked to sign the Investment Management Agreement.
        <br />
        <br />
        Review the Investment Advisory Report, Investment Management Agreement and supporting documents generated to
        check that everything is correct. If there are problems with the information entered then abort the workflow,
        correct and resubmit. To edit the document text then download the Word documents, make any necessary changes or
        additions, and upload a final pdf. Select ‘continue’ to send the final documents for internal review.
        <br />
        <br />
        At this stage you can also provide the trustees with a draft sponsor consultation letter and a draft letter to
        inform the Scheme Actuary of the changes proposed. These should be uploaded as Word documents.
    </p>
);

const APPROVE_ADVISORY_REPORT = (
    <p>
        Confirm that the Investment Advisory Report is correct and complete. The document will not be published to the
        client at this stage.
        <br />
        <br />
        If there are any problems then reject the document to send it back to the previous step for correction.
    </p>
);

const APPROVE_IMA = (
    <p>
        Confirm that the Investment Management Agreement is correct and complete. The document will not be published to
        the client at this stage.
        <br />
        <br />
        If there are any problems then reject the document to send it back to the previous step for correction.
    </p>
);

const APPROVE_PMC_POLICY = (
    <p>
        Confirm that the PMC Policy document is correct and complete. The document will not be published to the client
        at this stage.
        <br />
        <br />
        If there are any problems then reject the document to send it back to the previous step for correction.
    </p>
);

const PUBLISH_ADVICE_AND_PMC_LEGAL_DOCS =
    'Select the documents to be sent for client review, and then click ‘Publish’.';

const REVIEW_INVESTMENT_ADVICE = (
    <p>
        Please review our formal investment advice below, which includes details of how we propose to manage the
        portfolio, based on the objectives you have specified.
        <br />
        <br />
        You can examine the impact of different return targets and contribution levels through the ‘Portfolio Analyser’
        tab above. The Portfolio Analyser tab will remain available until you approve the investment advice.
        <br />
        <br />
        You can see who else has approved the investment advice so far and who still needs to approve by clicking on the
        relevant buttons below.
        <br />
        <br />
        You can comment on the advice using the box at the bottom of the page. LGIM and other scheme users will be able
        to see these comments and respond to them.
        <br />
        <br />
        You can reject this report and request an update of the advice and associated investment management
        documentation if you would like to change any of the information you have entered so far, including the target
        return.
    </p>
);

const REVIEW_INVESTMENT_MANAGEMENT_AGREEMENT = (
    <p>
        Please review the Investment Management Agreement below, which will appoint LGIM as the scheme’s investment
        manager, and sets out the guidelines within which we will manage the mandate. The document can be downloaded
        below if you wish to send it to be reviewed by others.
        <br />
        <br />
        If you are satisfied with the Investment Management Agreement then please select ‘Approve’. We will then e-mail
        final copies for the trustees to sign.
    </p>
);

const REVIEW_POLICY_TERMS = (
    <p>
        Please review the PMC Policy Terms below, which are required to appoint LGIM as the scheme’s investment manager.
        The document can be downloaded below if you wish to send it to be reviewed by others.
        <br />
        <br />
        If you are satisfied with the PMC Policy Terms then please select ‘Approve’. We will then e-mail final copies
        for the trustees to sign.
    </p>
);

const SIGN_INVESTMENT_MANAGEMENT_AGREEMENT = (
    <p>
        Final copies of the Investment Management Agreement and PMC Policy Terms have been e-mailed to all required
        signatories. Please follow the instructions in the e-mail to sign the documents.
        <br />
        <br />
        The table below shows who has signed the documents, and who has yet to do so.
    </p>
);

const ACTIVATE_CLIENT_ACCOUNT =
    'Confirm that the new mandate details have been passed to the portfolio management team and activate the client’s account on the system to move from ‘In registration’ to ‘Active – In transition’. Note that mandate is legally effective from the date that the legal documents were signed.';

//Active workflow
const INPUT_LIABILITY_INFORMATION = (
    <p>
        This workflow can be used to recalibrate the liability value or liability cashflows in the Investment Management
        Agreement, without affecting the other investment objectives.
        <br />
        <br />
        Please provide the information below so that we can provide you with a new liability proxy and prepare your
        updated Investment Management Agreement.
        <br />
        <br />
        You will also need to select which trustees will sign the new Investment Management Agreement.
        <br />
        <br />
        Once you have submitted the required information, we will review it and prepare formal investment advice for you
        to review. You will receive a notification when this is available and will be able to access it at the next
        step.
    </p>
);

const APPROVE_LIABILITY_INFORMATION =
    'Review the information provided. If anything looks incorrect then abort the process to revert to the previous step and resubmit.';

const GENERATE_ADVISORY_REPORT_AND_IMA = (
    <p>
        Select which PMC Directors will be asked to sign the Investment Management Agreement.
        <br />
        <br />
        Review the Investment Advisory Report and Investment Management Agreement to check that everything is correct.
        If there are problems with the information entered then abort the workflow, correct and resubmit.
        <br />
        <br />
        To edit the document text, download the Word documents, make any necessary changes or additions, and upload a
        final pdf.
        <br />
        <br />
        Select ‘continue’ to send the final documents for internal review.
    </p>
);

const REVIEW_IAA_LIAB_UPDATE = (
    <p>
        Please review our formal investment advice below, which sets out how we have designed the new liability proxy.
        <br />
        <br />
        You can see who else has approved the investment advice so far and who still needs to approve by clicking on the
        relevant buttons below.
        <br />
        <br />
        You can comment on the advice using the box at the bottom of the page. LGIM and other scheme users will be able
        to see these comments and respond to them.
        <br />
        <br />
        You can reject this report and request an update of the advice and associated investment management
        documentation if you would like to change any of the information you have entered.
    </p>
);

const REVIEW_IMA_LIAB_UPDATE = (
    <p>
        Please review the updated section of the Investment Management Agreement below.
        <br />
        <br />
        If you are satisfied with the Investment Management Agreement then please select ‘Approve’. We will then e-mail
        final copies for the trustees to sign.
    </p>
);

const SIGN_IMA = (
    <p>
        A final copy of the updated section of the Investment Management Agreement has been e-mailed to all required
        signatories. Please follow the instructions in the e-mail to sign the document.
        <br />
        <br />
        The table below shows who has signed the documents, and who has yet to do so.
    </p>
);

const ACTIVE_MANDATE =
    'Confirm that the new mandate details have been passed to the portfolio management team and activate the new guidelines on the system and complete this workflow. Note that the mandate is legally effective from the date that the legal documents were signed, so this step should be completed as soon as possible.[Confirm that the new mandate details have been passed to the portfolio management team and activate…]';

const INPUT_RETURN_TARGET = (
    <p>
        This workflow can be used to update the return target in the Investment Management Agreement, without affecting
        the liability proxy.
        <br />
        <br />
        Please provide the new target return below so that we can prepare your updated Investment Management Agreement.
        You will have the opportunity to adjust this and consider the impact of alternative return targets once we have
        completed our analysis.
        <br />
        <br />
        You will also need to select which trustees will sign the new Investment Management Agreement.
        <br />
        <br />
        Once you have submitted the required information, we will review it and prepare formal investment advice for you
        to review. You will receive a notification when this is available and will be able to access it at the next
        step.
    </p>
);

const DOWNLOAD_RTU = (
    <p>
        Review the information provided. If anything looks incorrect then edit it below, or else abort the process to
        send the form back to the client so that they can resubmit.
    </p>
);

const GENERATE_REPORT_RETURN_TARGET = (
    <p>
        Select which PMC Directors will be asked to sign the Investment Management Agreement.
        <br />
        <br />
        Review the documents to check that everything is correct. If there are problems with the information entered
        then abort the workflow, correct and resubmit.
        <br />
        <br />
        To edit the document text, download the Word documents, make any necessary changes or additions, and upload a
        final pdf.
        <br />
        <br />
        Select ‘continue’ to send the final documents for internal review.
    </p>
);

const REVIEW_IAA_RETURN_TARGET = (
    <p>
        Please review our formal investment advice below, which includes details of how we propose to manage the
        portfolio, based on the objectives you have specified.
        <br />
        <br />
        You can examine the impact of different return targets and contribution levels through the ‘Portfolio Analyser’
        tab above. The Portfolio Analyser tab will remain available until you approve the investment advice.
        <br />
        <br />
        You can see who else has approved the investment advice so far and who still needs to approve by clicking on the
        relevant buttons below.
        <br />
        <br />
        You can comment on the advice using the box at the bottom of the page. LGIM and other scheme users will be able
        to see these comments and respond to them.
        <br />
        <br />
        You can reject this report and request an update of the advice and associated investment management
        documentation if you would like to change any of the information you have entered.
    </p>
);

const REVIEW_IMA_RETURN_TARGET = (
    <p>
        Please review the updated section of the Investment Management Agreement below.
        <br />
        <br />
        If you are satisfied with the Investment Management Agreement then please select ‘Approve’. We will then e-mail
        final copies for the trustees to sign.
    </p>
);

const REVIEW_SCL_RETURN_TARGET =
    'Please confirm that the sponsor has been consulted regarding the change in investment strategy and updated Statement of Investment Principles.';

const REVIEW_SIP_RETURN_TARGET =
    'Please review the updated Statement of Investment Principles below. If you are satisfied with it then please select ‘Approve’.';

const SIGNATURE_STATUS_RETURN_TARGET = (
    <p>
        A final copy of the updated section of the Investment Management Agreement has been e-mailed to all required
        signatories. Please follow the instructions in the e-mail to sign the document.
        <br />
        <br />
        The table below shows who has signed the documents, and who has yet to do so.
    </p>
);

const SCHEME_NAME_CHANGE = (
    <p>
        This workflow can be used to notify us of a change in scheme name, which will then be reflected in updated legal
        agreements.
        <br />
        <br />
        Please provide us with the formal scheme information and documents requested below. Once you have submitted the
        required information, we will review it and provide updated legal documents.
    </p>
);

const REVIEW_SCHEME_CHANGE = (
    <p>
        Review the scheme details provided and approve once all necessary KYC and AML checks have been completed.
        <br />
        <br />
        If there is a problem then the workflow can be aborted to send the form back to the client so that they can
        enter new information.
    </p>
);

const GENERATE_REPORT_SCHEME_CHANGE = (
    <p>
        Select which LGIM Directors will be asked to sign the Investment Advisory Agreement.
        <br />
        <br />
        Select which PMC Directors will be asked to sign the Investment Management Agreement.
        <br />
        <br />
        Review the documents to check that everything is correct. To edit the document text, download the Word
        documents, make any necessary changes or additions, and upload a final pdf.
        <br />
        <br />
        Select ‘continue’ to send the final documents for internal review.
    </p>
);

const APPROVE_DOCUMENTS = (
    <p>
        Confirm that the document is correct and complete. It will not be published to the client at this stage.
        <br />
        <br />
        If there are any problems then reject the document to send it back to the previous step for correction.
    </p>
);

const PUBLISH_REPORTS = 'Select the documents to be sent for client review, and then click ‘Publish’.';

const REVIEW_IAA_SCHEME_CHANGE =
    'Please review the updated Investment Advisory Agreement below. If you are satisfied with it then please select ‘Approve’. We will then e-mail final copies for the trustees to sign.';

const REVIEW_IMA_SCHEME_CHANGE =
    'Please review the updated Investment Management Agreement below. If you are satisfied with it then please select ‘Approve’. We will then e-mail final copies for the trustees to sign.';

const REVIEW_PMC_SCHEME_CHANGE =
    'Please review the updated PMC Policy Terms document below. If you are satisfied with it then please select ‘Approve’. We will then e-mail final copies for the trustees to sign.';

const REVIEW_SIP_SCHEME_CHANGE =
    'Please review the updated Statement of Investment Principles below. If you are satisfied with it then please select ‘Approve’.';

const REVIEW_SCL_SCHEME_CHANGE =
    'Please confirm that the sponsor has been consulted regarding the updated Statement of Investment Principles.';

const SIGNATURE_STATUS_SCHEME_CHANGE = (
    <p>
        Final copies of the updated legal documents have been e-mailed to all required signatories. Please follow the
        instructions in the e-mails to sign the documents.
        <br />
        <br />
        The table below shows who has signed the documents, and who has yet to do so.
    </p>
);

const CHANGE_ADV_FEE =
    'This workflow can be used to update the advisory fee set out in the client’s Investment Advisory Agreement.';

const GENERATE_IAA = (
    <p>
        Select which LGIM Directors will be asked to sign the Investment Advisory Agreement.
        <br />
        <br />
        Review the document to check that everything is correct. To edit the document text, download the Word document,
        make any necessary changes or additions, and upload a final pdf.
        <br />
        <br />
        Select ‘continue’ to send the final document for internal review.
    </p>
);

const REVIEW_IAA_ADV_FEE = (
    <p>
        We have updated your Investment Advisory Agreement to reflect a change to our advisory fees.
        <br />
        <br />
        Please review the updated Investment Advisory Agreement below. If you are satisfied with it then please select
        ‘Approve’. We will then e-mail final copies for the trustees to sign.
    </p>
);

const SIGN_IAA_ADV_FEE = (
    <p>
        Final copies of the updated legal documents have been e-mailed to all required signatories. Please follow the
        instructions in the e-mails to sign the documents.
        <br />
        <br />
        The table below shows who has signed the documents, and who has yet to do so.
    </p>
);

const CHANGE_FM_FEE =
    'This workflow can be used to update the portfolio management fee set out in the client’s Investment Management Agreement.';

const GENERATE_IMA = (
    <p>
        Select which PMC Directors will be asked to sign the Investment Management Agreement.
        <br />
        <br />
        Review the document to check that everything is correct. To edit the document text, download the Word document,
        make any necessary changes or additions, and upload a final pdf.
        <br />
        <br />
        Select ‘continue’ to send the final document for internal review.
    </p>
);

const PUBLISH_REPORT_ADV_FM_FEES = 'Select ‘Publish’ to send the document to the client for review.';

const REVIEW_IMA_FM_FEE = (
    <p>
        We have updated your Investment Management Agreement to reflect a change to our portfolio management fees.
        <br />
        <br />
        Please review the updated Investment Management Agreement below. If you are satisfied with it then please select
        ‘Approve’. We will then e-mail final copies for the trustees to sign.
    </p>
);

const SIGN_IMA_FM_FEE = (
    <p>
        Final copies of the updated legal documents have been e-mailed to all required signatories. Please follow the
        instructions in the e-mails to sign the documents.
        <br />
        <br />
        The table below shows who has signed the documents, and who has yet to do so.
    </p>
);

const ACTIVE_MANDATE_ADV_FM_FEE =
    'Activate the new guidelines on the system and complete this workflow. Note that the mandate is legally effective from the date that the legal documents were signed, so this step should be completed as soon as possible.[Activate the new guidelines on the system and complete this workflow. Note that the mandate is legal…]';

const FUNDING_LVL_TRIGER =
    'This workflow can be used to set bespoke funding level triggers for the site to monitor. Note that setting these triggers will overwrite and standard triggers already in place in the IMA. If the bespoke triggers are removed using this workflow then any standard trigger monitoring in place will begin again.';

const GENERATE_SIP =
    'This workflow can be used to provide the client with an updated Statement of Investment Principles.';

const APPROVE_SIP =
    'We have drafted an updated Statement of Investment Principles for your review. If you are satisfied with it then please select ‘Approve’.';

const CONFIRM_SPONSER_CONSULTATION =
    'Please confirm that the sponsor has been consulted regarding the updated Statement of Investment Principles.';

const UPDATE_DATA_INESTMENT_ADVICE = (
    <p>
        This workflow can be used to request a full review of investment strategy.
        <br />
        <br />
        Please provide a target return and liability information below so that we can carry out a strategy review and
        prepare your updated Investment Management Agreement. You will have the opportunity to consider the impact of
        alternative return targets once we have completed our initial analysis.
        <br />
        <br />
        You will also need to select which trustees will sign the new Investment Management Agreement.
        <br />
        <br />
        Once you have submitted the required information, we will review it and prepare formal investment advice for you
        to review. You will receive a notification when this is available and will be able to access it at the next
        step.
    </p>
);

const APPROVE_DATA_INESTMENT_ADVICE =
    'Review the information provided. If anything looks incorrect then edit it below, or else abort the process to send the form back to the client so that they can resubmit.';

const GENERATE_REPORT_FULL_STRATEGY = (
    <p>
        Select which PMC Directors will be asked to sign the Investment Management Agreement.
        <br />
        <br />
        Review the documents to check that everything is correct. If there are problems with the information entered
        then abort the workflow, correct and resubmit.
        <br />
        <br />
        To edit the document text, download the Word documents, make any necessary changes or additions, and upload a
        final pdf.
        <br />
        <br />
        Select ‘continue’ to send the final documents for internal review.
    </p>
);

const REVIEW_IAA_FULL_STRATEGY = (
    <p>
        Please review our formal investment advice below, which includes details of how we propose to manage the
        portfolio, based on the objectives you have specified.
        <br />
        <br />
        You can examine the impact of different return targets and contribution levels through the ‘Portfolio Analyser’
        tab above. The Portfolio Analyser tab will remain available until you approve the investment advice.
        <br />
        <br />
        You can see who else has approved the investment advice so far and who still needs to approve by clicking on the
        relevant buttons below.
        <br />
        <br />
        You can comment on the advice using the box at the bottom of the page. LGIM and other scheme users will be able
        to see these comments and respond to them.
        <br />
        <br />
        You can reject this report and request an update of the advice and associated investment management
        documentation if you would like to change any of the information you have entered.
    </p>
);

const REVIEW_IMA_FULL_STRATEGY = (
    <p>
        Please review the updated section of the Investment Management Agreement below.
        <br />
        <br />
        If you are satisfied with the Investment Management Agreement then please select ‘Approve’. We will then e-mail
        final copies for the trustees to sign.
    </p>
);

const REVIEW_SIP_FULL_STRATEGY =
    'Please review the updated Statement of Investment Principles below. If you are satisfied with it then please select ‘Approve’.';

const REVIEW_SCL_FULL_STRATEGY =
    'Please confirm that the sponsor has been consulted regarding the change in investment strategy and updated Statement of Investment Principles.';

const SIGNATURE_STATUS_FULL_STRATEGY = (
    <p>
        A final copy of the updated section of the Investment Management Agreement has been e-mailed to all required
        signatories. Please follow the instructions in the e-mail to sign the document.
        <br />
        <br />
        The table below shows who has signed the documents, and who has yet to do so.
    </p>
);

//Update bank account details workflow
const INPUT_BANK_ACCOUNT_DETAILS = 'This workflow can be used to notify us of a change of bank account details.';

const APPROVE_BANK_ACCOUNT_DETAILS =
    'A change of bank account details has been requested. Please review the new details below and approve if you are satisfied that they are correct.';

const ACTIVATE_MANDATE_UPDATE_BANK_ACCOUNT = 'Select ‘Activate’ to update the trustee bank account details.';

//Terminate mandate workflow
const REQUEST_TERMINATION_OF_MANDATE =
    'This workflow can be used to notify us if you would like to terminate your mandate with us and move to another provider. ';

const APPROVE_TERMINATION_OF_MANDATE_LGIM =
    'Review the reason for the mandate to be terminated. Contact the client to ensure that the request to terminate the mandate is intentional.';

const APPROVE_TERMINATION_OF_MANDATE =
    'You have requested that your mandate with us be terminated. Please confirm that this is the case.';

const DEACTIVATE_ACCOUNT =
    'Deactivate the scheme on the platform. The scheme will no longer be visible to clients on the platform, but performance history will be retained and visible to LGIM users.';

//Update AVC information
const INPUT_AVC_INFO =
    'This workflow can be used to notify us of a change of AVC details, which will then be updated in the Statement of Investment Principles.';

const APPROVE_AVC_INFO =
    'Review the information provided. If anything looks incorrect then edit it below, or else abort the process to send the form back to the client so that they can resubmit.';

const GENERATE_SIP_AVC_UPDATE = (
    <p>
        Review the document to check that everything is correct. If there are problems with the information entered then
        abort the workflow, correct and resubmit.
        <br />
        <br />
        To edit the document text, download the Word document, make any necessary changes or additions, and upload a
        final pdf.
        <br />
        <br />
        Select ‘continue’ to send the final document for internal review.
    </p>
);

const REVIEW_SIP =
    'Please review the updated Statement of Investment Principles below. If you are satisfied with it then please select ‘Approve’.';

//Update deficit contribution
const INPUT_DEFICIT_CONTRIBUTIONS = (
    <p>
        This workflow can be used to update the deficit contributions used when modelling funding level projections in
        the Dashboard. Changing these will not affect the investment mandate itself. <br />
        <br />
        Please enter the deficit contributions that you would like the site to model below.
    </p>
);
const APPROVE_DEFICIT_CONTRIBUTIONS = (
    <p>
        Please confirm that the deficit contributions entered are correct. <br />
        <br />
        Once you approved the information, we will review it and update the projections on the Dashboard.
    </p>
);

const ACTIVATE_DEFICIT_CONTRIBUTIONS = 'Activate the new deficit contributions.';

//Questions iIcon text
export const LIABILITY_VALUE_AND_DETAILS_OF_THE_VALUATION_BASIS = (
    <p>
        If you can provide us with a liability value then we’ll be able to illustrate the potential impact of different
        investment strategies on your funding level. We’ll also need to understand how your Scheme Actuary has
        calculated the value - in particular we need to know how the average discount rate the Scheme Actuary has used
        in their valuation compares to the yield on government bonds (gilts).
        <br />
        <br />
        If the Scheme Actuary can provide a liability value on a ‘gilts basis’ this is likely to be best - the ‘margin’
        between the discount rate used and a gilt yield will be 0% in this case.
        <br />
        <br />
        If you would prefer us to consider your ‘Technical Provisions’ liabilities, then you can ask your Scheme Actuary
        to tell you what the average margin is in their basis relative to gilt yields. For example, a typical Technical
        Provisions liability measure might be calculated with a discount rate margin above gilt yields of 1%-2%.
    </p>
);

export const THE_SCHEME_OPEN_TO_FUTURE_ACCRUAL_OF_NEW_BENEFITS = (
    <p>
        If your scheme is open to new accrual then this means that it contains active members who are still accruing
        pension benefits, and ongoing contributions will be being paid by the scheme sponsor and by members to cover the
        cost of this accrual. If so, we can take approximate account of this in our projections of the funding position,
        as long as you can provide us with the value of new liabilities that will be accrued in the next year, and the
        total contributions that will be paid in the next year by members and the sponsor to cover the cost of this
        accrual. If you’re unsure about these numbers, your Scheme Actuary should be able to supply an estimate.
        <br />
        <br />
        If you’re unsure, you can select ‘No’, and we will still be able to provide you with an approximate funding
        level projection.
    </p>
);

export const THE_CURRENT_ANNUAL_COST_OF_NEW_BENEFIT_ACCRUAL = (
    <p>
        Please enter the £ value of liabilities that are expected to be accrued by active members over the next year.
        This future service liability value should be supplied on the same liability basis that you have supplied the
        past service liabilities. For example, if you have supplied the value of past service liabilities on a ‘gilts
        basis’, then please also provide the value of 1 year of accrual on a ‘gilts basis’. Consult your Scheme Actuary
        if you’re unsure.
        <br />
        <br />
        Note that we would usually expect the contributions paid in respect of future accrual to be of a similar order
        of magnitude to the value of liabilities accrued. If the liability value has been provided on a gilts basis
        rather than a Technical Provisions basis then typically the contributions will be slightly lower than the value
        of liabilities accrued.
    </p>
);

//Bespoke advice report
const UPLOAD_BESPOKE_REPORT =
    'This workflow can be used to provide the client with a bespoke advice report. Upload a pdf copy of the report below.';
const APPROVE_BESPOKE_REPORT = (
    <p>
        Confirm that the document is correct and complete. It will not be published to the client at this stage.
        <br />
        <br />
        If there are any problems then reject the document to send it back to the previous step for correction.
    </p>
);
const PUBLISH_BESPOKE_REPORT = 'Click ‘Publish’ to send the report to the client’s document folder.';

export const DOC_GEN = 'To modify signatories, the generated document(s) have to be deleted';
export const STEP_ICON = {
    reqip: REQUEST_A_FORMAL_PROPOSAL_FROM_US,
    dowip: REVIEW_FORMAL_PROPOSAL_INFORMATION,
    pubip: PUBLISH_FORMAL_PROPOSAL,
    revip: REVIEW_OUR_PROPOSAL,
    reqiaa: PROVIDE_SCHEME_REGULATORY_INFORMATION,
    appiaakyc: APPROVE_TRUSTEES_KYC_AML,
    geniaa: GENERATE_IAA_AND_MANAGER_LETTERS,
    appiaa: APPROVE_IAA,
    pubiaa: PUBLISH_IAA_AND_MANAGER_LETTERS,
    reviaa: REVIEW_INVESTMENT_ADVISORY_AGREEMENT,
    iaaexec: SIGN_INVESTMENT_ADVISORY_AGREEMENT,
    reqamao: PROVIDE_DATA_FOR_INVESTMENT_ADVICE,
    appamao: APPROVE_DATA_FOR_INVESTMENT_ADVICE,
    genamao: GENERATE_ADVICE_AND_PMC_LEGAL_DOCS,
    appar: APPROVE_ADVISORY_REPORT,
    appfma: APPROVE_IMA,
    apppmc: APPROVE_PMC_POLICY,
    pubamao: PUBLISH_ADVICE_AND_PMC_LEGAL_DOCS,
    revar: REVIEW_INVESTMENT_ADVICE,
    revfma: REVIEW_INVESTMENT_MANAGEMENT_AGREEMENT,
    revpmc: REVIEW_POLICY_TERMS,
    fmapmcexe: SIGN_INVESTMENT_MANAGEMENT_AGREEMENT,
    ias: ACTIVATE_CLIENT_ACCOUNT,

    //Active workflow
    liabUpdForm: INPUT_LIABILITY_INFORMATION,
    dwnldLiabUpd: APPROVE_LIABILITY_INFORMATION,
    genrtAdvFmaRprt: GENERATE_ADVISORY_REPORT_AND_IMA,
    aprvAdvRprt: APPROVE_DOCUMENTS,
    liabUpd_aprvFma: APPROVE_DOCUMENTS,
    publAdvFmaRprt: PUBLISH_REPORTS,
    schAprvAdvRprt: REVIEW_IAA_LIAB_UPDATE,
    liabUpd_schAprvFma: REVIEW_IMA_LIAB_UPDATE,
    luLgimDocsExcuStat: SIGN_IMA,
    luClientDocsExcuStat: SIGN_IMA,
    luActMendt: ACTIVE_MANDATE,

    rtnTarg: INPUT_RETURN_TARGET,
    rtnTargUpd_dwnRtnTarg: DOWNLOAD_RTU,
    genrDocs: GENERATE_REPORT_RETURN_TARGET,
    rtnTargUpd_aprvAdvReprt: APPROVE_DOCUMENTS,
    rtnTargUpd_aprvFma: APPROVE_DOCUMENTS,
    rtnTargUpd_aprvSip: APPROVE_DOCUMENTS,
    rtnTargUpd_publDocs: PUBLISH_REPORTS,
    rtnTargUpd_schAprvAdvReprt: REVIEW_IAA_RETURN_TARGET,
    rtnTargUpd_schAprvFma: REVIEW_IMA_RETURN_TARGET,
    rtnTargUpd_schAprvSip: REVIEW_SIP_RETURN_TARGET,
    rtnTargUpd_spnsrConsltLtr: REVIEW_SCL_RETURN_TARGET,
    lgimFMAExcuStat: SIGNATURE_STATUS_RETURN_TARGET,
    clientFMAExcuStat: SIGNATURE_STATUS_RETURN_TARGET,
    rtnTargUpd_actMendt: ACTIVE_MANDATE,

    chngSchName: SCHEME_NAME_CHANGE,
    dwnldSchDetl: REVIEW_SCHEME_CHANGE,
    genrtDocs: GENERATE_REPORT_SCHEME_CHANGE,
    schName_aprvIaa: APPROVE_DOCUMENTS,
    schName_aprvFma: APPROVE_DOCUMENTS,
    aprvPmc: APPROVE_DOCUMENTS,
    schName_aprvSip: APPROVE_DOCUMENTS,
    schName_publDocs: PUBLISH_REPORTS,
    schName_schAprvIaa: REVIEW_IAA_SCHEME_CHANGE,
    schName_schAprvFma: REVIEW_IMA_SCHEME_CHANGE,
    schAprvPmc: REVIEW_PMC_SCHEME_CHANGE,
    schName_schAprvSip: REVIEW_SIP_SCHEME_CHANGE,
    schName_spnsrConsltLtr: REVIEW_SCL_SCHEME_CHANGE,
    clientDocsExcuStat: SIGNATURE_STATUS_SCHEME_CHANGE,
    lgimDocsExcuStat: SIGNATURE_STATUS_SCHEME_CHANGE,
    schName_actMendt: ACTIVE_MANDATE,

    chngAdvFee: CHANGE_ADV_FEE,
    genrtIaa: GENERATE_IAA,
    advfee_aprvIaa: APPROVE_DOCUMENTS,
    publIaa: PUBLISH_REPORT_ADV_FM_FEES,
    advfee_schAprvIaa: REVIEW_IAA_ADV_FEE,
    iaaExcuStat: SIGN_IAA_ADV_FEE,
    advfee_actMendt: ACTIVE_MANDATE_ADV_FM_FEE,

    changeFmFee: CHANGE_FM_FEE,
    genFma: GENERATE_IMA,
    approveFma: APPROVE_DOCUMENTS,
    pubFma: PUBLISH_REPORT_ADV_FM_FEES,
    schApproveFma: REVIEW_IMA_FM_FEE,
    fmaExeStatus: SIGN_IMA_FM_FEE,
    actMandateFma: ACTIVE_MANDATE_ADV_FM_FEE,

    flStrtgRevw_updt: UPDATE_DATA_INESTMENT_ADVICE,
    flStrtgRevw_dwndStrtgRvw: APPROVE_DATA_INESTMENT_ADVICE,
    flStrtgRevw_genrDocs: GENERATE_REPORT_FULL_STRATEGY,
    flStrtgRevw_aprvAdvReprt: APPROVE_DOCUMENTS,
    flStrtgRevw_aprvFma: APPROVE_DOCUMENTS,
    flStrtgRevw_aprvSip: APPROVE_DOCUMENTS,
    flStrtgRevw_publDocs: PUBLISH_REPORTS,
    flStrtgRevw_schAprvAdvReprt: REVIEW_IAA_FULL_STRATEGY,
    flStrtgRevw_schAprvFma: REVIEW_IMA_FULL_STRATEGY,
    flStrtgRevw_schAprvSip: REVIEW_SIP_FULL_STRATEGY,
    flStrtgRevw_spnsrConsltLtr: REVIEW_SCL_FULL_STRATEGY,
    flStrtgRevw_clientFMAExcuStat: SIGNATURE_STATUS_FULL_STRATEGY,
    flStrtgRevw_lgimFMAExcuStat: SIGNATURE_STATUS_FULL_STRATEGY,
    flStrtgRevw_actMendt: ACTIVE_MANDATE,

    fundLvlTrg: FUNDING_LVL_TRIGER,

    genrSip: GENERATE_SIP,
    aprvSip: APPROVE_DOCUMENTS,
    publSip: PUBLISH_REPORTS,
    updSip_schAprvSip: APPROVE_SIP,
    updSip_spnsrConsltLtr: CONFIRM_SPONSER_CONSULTATION,

    //Update bank account details
    trusBankAccDetlWf_trustBankAccDetl: INPUT_BANK_ACCOUNT_DETAILS,
    trusBankAccDetlWf_aprvBankDetl: APPROVE_BANK_ACCOUNT_DETAILS,
    trusBankAccDetlWf_actMendt: ACTIVATE_MANDATE_UPDATE_BANK_ACCOUNT,
    trusBankAccDetlWf_aprvBankAccDetl: APPROVE_BANK_ACCOUNT_DETAILS,

    //Terminate mandate workflow
    reqCancelIaaFma_cnclAcc: REQUEST_TERMINATION_OF_MANDATE,
    reqCancelIaaFma_procReq: APPROVE_TERMINATION_OF_MANDATE_LGIM,
    reqCancelIaaFma_trustAprvl: APPROVE_TERMINATION_OF_MANDATE,
    reqCancelIaaFma_deactAcc: DEACTIVATE_ACCOUNT,

    //Update AVC information
    updAvcDetl_avcDetl: INPUT_AVC_INFO,
    updAvcDetl_dwnldAvcDetl: APPROVE_AVC_INFO,
    updAvcDetl_genrDocs: GENERATE_SIP_AVC_UPDATE,
    updAvcDetl_aprvSip: APPROVE_DOCUMENTS,
    updAvcDetl_publDocs: PUBLISH_REPORTS,
    updAvcDetl_schAprvSip: REVIEW_SIP,
    updAvcDetl_sponsrConsltLtr: CONFIRM_SPONSER_CONSULTATION,

    //deficitCOntribution
    defiContributionUpdate: INPUT_DEFICIT_CONTRIBUTIONS,
    aprvDefiContribution: APPROVE_DEFICIT_CONTRIBUTIONS,
    deficitActMandate: ACTIVATE_DEFICIT_CONTRIBUTIONS,

    //Bespoke advice report
    genrTrnsReprt: UPLOAD_BESPOKE_REPORT,
    aprvTrnsReprt: APPROVE_BESPOKE_REPORT,
    publTrnsReprt: PUBLISH_BESPOKE_REPORT
};
