import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #4fd1c5 0%, #22c55e 100%)',
                    borderRadius: 36,
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                    }}
                >
                    {/* チャットバブル風のデザイン */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                        }}
                    >
                        <div
                            style={{
                                width: 80,
                                height: 24,
                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                borderRadius: '4px 16px 16px 16px',
                            }}
                        />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <div
                            style={{
                                width: 60,
                                height: 24,
                                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                borderRadius: '16px 4px 16px 16px',
                            }}
                        />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                        }}
                    >
                        <div
                            style={{
                                width: 50,
                                height: 24,
                                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                borderRadius: '4px 16px 16px 16px',
                            }}
                        />
                    </div>
                </div>
            </div>
        ),
        { ...size }
    )
}
