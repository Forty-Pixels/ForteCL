export type ApprovalKind = 'direct' | 'eligibility' | 'preapproval' | 'clinic' | 'contact';

export interface InsuranceNetwork {
    name: string;
    note?: string;
}

export interface InsuranceProvider {
    name: string;
    approval: ApprovalKind;
    /** Optional logo path under /public. */
    logo?: string;
    /** Full claim/approval instruction for this provider. */
    process: string;
    /** Heading above the network list, e.g. "Network code". */
    networkLabel?: string;
    networks: InsuranceNetwork[];
}

export const insuranceProviderSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const APPROVAL_INFO: Record<ApprovalKind, { label: string; detail: string }> = {
    direct: { label: 'Direct claim', detail: 'No approval needed from us. Claims can be submitted directly.' },
    eligibility: { label: 'Eligibility check', detail: 'No approval needed. Share the patient’s eligibility screenshot so we can confirm the network is accepted.' },
    preapproval: { label: 'Approval + referral', detail: 'Approval is required first, and the referral document must be attached to the claim.' },
    clinic: { label: 'Clinic approval first', detail: 'Approval must be obtained on the clinic side first. Once approved there, the laboratory can proceed.' },
    contact: { label: 'Contact us', detail: 'We accept this provider. Contact our team to confirm your plan’s network and approval steps.' },
};

const referral = 'Referral basis only';

export const INSURANCE_PROVIDERS: InsuranceProvider[] = [
    {
        name: 'FMC',
        logo: '/Landing-page/insurance/transparent/fmc.png',
        process: 'Approval has to be taken from the clinic side first. Once it is approved by the clinic, the laboratory can take it from our side.',
        approval: 'clinic',
        networks: ['FMC Gold Network', 'FMC Premium Network', 'FMC Farid GN Network (5 levels)', 'FMC Standard Network', 'FMC DHA Basic Plan Network'].map(name => ({ name })),
    },
    {
        name: 'Nextcare',
        process: 'You can send the claim directly. No approval has to be taken from our side.',
        approval: 'direct',
        networks: ['GN', 'GN+', 'RN', 'RN2', 'RN3', 'PCP'].map(name => ({ name })),
    },
    { name: 'Nextcare Enaya',
        logo: '/Landing-page/insurance/transparent/enaya.svg', process: 'Accepted at Forte. Contact our team to confirm your plan\u2019s network and approval steps.', approval: 'contact', networks: [] },
    {
        name: 'Lifeline',
        logo: '/Landing-page/insurance/transparent/lifeline.png',
        process: 'Approval has to be taken from our side, and the referral document has to be shared and attached with the claim.',
        approval: 'preapproval',
        networks: [
            { name: 'Lifeline – Diamond Network' },
            { name: 'Lifeline – Emerald Network' },
            ...['Pearl', 'Sapphire', 'Empire', 'Ruby', 'Opal', 'Crystal'].map(n => ({ name: `Lifeline – ${n} Network`, note: referral })),
        ],
    },
    {
        name: 'Al Madallah',
        logo: '/Landing-page/insurance/transparent/almadallah.svg',
        process: 'No approval has to be taken from our side. You can share the claim directly.',
        approval: 'direct',
        networks: ['GN+', 'GN', 'RN', 'RN2', 'RN3', 'RN4'].map(name => ({ name })),
    },
    {
        name: 'National General Co. (NGI)',
        logo: '/Landing-page/insurance/transparent/ngi.png',
        process: 'No approval has to be taken from our side. You can share the claim directly.',
        approval: 'direct',
        networks: ['HN Basic', 'HN Basic Plus', 'HN Standard Plus', 'HN Advantage', 'HN Premier', 'HN Exclusive'].map(name => ({ name })),
    },
    {
        name: 'eCare',
        logo: '/Landing-page/insurance/transparent/ecare.png',
        process: 'Approval has to be taken from our side first, and the referral document has to be shared with the claim as well.',
        approval: 'preapproval',
        networks: ['Platinum & Diamond', 'Silver & Gold', 'Blue, Green & Classic'].map(name => ({ name })),
    },
    {
        name: 'NAS',
        logo: '/Landing-page/insurance/transparent/nas.png',
        process: 'No approval has to be taken from our side. Send the eligibility picture of the patient to confirm they belong to one of the networks we accept.',
        approval: 'eligibility',
        networks: ['EN', 'CN', 'GN', 'RN', 'SR'].map(name => ({ name: `Network code ${name}` })),
    },
    {
        name: 'Neuron',
        logo: '/Landing-page/insurance/transparent/neuron.svg',
        process: 'No approval has to be taken from our side. Send the eligibility picture of the patient to confirm they belong to one of the networks we accept.',
        approval: 'eligibility',
        networks: ['CN', 'GN+', 'GN', 'RN'].map(name => ({ name: `Network code ${name}` })),
    },
    {
        name: 'WHealth Insurance',
        logo: '/Landing-page/insurance/transparent/whealth.png',
        process: 'Approval has to be taken from our side first, and the referral document has to be shared with the claim as well.',
        approval: 'preapproval',
        networks: ['Signature', 'Elite', 'Prime', 'Max', 'Pro', 'Plus', 'Lite'].map(n => ({ name: `Arro ${n}` })),
    },
    { name: 'GlobMed',
        logo: '/Landing-page/insurance/transparent/globemed.svg', process: 'Accepted at Forte. Contact our team to confirm your plan\u2019s network and approval steps.', approval: 'contact', networks: [] },
    { name: 'Inayah',
        logo: '/Landing-page/insurance/transparent/inayah.png', process: 'Accepted at Forte. Contact our team to confirm your plan\u2019s network and approval steps.', approval: 'contact', networks: [] },
];
