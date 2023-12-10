import {useMutation} from "@tanstack/react-query";
import TrainsService from "../../services/TrainsService.ts";
import {IWayRequest} from "../../types/IWay.ts";

export const useGetWay = () => {
    return useMutation({
        mutationKey: ['way'],
        mutationFn: (req:IWayRequest) => TrainsService.getWay(req),
    })
}
