import Link from 'next/link'
import { MessageCircle, PenTool, Share2, Crown } from 'lucide-react'
import { LandingFaq } from '@/components/LandingFaq'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8 text-center bg-gradient-to-b from-white to-pop-pink/10 pb-40 md:pb-12">

      <div className="mb-6 md:mb-8 p-4 md:p-6 rounded-full bg-white shadow-lg border-4 border-pop-pink animate-bounce mt-10 md:mt-0">
        <MessageCircle size={48} className="text-pop-pink md:w-16 md:h-16" />
      </div>

      <h1 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-pop-pink to-pop-cyan bg-clip-text text-transparent mb-4 md:mb-6 leading-tight">
        ノベトーク
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
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-pop-cyan text-cyan-900 text-sm md:text-base font-bold shadow-md border border-pop-cyan/60 hover:shadow-lg hover:-translate-y-0.5 hover:bg-cyan-300 transition-all animate-wiggle"
        >
          <Crown size={18} /> みんなのネタランキングを見る
        </Link>
      </div>

      {/* How it works */}
      <section className="mt-16 md:mt-20 w-full max-w-5xl text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6 text-left">
          使い方はかんたん3ステップ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* STEP 1 */}
          <div className="bg-white rounded-3xl shadow-sm border border-orange-50 p-4 flex flex-col gap-3">
            <div className="text-xs font-bold text-pop-pink uppercase tracking-widest">STEP 1</div>
            <h3 className="text-sm md:text-base font-bold text-gray-800">キャラを決めて会話を書く</h3>
            <p className="text-xs md:text-sm text-gray-600">
              「今すぐつくる」を押すと、スマホ風のチャット画面が開きます。左の設定パネルでタイトルと登場人物を決めて、下の入力欄から順番にメッセージを追加していきます。
            </p>
            <div className="mt-2 border border-gray-100 rounded-2xl bg-gray-50 p-3 text-left text-[11px] text-gray-500">
              <div className="text-[10px] font-semibold text-gray-600 mb-2">作成画面イメージ</div>
              <div className="flex gap-2 mb-2">
                <div className="w-20 h-14 rounded-2xl bg-white border border-pop-pink/30 flex flex-col justify-center items-center text-[10px] text-gray-500">
                  <div className="text-[9px] font-bold text-pop-pink mb-1">設定</div>
                  <div className="w-14 h-1.5 bg-pop-pink/20 rounded-full mb-1" />
                  <div className="w-12 h-1 bg-pop-pink/10 rounded-full" />
                </div>
                <div className="flex-1 h-14 rounded-2xl bg-pop-cyan/20 flex flex-col justify-between p-2 text-[9px]">
                  <div className="self-start max-w-[70%] rounded-2xl bg-white px-2 py-1">はじめまして！</div>
                  <div className="self-end max-w-[70%] rounded-2xl bg-pop-green text-white px-2 py-1">なにしてる？</div>
                </div>
              </div>
              <div>実際の画面と同じレイアウトで、そのままチャットを書くイメージです。</div>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="bg-white rounded-3xl shadow-sm border border-orange-50 p-4 flex flex-col gap-3">
            <div className="text-xs font-bold text-pop-pink uppercase tracking-widest">STEP 2</div>
            <h3 className="text-sm md:text-base font-bold text-gray-800">タップで読み心地を確認</h3>
            <p className="text-xs md:text-sm text-gray-600">
              「プレビューして共有」を押すと、読者と同じ「タップで進む」ビューア画面が開きます。1タップごとに吹き出しが増えていくので、テンポやオチのタイミングを確認できます。
            </p>
            <div className="mt-2 border border-gray-100 rounded-2xl bg-gray-50 p-3 text-left text-[11px] text-gray-500">
              <div className="text-[10px] font-semibold text-gray-600 mb-2">ビューア画面イメージ</div>
              <div className="mx-auto w-full max-w-[170px] rounded-3xl bg-white border border-gray-200 shadow-sm overflow-hidden">
                <div className="h-7 border-b border-pop-pink/20 flex items-center justify-center text-[10px] text-gray-700 font-semibold">
                  タイトル（読み取り専用）
                </div>
                <div className="h-28 bg-pop-cyan/20 p-2 flex flex-col justify-end gap-1">
                  <div className="self-start max-w-[75%] rounded-2xl bg-white text-[9px] px-2 py-1 shadow-sm">
                    さっきのメッセージ
                  </div>
                  <div className="self-end max-w-[75%] rounded-2xl bg-pop-green text-white text-[9px] px-2 py-1 shadow-sm">
                    タップで次へ…
                  </div>
                </div>
                <div className="py-1.5 text-[9px] text-center text-gray-400 border-t border-gray-100">
                  画面タップでメッセージが1つずつ増えていきます
                </div>
              </div>
            </div>
          </div>

          {/* STEP 3 */}
          <div className="bg-white rounded-3xl shadow-sm border border-orange-50 p-4 flex flex-col gap-3">
            <div className="text-xs font-bold text-pop-pink uppercase tracking-widest">STEP 3</div>
            <h3 className="text-sm md:text-base font-bold text-gray-800">URLを貼るだけでシェア</h3>
            <p className="text-xs md:text-sm text-gray-600">
              プレビュー画面の下にある「シェアする」ボタンから、URLコピーや共有メニューを開けます。X・LINE・Discordなど、好きな場所にリンクを貼るだけで友だちに読んでもらえます。
            </p>
            <div className="mt-2 border border-gray-100 rounded-2xl bg-gray-50 p-3 text-left text-[11px] text-gray-500">
              <div className="text-[10px] font-semibold text-gray-600 mb-2">シェア操作イメージ</div>
              <div className="flex flex-col gap-2">
                <div className="w-full max-w-[220px] mx-auto rounded-2xl bg-white border border-gray-200 p-2 text-[9px]">
                  <div className="h-5 rounded-xl bg-pop-cyan/20 flex items-center justify-center text-[9px] text-cyan-900 font-semibold mb-1">
                    シェアする
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-100 mb-1" />
                  <div className="h-1.5 rounded-full bg-gray-100 w-3/4" />
                </div>
                <div>URLをコピーして、XやLINEなどお好みのSNSにそのまま貼り付ければOKです。</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LandingFaq />

      <footer className="mt-16 md:mt-20 w-full max-w-5xl text-xs md:text-sm text-gray-400 flex flex-col md:flex-row items-center justify-between gap-2 border-t border-orange-50 pt-4 md:pt-6">
        <span>© {new Date().getFullYear()} ノベトーク</span>
        <div className="flex items-center gap-4">
          <Link href="/terms" className="hover:text-pop-pink underline-offset-2 hover:underline">
            利用規約
          </Link>
          <Link href="/privacy" className="hover:text-pop-pink underline-offset-2 hover:underline">
            プライバシーポリシー
          </Link>
        </div>
      </footer>
    </div>
  )
}
