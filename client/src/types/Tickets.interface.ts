export interface ITickets {
    ticketId: string
    trainNumber: string
    trainType: string
    departureTime: string
    arrivalTime: string
    numberOfCarriages: number
    trainClass: string,
    startStation: string,
    endStation: string
}
export type StateTickets = {
    tickets: ITickets[]
}
