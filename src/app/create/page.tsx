'use client'

import React, { useEffect } from 'react'
import { useStore } from '@/lib/store'
import { Plus, Save, Share, Settings, User, Send } from 'lucide-react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function CreatePage() {
    const { story, addMessage, updateMessage, removeMessage } = useStore()
    const router = useRouter()

    // Hydration fix for zustand persist (if we used it, but here just safe render)
    const [inputText, setInputText] = React.useState('')
    const [activeCharId, setActiveCharId] = React.useState(story.characters[0]?.id || '')
    const [mounted, setMounted] = React.useState(false) // Fix missing mounted state
    const [isSaving, setIsSaving] = React.useState(false)

    useEffect(() => setMounted(true), []) // Re-add effect

    // Update activeCharId if characters change and current selection is invalid
    useEffect(() => {
        const currentExists = story.characters.find(c => c.id === activeCharId)
        if (!currentExists && story.characters.length > 0) {
            setActiveCharId(story.characters[0].id)
        }
    }, [story.characters, activeCharId])

    const handleSend = () => {
        if (!inputText.trim() || !activeCharId) return
        addMessage(activeCharId, inputText)
        setInputText('')
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    const handleSave = async (redirect = false) => {
        setIsSaving(true)
        try {
            const { error } = await supabase.from('stories').upsert({
                id: story.id,
                title: story.title,
                author: story.author,
                content: {
                    characters: story.characters,
                    messages: story.messages,
                    theme: story.theme
                }
            })

            if (error) throw error

            if (redirect) {
                router.push(`/s/${story.id}`)
            } else {
                alert('保存しました！')
            }
        } catch (e) {
            console.error(e)
            alert('保存に失敗しました')
        } finally {
            setIsSaving(false)
        }
    }

    if (!mounted) return null

    return (
        <div className="min-h-screen p-4 md:p-8 flex gap-6 max-w-6xl mx-auto">
            {/* LEFT PANEL: Settings & Characters */}
            <div className="hidden md:flex flex-col w-1/3 gap-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border-2 border-pop-pink-light">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-pop-pink">
                        <Settings size={24} /> 設定
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold mb-1">タイトル</label>
                            <input
                                value={story.title}
                                onChange={(e) => useStore.getState().setTitle(e.target.value)}
                                className="w-full p-3 rounded-xl border-2 border-pop-pink-light focus:outline-none focus:border-pop-pink transition-colors bg-pop-pink/5"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">作者名</label>
                            <input
                                value={story.author}
                                onChange={(e) => useStore.getState().setAuthor(e.target.value)}
                                className="w-full p-3 rounded-xl border-2 border-pop-pink-light focus:outline-none focus:border-pop-pink transition-colors bg-pop-pink/5"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border-2 border-pop-pink-light flex-1">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold flex items-center gap-2 text-pop-pink">
                            <User size={24} /> 登場人物
                        </h2>
                        <button
                            onClick={() => useStore.getState().addCharacter('新キャラ', '#FFF9C4')}
                            className="p-2 bg-pop-pink text-white rounded-full hover:scale-105 transition-transform"
                        >
                            <Plus size={20} />
                        </button>
                    </div>

                    <div className="space-y-3">
                        {story.characters.map((char) => (
                            <div key={char.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                                <div
                                    className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                                    style={{ backgroundColor: char.color }}
                                />
                                <input
                                    value={char.name}
                                    onChange={(e) => useStore.getState().updateCharacter(char.id, { name: e.target.value })}
                                    className="bg-transparent font-bold text-gray-700 focus:outline-none w-full"
                                />
                                <button
                                    onClick={() => useStore.getState().removeCharacter(char.id)}
                                    className="text-gray-400 hover:text-red-400 text-xs font-bold px-2"
                                >
                                    削除
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* RIGHT PANEL: Preview / Editor */}
            <div className="flex-1 flex flex-col items-center">
                <div className="w-full max-w-[400px] h-[800px] bg-white rounded-[40px] border-8 border-gray-100 shadow-xl overflow-hidden flex flex-col relative">
                    {/* Phone Header */}
                    <div className="h-14 bg-white/90 flex items-center justify-center border-b border-pop-cyan/20 shrink-0 backdrop-blur-md">
                        <h3 className="font-bold text-cyan-900 truncate px-4">{story.title}</h3>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-pop-cyan/20">
                        {story.messages.map((msg) => {
                            const char = story.characters.find(c => c.id === msg.characterId)
                            const isMe = msg.characterId === story.characters[0]?.id

                            return (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={msg.id}
                                    className={`flex gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}
                                >
                                    {!isMe && (
                                        <div
                                            className="w-10 h-10 rounded-full shrink-0 border border-black/5"
                                            style={{ backgroundColor: char?.color || '#ddd' }}
                                        />
                                    )}
                                    <div className="group relative max-w-[70%]">
                                        {/* Keeping textarea here for editing AFTER send, but primary input is at bottom */}
                                        <textarea
                                            value={msg.text}
                                            onChange={(e) => {
                                                updateMessage(msg.id, e.target.value)
                                                e.target.style.height = 'auto'
                                                e.target.style.height = e.target.scrollHeight + 'px'
                                            }}
                                            ref={(el) => {
                                                if (el) {
                                                    el.style.height = 'auto'
                                                    el.style.height = el.scrollHeight + 'px'
                                                }
                                            }}
                                            className={`w-full resize-none overflow-hidden outline-none p-3 rounded-2xl text-sm leading-relaxed
                                                ${isMe
                                                    ? 'bg-pop-green text-white rounded-tr-sm placeholder-white/70'
                                                    : 'bg-white text-gray-800 rounded-tl-sm border border-gray-100 placeholder-gray-400'
                                                }`}
                                            rows={1}
                                        />

                                        {/* Edit Controls */}
                                        <div className="absolute -bottom-6 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 right-0 bg-white/80 p-1 rounded-full shadow-sm text-xs z-10">
                                            <button onClick={() => removeMessage(msg.id)} className="text-red-500 font-bold px-2">削除</button>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                        <div ref={(el) => {
                            if (el) {
                                el.scrollIntoView({ behavior: 'smooth' })
                            }
                        }} className="h-4" />
                    </div>

                    {/* Input Area (New LINE-style) */}
                    <div className="h-auto bg-white border-t border-pop-cyan/20 p-3 shrink-0">
                        {/* 1. Character Selector */}
                        <div className="flex gap-2 mb-2 overflow-x-auto pb-2 scrollbar-hide">
                            {story.characters.map((char) => (
                                <button
                                    key={char.id}
                                    onClick={() => setActiveCharId(char.id)}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold transition-all shrink-0
                                        ${activeCharId === char.id
                                            ? 'bg-pop-pink text-white border-pop-pink shadow-md scale-105'
                                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="w-4 h-4 rounded-full border border-black/10" style={{ backgroundColor: char.color }} />
                                    {char.name}
                                </button>
                            ))}
                        </div>

                        {/* 2. Text Input Row */}
                        <div className="flex items-end gap-2 bg-gray-100 p-2 rounded-3xl">
                            <textarea
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="メッセージを入力..."
                                rows={1}
                                className="flex-1 bg-transparent border-none outline-none text-sm px-2 py-2 resize-none max-h-24"
                                style={{ minHeight: '24px' }}
                            />
                            <button
                                onClick={handleSend}
                                disabled={!inputText.trim()}
                                className="p-2 bg-pop-cyan text-cyan-900 rounded-full font-bold hover:bg-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send size={20} />
                                {/* Sending Icon (Paper plane is better but using generic or lucide if available in scope. User asked for LINE style, LINE uses paper plane arrow) */}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Global Action Bar */}
                <div className="mt-6 flex gap-4">
                    <button
                        onClick={() => handleSave(false)}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-pop-pink text-pop-pink font-bold rounded-full hover:bg-pop-pink hover:text-white transition-colors disabled:opacity-50"
                    >
                        <Save size={20} /> {isSaving ? '保存中...' : '保存する'}
                    </button>
                    <button
                        onClick={() => handleSave(true)}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-6 py-3 bg-pop-cyan text-cyan-900 font-bold rounded-full shadow-md hover:shadow-lg hover:-translate-y-1 transition-all disabled:opacity-50"
                    >
                        <Share size={20} /> 公開する
                    </button>
                </div>
            </div>
        </div>
    )
}
