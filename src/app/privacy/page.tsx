import Link from 'next/link'

export const metadata = {
  title: 'プライバシーポリシー | ノベトーク',
  description: 'ノベトークのプライバシーポリシーです。',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen px-4 py-8 md:px-8 md:py-12 bg-gradient-to-b from-white to-pop-pink/10 flex justify-center">
      <div className="w-full max-w-3xl bg-white/90 backdrop-blur rounded-3xl shadow-sm border border-orange-50 p-5 md:p-8 text-left text-sm md:text-base text-gray-800">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">プライバシーポリシー</h1>
        <p className="text-xs text-gray-500 mb-6">最終更新日: 2026年1月8日</p>

        <section className="space-y-4 md:space-y-5">
          <p>
            本プライバシーポリシーは、本サービスの提供者（以下「運営者」といいます。）が提供する「ノベトーク」（以下「本サービス」といいます。）における、利用者の情報の取り扱い方針を定めるものです。
          </p>

          <div>
            <h2 className="font-bold mb-1">第1条（取得する情報）</h2>
            <p className="mb-1">本サービスは、主に次の情報を取得する場合があります。</p>
            <ul className="list-disc list-inside space-y-1 text-sm md:text-base">
              <li>利用者が本サービス上で入力するテキスト（作成したチャット形式のストーリー等）</li>
              <li>アクセス日時、閲覧したページ、ブラウザや端末の種類などのアクセスログ</li>
              <li>広告配信やアクセス解析ツールを利用する場合、それらのツールが取得するクッキー情報等</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold mb-1">第2条（情報の利用目的）</h2>
            <p className="mb-1">運営者は、取得した情報を以下の目的のために利用します。</p>
            <ul className="list-disc list-inside space-y-1 text-sm md:text-base">
              <li>本サービスの提供・維持・改善のため</li>
              <li>不具合対応やセキュリティ対策のため</li>
              <li>本サービスの利用状況の把握・統計データの作成のため</li>
              <li>広告表示やその効果測定のため（将来的に広告を導入する場合を含みます）</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold mb-1">第3条（クッキー等の利用）</h2>
            <p>
              本サービスでは、アクセス解析や広告配信のためにクッキー（Cookie）等の技術を利用する場合があります。利用者は、ブラウザの設定を変更することによりクッキーの受け取りを拒否することができますが、その場合、本サービスの一部機能が正しく動作しない可能性があります。
            </p>
          </div>

          <div>
            <h2 className="font-bold mb-1">第4条（情報の第三者提供）</h2>
            <p>
              運営者は、次のいずれかに該当する場合を除き、利用者の情報を第三者に提供しません。
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm md:text-base mt-1">
              <li>法令に基づく場合</li>
              <li>人の生命・身体または財産の保護のために必要がある場合で、本人の同意を得ることが困難なとき</li>
              <li>本サービスの運営に必要な範囲で業務委託先に提供する場合（サーバー事業者等）</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold mb-1">第5条（情報の管理）</h2>
            <p>
              運営者は、利用者の情報が漏えい・滅失・改ざん等されないよう、合理的な範囲で安全管理措置を講じます。ただし、インターネット上の通信の性質上、完全な安全性を保証するものではありません。
            </p>
          </div>

          <div>
            <h2 className="font-bold mb-1">第6条（外部サービスの利用）</h2>
            <p>
              本サービスでは、アクセス解析ツールや広告配信サービス等の外部サービスを利用する場合があります。これらのサービスによる情報の取得・利用については、各サービス提供者のプライバシーポリシーをご確認ください。
            </p>
          </div>

          <div>
            <h2 className="font-bold mb-1">第7条（未成年の利用者の情報）</h2>
            <p>
              未成年の利用者が本サービスを利用する場合は、保護者の方にも本ポリシーの内容をご確認いただき、適切なご判断のもとご利用ください。
            </p>
          </div>

          <div>
            <h2 className="font-bold mb-1">第8条（ポリシーの変更）</h2>
            <p>
              運営者は、必要に応じて本ポリシーの内容を変更することができます。重要な変更を行う場合には、本サービス上での表示その他適切な方法でお知らせします。
            </p>
          </div>

          <div>
            <h2 className="font-bold mb-1">第9条（お問い合わせ窓口）</h2>
            <p>
              本ポリシーに関するお問い合わせは、運営者が別途指定するお問い合わせ方法（Xアカウント、メールフォーム等）によりご連絡ください。
            </p>
          </div>
        </section>

        <div className="mt-8 text-xs text-gray-500">
          <p className="mb-2">
            ※本ページの内容は、将来の機能追加や運営形態の変更に応じて見直されることがあります。実際の運用に合わせて適宜更新してください。
          </p>
        </div>

        <div className="mt-8">
          <Link href="/" className="inline-flex text-sm text-pop-pink hover:underline">
            ← トップページに戻る
          </Link>
        </div>
      </div>
    </main>
  )
}
