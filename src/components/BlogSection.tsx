import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  User, 
  ChevronLeft, 
  X, 
  Tag 
} from 'lucide-react';
import { BlogPost } from '../types';
import { BLOG_POSTS_DATA } from '../siteConfig';

export const BlogSection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const allTags = Array.from(new Set(BLOG_POSTS_DATA.flatMap((p) => p.tags)));

  const filteredPosts = BLOG_POSTS_DATA.filter((post) => {
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
    const matchesSearch = searchQuery
      ? post.title.includes(searchQuery) || post.summary.includes(searchQuery)
      : true;
    return matchesTag && matchesSearch;
  });

  return (
    <section id="blog" className="py-16 lg:py-24 bg-[#FBF9F5] border-b border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D8CEBF] bg-[#F3ECE4] px-4 py-1 text-xs font-bold text-amber-900 mb-3 shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-amber-700" />
            <span>پایگاه دانش، سئو و استانداردهای مهندسی</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight">
            مقالات تخصصی طراحی سوله و اسکلت فلزی
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            راهنماهای کاربردی کاهش هزینه ساخت، ضوابط مبحث ششم و دهم مقررات ملی، و راهکارهای مقاوم‌سازی لرزه‌ای
          </p>
        </div>

        {/* Tags & Search Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                selectedTag === null
                  ? 'bg-amber-700 text-white'
                  : 'bg-white text-stone-700 hover:bg-[#FAF8F5] border border-[#E0D5C7]'
              }`}
            >
              همه مقالات
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-amber-700 text-white'
                    : 'bg-white text-stone-600 hover:bg-[#FAF8F5] border border-[#E0D5C7]'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="جستجو در مقالات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl bg-white border border-[#E0D5C7] px-3.5 py-2 text-xs text-stone-900 placeholder-stone-400 focus:border-amber-700 focus:outline-none"
            />
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="rounded-3xl bg-white border border-[#E0D5C7] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer text-right"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden bg-stone-200">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur text-amber-900 text-[10px] font-bold shadow-sm">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-stone-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-amber-700" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-700" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-sm font-extrabold text-stone-900 group-hover:text-amber-800 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-stone-600 mt-2 line-clamp-3 leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F0E8DF] flex items-center justify-between text-xs text-amber-800 font-bold group-hover:text-amber-900">
                  <span>مطالعه کامل مقاله</span>
                  <ChevronLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Full Article Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border border-[#E0D5C7] rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-right relative max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl text-stone-900">
            
            <div className="flex items-center justify-between border-b border-[#F0E8DF] pb-4">
              <span className="px-3 py-1 rounded-full bg-[#F3ECE4] text-amber-900 text-xs font-bold">
                {selectedPost.category}
              </span>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-1.5 rounded-xl bg-[#F3ECE4] text-stone-600 hover:text-stone-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-black text-stone-900 leading-snug">
                {selectedPost.title}
              </h2>
              
              <div className="flex items-center gap-4 text-xs text-stone-500">
                <span className="flex items-center gap-1 font-semibold text-stone-800">
                  <User className="w-3.5 h-3.5 text-amber-700" />
                  {selectedPost.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-700" />
                  {selectedPost.date}
                </span>
              </div>
            </div>

            {/* Image Banner */}
            <div className="h-64 sm:h-72 rounded-2xl overflow-hidden bg-stone-200">
              <img
                src={selectedPost.imageUrl}
                alt={selectedPost.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Paragraphs */}
            <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-loose">
              {selectedPost.content.map((paragraph, idx) => (
                <p key={idx} className="text-justify">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tags in modal */}
            <div className="pt-4 border-t border-[#F0E8DF] flex flex-wrap items-center gap-2">
              <span className="text-xs text-stone-500 flex items-center gap-1">
                <Tag className="w-3 h-3 text-amber-700" />
                کلمات کلیدی:
              </span>
              {selectedPost.tags.map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#EBE3D8] text-[11px] text-stone-700">
                  #{t}
                </span>
              ))}
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
