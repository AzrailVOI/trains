export interface IWayResponse {
    depTime: [string, string]
    arrTime: [string, string]
    startCity: string
    endCity: string
}
export interface IWayRequest {
    ticket: number
    from: string
    to: string
}
