import { supabase } from '@/lib/supabase'
import { Metadata } from 'next'
import ViewerClient from './ViewerClient'

type Props = {
    params: Promise<{ id: string }>
}

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const { id } = await params

    const { data: story } = await supabase
        .from('stories')
        .select('title, author')
        .eq('id', id)
        .single()

    if (!story) {
        return {
            title: 'ストーリーが見つかりません',
        }
    }

    const ogUrl = new URL(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/og`)
    ogUrl.searchParams.set('id', id)
    ogUrl.searchParams.set('title', story.title)
    ogUrl.searchParams.set('author', story.author || 'Anonymous')

    return {
        title: `${story.title} | ノベトーク`,
        description: `${story.author}さんが作ったチャット小説を読もう！`,
        openGraph: {
            title: story.title,
            description: `${story.author}さんが作ったチャット小説を読もう！`,
            images: [
                {
                    url: ogUrl.toString(),
                    width: 1200,
                    height: 630,
                    alt: story.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: story.title,
            description: `${story.author}さんが作ったチャット小説を読もう！`,
            images: [ogUrl.toString()],
        },
    }
}

export default async function ViewerPage({ params }: Props) {
    const { id } = await params
    return <ViewerClient id={id} />
}
