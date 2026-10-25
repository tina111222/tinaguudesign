import { useRef, useState } from 'react';

const packagingSlides = Array.from({ length: 6 }, (_, index) => {
    const number = String(index + 1).padStart(2, '0');

    return {
        src: `/images/graphic-design/packaging-${number}.jpg`,
        alt: `NIU NAI TANG 包裝設計 ${number}`,
        title: `NIU NAI TANG — ${number}`,
        description: 'A closer look at the packaging concept, structure, and visual details.',
    };
});

// 自動取得資料夾內的 JPG 圖片
const rakutenImages = import.meta.glob(
    '/src/assets/graphic-design/rakuten/*.{jpg,jpeg,JPG,JPEG}',
    {
        eager: true,
        query: '?url',
        import: 'default',
    }
);

// 依照檔名排序，並轉換成輪播資料
const rakutenSlides = Object.entries(rakutenImages)
    .sort(([pathA], [pathB]) =>
        pathA.localeCompare(pathB, 'en', { numeric: true })
    )
    .map(([path, src], index) => {
        const filename = path.split('/').pop().replace(/\.[^.]+$/, '');

        return {
            src,
            alt: `樂天廣告設計 ${index + 1}`,
            title: filename,
            description: 'Campaign ads and digital banners for Rakuten Card.',
        };
    });

