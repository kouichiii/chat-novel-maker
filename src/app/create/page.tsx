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

    const [showMobileSettings, setShowMobileSettings] = React.useState(false)

    if (!mounted) return null

    return (
        <div className="min-h-screen md:p-8 flex gap-6 max-w-6xl mx-auto items-start justify-center">
            {/* LEFT PANEL: Settings & Characters (Desktop) */}
            <div className="hidden md:flex flex-col w-1/3 gap-6 sticky top-8">
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

                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                        {story.characters.map((char) => (
                            <div key={char.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                                <div
                                    className="w-10 h-10 rounded-full border-2 border-white shadow-sm shrink-0"
                                    style={{ backgroundColor: char.color }}
                                />
                                <input
                                    value={char.name}
                                    onChange={(e) => useStore.getState().updateCharacter(char.id, { name: e.target.value })}
                                    className="bg-transparent font-bold text-gray-700 focus:outline-none w-full min-w-0"
                                />
                                <button
                                    onClick={() => useStore.getState().removeCharacter(char.id)}
                                    className="text-gray-400 hover:text-red-400 text-xs font-bold px-2 shrink-0"
                                >
                                    削除
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* MAIN PANEL: Preview / Editor */}
            <div className="flex-1 flex flex-col items-center w-full">
                {/* Phone Frame */}
                <div className="w-full h-[100dvh] md:h-[800px] md:max-w-[400px] bg-white md:rounded-[40px] md:border-8 md:border-gray-100 shadow-xl overflow-hidden flex flex-col relative">

                    {/* Header */}
                    <div className="h-14 bg-white/90 flex items-center justify-between px-4 border-b border-pop-cyan/20 shrink-0 backdrop-blur-md relative z-10">
                        {/* Mobile Settings Toggle */}
                        <button
                            onClick={() => setShowMobileSettings(true)}
                            className="md:hidden p-2 text-gray-400 hover:text-pop-pink hover:bg-pop-pink/10 rounded-full transition-colors"
                        >
                            <Settings size={20} />
                        </button>

                        <h3 className="font-bold text-cyan-900 truncate flex-1 text-center">{story.title}</h3>

                        <div className="w-9 md:hidden" /> {/* Spacer for center alignment */}
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-pop-cyan/20 scroll-smooth">
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
                                        <div className="absolute -bottom-6 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 right-0 bg-white/80 p-1 rounded-full shadow-sm text-xs z-10">
                                            <button onClick={() => removeMessage(msg.id)} className="text-red-500 font-bold px-2">削除</button>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                        <div ref={(el) => el?.scrollIntoView({ behavior: 'smooth' })} className="h-4" />
                    </div>

                    {/* Input Area */}
                    <div className="h-auto bg-white border-t border-pop-cyan/20 p-3 shrink-0 pb-safe">
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

                        <div className="flex items-end gap-2 bg-gray-100 p-2 rounded-3xl">
                            <textarea
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="メッセージ..."
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
                            </button>
                        </div>
                    </div>
                </div>

                {/* Global Action Bar (Desktop only, Mobile puts in Settings) */}
                <div className="hidden md:flex mt-6 gap-4">
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

            {/* Mobile Settings Modal */}
            {showMobileSettings && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden flex items-end sm:items-center justify-center">
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        className="bg-white w-full h-[85vh] rounded-t-[32px] p-6 flex flex-col gap-6 shadow-2xl"
                    >
                        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto shrink-0" />

                        <div className="flex justify-between items-center border-b pb-4">
                            <h2 className="text-xl font-bold text-pop-pink flex items-center gap-2"><Settings /> 設定</h2>
                            <button onClick={() => setShowMobileSettings(false)} className="text-gray-500 font-bold">閉じる</button>
                        </div>

                        <div className="overflow-y-auto space-y-8 flex-1 pb-10">
                            {/* Settings Content (Duplicated for simplicity or extract component) */}
                            <div className="space-y-4">
                                <h3 className="font-bold text-gray-700">基本情報</h3>
                                <div>
                                    <label className="block text-sm font-bold mb-1 text-gray-500">タイトル</label>
                                    <input
                                        value={story.title}
                                        onChange={(e) => useStore.getState().setTitle(e.target.value)}
                                        className="w-full p-3 rounded-xl border-2 border-pop-pink-light bg-pop-pink/5"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1 text-gray-500">作者名</label>
                                    <input
                                        value={story.author}
                                        onChange={(e) => useStore.getState().setAuthor(e.target.value)}
                                        className="w-full p-3 rounded-xl border-2 border-pop-pink-light bg-pop-pink/5"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-bold text-gray-700">登場人物</h3>
                                    <button
                                        onClick={() => useStore.getState().addCharacter('新キャラ', '#FFF9C4')}
                                        className="p-2 bg-pop-pink text-white rounded-full scale-90"
                                    >
                                        <Plus size={20} />
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {story.characters.map((char) => (
                                        <div key={char.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                                            <div
                                                className="w-10 h-10 rounded-full border-2 border-white shadow-sm shrink-0"
                                                style={{ backgroundColor: char.color }}
                                            />
                                            <input
                                                value={char.name}
                                                onChange={(e) => useStore.getState().updateCharacter(char.id, { name: e.target.value })}
                                                className="bg-transparent font-bold text-gray-700 w-full"
                                            />
                                            <button
                                                onClick={() => useStore.getState().removeCharacter(char.id)}
                                                className="text-red-400 text-xs font-bold shrink-0"
                                            >
                                                削除
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-6 grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => { setShowMobileSettings(false); handleSave(false); }}
                                    className="p-4 border-2 border-pop-pink text-pop-pink font-bold rounded-2xl flex items-center justify-center gap-2"
                                >
                                    <Save size={20} /> 保存
                                </button>
                                <button
                                    onClick={() => { setShowMobileSettings(false); handleSave(true); }}
                                    className="p-4 bg-pop-cyan text-cyan-900 font-bold rounded-2xl flex items-center justify-center gap-2 shadow-md"
                                >
                                    <Share size={20} /> 公開
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    )
}
