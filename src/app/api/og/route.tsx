import { ImageResponse } from 'next/og'
import { supabase } from '@/lib/supabase'

export const runtime = 'edge'

type OgMessage = { text: string; isMe: boolean }

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        let messages: OgMessage[] = []

        if (id) {
            try {
                const { data, error } = await supabase
                    .from('stories')
                    .select('content')
                    .eq('id', id)
                    .single()

                if (!error && data && data.content) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const content = data.content as any
                    const characters = content.characters || []
                    const msgs = content.messages || []
                    const meId = characters[0]?.id

                    messages = (msgs as { id: string; text: string; characterId: string }[])
                        .slice(0, 3)
                        .map((m) => ({
                            text: m.text,
                            isMe: m.characterId === meId,
                        }))
                }
            } catch (e) {
                console.log('Failed to fetch story for OG image', e)
            }
        }

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
                                width: 760,
                                height: 260,
                                borderRadius: 32,
                                background: '#e0f7fa',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                padding: '20px 28px',
                                gap: 10,
                                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.6)',
                            }}
                        >
                            {messages.length === 0 ? (
                                <div
                                    style={{
                                        alignSelf: 'flex-start',
                                        maxWidth: '70%',
                                        backgroundColor: '#ffffff',
                                        borderRadius: 20,
                                        padding: '10px 16px',
                                        fontSize: 20,
                                        color: '#374151',
                                        boxShadow: '0 4px 8px rgba(15, 23, 42, 0.12)',
                                    }}
                                >
                                    タップで進むチャット小説の一部がここに表示されます。
                                </div>
                            ) : (
                                messages.map((m, idx) => (
                                    <div
                                        // eslint-disable-next-line react/no-array-index-key
                                        key={idx}
                                        style={{
                                            display: 'flex',
                                            justifyContent: m.isMe ? 'flex-end' : 'flex-start',
                                        }}
                                    >
                                        <div
                                            style={{
                                                maxWidth: '70%',
                                                backgroundColor: m.isMe ? '#22c55e' : '#ffffff',
                                                color: m.isMe ? '#ffffff' : '#374151',
                                                borderRadius: m.isMe ? '20px 4px 20px 20px' : '4px 20px 20px 20px',
                                                padding: '10px 16px',
                                                fontSize: 20,
                                                lineHeight: 1.5,
                                                boxShadow: '0 4px 8px rgba(15, 23, 42, 0.12)',
                                                whiteSpace: 'pre-wrap',
                                            }}
                                        >
                                            {m.text.length > 60 ? `${m.text.slice(0, 57)}...` : m.text}
                                        </div>
                                    </div>
                                ))
                            )}
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
