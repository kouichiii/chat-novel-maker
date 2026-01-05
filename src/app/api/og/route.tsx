import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const title = searchParams.get('title') || 'Chat Novel Maker'
        const author = searchParams.get('author') || 'Anonymous'

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#e0f7fa', // pop-cyan-light
                        backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.8) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.8) 2%, transparent 0%)',
                        backgroundSize: '100px 100px',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            borderRadius: '40px',
                            border: '8px solid #FFC1CC', // pop-pink-light
                            padding: '40px 80px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                        }}
                    >
                        <div
                            style={{
                                fontSize: 60,
                                fontWeight: 'bold',
                                color: '#880e4f', // deep pink/purple
                                marginBottom: 20,
                                textAlign: 'center',
                                maxWidth: '800px',
                            }}
                        >
                            {title}
                        </div>
                        <div
                            style={{
                                fontSize: 30,
                                color: '#666',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <span style={{ marginRight: 10 }}>By</span>
                            <span style={{ fontWeight: 'bold', color: '#ec4899' }}>{author}</span>
                        </div>
                    </div>
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 40,
                            fontSize: 24,
                            color: '#4fd1c5',
                            fontWeight: 'bold',
                        }}
                    >
                        Chat Novel Maker でつくろう
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            },
        )
    } catch (e: any) {
        console.log(`${e.message}`)
        return new Response(`Failed to generate the image`, {
            status: 500,
        })
    }
}
