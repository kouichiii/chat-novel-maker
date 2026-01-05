'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Message, Character } from '@/lib/types'
import { useParams } from 'next/navigation'

// Mock Data for Demo
const DEMO_CHARS: Character[] = [
    { id: '1', name: '先輩', color: '#ffecf1' },
    { id: '2', name: '私', color: '#e0f7fa' }
]
const DEMO_MESSAGES: Message[] = [
    { id: 'm1', characterId: '2', text: '先輩！', type: 'text' },
    { id: 'm2', characterId: '1', text: 'ん？どうしたの？', type: 'text' },
    { id: 'm3', characterId: '2', text: '実は伝えたいことがあって...', type: 'text' },
    { id: 'm4', characterId: '1', text: 'え、何？もしかして...', type: 'text' },
    { id: 'm5', characterId: '2', text: '購買のパン、買ってきてください！', type: 'text' },
    { id: 'm6', characterId: '1', text: 'パシリかよ！！！', type: 'text' },
]

export default function ViewerPage() {
    const params = useParams()
    // In real app, fetch story by params.id
    console.log('Loading story:', params.id)

    const [index, setIndex] = useState(0)

    const currentMessages = DEMO_MESSAGES.slice(0, index + 1)
    const isFinished = index >= DEMO_MESSAGES.length - 1

    const handleTap = () => {
        if (!isFinished) {
            setIndex(prev => prev + 1)
            // Auto scroll logic would go here
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
        }
    }

    return (
        <div
            onClick={handleTap}
            className="min-h-screen bg-pop-cyan/20 cursor-pointer pb-20"
        >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-pop-pink/20 p-4 text-center shadow-sm">
                <h1 className="font-bold text-gray-700">放課後の二人</h1>
                <div className="text-xs text-gray-400">Tap to Next</div>
            </div>

            <div className="max-w-[480px] mx-auto p-4 space-y-6">
                <AnimatePresence>
                    {currentMessages.map((msg) => {
                        const char = DEMO_CHARS.find(c => c.id === msg.characterId)
                        // Let's say '2' is Me (Right)
                        const isMe = msg.characterId === '2'

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
                                            ? 'bg-pop-pink text-white rounded-tr-xs'
                                            : 'bg-white text-gray-800 rounded-tl-xs border border-gray-100'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>

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
