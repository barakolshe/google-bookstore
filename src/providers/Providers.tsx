import { FunctionComponent, ReactNode } from "react";
import ReactQueryProvider from "./_providers/ReactQueryProvider";
import ThemeProvider from "./_providers/ThemeProvider";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FunctionComponent<ProvidersProps> = ({ children }) => {
  return (
    <ReactQueryProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </ReactQueryProvider>
  );
};

export default Providers;
