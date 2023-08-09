import './globals.css'
import { Inter } from 'next/font/google'
import MockExchange from './MockExchange'
import { UserProvider } from '@/contexts/userContext'
import { NotificationProvider } from '@/contexts/notificationContext'
import NavBar from '@/components/nav/NavBar'


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <UserProvider>
                    <NotificationProvider>
                        <NavBar/>
                            <MockExchange> 
                                { children }
                            </MockExchange>
                    </NotificationProvider>
                </UserProvider>
            </body>
        </html>
    )
}
