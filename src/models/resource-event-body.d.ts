export interface ResourceEventBody {
    companyId: number
    productId: string
    resource: string
    shortId: string
}

export type ResponseBody = {
    statusCode: number
    body: object
}
