'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Message, Character, Story } from '@/lib/types'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function ViewerPage() {
    const params = useParams()
    const [story, setStory] = useState<Story | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    // Playback state
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const fetchStory = async () => {
            if (!params.id) return
            try {
                const { data, error } = await supabase
                    .from('stories')
                    .select('*')
                    .eq('id', params.id)
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
    }, [params.id])

    // Derive current visible messages
    const currentMessages = story ? story.messages.slice(0, index + 1) : []
    const isFinished = story ? index >= story.messages.length - 1 : false

    const handleTap = () => {
        if (story && !isFinished) {
            setIndex(prev => prev + 1)
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
                        <div className="inline-block p-4 bg-white rounded-full shadow-md text-pop-pink font-bold">
                            おしまい
                        </div>
                        <div className="mt-4">
                            <button className="px-6 py-2 bg-pop-cyan text-cyan-900 rounded-full font-bold">
                                シェアする
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
