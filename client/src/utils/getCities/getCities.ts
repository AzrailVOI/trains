import {useQuery} from "@tanstack/react-query";
import TrainsService from "../../services/TrainsService.ts";

export const useGetCities = () => {
    return useQuery({
        queryKey: ['cities'],
        queryFn: () => TrainsService.getCities(),
        select: (data) => {
            const decode = decodeURIComponent(data.data)
                .replace(/\+/g, " ")
                .split(';')
            // console.log('DECODE', decode)
            decode.pop()
            return decode
        }
    });
}
