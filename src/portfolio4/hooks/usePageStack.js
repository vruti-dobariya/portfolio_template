import { useEffect } from 'react';

const usePageStack = (menuOpen, loading, currentIndex = 0) => {
  useEffect(() => {
    if (loading) return;

    const stack = document.querySelector('.pages-stack');
    if (!stack) return;

    const pages = Array.from(stack.children);
    const pagesTotal = pages.length;
    let current = currentIndex;

    const getStackPagesIdxs = (excludePageIdx = -1) => {
      const next = (current + 1) % pagesTotal;
      const next2 = (current + 2) % pagesTotal;
      return [current, next, next2].filter(i => i !== excludePageIdx);
    };

    const buildStack = () => {
      const stackPagesIdxs = getStackPagesIdxs();

      for (let i = 0; i < pagesTotal; ++i) {
        const page = pages[i];
        const posIdx = stackPagesIdxs.indexOf(i);

        if (current !== i) {
          page.classList.add('page--inactive');
        } else {
          page.classList.remove('page--inactive');
        }

        page.style.zIndex = i < current ? current - i : pagesTotal + current - i;

        if (posIdx !== -1) {
          page.style.opacity = `${1 - 0.1 * posIdx}`;
        } else {
          page.style.opacity = `0`;
        }

        if (current === i) {
          page.style.transform = 'translate3d(0, 0, 0) scale(1)';
        } else if (posIdx !== -1) {
          page.style.transform = 'translate3d(0, 100%, 0) scale(0.98)';
        } else {
          page.style.transform = 'translate3d(0, 75%, -300px) scale(0.9)';
        }
      }
    };

    if (menuOpen) {
      const idxs = getStackPagesIdxs();
      for (let i = 0; i < idxs.length; ++i) {
        const page = pages[idxs[i]];
        const z = -200 - 50 * i;
        page.style.transform = `translate3d(0, 75%, ${z}px) scale(0.9)`;
        page.style.opacity = '1';
      }
    } else {
      buildStack();
    }
  }, [menuOpen, loading, currentIndex]);
};

export default usePageStack;
