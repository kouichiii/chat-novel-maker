
'use client'

import React, { useEffect } from 'react'
import { useStore } from '@/lib/store'
import { Plus, Settings, User, Send, Play } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { LIMITS } from '@/lib/constants'
import { useToast } from '@/lib/useToast'

export default function CreatePage() {
    const { story, addMessage, updateMessage, removeMessage, tagsInput, setTagsInput } = useStore()
    const router = useRouter()
    const { addToast } = useToast()

    // Hydration fix for zustand persist (if we used it, but here just safe render)
    const [inputText, setInputText] = React.useState('')
    const [activeCharId, setActiveCharId] = React.useState(story.characters[0]?.id || '')
    const [mounted, setMounted] = React.useState(false) // Fix missing mounted state

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
        if (story.messages.length >= LIMITS.MAX_MESSAGES) {
            addToast(`メッセージは最大${LIMITS.MAX_MESSAGES}件までです`, 'error')
            return
        }
        addMessage(activeCharId, inputText)
        setInputText('')
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }
    const [showMobileSettings, setShowMobileSettings] = React.useState(false)

    if (!mounted) return null

        return (
		<div className="min-h-dvh md:p-8 flex gap-6 max-w-6xl mx-auto items-start justify-center">
            {/* LEFT PANEL: Settings & Characters (Desktop) */}
            <div className="hidden md:flex flex-col w-1/3 gap-6 sticky top-8">
                <div className="bg-white p-6 rounded-3xl shadow-sm border-2 border-pop-pink-light">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-pop-pink">
                        <Settings size={24} /> 設定
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold mb-1">
                                タイトル <span className="text-xs font-normal text-gray-400">({story.title.length}/{LIMITS.TITLE_MAX_LENGTH})</span>
                            </label>
                            <input
                                value={story.title}
                                onChange={(e) => useStore.getState().setTitle(e.target.value)}
                                maxLength={LIMITS.TITLE_MAX_LENGTH}
                                className="w-full p-3 rounded-xl border-2 border-pop-pink-light focus:outline-none focus:border-pop-pink transition-colors bg-pop-pink/5 text-base"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">
                                作者名 <span className="text-xs font-normal text-gray-400">({story.author.length}/{LIMITS.AUTHOR_MAX_LENGTH})</span>
                            </label>
                            <input
                                value={story.author}
                                onChange={(e) => useStore.getState().setAuthor(e.target.value)}
                                maxLength={LIMITS.AUTHOR_MAX_LENGTH}
                                className="w-full p-3 rounded-xl border-2 border-pop-pink-light focus:outline-none focus:border-pop-pink transition-colors bg-pop-pink/5 text-base"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">
                                タグ <span className="text-xs font-normal text-gray-400">例: #職場, #彼女, #学校</span>
                            </label>
                            <input
                                value={tagsInput}
                                onChange={(e) => setTagsInput(e.target.value)}
                                placeholder="#職場 #彼女 #学校 など（スペース・カンマ区切り）"
                                className="w-full p-3 rounded-xl border-2 border-pop-pink-light focus:outline-none focus:border-pop-pink transition-colors bg-pop-pink/5 text-base"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border-2 border-pop-pink-light flex-1">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold flex items-center gap-2 text-pop-pink">
                            <User size={24} /> 登場人物 <span className="text-sm">({story.characters.length}/{LIMITS.MAX_CHARACTERS})</span>
                        </h2>
                        <button
                            onClick={() => {
                                if (story.characters.length >= LIMITS.MAX_CHARACTERS) {
                                    addToast(`登場人物は最大${LIMITS.MAX_CHARACTERS}人までです`, 'error')
                                    return
                                }
                                useStore.getState().addCharacter('新キャラ', '#FFF9C4')
                            }}
                            className="p-2 bg-pop-pink text-white rounded-full hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={story.characters.length >= LIMITS.MAX_CHARACTERS}
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
                                    maxLength={LIMITS.CHARACTER_NAME_MAX_LENGTH}
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
                    <div className="h-14 bg-white/90 flex items-center justify-between px-3 border-b border-pop-cyan/20 shrink-0 backdrop-blur-md relative z-10 gap-2">
                        {/* Mobile Settings Toggle */}
                        <button
                            onClick={() => setShowMobileSettings(true)}
                            className="md:hidden p-2 text-gray-400 hover:text-pop-pink hover:bg-pop-pink/10 rounded-full transition-colors shrink-0"
                        >
                            <Settings size={20} />
                        </button>

                        <h3 className="font-bold text-cyan-900 truncate text-center text-sm md:text-base absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[calc(100%-210px)] md:max-w-xs pointer-events-none">
                            {story.title || '（タイトル未設定）'}
                        </h3>

                        {/* Mobile Action Buttons */}
                        <div className="flex items-center gap-1 md:hidden shrink-0 ml-auto">
                            <button
                                onClick={() => {
                                    if (story.messages.length === 0) {
                                        addToast('メッセージが1つもありません。\nまずは会話を入力してください！', 'error')
                                        return
                                    }
                                    router.push('/preview')
                                }}
                                className="px-3 py-1.5 bg-pop-pink text-white rounded-full font-bold shadow-sm hover:bg-pop-pink-light transition-colors text-xs flex items-center gap-1"
                            >
                                <Play size={14} fill="currentColor" /> プレビュー
                            </button>
                        </div>

                        <div className="w-9 hidden md:block" />
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
                                            maxLength={LIMITS.MESSAGE_MAX_LENGTH}
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
                                maxLength={LIMITS.MESSAGE_MAX_LENGTH}
                                placeholder={`メッセージ (${LIMITS.MESSAGE_MAX_LENGTH}文字以内)...`}
                                rows={1}
                                className="flex-1 bg-transparent border-none outline-none text-base px-2 py-2 resize-none max-h-24"
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

                {/* Global Action Bar */}
                <div className="hidden md:flex mt-6">
                    <button
                        onClick={() => {
                            if (story.messages.length === 0) {
                                addToast('メッセージが1つもありません。\nまずは会話を入力してください！', 'error')
                                return
                            }
                            router.push('/preview')
                        }}
                        className="flex items-center gap-2 px-8 py-4 bg-pop-pink text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all text-lg animate-wiggle"
                    >
                        <Play size={24} fill="currentColor" /> プレビューを見る
                    </button>
                </div>
            </div>

            {/* Mobile Settings Modal */}
            <AnimatePresence>
                {showMobileSettings && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden flex items-end sm:items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                    >
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'tween', duration: 0.18, ease: 'easeOut' }}
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
                                        <label className="block text-sm font-bold mb-1 text-gray-500">
                                            タイトル <span className="text-xs font-normal">({story.title.length}/{LIMITS.TITLE_MAX_LENGTH})</span>
                                        </label>
                                        <input
                                            value={story.title}
                                            onChange={(e) => useStore.getState().setTitle(e.target.value)}
                                            maxLength={LIMITS.TITLE_MAX_LENGTH}
                                            className="w-full p-3 rounded-xl border-2 border-pop-pink-light bg-pop-pink/5"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold mb-1 text-gray-500">
                                            作者名 <span className="text-xs font-normal">({story.author.length}/{LIMITS.AUTHOR_MAX_LENGTH})</span>
                                        </label>
                                        <input
                                            value={story.author}
                                            onChange={(e) => useStore.getState().setAuthor(e.target.value)}
                                            maxLength={LIMITS.AUTHOR_MAX_LENGTH}
                                            className="w-full p-3 rounded-xl border-2 border-pop-pink-light bg-pop-pink/5"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold mb-1 text-gray-500">
                                            タグ <span className="text-xs font-normal">例: #職場, #彼女, #学校</span>
                                        </label>
                                        <input
                                            value={tagsInput}
                                            onChange={(e) => setTagsInput(e.target.value)}
                                            placeholder="#職場 #彼女 #学校 など（スペース・カンマ区切り）"
                                            className="w-full p-3 rounded-xl border-2 border-pop-pink-light bg-pop-pink/5 text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-bold text-gray-700">登場人物 ({story.characters.length}/{LIMITS.MAX_CHARACTERS})</h3>
                                        <button
                                            onClick={() => {
                                                if (story.characters.length >= LIMITS.MAX_CHARACTERS) {
                                                    alert(`登場人物は最大${LIMITS.MAX_CHARACTERS}人までです`)
                                                    return
                                                }
                                                useStore.getState().addCharacter('新キャラ', '#FFF9C4')
                                            }}
                                            disabled={story.characters.length >= LIMITS.MAX_CHARACTERS}
                                            className="p-2 bg-pop-pink text-white rounded-full scale-90 disabled:opacity-50"
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
                                                    maxLength={LIMITS.CHARACTER_NAME_MAX_LENGTH}
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

                                <div className="pt-6">
                                    <button
                                        onClick={() => {
                                            if (story.messages.length === 0) {
                                                addToast('メッセージが1つもありません。\nまずは会話を入力してください！', 'error')
                                                return
                                            }
                                            setShowMobileSettings(false)
                                            router.push('/preview')
                                        }}
                                        className="w-full p-4 bg-pop-pink text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-md hover:opacity-90 transition-opacity"
                                    >
                                        <Play size={20} fill="currentColor" /> プレビューを見る
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
