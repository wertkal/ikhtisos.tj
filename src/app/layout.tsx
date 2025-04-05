import Header from "@/widgets/header";
import ThemeProvider from "./providers/page";
import Footer from "@/widgets/footer";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >

            <Header />
          {children}
            <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
