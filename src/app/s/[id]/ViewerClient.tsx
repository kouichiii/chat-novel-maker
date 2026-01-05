'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Story } from '@/lib/types'
import { supabase } from '@/lib/supabase'
import { Share, RotateCcw, PenTool } from 'lucide-react'
import Link from 'next/link'

export default function ViewerClient({ id }: { id: string }) {
    const [story, setStory] = useState<Story | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    // Playback state
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const fetchStory = async () => {
            if (!id) return
            try {
                const { data, error } = await supabase
                    .from('stories')
                    .select('*')
                    .eq('id', id)
                    .single()

                if (error) throw error

                // Parse JSONB content
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const content = data.content as any
                setStory({
                    ...data,
                    characters: content.characters,
                    messages: content.messages,
                    theme: content.theme
                })
            } catch (err) {
                console.error(err)
                setError('ストーリーが見つかりません')
            } finally {
                setLoading(false)
            }
        }
        fetchStory()
    }, [id])

    // Derive current visible messages
    const currentMessages = story ? story.messages.slice(0, index + 1) : []
    const isFinished = story ? index >= story.messages.length - 1 : false

    const handleTap = () => {
        if (story && !isFinished) {
            setIndex(prev => prev + 1)
        }
    }

    const handleShare = async (e: React.MouseEvent) => {
        e.stopPropagation()
        if (!story) return
        const url = window.location.href
        const title = story.title
        const text = `${story.author}さんが作ったチャット小説「${title}」を読んでみて！\n#ChatNovelMaker`

        if (navigator.share) {
            try {
                await navigator.share({ title, text, url })
            } catch (_e) {
                console.log('Share canceled')
            }
        } else {
            await navigator.clipboard.writeText(`${text}\n${url}`)
            alert('URLをコピーしました！')
        }
    }

    // Auto scroll when message added
    const messagesEndRef = React.useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [index, story])

    if (loading) return <div className="min-h-screen flex items-center justify-center text-pop-pink font-bold">読み込み中...</div>
    if (error || !story) return <div className="min-h-screen flex items-center justify-center text-gray-500">{error || 'エラーが発生しました'}</div>

    return (
        <div
            onClick={handleTap}
            className="min-h-screen bg-pop-cyan/20 cursor-pointer pb-20"
        >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-pop-pink/20 p-4 text-center shadow-sm">
                <h1 className="font-bold text-gray-700">{story.title}</h1>
            </div>

            <div className="max-w-[480px] mx-auto p-4 space-y-6">
                <AnimatePresence>
                    {currentMessages.map((msg) => {
                        const char = story.characters.find(c => c.id === msg.characterId)
                        // Assume first character is "Me" (right side)
                        const isMe = msg.characterId === story.characters[0]?.id

                        return (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className={`flex gap-3 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}
                            >
                                {!isMe && (
                                    <div
                                        className="w-10 h-10 rounded-full border-2 border-white shadow-sm shrink-0"
                                        style={{ backgroundColor: char?.color }}
                                    />
                                )}

                                <div className="max-w-[75%]">
                                    {/* Name only for others */}
                                    {!isMe && <div className="text-xs text-gray-500 mb-1 ml-1">{char?.name}</div>}

                                    <div className={`p-4 rounded-2xl text-base leading-relaxed whitespace-pre-wrap shadow-sm
                     ${isMe
                                            ? 'bg-pop-green text-white rounded-tr-xs'
                                            : 'bg-white text-gray-800 rounded-tl-xs border border-gray-100'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
                <div ref={messagesEndRef} className="h-4" />

                {isFinished && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-10"
                    >
                        <div className="flex items-center justify-center gap-3 mb-8">
                            <span className="h-px w-12 bg-pop-pink/60 rounded-full" />
                            <span className="text-pop-pink font-bold text-lg tracking-widest">おしまい</span>
                            <span className="h-px w-12 bg-pop-pink/60 rounded-full" />
                        </div>

                        <div className="space-y-4">
                            <button
                                onClick={handleShare}
                                className="w-full max-w-[240px] px-6 py-3 bg-pop-cyan text-cyan-900 rounded-full font-bold shadow-sm hover:scale-105 transition-transform flex items-center justify-center gap-2 mx-auto"
                            >
                                <Share size={20} /> シェアする
                            </button>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setIndex(0)
                                }}
                                className="w-full max-w-[240px] px-6 py-3 bg-white border-2 border-pop-cyan text-cyan-900 rounded-full font-bold shadow-sm hover:bg-pop-cyan/10 transition-colors flex items-center justify-center gap-2 mx-auto"
                            >
                                <RotateCcw size={20} /> もう一度読む
                            </button>

                            <Link href="/" onClick={(e) => e.stopPropagation()} className="block w-full max-w-[240px] px-6 py-3 bg-pop-pink text-white rounded-full font-bold shadow-sm hover:bg-pop-pink-light transition-colors flex items-center justify-center gap-2 mx-auto">
                                <PenTool size={20} /> 自分もつくる
                            </Link>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
