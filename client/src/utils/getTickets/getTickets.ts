import {useMutation} from "@tanstack/react-query";
import TrainsService from "../../services/TrainsService.ts";
import {IFromTo} from "../../types/IFromTo.ts";

export const useGetTickets = () => {
    return useMutation({
        mutationFn: ({from, to}:IFromTo) => TrainsService.getTickets(from, to),
    });
}
