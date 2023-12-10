import axios from "axios";
import {IWayRequest} from "../types/IWay.ts";

class TrainsService {
    private SERVER_URL = "http://localhost:9999";

    async getTickets(from:string, to:string) {
        return axios.get<string>(`${this.SERVER_URL}/tickets`, { params: { 'from': 'app', 'fromCity':from,  'to': to } });
    }

    async getCities() {
        return axios.get<string>(`${this.SERVER_URL}/cities`, { params: { 'from': 'app' } })
    }

    async getWay({ticket, to, from}:IWayRequest) {
        return axios.get<string>(`${this.SERVER_URL}/way`, { params: {
            'from': 'app',
            'ticket': ticket,
            'fromCity': from,
            'to': to
        } })
    }
}

export default new TrainsService()
