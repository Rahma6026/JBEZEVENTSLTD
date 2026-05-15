-- 1. Create the table
CREATE TABLE IF NOT EXISTS site_content (
  id integer PRIMARY KEY,
  hero_tagline text,
  hero_title text,
  hero_subtitle text,
  hero_video text,
  about_image text,
  about_years text,
  about_p1 text,
  about_p2 text,
  about_p3 text,
  contact_email text,
  contact_phone text,
  contact_address text,
  social_facebook text,
  social_instagram text,
  social_linkedin text,
  services jsonb,
  specialities jsonb,
  gallery jsonb
);

-- 2. Insert the initial data row
INSERT INTO site_content (
  id, 
  hero_tagline, 
  hero_title, 
  hero_subtitle, 
  hero_video,
  about_image, 
  about_years, 
  about_p1, 
  about_p2, 
  about_p3,
  contact_email, 
  contact_phone, 
  contact_address, 
  social_facebook, 
  social_instagram, 
  social_linkedin,
  services,
  specialities,
  gallery
) VALUES (
  1,
  '✦ Luxury Events · Exquisite Catering',
  'Dano Events<br /><em>Ltd</em>',
  'London''s premier partner for bespoke events and fine catering. We compose weddings, corporate galas, and private celebrations into extraordinary, flavorful memories.',
  'assets/videos/54238-477546467_small.mp4',
  'assets/images/pexels-ron-lach-8699195.jpg',
  '15+',
  'Dano Events Ltd was founded on a simple belief: every gathering, from an intimate dinner to a grand corporate gala, deserves meticulous care, exquisite cuisine, and seamless execution.',
  'Based in the heart of London''s East End, our team of seasoned event planners and culinary artists bring decades of combined expertise to each occasion. We don''t just manage events — we craft experiences that linger long after the last guest has departed.',
  'From our base at 6 Mill Road, E16 2BE, we serve clients across London and beyond, delivering hospitality that is both authentic and extraordinary.',
  'hello@danoevents.co.uk',
  '+44 20 7123 4567',
  '6 Mill Road, E16 2BE, London',
  '#',
  '#',
  '#',
  '[
    {"title": "Wedding Ceremonies & Receptions", "desc": "Your love story deserves a flawless stage. We design and manage every element of your wedding day, from florals and décor to a bespoke wedding feast that reflects your unique journey together.", "image": "assets/images/pexels-thevisionaryvows-37331161.jpg"},
    {"title": "Corporate Events & Conferences", "desc": "Elevate your corporate gatherings with professional event management that impresses clients, inspires teams, and delivers measurable impact — all while your guests enjoy exceptional cuisine.", "image": "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=400&q=80"},
    {"title": "Private Dining & Celebrations", "desc": "Birthdays, anniversaries, family reunions — we transform private gatherings into extraordinary memories with personalised menus, intimate décor, and attentive, discreet service.", "image": "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=400&q=80"},
    {"title": "Venue Décor & Styling", "desc": "Our creative team transforms any space into a breathtaking environment. We source the finest décor elements to realise your vision with precision, elegance, and flair.", "image": "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=400&q=80"},
    {"title": "Fine Catering & Buffets", "desc": "Our culinary team crafts menus ranging from multi-course fine dining to lavish buffets, working with fresh seasonal ingredients and inspired flavour pairings to delight every palate.", "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&q=80"},
    {"title": "Full Event Management", "desc": "End-to-end coordination for complex, large-scale events. From vendor management and logistics to on-the-day direction, we are your dedicated partner at every step.", "image": "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=400&q=80"}
  ]'::jsonb,
  '[
    {"title": "Fine Dining", "desc": "Multi-course tasting menus with wine pairings, crafted by our executive chef for your most prestigious occasions."},
    {"title": "Wedding Feasts", "desc": "From intimate dinners to grand receptions, we design bespoke wedding menus that tell your love story through flavour."},
    {"title": "Cocktail Receptions", "desc": "Elegant canapes, handcrafted cocktails, and premium beverages — perfect for networking events and pre-dinner receptions."},
    {"title": "Luxury Buffets", "desc": "Lavish buffet spreads showcasing British classics, international cuisine, and artisanal delicacies, beautifully presented."}
  ]'::jsonb,
  '[
    {"type": "video", "media": "https://cdn.pixabay.com/video/2021/08/17/85378-589366113_large.mp4", "caption": "Wedding Reception"},
    {"type": "image", "media": "assets/images/pexels-change-c-c-974768353-32689482.jpg", "caption": "Corporate Gala"},
    {"type": "image", "media": "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80", "caption": "Fine Dining Setup"},
    {"type": "image", "media": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80", "caption": "Luxury Buffet"},
    {"type": "video", "media": "https://cdn.pixabay.com/video/2018/06/04/16634-273574944_large.mp4", "caption": "Private Celebration"}
  ]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  services = EXCLUDED.services,
  specialities = EXCLUDED.specialities,
  gallery = EXCLUDED.gallery;
