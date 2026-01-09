'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useStore } from '@/lib/store'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/lib/useToast'

export default function PreviewPage() {
  const { story, tagsInput } = useStore()
  const [index, setIndex] = useState(0)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()
  const { addToast } = useToast()

  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (story.messages.length === 0) {
      addToast('まずは会話を作ってからプレビューしてください！', 'error')
      router.replace('/create')
    }
  }, [story.messages.length, addToast, router])

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [index, story])

  const currentMessages = story.messages.slice(0, index + 1)
  const showEnd = index >= story.messages.length

  const handleTap = () => {
    if (!showEnd) {
      setIndex(prev => prev + 1)
    }
  }

  const handlePublish = async (visibility: 'public' | 'unlisted') => {
    if (story.messages.length === 0) {
      addToast('メッセージが1つもありません。\nまずは会話を入力してください！', 'error')
      return
    }
    setIsSaving(true)
    try {
      const tags = tagsInput
        .split(/[#,、，\s]+/)
        .map(t => t.trim())
        .filter(Boolean)
        .slice(0, 10)

      const { error } = await supabase.from('stories').upsert({
        id: story.id,
        title: story.title || '無題のストーリー',
        author: story.author || 'Anonymous',
        tags,
        is_listed: visibility === 'public',
        content: {
          characters: story.characters,
          messages: story.messages,
          theme: story.theme,
          tags,
        },
      })

      if (error) throw error

      router.push(`/s/${story.id}`)
    } catch (e) {
      console.error(e)
      addToast('共有用の保存に失敗しました', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div
      onClick={handleTap}
      className="min-h-screen bg-pop-cyan/20 cursor-pointer pb-20 flex flex-col"
    >
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-pop-pink/20 p-4 text-center shadow-sm shrink-0">
        <h1 className="font-bold text-gray-700 text-sm">プレビュー：{story.title || '（タイトル未設定）'}</h1>
        <p className="text-xs text-gray-400 mt-1">タップしてチャットを進められます</p>
      </div>

      <div className="max-w-[480px] mx-auto p-4 space-y-6 flex-1 flex flex-col justify-end w-full">
        <AnimatePresence>
          {currentMessages.map((msg) => {
            const char = story.characters.find(c => c.id === msg.characterId)
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

        {showEnd && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-pop-pink font-bold mb-2 text-sm">この内容で公開しますか？</p>

            <div className="space-y-2">
              <button
                type="button"
                disabled={isSaving}
                onClick={() => handlePublish('public')}
                className="w-full max-w-[260px] px-6 py-3 rounded-full bg-pop-pink text-white text-sm font-bold shadow-md hover:bg-pop-pink-light disabled:opacity-50 flex items-center justify-center gap-2 mx-auto"
              >
                みんなに公開して共有
              </button>
              <button
                type="button"
                disabled={isSaving}
                onClick={() => handlePublish('unlisted')}
                className="w-full max-w-[260px] px-6 py-3 rounded-full bg-white border border-pop-cyan/50 text-sm font-bold text-cyan-900 shadow-sm hover:bg-pop-cyan/10 disabled:opacity-50 flex items-center justify-center gap-2 mx-auto"
              >
                リンクを知っている人だけ（限定公開）
              </button>
            </div>

            <button
              type="button"
              onClick={() => router.push('/create')}
              className="w-full max-w-[260px] px-6 py-2.5 text-xs text-gray-500 hover:text-gray-700 mx-auto block"
            >
              まだ作り込む（編集に戻る）
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
