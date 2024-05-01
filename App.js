import React from "react";
import { StatusBar } from "react-native";
import Navigation from "./navigations/Navigation";
import { GlobalLoaderProvider } from "./components/loader/GlobalLoaderProvider";

export default function App() {
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <GlobalLoaderProvider>
        <Navigation />
      </GlobalLoaderProvider>
    </>
  );
}
