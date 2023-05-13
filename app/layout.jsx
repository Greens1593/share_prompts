import '@/styles/globals.css'

export const metadata = {
    title: "Share Prompts",
    description: 'Discover & Share AI Prompts',
} 

const RootLayout = ({children})=>{
    return (
        <html>
            <body>
                <div className='main'>
                    <div className='gradient'>
                        <main className='app'>
                            {children}
                        </main>
                    </div>
                </div>
            </body>
        </html>
    )
}

export default RootLayout