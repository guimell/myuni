import TopNav from "@/components/topNav";
import "../styles/globals.css";
import { Inter, Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <TopNav />
        {children}
      </body>
    </html>
  );
}
