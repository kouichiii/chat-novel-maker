import Link from 'next/link'

export const metadata = {
  title: '利用規約 | ノベトーク',
  description: 'ノベトークの利用規約です。',
}

export default function TermsPage() {
  return (
    <main className="min-h-screen px-4 py-8 md:px-8 md:py-12 bg-gradient-to-b from-white to-pop-pink/10 flex justify-center">
      <div className="w-full max-w-3xl bg-white/90 backdrop-blur rounded-3xl shadow-sm border border-orange-50 p-5 md:p-8 text-left text-sm md:text-base text-gray-800">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">利用規約</h1>
        <p className="text-xs text-gray-500 mb-6">最終更新日: 2026年1月8日</p>

        <section className="space-y-4 md:space-y-5">
          <p>
            この利用規約（以下「本規約」といいます。）は、本サービスの提供者（以下「運営者」といいます。）が提供する「ノベトーク」（以下「本サービス」といいます。）の利用条件を定めるものです。本サービスを利用される前に、本規約をよくお読みください。
          </p>

          <div>
            <h2 className="font-bold mb-1">第1条（適用）</h2>
            <p>
              本規約は、本サービスの利用に関する運営者と利用者との一切の関係に適用されます。利用者は、本サービスを実際に利用した時点で、本規約に同意したものとみなされます。
            </p>
          </div>

          <div>
            <h2 className="font-bold mb-1">第2条（利用環境）</h2>
            <p>
              本サービスはブラウザ上で提供されます。利用者は、自らの責任と費用において、本サービスを利用するために必要な通信機器、通信回線、ソフトウェア、ブラウザ環境等を準備し、維持するものとします。
            </p>
          </div>

          <div>
            <h2 className="font-bold mb-1">第3条（アカウント登録）</h2>
            <p>
              本サービスは、現時点では会員登録やログインなしで利用できます。今後、機能追加等によりアカウント機能が導入される場合には、その際に別途条件を定めることがあります。
            </p>
          </div>

          <div>
            <h2 className="font-bold mb-1">第4条（禁止事項）</h2>
            <p className="mb-1">利用者は、本サービスの利用にあたり、以下の行為を行ってはなりません。</p>
            <ul className="list-disc list-inside space-y-1 text-sm md:text-base">
              <li>法令または公序良俗に違反する行為</li>
              <li>第三者または運営者の権利・名誉・プライバシー等を侵害する行為</li>
              <li>差別的・過度に暴力的・わいせつ・児童ポルノ等、公序良俗に反する内容を投稿する行為</li>
              <li>他人になりすます行為</li>
              <li>本サービスの運営を妨害するおそれのある行為</li>
              <li>本サービスの不具合を意図的に利用する行為</li>
              <li>その他、運営者が不適切と判断する行為</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold mb-1">第5条（コンテンツの取り扱い）</h2>
            <p className="mb-1">
              利用者が本サービス上で作成・投稿したテキスト等のコンテンツ（以下「ユーザーコンテンツ」といいます。）の著作権は、原則として当該利用者に帰属します。ただし、運営者は、本サービスの運営・改善・不具合対応のために必要な範囲で、ユーザーコンテンツを閲覧・一時的に保存・表示・バックアップすることができます。
            </p>
            <p>
              利用者は、自らが投稿するユーザーコンテンツについて、第三者の権利を侵害していないことを保証し、万一紛争が生じた場合でも自らの責任と費用においてこれを解決するものとします。
            </p>
          </div>

          <div>
            <h2 className="font-bold mb-1">第6条（広告の表示）</h2>
            <p>
              本サービスでは、将来的に広告を表示する場合があります。利用者は、本サービスの一部として広告が表示され得ることについて、あらかじめ了承するものとします。
            </p>
          </div>

          <div>
            <h2 className="font-bold mb-1">第7条（サービスの変更・中断・終了）</h2>
            <p className="mb-1">
              運営者は、以下のいずれかに該当する場合、利用者に事前に通知することなく、本サービスの全部または一部の提供を変更・中断・終了することができます。
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm md:text-base">
              <li>本サービスに係るシステムの保守点検・更新を行う場合</li>
              <li>火災・停電・天災地変等の不可抗力により、本サービスの提供が困難となった場合</li>
              <li>その他、運営者がやむを得ないと判断した場合</li>
            </ul>
            <p>
              運営者は、本サービスの変更・中断・終了により利用者に生じた損害について、一切の責任を負いません。
            </p>
          </div>

          <div>
            <h2 className="font-bold mb-1">第8条（免責事項）</h2>
            <p className="mb-1">
              運営者は、本サービスが常に正確かつ安全に提供されるよう努めますが、本サービスにバグや不具合、セキュリティ上の問題その他の不備が存在しないことを保証するものではありません。
            </p>
            <p>
              本サービスの利用に関連して利用者に生じた損害について、運営者は、運営者に故意または重過失がある場合を除き、一切の責任を負いません。
            </p>
          </div>

          <div>
            <h2 className="font-bold mb-1">第9条（規約の変更）</h2>
            <p>
              運営者は、必要に応じて本規約を変更することができます。本規約を変更する場合、その内容と効力発生日を本サービス上での表示その他適切な方法で周知し、効力発生日以降に本サービスを利用した利用者は、変更後の規約に同意したものとみなします。
            </p>
          </div>

          <div>
            <h2 className="font-bold mb-1">第10条（お問い合わせ窓口）</h2>
            <p>
              本サービスに関するお問い合わせは、運営者が別途指定するお問い合わせ方法（Xアカウント、メールフォーム等）によりご連絡ください。
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
