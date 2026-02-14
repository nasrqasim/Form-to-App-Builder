import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'FormForge AI | Best AI CRUD App Generator',
    description: 'Generate full-stack CRUD applications instantly with AI. Built with Next.js, MongoDB, and Cloudinary integration. No backend coding required.',
    openGraph: {
        title: 'FormForge AI - Best AI CRUD App Generator',
        description: 'Turn Your Forms Into Powerful Full-Stack Applications in Seconds',
        type: 'website',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className} transition-colors duration-300`}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <Header />
                    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
                        {children}
                    </main>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
