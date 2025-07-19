import type { AppProps } from "next/app"
// import { Inter } from "next/font/google"
import "../styles/globals.css"
import { ThemeProvider } from "@/components/theme-provider"

// const inter = Inter({ subsets: ["latin"] })

export default function App({ Component, pageProps }: AppProps) {
  return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <Component {...pageProps} />
      </ThemeProvider>
  )
}
