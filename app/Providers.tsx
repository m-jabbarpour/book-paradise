"use client";

import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/redux/store";
import { Provider } from "react-redux";

import { ThemeProvider } from "next-themes";

import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider attribute="class">{children}</ThemeProvider>
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}
