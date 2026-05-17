
    let gallerySwiper = null;

    function initSwiper() {
      if (gallerySwiper) gallerySwiper.destroy(true, true);
      gallerySwiper = new Swiper('.gallery-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: { delay: 3500, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        breakpoints: {
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 }
        }
      });
    }

    // Initialize the default swiper in case there's no data
    document.addEventListener("DOMContentLoaded", function () {
      initSwiper();
    });

    // ── Cursor
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      setTimeout(() => {
        ring.style.left = e.clientX + 'px';
        ring.style.top = e.clientY + 'px';
      }, 80);
    });
    document.querySelectorAll('a, button, .service-card, .spec-card').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.style.transform = 'translate(-50%,-50%) scale(2.5)');
      el.addEventListener('mouseleave', () => cursor.style.transform = 'translate(-50%,-50%) scale(1)');
    });

    // ── Navbar scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    });

    // ── Mobile menu
    function toggleMenu() {
      const links = document.getElementById('nav-links');
      links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
      links.style.flexDirection = 'column';
      links.style.position = 'absolute';
      links.style.top = '80px';
      links.style.left = '0'; links.style.right = '0';
      links.style.background = 'rgba(14,12,9,0.97)';
      links.style.padding = '1.5rem 5vw 2rem';
      links.style.gap = '1.2rem';
      links.style.backdropFilter = 'blur(12px)';
    }

    // ── Scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => observer.observe(el));

    // ── Form submit
    function submitForm(e) {
      e.preventDefault();
      const toast = document.getElementById('toast');
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 4000);
      e.target.reset();
    }

    // ── Mobile Menu Toggle
    function toggleMenu() {
      const navLinks = document.getElementById('nav-links');
      navLinks.classList.toggle('active');
    }

    // ── Smooth close mobile nav on link click
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.addEventListener('click', () => {
        const links = document.getElementById('nav-links');
        if (window.innerWidth <= 900) links.classList.remove('active');
      });
    });

    // ── Supabase Integration ──
    const supabaseUrl = 'https://mcabobfmtadbjkmsfuub.supabase.co';
    const supabaseKey = 'sb_publishable_w8Hs4acr9aqYg1vZsvYTGw_TFsHi5He';

    // Dynamically load Supabase script and init
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
    script.onload = async () => {
      const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);
      try {
        const { data, error } = await supabaseClient
          .from('site_content')
          .select('*')
          .eq('id', 1)
          .single();

        if (data) {
          // Note: The following blocks are commented out because the current Supabase 
          // database contains "Events & Catering" data, which overwrites the new 
          // "Nature Photography & Media" theme texts. 
          
          /*
          // Update Text Fields
          const textFields = ['hero_tagline', 'hero_subtitle', 'about_years', 'about_p1', 'about_p2', 'about_p3'];
          textFields.forEach(id => {
            if (data[id] && document.getElementById(id)) {
              document.getElementById(id).innerText = data[id];
            }
          });

          // Update HTML Fields
          if (data.hero_title && document.getElementById('hero_title')) {
            document.getElementById('hero_title').innerHTML = data.hero_title;
          }

          // Update Media
          if (data.hero_video && document.getElementById('hero_video')) {
            document.getElementById('hero_video').src = data.hero_video;
          }
          if (data.about_image && document.getElementById('about_image')) {
            document.getElementById('about_image').src = data.about_image;
          }
          */

          // Update Links and Contact Text
          if (data.contact_address && document.getElementById('contact_address')) {
            document.getElementById('contact_address').innerText = data.contact_address;
          }
          if (data.contact_phone && document.getElementById('contact_phone')) {
            document.getElementById('contact_phone').innerText = data.contact_phone;
            document.getElementById('contact_phone').href = "tel:" + data.contact_phone.replace(/\D/g, '');
          }
          if (data.contact_email && document.getElementById('contact_email')) {
            document.getElementById('contact_email').innerText = data.contact_email;
            document.getElementById('contact_email').href = "mailto:" + data.contact_email;
          }

          if (data.social_facebook && document.getElementById('social_facebook')) {
            document.getElementById('social_facebook').href = data.social_facebook;
          }
          if (data.social_instagram && document.getElementById('social_instagram')) {
            document.getElementById('social_instagram').href = data.social_instagram;
          }
          if (data.social_linkedin && document.getElementById('social_linkedin')) {
            document.getElementById('social_linkedin').href = data.social_linkedin;
          }

          /*
          // Update existing Services
          if (data.services && data.services.length > 0) {
            const serviceCards = document.querySelectorAll('.service-card');
            data.services.forEach((svc, i) => {
              if (serviceCards[i]) {
                const img = serviceCards[i].querySelector('img, video');
                if (img) img.src = svc.image;
                const title = serviceCards[i].querySelector('h3');
                if (title) title.innerText = svc.title;
                const desc = serviceCards[i].querySelector('p');
                if (desc) desc.innerText = svc.desc;
              }
            });
          }

          // Update existing Specialities
          if (data.specialities && data.specialities.length > 0) {
            const specCards = document.querySelectorAll('.spec-card');
            data.specialities.forEach((spec, i) => {
              if (specCards[i]) {
                const title = specCards[i].querySelector('h3');
                if (title) title.innerText = spec.title;
                const desc = specCards[i].querySelector('p');
                if (desc) desc.innerText = spec.desc;
              }
            });
          }
          */

          // Update existing Gallery
          if (data.gallery && data.gallery.length > 0) {
            const galleryItems = document.querySelectorAll('.gallery-item');
            data.gallery.forEach((g, i) => {
              if (galleryItems[i]) {
                const overlaySpan = galleryItems[i].querySelector('.gallery-overlay span');
                if (overlaySpan) overlaySpan.innerText = g.caption || '';

                // Remove old media
                const oldImg = galleryItems[i].querySelector('img');
                const oldVid = galleryItems[i].querySelector('video');
                if (oldImg) oldImg.remove();
                if (oldVid) oldVid.remove();

                // Add new media
                if (g.type === 'video') {
                  const vid = document.createElement('video');
                  vid.src = g.media;
                  vid.autoplay = true; vid.muted = true; vid.loop = true; vid.playsInline = true;
                  vid.style = "width:100%;height:100%;object-fit:cover;";
                  galleryItems[i].insertBefore(vid, galleryItems[i].firstChild);
                } else {
                  const img = document.createElement('img');
                  img.src = g.media;
                  img.style = "width:100%;height:100%;object-fit:cover;";
                  galleryItems[i].insertBefore(img, galleryItems[i].firstChild);
                }
              }
            });
          }

        }
      } catch (err) {
        console.error('Error fetching Supabase data:', err);
      }
    };
    document.head.appendChild(script);

  