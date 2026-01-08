'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const FAQ_ITEMS = [
  {
    q: 'ログインや会員登録は必要ですか？',
    a: '不要です。そのまま「今すぐつくる」ボタンからチャット画面に進んで、すぐにネタを書き始められます。',
  },
  {
    q: 'スマホ以外でも使えますか？',
    a: 'PCやタブレットのブラウザからも利用できますが、スマホ縦画面での利用を一番想定してデザインしています。',
  },
  {
    q: '作ったストーリーはどうやってシェアしますか？',
    a: '作成画面で「プレビューして共有」を押すと、閲覧専用ページが開きます。そのページのURLをXやLINEなどに貼るだけでシェアできます。',
  },
  {
    q: '途中で下書きは保存されますか？',
    a: '自動保存はありません。「プレビューして共有」ボタンを押したタイミングでサーバーに1件として保存されます。ブラウザやタブを閉じる前に一度押しておくのがおすすめです。',
  },
]

export function LandingFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="w-full max-w-3xl mx-auto mt-16 md:mt-20 text-left">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">よくある質問</h2>
      <p className="text-sm text-gray-500 mb-4">気になるところをタップして確認できます。</p>
      <div className="space-y-2">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index
          return (
            <div
              key={item.q}
              className="bg-white rounded-2xl border border-orange-50 shadow-sm overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between px-4 py-3 gap-3 text-left"
                aria-expanded={isOpen}
              >
                <span className="text-sm md:text-base font-semibold text-gray-800">
                  {item.q}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-gray-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 pt-1 text-xs md:text-sm text-gray-600 border-t border-orange-50 bg-pop-pink/5">
                  {item.a}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
