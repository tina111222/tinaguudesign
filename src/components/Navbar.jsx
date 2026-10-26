import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  const lastScrollY = useRef(0);

  // 包住整個 Navbar，用於判斷是否點擊外部
  const navbarRef = useRef(null);
  const portfolioButtonRef = useRef(null);
  const resumeButtonRef = useRef(null);

  const location = useLocation();

  const closePortfolio = () => {
    setPortfolioOpen(false);
    setProductOpen(false);
  };

  const closeMenu = () => {
    setPortfolioOpen(false);
    setProductOpen(false);
    setResumeOpen(false);
  };

  // 向下捲動隱藏 Navbar，向上捲動顯示
  useEffect(() => {
    lastScrollY.current = Math.max(0, window.scrollY);

    const handleScroll = () => {
      const currentScrollY = Math.max(0, window.scrollY);

      const shouldHide =
        currentScrollY > lastScrollY.current &&
        currentScrollY > 80;

      setIsVisible(!shouldHide);

      if (shouldHide) {
        setPortfolioOpen(false);
        setProductOpen(false);
        setResumeOpen(false);

        // 避免鍵盤焦點留在隱藏的 Navbar 內
        if (
          document.activeElement instanceof HTMLElement &&
          navbarRef.current?.contains(document.activeElement)
        ) {
          document.activeElement.blur();
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 切換 React 頁面後收合所有選單
  useEffect(() => {
    setPortfolioOpen(false);
    setProductOpen(false);
    setResumeOpen(false);
  }, [location.pathname, location.search, location.hash]);

  // 點擊 Navbar 外部時收合所有選單
  useEffect(() => {
    const handlePointerDown = (event) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target)
      ) {
        setPortfolioOpen(false);
        setProductOpen(false);
        setResumeOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener(
        'pointerdown',
        handlePointerDown
      );
    };
  }, []);

  return (
    <nav
      ref={navbarRef}
      aria-label="Main navigation"
      style={!isVisible ? { visibility: 'hidden' } : undefined}
      className={`fixed top-0 left-0 z-50 w-full
        bg-white/90 font-sans shadow-sm backdrop-blur-md
        transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-start gap-12 px-4 sm:px-6">
        <Link
          to="/"
          onClick={closeMenu}
          className="text-xl font-bold text-black no-underline transition-colors hover:text-gray-600"
        >
          Home
        </Link>

        <div className="flex h-full gap-12">
          {/* Portfolio */}
          <div
            className="relative flex h-full items-center"
            onBlur={(event) => {
              if (
                !event.currentTarget.contains(event.relatedTarget)
              ) {
                closePortfolio();
              }
            }}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                event.preventDefault();
                portfolioButtonRef.current?.focus();
                closePortfolio();
              }
            }}
          >
            <button
              ref={portfolioButtonRef}
              type="button"
              aria-expanded={portfolioOpen}
              aria-controls="dropdown-portfolio-react"
              onClick={() => {
                setPortfolioOpen((prev) => !prev);
                setProductOpen(false);
                setResumeOpen(false);
              }}
              className="flex cursor-pointer items-center gap-1 text-base font-medium text-black transition-colors hover:text-gray-600"
            >
              Portfolio
              <span
                aria-hidden="true"
                className={`text-[10px] transition-transform ${portfolioOpen ? 'rotate-180' : ''
                  }`}
              >
                ▼
              </span>
            </button>

            {portfolioOpen && (
              <div
                id="dropdown-portfolio-react"
                className="absolute left-0 top-full w-56 rounded-md border border-gray-100 bg-white shadow-lg"
              >
                {/* Product Design：點擊展開 */}
                <button
                  type="button"
                  aria-expanded={productOpen}
                  aria-controls="sub-product-react"
                  onClick={() => {
                    setProductOpen((prev) => !prev);
                  }}
                  className="flex w-full cursor-pointer items-center justify-between px-4 py-3 text-sm font-medium text-black hover:bg-gray-50"
                >
                  Product Design
                  <span
                    aria-hidden="true"
                    className={`text-[10px] transition-transform ${productOpen ? 'rotate-180' : ''
                      }`}
                  >
                    ▼
                  </span>
                </button>

                {productOpen && (
                  <div
                    id="sub-product-react"
                    className="bg-gray-50/50"
                  >
                    <a
                      href="/tigerair/index.html"
                      onClick={closeMenu}
                      className="block py-2.5 pl-8 pr-4 text-sm text-black no-underline hover:bg-gray-100"
                    >
                      Tigerair Card Upgrade
                    </a>

                    <a
                      href="/campaign-page/index.html"
                      onClick={closeMenu}
                      className="block py-2.5 pl-8 pr-4 text-sm text-black no-underline hover:bg-gray-100"
                    >
                      Rakuten Card Campaign Page
                    </a>

                    <a
                      href="/bill/index.html"
                      onClick={closeMenu}
                      className="block py-2.5 pl-8 pr-4 text-sm text-black no-underline hover:bg-gray-100"
                    >
                      App Bill Installment Optimization
                    </a>

                    <a
                      href="/health/index.html"
                      onClick={closeMenu}
                      className="block py-2.5 pl-8 pr-4 text-sm text-black no-underline hover:bg-gray-100"
                    >
                      MediaTek Health App
                    </a>
                  </div>
                )}

                {/* Graphic Design：直接跳轉 */}
                <Link
                  to="/portfolio/graphic-design"
                  onClick={closeMenu}
                  className="block px-4 py-3 text-sm font-medium text-black no-underline hover:bg-gray-50"
                >
                  Graphic Design
                </Link>
              </div>
            )}
          </div>

          {/* Resume：點擊展開 */}
          <div
            className="relative flex h-full items-center"
            onBlur={(event) => {
              if (
                !event.currentTarget.contains(event.relatedTarget)
              ) {
                setResumeOpen(false);
              }
            }}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                event.preventDefault();
                resumeButtonRef.current?.focus();
                setResumeOpen(false);
              }
            }}
          >
            <button
              ref={resumeButtonRef}
              type="button"
              aria-expanded={resumeOpen}
              aria-controls="dropdown-resume-react"
              onClick={() => {
                setResumeOpen((prev) => !prev);
                closePortfolio();
              }}
              className="flex cursor-pointer items-center gap-1 text-base font-medium text-black transition-colors hover:text-gray-600"
            >
              Resume
              <span
                aria-hidden="true"
                className={`text-[10px] transition-transform ${resumeOpen ? 'rotate-180' : ''
                  }`}
              >
                ▼
              </span>
            </button>

            {resumeOpen && (
              <div
                id="dropdown-resume-react"
                className="absolute right-0 top-full w-36 overflow-hidden rounded-md border border-gray-100 bg-white shadow-lg sm:right-auto sm:left-0"
              >
                <a
                  href="/resume-en.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="block px-4 py-3 text-sm text-black no-underline hover:bg-gray-50"
                >
                  English
                </a>

                <a
                  href="/resume-zh.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="block px-4 py-3 text-sm text-black no-underline hover:bg-gray-50"
                >
                  中文
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}