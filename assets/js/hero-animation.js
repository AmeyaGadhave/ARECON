class ProjectShowcaseHero {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.animationState = 0;
    this.currentProjectIndex = 0;
    this.transitionProgress = 0;

    this.projects = [
      { image: 'assets/images/projects/interior/cassiobury-park-watford.jpg', title: 'Cassiobury Park', category: 'Interior Design', description: 'Modern interior spaces with contemporary design excellence and sophisticated aesthetics.', year: '2023', location: 'Watford' },
      { image: 'assets/images/projects/dandi-kurti-museum.jpg', title: 'Dandi Kurti Museum', category: 'Civic & Cultural', description: 'Heritage museum blending historical significance with contemporary design.', year: '2022', location: 'Gujarat' },
      { image: 'assets/images/projects/healthcare/sankalp/fch1.jpg', title: 'Sankalp Hospital', category: 'Healthcare', description: 'Advanced healthcare facility with patient-centric design and modern medical infrastructure.', year: '2024', location: 'Extension' },
      { image: 'assets/images/projects/lead-school.jpg', title: 'Lead School', category: 'Educational', description: 'Modern educational campus fostering innovation and learning excellence.', year: '2023', location: 'Delhi' }
    ];

    this.loadedImages = [];
    this.setupCanvas();
    this.loadImages();
    this.animate();
  }

  setupCanvas() {
    const updateSize = () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener('resize', () => updateSize());
  }

  loadImages() {
    this.projects.forEach(project => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        this.loadedImages.push({ url: project.image, img: img });
      };
      img.src = project.image;
    });
  }

  getProjectImage(index) {
    const loaded = this.loadedImages.find(item => item.url === this.projects[index].image);
    return loaded ? loaded.img : null;
  }

  drawImageFit(img, x, y, w, h) {
    if (!img) return;
    const imgRatio = img.width / img.height;
    const areaRatio = w / h;
    let srcX = 0, srcY = 0, srcW = img.width, srcH = img.height;
    if (imgRatio > areaRatio) {
      srcW = img.height * areaRatio;
      srcX = (img.width - srcW) / 2;
    } else {
      srcH = img.width / areaRatio;
      srcY = (img.height - srcH) / 2;
    }
    this.ctx.drawImage(img, srcX, srcY, srcW, srcH, x, y, w, h);
  }

  easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  drawSlide(progress) {
    const w = this.canvas.width;
    const h = this.canvas.height;
    const ease = this.easeInOutCubic(progress);

    const currImg = this.getProjectImage(this.currentProjectIndex);
    const nextImg = this.getProjectImage((this.currentProjectIndex + 1) % this.projects.length);

    // Background
    const bgGrad = this.ctx.createLinearGradient(0, 0, w, h);
    bgGrad.addColorStop(0, '#1a1a1a');
    bgGrad.addColorStop(0.5, '#0d0d0d');
    bgGrad.addColorStop(1, '#000000');
    this.ctx.fillStyle = bgGrad;
    this.ctx.fillRect(0, 0, w, h);

    // Current image
    this.ctx.globalAlpha = 1 - ease * 0.5;
    if (currImg) {
      this.drawImageFit(currImg, 0, 0, w, h);
    } else {
      const fallback = this.ctx.createLinearGradient(0, 0, w, h);
      fallback.addColorStop(0, '#3a6a8a');
      fallback.addColorStop(1, '#1a4a6a');
      this.ctx.fillStyle = fallback;
      this.ctx.fillRect(0, 0, w, h);
    }

    // Next image
    this.ctx.globalAlpha = ease;
    const slideX = w * (1 - ease) * 0.15;
    if (nextImg) {
      this.drawImageFit(nextImg, slideX, 0, w, h);
    } else {
      const fallback = this.ctx.createLinearGradient(slideX, 0, slideX + w, h);
      fallback.addColorStop(0, '#2a5a7a');
      fallback.addColorStop(1, '#0a3a5a');
      this.ctx.fillStyle = fallback;
      this.ctx.fillRect(slideX, 0, w, h);
    }

    // Dark overlay
    const overlay = this.ctx.createLinearGradient(0, 0, 0, h);
    overlay.addColorStop(0, 'rgba(0, 0, 0, 0.35)');
    overlay.addColorStop(0.5, 'rgba(0, 0, 0, 0.45)');
    overlay.addColorStop(1, 'rgba(0, 0, 0, 0.65)');
    this.ctx.globalAlpha = 1;
    this.ctx.fillStyle = overlay;
    this.ctx.fillRect(0, 0, w, h);

    // Vignette
    const vignette = this.ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.hypot(w, h) * 0.7);
    vignette.addColorStop(0, 'rgba(0,0,0,0)');
    vignette.addColorStop(1, 'rgba(0,0,0,0.4)');
    this.ctx.globalAlpha = 0.5;
    this.ctx.fillStyle = vignette;
    this.ctx.fillRect(0, 0, w, h);
  }

  drawInfo(progress) {
    const w = this.canvas.width;
    const h = this.canvas.height;
    const ease = this.easeInOutCubic(progress);
    const proj = this.projects[this.currentProjectIndex];

    this.ctx.globalAlpha = 1;

    // Category badge - top left
    this.ctx.globalAlpha = 0.4 + ease * 0.6;
    this.ctx.font = 'bold 12px sans-serif';
    this.ctx.fillStyle = '#a8492f';
    this.ctx.textAlign = 'left';
    this.ctx.fillText(proj.category.toUpperCase(), 60, 100);

    // Year - bottom left
    this.ctx.globalAlpha = 0.5 + ease * 0.5;
    this.ctx.font = 'bold 11px sans-serif';
    this.ctx.fillStyle = '#a8492f';
    this.ctx.fillText('YEAR', 60, h - 100);
    this.ctx.font = '400 14px sans-serif';
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    this.ctx.fillText(proj.year, 60, h - 75);

    // Location - bottom center-left
    this.ctx.globalAlpha = 0.5 + ease * 0.5;
    this.ctx.fillStyle = '#a8492f';
    this.ctx.font = 'bold 11px sans-serif';
    this.ctx.fillText('LOCATION', 220, h - 100);
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    this.ctx.font = '400 14px sans-serif';
    this.ctx.fillText(proj.location, 220, h - 75);

    // Counter - bottom right
    this.ctx.globalAlpha = 0.55 + ease * 0.35;
    this.ctx.font = '400 12px sans-serif';
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    this.ctx.textAlign = 'right';
    this.ctx.fillText((this.currentProjectIndex + 1) + ' / ' + this.projects.length, w - 60, h - 60);
  }

  animate() {
    const DURATION = 300;
    const frame = this.animationState % DURATION;
    this.transitionProgress = frame / DURATION;

    if (frame === 0 && this.animationState > 0) {
      this.currentProjectIndex = (this.currentProjectIndex + 1) % this.projects.length;
    }

    this.drawSlide(this.transitionProgress);
    this.drawInfo(this.transitionProgress);

    this.animationState++;
    requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    new ProjectShowcaseHero(canvas);
  }
});
