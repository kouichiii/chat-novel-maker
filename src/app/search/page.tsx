import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { Search, Eye } from 'lucide-react'

export const dynamic = 'force-dynamic'

const PAGE_SIZE = 20

type SearchedStory = {
  id: string
  title: string
  author: string | null
  created_at: string
  tags: string[] | null
  views: number | null
}

type SearchPageProps = {
  searchParams: Promise<{ q?: string; page?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q: rawQ = '', page: pageParam } = await searchParams
  const q = rawQ.trim()
  const currentPage = Math.max(1, Number(pageParam) || 1)

  let stories: SearchedStory[] = []
  let total = 0

  if (q) {
    const from = (currentPage - 1) * PAGE_SIZE
    const to = from + PAGE_SIZE - 1

    const { data, error, count } = await supabase
      .from('stories')
      .select('id, title, author, created_at, tags, views', { count: 'exact' })
      .ilike('title', `%${q}%`)
      .order('created_at', { ascending: false })
      .range(from, to)

    if (error) {
      console.error(error)
    } else if (data) {
      stories = data as SearchedStory[]
      total = count ?? 0
    }
  }

  return (
    <div className="min-h-screen bg-pop-cyan/10 pb-20">
      <div className="max-w-3xl mx-auto px-4 pt-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-pop-pink text-white flex items-center justify-center shadow-md">
            <Search size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">タイトル検索</h1>
            <p className="text-xs text-gray-500">キーワードを含むタイトルのストーリーを探せます</p>
          </div>
        </div>

        <form action="/search" method="get" className="flex gap-2 mb-4">
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="タイトルの一部を入力..."
            className="flex-1 px-3 py-2 rounded-xl border border-pop-pink/40 bg-white text-base focus:outline-none focus:ring-2 focus:ring-pop-pink/60"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-pop-pink text-white text-base font-bold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-1"
          >
            <Search size={16} /> 検索
          </button>
        </form>

        {!q && (
          <p className="text-xs text-gray-500">例: 「会社」, 「彼女」, 「学校」 など</p>
        )}

        {q && stories.length === 0 && (
          <p className="mt-4 text-sm text-gray-500">「{q}」を含むタイトルのストーリーは見つかりませんでした。</p>
        )}

        {q && stories.length > 0 && (
          <>
            <p className="mt-2 mb-3 text-xs text-gray-500">
              「{q}」の検索結果: {total}件中 {stories.length}件を表示
            </p>
            <ol className="space-y-3">
              {stories.map((story) => (
                <li
                  key={story.id}
                  className="bg-white rounded-2xl border border-orange-50 shadow-sm hover:shadow-md transition-shadow"
                >
                  <Link href={`/s/${story.id}`} className="block px-4 py-3">
                    <h2 className="text-sm font-bold text-gray-800 truncate">{story.title}</h2>
                    <p className="text-[11px] text-gray-500 mt-0.5 truncate">
                      {story.author || 'Anonymous'}
                    </p>

                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {story.tags?.slice(0, 5).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full bg-pop-cyan/15 text-[10px] text-cyan-800 border border-pop-cyan/30 max-w-[120px] truncate"
                        >
                          {tag.startsWith('#') ? tag : `#${tag}`}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-2">
                      <span className="inline-flex items-center gap-1">
                        <Eye size={12} />
                        <span>{story.views ?? 0}</span>
                      </span>
                      <span>·</span>
                      <span>
                        {new Date(story.created_at).toLocaleDateString('ja-JP', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ol>

            {total > PAGE_SIZE && (
              <div className="flex items-center justify-between mt-6 text-xs text-gray-500">
                <div>
                  ページ {currentPage} / {Math.ceil(total / PAGE_SIZE)}
                </div>
                <div className="flex gap-2">
                  {currentPage > 1 && (
                    <Link
                      href={`/search?q=${encodeURIComponent(q)}&page=${currentPage - 1}`}
                      className="px-3 py-1 rounded-full border border-gray-200 bg-white hover:bg-gray-50"
                    >
                      前へ
                    </Link>
                  )}
                  {currentPage * PAGE_SIZE < total && (
                    <Link
                      href={`/search?q=${encodeURIComponent(q)}&page=${currentPage + 1}`}
                      className="px-3 py-1 rounded-full border border-pop-pink/40 bg-pop-pink text-white hover:bg-pop-pink-light"
                    >
                      次へ
                    </Link>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
