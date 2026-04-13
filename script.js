    // 成员数据 一个对象，存储了每个成员的信息
    const membersData = {
        owner: {
            name: "群🐖",
            avatar: "images/群主.jpg",
            bio: "yrc",
            info: "北京邮电大学 电子（元）"
        },
        arnold: {
            name: "Arnold",
            avatar: "images/Arnold.jpg",
            bio: "ymz",
            info: "北京大学 计算机"
        },
        bernard: {
            name: "Bernard",
            avatar: "images/Bernard.jpg",
            bio: "fyl",
            info: "湖南大学 法学"
        },
        hacker: {
            name: "Hacker",
            avatar: "images/Hacker.jpg",
            bio: "ljr",
            info: "北京邮电大学 计算机"
        },
        humpy: {
            name: "Humpy",
            avatar: "images/Humpy.jpg",
            bio: "xzh",
            info: "北京工业大学 微电子"
        }
    };

    // 群生活数据
    const lifeData = {
        text: {
            name: "文章",
            avatar: "📖",
            pdf: "memorial.pdf"      // PDF 文件路径
        }
    };

    // 游戏数据
    const gameData = {
        game: {
            name: "游戏相册",
            avatar: "🎮",
            images: ["images/sanYan.jpg", "images/sanYang.jpg", "images/sanFu.jpg", "images/sanLi.jpg", "images/sanXie.jpg"]
        }
    };

    //获取页面上的详细容器（通过detailsection找到）
    const detailSection = document.getElementById('detailSection');

    //函数：显示成员详情
    function showMemberDetail(memberId) {
        const member = membersData[memberId];
        if (!member) return;

        const avatarHtml = member.avatar 
            ? `<img src="${member.avatar}" alt="${member.name}头像" class="detail-avatar">`
            : `<div class="detail-avatar" style="background:#ddd; width:28px; height:28px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-size:1rem;">👤</div>`;

        detailSection.innerHTML = `
            <div class="detail-card">
                ${avatarHtml}
                <h1>${member.name}</h1>
                <div class="detail-bio">${member.bio}</div>
                <div class="detail-info"><p>${member.info}</p></div>
                <button class="close-detail" onclick="closeDetail()">✕</button>
            </div>
        `;
    }

    //函数：显示生活详情
    function showLifeDetail(lifeId) {
        const life = lifeData[lifeId];
        if (!life) return;

        // 判断是否有 pdf 文件（用于文章卡片）
        if (life.pdf) {
            detailSection.innerHTML = `
                <div class="detail-card">
                    <div class="detail-avatar" style="background:#ddd; width:28px; height:28px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-size:1.2rem;">${life.avatar}</div>
                    <h1>${life.name}</h1>
                    <button class="open-pdf-btn" onclick="window.open('${life.pdf}')">📄 追忆似水年华</button>
                    <button class="close-detail" onclick="closeDetail()">✕</button>
                </div>
            `;
            return;
        }
    }

    // 函数：显示游戏板块（5张图片缩略图）
    function showGameDetail(gameId) {
        const game = gameData[gameId];
        if (!game) return;

        // 生成5张图片的缩略图
        let imagesHtml = '';
        game.images.forEach(img => {
            imagesHtml += `
                <div class="game-img-card" data-img="${img}">
                    <img src="${img}" alt="游戏图片" class="game-thumb">
                </div>
            `;
        });

        detailSection.innerHTML = `
            <div class="game-gallery">
                <div class="game-images-grid">
                    ${imagesHtml}
                </div>
                <button class="close-detail" onclick="closeDetail()">✕</button>
            </div>
        `;

        // 绑定每张图片的点击事件（点击后放大）
        document.querySelectorAll('.game-img-card').forEach(card => {
            card.addEventListener('click', function() {
                const imgSrc = this.getAttribute('data-img');
                showLightbox(imgSrc);
            });
        });
    }

    // 大图弹窗
    function showLightbox(imgSrc) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <span class="lightbox-close">&times;</span>
            <img src="${imgSrc}" class="lightbox-img">
        `;
        document.body.appendChild(lightbox);
        lightbox.style.display = 'flex';

        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox || e.target.className === 'lightbox-close') {
                lightbox.remove();
            }
        });
    }

    //函数：关闭详情页面
    function closeDetail() {
        detailSection.innerHTML = '<div class="empty-detail">💡 点击卡片查看详情</div>';
    }

    // 绑定所有卡片的点击事件
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            const id = this.getAttribute('data-id');
            
            if (type === 'member') {
                showMemberDetail(id);
            } else if (type === 'life') {
                showLifeDetail(id);
            } else if (type === 'game') {
                showGameDetail(id);
            }
        });
    });