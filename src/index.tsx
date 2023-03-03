import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider } from "@mantine/core";
import { RouterProvider } from "react-router-dom";
import { appRouter } from "./routes/appRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

root.render(
  <React.Fragment>
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <NotificationsProvider position="top-right">
          <RouterProvider router={appRouter} />
        </NotificationsProvider>
      </MantineProvider>
      <ReactQueryDevtools position="bottom-right" initialIsOpen={false} />
    </QueryClientProvider>
  </React.Fragment>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
