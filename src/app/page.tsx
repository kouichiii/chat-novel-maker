import Link from 'next/link'
import { MessageCircle, PenTool, Share2, Crown } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 text-center bg-gradient-to-b from-white to-pop-pink/10 pb-20 md:pb-8">

      <div className="mb-6 md:mb-8 p-4 md:p-6 rounded-full bg-white shadow-lg border-4 border-pop-pink animate-bounce mt-10 md:mt-0">
        <MessageCircle size={48} className="text-pop-pink md:w-16 md:h-16" />
      </div>

      <h1 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-pop-pink to-pop-cyan bg-clip-text text-transparent mb-4 md:mb-6 leading-tight">
        Chat Novel Maker
      </h1>

      <p className="text-base md:text-xl text-gray-600 mb-8 md:mb-12 max-w-lg leading-relaxed">
        タップで進むチャット小説を<br />簡単に作ってシェアしよう！
      </p>

      <div className="hidden md:block text-pop-pink font-bold mb-4 animate-bounce">
        ＼ 登録不要ですぐ作れる ／
      </div>

      {/* Desktop Button */}
      <Link
        href="/create"
        className="hidden md:inline-flex group relative px-8 py-4 bg-pop-pink text-white rounded-full text-xl font-bold hover:shadow-xl hover:scale-105 transition-all"
      >
        <span className="flex items-center gap-2">
          <PenTool /> 今すぐつくる
        </span>
        <div className="absolute inset-0 rounded-full border-4 border-white/30 group-hover:scale-110 transition-transform opacity-0 group-hover:opacity-100" />
      </Link>

      {/* Mobile Sticky Button */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-50">
        <div className="absolute -top-10 left-0 right-0 text-center pointer-events-none">
          <span className="bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-pop-pink font-bold shadow-md text-sm border-2 border-pop-pink/50 inline-block animate-bounce">
            登録不要！
          </span>
        </div>
        <Link
          href="/create"
          className="flex items-center justify-center gap-2 w-full py-4 bg-pop-pink text-white rounded-full text-lg font-bold shadow-xl border-4 border-white/20 animate-wiggle"
        >
          <PenTool size={20} /> 今すぐつくる
        </Link>
      </div>

      <div className="mt-12 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-4xl w-full">
        {[
          { icon: PenTool, title: '簡単作成', desc: 'チャット画面でサクサク書ける' },
          { icon: MessageCircle, title: 'タップ読み', desc: '読者はタップして会話を進める' },
          { icon: Share2, title: 'すぐシェア', desc: 'URLを送るだけで誰でも読める' },
        ].map((feature, i) => (
          <div key={i} className="bg-white p-5 md:p-6 rounded-3xl shadow-sm border border-orange-50">
            <div className="w-12 h-12 bg-pop-cyan/20 rounded-full flex items-center justify-center mx-auto mb-4 text-cyan-600">
              <feature.icon size={24} />
            </div>
            <h3 className="font-bold text-gray-700 mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-500">{feature.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 md:mt-10">
        <Link
          href="/ranking"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-pop-pink/40 text-pop-pink text-sm font-bold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
        >
          <Crown size={16} /> みんなのネタランキングを見る
        </Link>
      </div>

      <div className="mt-12 text-gray-400 text-xs text-center md:hidden">
        Created by Chat Novel Maker Team
      </div>
    </div>
  )
}
