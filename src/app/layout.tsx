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
          <header>
            <Header />
          </header>
          {children}
          <footer>
            <Footer />
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
