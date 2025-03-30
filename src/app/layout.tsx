import type { Metadata } from "next";
import { ReduxProvider } from "@/redux/provider";
import GlobalStyles from "@/styles/Scss";
import {
  PrivateRoute,
  FetchUserAccount,
  RefreshAutoToken,
} from "@/components/lib";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="app-container">
        <ReduxProvider>
          <GlobalStyles /> {/* GlobalStyles */}
          <RefreshAutoToken /> {/* refreshAutoToken */}
          <FetchUserAccount /> {/* FetchUserAccount */}
          {/* Private Route */}
          <PrivateRoute> {children}</PrivateRoute>
        </ReduxProvider>
      </body>
    </html>
  );
}
