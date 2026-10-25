import { Link } from 'react-router-dom';

export default function Home() {
  const featuredProjects = [
    {
      id: 'tigerair-card-upgrade',
      category: 'End-to-End Design & Development',
      title: 'Tigerair Card Upgrade',
      description: 'From card visuals to interactive web design, creating a travel-inspired experience that makes card benefits easier to explore.',
      imgSrc: '/images/tigerair.jpg',
      isStatic: true,
      staticUrl: '/tigerair/index.html'
    },
    {
      id: 'rakuten-card-campaign-page',
      category: 'Web UI & Front-end Development',
      title: 'Rakuten Card Campaign Page',
      description: 'Redesigning campaign discovery with clearer information architecture, featured banners, and interactive offer carousels.',
      imgSrc: '/images/campaign.jpg',
      isStatic: true,
      staticUrl: '/campaign-page/index.html'
    },
    {
      id: 'app-bill-installment-optimization',
      category: 'UI/UX DESIGN / APP DESIGN',
      title: 'APP BILL INSTALLMENT OPTIMIZATION',
      description: 'Clarifying a financial application flow through stronger visual hierarchy, step-by-step guidance, and structured disclosures.',
      imgSrc: '/images/bill.jpg',
      isStatic: true,
      staticUrl: '/bill/index.html'
    },
    {
      id: 'health-diary-app',
      category: 'UI/UX DESIGN / APP DESIGN',
      title: 'Health Diary App',
      description: 'Exploring how complex health data can become more approachable through intuitive visualizations and personalized health tracking.',
      imgSrc: '/images/health-diary.jpg',
      isStatic: true,
      staticUrl: '/health/index.html'
    },

    // ... 可以繼續新增第 3, 第 4 個專案
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">

      {/* 區塊 1：自我介紹 (RWD: 手機上下，桌機左右) */}
      <section className="flex flex-col md:flex-row items-center gap-12 mb-24">
        <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
          <img
            src="/images/profile.jpg"
            alt="My Profile"
            className="w-full h-full object-cover rounded-full shadow-lg"
          />
        </div>
        <div className="flex-1 text-left md:text-left">
          {/* 主標題 (稍微縮小底部間距，讓它跟副標更緊密) */}
          <h1 className="text-4xl font-bold mb-2">
            I turn complexity into clarity.
          </h1>

          {/* 新增的副標題 */}
          <h2 className="text-xl md:text-2xl text-gray-500 font-medium mb-6">
            Designed with intention. Built with code.
          </h2>

          {/* 原本的自我介紹 (加上 mb-8 推開與下方聯絡資訊的距離) */}
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            I’m a UI/UX Designer with a visual design background and front-end development skills. <br/>I turn complex information into intuitive experiences, combining thoughtful design with code to bring ideas to life.
          </p>

          {/* 新增的聯絡資訊 */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-base text-gray-600">

            {/* 地點 */}
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">📍</span>
              <span>Taipei, Taiwan</span>
            </div>

            {/* 手機 */}
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">📱</span>
              <span>0972071510</span>
            </div>

            {/* 信箱 (加上 mailto 連結與 hover 效果) */}
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">✉️</span>
              <a
                href="mailto:tina111222@gmail.com"
                className="hover:text-black transition-colors"
              >
                tina111222@gmail.com
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 區塊 2：精選專案列表 */}
      <section>
        <h2 className="text-2xl font-bold mb-8 border-b pb-2">Featured Projects</h2>
        <div className="flex flex-col gap-16">
          {featuredProjects.map((project) => (
            <div key={project.id} className="flex flex-col md:flex-row gap-8 items-center bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden">

              {/* 專案圖片區 (模擬 frame.jpg 的左側滿版圖片) */}
              <div className="w-full md:w-3/5 h-64 md:h-96">
                <img
                  src={project.imgSrc}
                  alt={project.title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* 專案文字區 (模擬 frame.jpg 的右側文字與按鈕) */}
              <div className="w-full md:w-2/5 p-8 md:pr-12">
                <div className="text-xs font-semibold text-gray-400 tracking-wider mb-2">
                  {project.category}
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-8">
                  {project.description}
                </p>

                {/* 根據 isStatic 決定要用 a 標籤還是 Link 標籤 */}
                {project.isStatic ? (
                  <a
                    href={project.staticUrl}
                    className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors"
                  >
                    View Case Study
                  </a>
                ) : (
                  <a
                    href={project.staticUrl}
                    className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors"
                  >
                    View Case Study
                  </a>
                )}
              </div>

            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
