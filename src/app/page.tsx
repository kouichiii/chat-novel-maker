import Link from 'next/link'
import { MessageCircle, PenTool, Share2 } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-white to-pop-pink/10">

      <div className="mb-8 p-6 rounded-full bg-white shadow-lg border-4 border-pop-pink animate-bounce">
        <MessageCircle size={64} className="text-pop-pink" />
      </div>

      <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pop-pink to-pop-cyan bg-clip-text text-transparent mb-6">
        Chat Novel Maker
      </h1>

      <p className="text-xl text-gray-600 mb-12 max-w-lg leading-relaxed">
        タップで進むチャット小説を<br />簡単に作ってシェアしよう！
      </p>

      <Link
        href="/create"
        className="group relative px-8 py-4 bg-pop-pink text-white rounded-full text-xl font-bold hover:shadow-xl hover:scale-105 transition-all"
      >
        <span className="flex items-center gap-2">
          <PenTool /> 今すぐつくる
        </span>
        <div className="absolute inset-0 rounded-full border-4 border-white/30 group-hover:scale-110 transition-transform opacity-0 group-hover:opacity-100" />
      </Link>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
        {[
          { icon: PenTool, title: '簡単作成', desc: 'チャット画面でサクサク書ける' },
          { icon: MessageCircle, title: 'タップ読み', desc: '読者はタップして会話を進める' },
          { icon: Share2, title: 'すぐシェア', desc: 'URLを送るだけで誰でも読める' },
        ].map((feature, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-orange-50">
            <div className="w-12 h-12 bg-pop-cyan/20 rounded-full flex items-center justify-center mx-auto mb-4 text-cyan-600">
              <feature.icon size={24} />
            </div>
            <h3 className="font-bold text-gray-700 mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-500">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
