import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {Provider} from "react-redux";
import {store} from "./redux/store.ts";


const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      },
    },
  });
export default function Providers({ children }: { children: React.ReactNode }) {

  return (
      <Provider store={store}>
          <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Provider>

  );
}
