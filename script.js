// 导航功能
function navigateTo(sectionId) {
    // 隐藏所有章节
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // 显示目标章节
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');

        // 滚动到顶部
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // 更新导航项激活状态
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === sectionId) {
            item.classList.add('active');
        }
    });

    // 更新URL hash
    window.location.hash = sectionId;
}

// 页面加载时根据hash导航
window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        navigateTo(hash);
    } else {
        navigateTo('intro');
    }
});

// 监听hash变化
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        navigateTo(hash);
    }
});

// 侧边栏导航点击
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = item.getAttribute('data-section');
        navigateTo(sectionId);
    });
});

// 返回顶部按钮
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 加载完整内容功能（示例）
function loadFullContent(sectionId) {
    alert(`完整内容加载功能：这里可以异步加载 ${sectionId} 章节的完整内容。\n\n在实际应用中，可以：\n1. 从Markdown文件读取完整内容\n2. 使用Markdown解析器转换为HTML\n3. 动态插入到页面中\n\n当前演示版本已包含核心章节的完整内容。`);
}

// 键盘导航
document.addEventListener('keydown', (e) => {
    const sections = ['intro', 'core-problem', 'logic', 'manifestations', 'damages', 'overview', 'strategy-1', 'strategy-2', 'strategy-3', 'strategy-4', 'notes'];
    const currentHash = window.location.hash.substring(1) || 'intro';
    const currentIndex = sections.indexOf(currentHash);

    // 左箭头 - 上一章
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
        navigateTo(sections[currentIndex - 1]);
    }

    // 右箭头 - 下一章
    if (e.key === 'ArrowRight' && currentIndex < sections.length - 1) {
        navigateTo(sections[currentIndex + 1]);
    }

    // ESC - 返回首页
    if (e.key === 'Escape') {
        navigateTo('intro');
    }
});

// 移动端菜单切换
let mobileMenuBtn = null;

function createMobileMenu() {
    if (window.innerWidth <= 768 && !mobileMenuBtn) {
        mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.style.cssText = `
            position: fixed;
            top: 1rem;
            left: 1rem;
            width: 3rem;
            height: 3rem;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 0.5rem;
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 1001;
            box-shadow: var(--shadow-lg);
        `;
        document.body.appendChild(mobileMenuBtn);

        mobileMenuBtn.addEventListener('click', () => {
            document.querySelector('.sidebar').classList.toggle('mobile-open');
        });

        // 点击内容区域关闭菜单
        document.querySelector('.content').addEventListener('click', () => {
            document.querySelector('.sidebar').classList.remove('mobile-open');
        });
    } else if (window.innerWidth > 768 && mobileMenuBtn) {
        mobileMenuBtn.remove();
        mobileMenuBtn = null;
        document.querySelector('.sidebar').classList.remove('mobile-open');
    }
}

// 响应式处理
window.addEventListener('resize', createMobileMenu);
window.addEventListener('DOMContentLoaded', createMobileMenu);

// 平滑滚动增强
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// 添加阅读进度条
function createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        z-index: 9999;
        transition: width 0.2s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;
        progressBar.style.width = progress + '%';
    });
}

createProgressBar();

// 打印功能
function printDocument() {
    window.print();
}

// 分享功能
function shareDocument() {
    if (navigator.share) {
        navigator.share({
            title: 'ENTP执行力问题全解析',
            text: 'ENTP搞钱搞事业&执行力问题全解析 - 从思维内耗到高效执行',
            url: window.location.href
        }).catch(err => console.log('分享失败:', err));
    } else {
        // 复制链接到剪贴板
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('链接已复制到剪贴板！');
        });
    }
}

// 深色模式切换（可选功能）
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
}

// 加载保存的深色模式偏好
window.addEventListener('DOMContentLoaded', () => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
    }
});

// 搜索功能（基础版）
function searchContent(query) {
    const sections = document.querySelectorAll('.section');
    const results = [];

    sections.forEach(section => {
        const text = section.textContent.toLowerCase();
        if (text.includes(query.toLowerCase())) {
            results.push({
                id: section.id,
                title: section.querySelector('.section-title')?.textContent || section.id
            });
        }
    });

    return results;
}

// 控制台提示
console.log('%c欢迎阅读 ENTP 执行力问题全解析！', 'font-size: 20px; color: #6366f1; font-weight: bold;');
console.log('%c快捷键提示：', 'font-size: 14px; color: #8b5cf6; font-weight: bold;');
console.log('← → 方向键：上一章/下一章');
console.log('ESC：返回首页');
console.log('\n如有问题或建议，欢迎反馈！');
