import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { Crown, Eye, Search } from 'lucide-react'

export const dynamic = 'force-dynamic'

const PAGE_SIZE = 20

async function getRankedStories(page: number) {
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  const { data, error, count } = await supabase
    .from('stories')
    .select('id, title, author, created_at, tags, views', { count: 'exact' })
    .order('views', { ascending: false })
    .order('created_at', { ascending: false })
    .range(from, to)

  if (error) {
    console.error(error)
    return { stories: [] as RankedStory[], total: 0 }
  }

  return {
    stories: (data || []) as RankedStory[],
    total: count ?? 0,
  }
}

type RankedStory = {
  id: string
  title: string
  author: string | null
  created_at: string
  tags: string[] | null
  views: number | null
}

type RankingPageProps = {
  searchParams: Promise<{ page?: string }>
}

export default async function RankingPage({ searchParams }: RankingPageProps) {
  const { page: pageParam } = await searchParams
  const currentPage = Math.max(1, Number(pageParam) || 1)

  const { stories, total } = await getRankedStories(currentPage)
  const totalPages = total > 0 ? Math.ceil(total / PAGE_SIZE) : 1

  return (
    <div className="min-h-screen bg-pop-cyan/10 pb-20">
      <div className="max-w-3xl mx-auto px-4 pt-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-pop-pink text-white flex items-center justify-center shadow-md">
            <Crown size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">みんなのネタランキング</h1>
            <p className="text-xs text-gray-500">よく読まれている順に表示しています</p>
          </div>
        </div>

        <form action="/search" method="get" className="flex gap-2 mb-6">
          <input
            type="text"
            name="q"
            placeholder="タイトルで検索する..."
            className="flex-1 px-3 py-2 rounded-xl border border-pop-pink/40 bg-white text-base focus:outline-none focus:ring-2 focus:ring-pop-pink/60"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-pop-pink text-white text-base font-bold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-1"
          >
            <Search size={16} /> 検索
          </button>
        </form>

        {stories.length === 0 && (
          <p className="text-sm text-gray-500">まだランキングに表示できるネタがありません。</p>
        )}

        <ol className="space-y-3 mt-4">
          {stories.map((story, index) => (
            <li key={story.id} className="bg-white rounded-2xl border border-orange-50 shadow-sm hover:shadow-md transition-shadow">
              <Link href={`/s/${story.id}`} className="flex items-start gap-3 px-4 py-3">
                <div className="w-7 text-center font-bold text-pop-pink text-sm mt-1">
                  {index < 3 ? (
                    <span className="inline-block px-2 py-0.5 rounded-full bg-pop-pink text-white text-[11px] align-middle">#{index + 1}</span>
                  ) : (
                    <span className="text-gray-400">{index + 1}</span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h2 className="text-sm font-bold text-gray-800 truncate">{story.title}</h2>
                  <p className="text-[11px] text-gray-500 mt-0.5 truncate">
                    {story.author || 'Anonymous'}
                  </p>

                  {story.tags && story.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {story.tags.slice(0, 5).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full bg-pop-cyan/15 text-[10px] text-cyan-800 border border-pop-cyan/30 max-w-[120px] truncate"
                        >
                          {tag.startsWith('#') ? tag : `#${tag}`}
                        </span>
                      ))}
                    </div>
                  )}

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
                </div>
              </Link>
            </li>
          ))}
        </ol>

        {stories.length > 0 && (
          <div className="flex items-center justify-between mt-6 text-xs text-gray-500">
            <div>
              ページ {currentPage} / {totalPages}
            </div>
            <div className="flex gap-2">
              {currentPage > 1 && (
                <Link
                  href={currentPage > 2 ? `/ranking?page=${currentPage - 1}` : '/ranking'}
                  className="px-3 py-1 rounded-full border border-gray-200 bg-white hover:bg-gray-50"
                >
                  前へ
                </Link>
              )}
              {currentPage < totalPages && (
                <Link
                  href={`/ranking?page=${currentPage + 1}`}
                  className="px-3 py-1 rounded-full border border-pop-pink/40 bg-pop-pink text-white hover:bg-pop-pink-light"
                >
                  次へ
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
