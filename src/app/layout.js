import { Space_Grotesk } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })

export const metadata = {
  title: 'JsonToTable | Jose Boullosa',
  description: 'Convierte tu JSON a formato tabla',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={spaceGrotesk.className}>{children}</body>
    </html>
  )
}