function Carousel({ slides, label }) {
    const [index, setIndex] = useState(0);
    const touchStartX = useRef(null);

    if (slides.length === 0) return null;

    const goTo = (nextIndex) => {
        setIndex((nextIndex + slides.length) % slides.length);
    };

    const slide = slides[index];

    return (
        <div
            role="region"
            aria-roledescription="carousel"
            aria-label={label}
            tabIndex={0}
            onKeyDown={(event) => {
                if (event.key === 'ArrowLeft') {
                    event.preventDefault();
                    goTo(index - 1);
                }

                if (event.key === 'ArrowRight') {
                    event.preventDefault();
                    goTo(index + 1);
                }
            }}
            className="
          flex h-[calc(100dvh-6rem)] min-h-0
          scroll-mt-20 flex-col overflow-hidden
          rounded-2xl border border-gray-200 bg-white
        "
        >
            {/* 圖片區：使用扣掉文字區後的剩餘高度 */}
            <div
                className="relative min-h-0 flex-1 bg-gray-100"
                onTouchStart={(event) => {
                    touchStartX.current = event.touches[0].clientX;
                }}
                onTouchEnd={(event) => {
                    if (touchStartX.current === null) return;

                    const distance =
                        touchStartX.current - event.changedTouches[0].clientX;

                    if (Math.abs(distance) > 50) {
                        goTo(distance > 0 ? index + 1 : index - 1);
                    }

                    touchStartX.current = null;
                }}
                onTouchCancel={() => {
                    touchStartX.current = null;
                }}
            >
                <img
                    src={slide.src}
                    alt={slide.alt}
                    draggable={false}
                    className="
              absolute inset-0 h-full w-full
              object-contain px-12 py-3
              sm:px-16 sm:py-5
            "
                />

                {slides.length > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={() => goTo(index - 1)}
                            aria-label="上一張"
                            className="
                  absolute left-2 top-1/2
                  flex h-9 w-9 -translate-y-1/2
                  items-center justify-center rounded-full
                  border border-gray-200 bg-white/95
                  text-lg text-gray-900 shadow-sm
                  hover:bg-gray-100
                  focus-visible:outline focus-visible:outline-2
                  focus-visible:outline-offset-2
                  sm:left-4
                "
                        >
                            <span aria-hidden="true">←</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => goTo(index + 1)}
                            aria-label="下一張"
                            className="
                  absolute right-2 top-1/2
                  flex h-9 w-9 -translate-y-1/2
                  items-center justify-center rounded-full
                  border border-gray-200 bg-white/95
                  text-lg text-gray-900 shadow-sm
                  hover:bg-gray-100
                  focus-visible:outline focus-visible:outline-2
                  focus-visible:outline-offset-2
                  sm:right-4
                "
                        >
                            <span aria-hidden="true">→</span>
                        </button>
                    </>
                )}
            </div>

            {/* 文字區：保留內容高度，不被圖片擠壓 */}
            <div className="shrink-0 border-t border-gray-100 px-5 py-3 sm:px-7 sm:py-4">
                <div aria-live="polite" aria-atomic="true">
                    <div className="flex items-baseline justify-between gap-4">
                        <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
                            {slide.title}
                        </h3>

                        <span className="shrink-0 text-xs tracking-widest text-gray-500">
                            {String(index + 1).padStart(2, '0')} /{' '}
                            {String(slides.length).padStart(2, '0')}
                        </span>
                    </div>

                    <p className="mt-1 text-sm leading-relaxed text-gray-600">
                        {slide.description}
                    </p>
                </div>

                {/* 小量圖片用圓點；大量圖片用下拉選單 */}
                {slides.length > 1 && (
                    <div className="mt-1">
                        {slides.length <= 8 ? (
                            <div
                                className="flex flex-wrap gap-3"
                                aria-label="選擇作品圖片"
                            >
                                {slides.map((item, slideIndex) => (
                                    <button
                                        key={item.src}
                                        type="button"
                                        onClick={() => goTo(slideIndex)}
                                        aria-label={`顯示第 ${slideIndex + 1} 張`}
                                        aria-current={
                                            slideIndex === index ? 'true' : undefined
                                        }
                                        className="
                        flex h-8 w-8 items-center justify-center
                        rounded-full focus-visible:outline
                        focus-visible:outline-2
                      "
                                    >
                                        <span
                                            className={`h-2 w-2 rounded-full ${slideIndex === index
                                                ? 'bg-gray-900'
                                                : 'bg-gray-300'
                                                }`}
                                        />
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <label className="flex min-h-8 items-center gap-2 text-xs text-gray-500">
                                選擇作品
                                <select
                                    value={index}
                                    onChange={(event) => goTo(Number(event.target.value))}
                                    className="
                      min-w-0 max-w-full rounded-md
                      border border-gray-200 bg-white
                      px-2 py-1 text-sm text-gray-700
                    "
                                >
                                    {slides.map((item, slideIndex) => (
                                        <option key={item.src} value={slideIndex}>
                                            {String(slideIndex + 1).padStart(2, '0')}
                                            {' — '}
                                            {item.title}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function GraphicDesign() {
    return (
        <div className="bg-[#fafaf9] text-gray-900">
            <div className="mx-auto max-w-6xl px-6 pb-24 pt-12 sm:pt-20">
                {/* 頁面開場 */}
                <header className="mb-16 max-w-2xl">
                    <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-gray-500">
                        Selected Visual Works
                    </p>

                    <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
                        Graphic Design
                    </h1>

                    <p className="mt-6 text-base leading-8 text-gray-600">
                        From packaging to advertising, I create visuals that express a brand’s identity and make key messages easy to understand.
                    </p>
                </header>

                {/* 上方：得獎包裝設計 */}
                <section aria-labelledby="packaging-heading">
                    <div className="mb-6">
                        <p className="mb-3 text-xs tracking-widest text-gray-500">
                            01 / PACKAGING DESIGN
                        </p>

                        <h2
                            id="packaging-heading"
                            className="text-2xl font-semibold sm:text-3xl"
                        >
                            Award-Winning Packaging Design
                        </h2>

                        <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600">
                            NIU NAI TANG｜Bringing a brand’s story to life through packaging, from the initial concept to the final design.
                        </p>

                        <div className="mt-4 flex items-start gap-3">
                            <span className="shrink-0 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
                                2023
                            </span>

                            <p className="text-sm font-medium leading-6 text-gray-700">
                                FA International Frontier Innovation Design Competition
                            </p>
                        </div>
                    </div>

                    <Carousel
                        slides={packagingSlides}
                        label="得獎包裝設計作品"
                    />
                </section>

                {/* 下方：樂天廣告 */}
                <section
                    aria-labelledby="rakuten-heading"
                    className="mt-20 sm:mt-28"
                >
                    <div className="mb-6">
                        <p className="mb-3 text-xs tracking-widest text-gray-500">
                            02 / BRAND & ADVERTISING
                        </p>

                        <h2
                            id="rakuten-heading"
                            className="text-2xl font-semibold sm:text-3xl"
                        >
                            Rakuten Brand & Advertising Design
                        </h2>

                        <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600">
                        Campaign ads and digital banners designed for different audiences and formats while keeping Rakuten’s brand identity consistent.
                        </p>
                    </div>

                    <Carousel
                        slides={rakutenSlides}
                        label="樂天內部與外部廣告作品"
                    />
                </section>
            </div>
        </div>
    );
}