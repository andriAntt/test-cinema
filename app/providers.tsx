"use client";

import { ChakraProvider } from "@chakra-ui/react";

// import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
// import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  // const [queryClient] = useState(() => new QueryClient());
  return (
    // <QueryClientProvider client={queryClient}>
      <ChakraProvider> 
        {children}
      </ChakraProvider> 
    // </QueryClientProvider>
  );
}
