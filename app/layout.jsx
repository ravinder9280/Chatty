
import Nav from "@/components/Navbar/page"
import Provider from "@/components/Provider.jsx"
import { Toaster } from "sonner"
import '@/styles/index.css';
import { Afacad } from 'next/font/google'

export const metadata = {
  title: 'Chatty AI',
  description: 'Premade or PreDefined AI Prompts for accuracy and better output',
}
const epilogue = Afacad({
  
  subsets: ['latin'],
  preload: true,
  variableName: 'epilogue',
  autoReplace: true,
  use: ['style', 'link'],
  
})
 

export default function RootLayout({ children }) {
  return (
    <html lang='en'
    className={epilogue.className}
    >
    <body >
      <Provider>
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app'>
          <Nav />
          <Toaster />
          {children}
        </main>
      </Provider>
    </body>
  </html>
  )
}
