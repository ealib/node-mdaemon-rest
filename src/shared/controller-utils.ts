export const ApiQueryPage = {
    description: 'Requested page number, starting from zero for the first page.',
    name: 'page',
    required: false,
    type: Number,
    default: 0,
};
export const ApiQueryPageSize = {
    description: 'Page size.',
    name: 'pageSize',
    required: false,
    type: Number,
    default: 10,
};
export function ApiResponseListOK(descriptionEntity: string, type: any) {
    return {
        description: `List page response for ${descriptionEntity}.`,
        status: 200,
        type,
    };
}
export function ApiResponseOK(description: string, type: any) {
    return { description, status: 200, type, };
}