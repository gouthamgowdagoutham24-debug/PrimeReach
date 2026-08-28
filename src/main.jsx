import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowUpRight, AtSign, ChevronDown, Heart, Menu, Phone, Play, Send, Star, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import logoImage from '../pr.jpeg'
import { supabase } from './supabase'
import './styles.css'

const services = [
  {
    number: '01',
    title: 'Short-form\nvideo editing',
    intro: 'Fast cuts for the scroll. Built to stop thumbs and keep your audience moving.',
    items: [
      ['Short Videos', '15–60 sec · basic cuts, captions, trending audio sync, one-platform export.', '₹400 – ₹1,200'],
      ['Reels / Instagram Reels', 'Fast-paced cuts, transitions, on-screen text, caption styling, music sync.', '₹500 – ₹1,500'],
      ['Reels with Motion Graphics', 'Reels plus animated text, graphic overlays, custom transitions.', '₹1,000 – ₹3,000'],
      ['Monthly Reels / Shorts', '15–20 videos · volume pricing for regular content creators and brands.', '₹6,000 – ₹18,000'],
    ],
  },
  {
    number: '02',
    title: 'Intro videos &\nlong-format editing',
    intro: 'A stronger opening. A sharper story. Long-form edits with the rhythm your channel needs.',
    items: [
      ['Intro / Outro Videos', '5–15 sec · logo animation, sound effects, channel branding.', '₹500 – ₹2,000'],
      ['Long-Format Videos', '10–20 min · YouTube-style edits, pacing, B-roll, graphics, sound cleanup.', '₹2,500 – ₹7,000'],
      ['Long-Format — Heavy Edit', '20+ min · color grading, motion graphics, multi-cam sync, sound design.', '₹4,000 – ₹12,000+'],
      ['Monthly Long-Format', '4–8 videos · retainer pricing for consistent channel uploads.', '₹20,000 – ₹60,000'],
    ],
  },
  {
    number: '03',
    title: 'Vlog\nediting',
    intro: 'Make the everyday feel cinematic. We shape the footage into stories worth staying for.',
    items: [
      ['Vlogs', '5–15 min · storytelling cut, pacing, background music, light color correction.', '₹1,500 – ₹5,000'],
      ['Vlogs — Premium', 'Travel / lifestyle · cinematic pacing, grading, sound design, location cuts.', '₹4,000 – ₹9,000'],
      ['Monthly Vlog Retainer', '8–12 videos · for creators posting weekly or bi-weekly.', '₹18,000 – ₹45,000'],
    ],
  },
  {
    number: '04',
    title: 'Poster, photo &\nthumbnail design',
    intro: 'Give the click somewhere to land. Visuals that make your content look as good as it feels.',
    items: [
      ['Poster Design', 'Single custom poster · social media or print-ready, brand colors and fonts.', '₹300 – ₹1,200'],
      ['Photo Editing', 'Per image · retouching, color correction, background cleanup.', '₹100 – ₹500'],
      ['Photo Editing — Bulk', '10+ images · batch retouch and color grade at a discounted rate.', '₹700 – ₹3,000 /set'],
      ['Thumbnail Design', 'YouTube / Reels cover · text, graphics, face-op editing.', '₹200 – ₹700 /thumbnail'],
      ['Thumbnail Pack', '10 thumbnails · bulk discount for regular YouTube uploaders.', '₹1,500 – ₹5,000'],
    ],
  },
  {
    number: '05',
    title: 'Motion graphics\n& sound',
    intro: 'Make your message move. Add the texture, timing, and sonic detail that makes work memorable.',
    items: [
      ['Motion Graphics Reels', 'Animated text, shapes, and graphic elements with low or no raw footage.', '₹1,500 – ₹4,000'],
      ['Motion Graphics — Brand / Ad Reel', 'Scripted animated ad-style reel with custom brand assets.', '₹3,000 – ₹8,000'],
      ['Sound Mixing & Editing', 'Per video · noise cleanup, level balancing, music mixing, basic SFX.', '₹500 – ₹2,000'],
      ['Sound Design — Premium', 'Custom SFX layering, voiceover mixing, multi-track cleanup.', '₹1,500 – ₹4,000'],
    ],
  },
  {
    number: '06',
    title: 'Social media &\nweb development',
    intro: 'From the first post to the first click. Practical digital systems for brands ready to grow.',
    items: [
      ['Social Media — Starter', '1 platform · content calendar, posting, captions / hashtags, monthly report.', '₹8,000 – ₹15,000 /mo'],
      ['Social Media — Growth', '2–3 platforms · planning, engagement tracking, strategy calls.', '₹15,000 – ₹30,000 /mo'],
      ['Website — Basic', 'Landing page · single-page site, responsive layout, contact form.', '₹5,000 – ₹12,000'],
      ['Website — Standard', 'Multi-page · 5–8 pages, portfolio / business site, basic SEO.', '₹12,000 – ₹30,000'],
      ['Website — E-commerce / Custom', 'Product catalog, payment integration, and custom features.', '₹30,000 – ₹80,000+'],
    ],
  },
]

function ServiceSection({ service, index }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className={`service-section ${index % 2 ? 'service-section--light' : ''} ${index > 1 ? 'service-section--warm' : ''} ${isOpen ? 'service-section--open' : ''}`} id={`service-${service.number}`}>
      <div className="section-inner">
        <button className="service-heading" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} aria-controls={`service-content-${service.number}`}>
          <div className="section-number">{service.number}</div>
          <div>
            <p className="eyebrow">Service chapter</p>
            <h2>{service.title.split('\n').map((line) => <span key={line}>{line}<br /></span>)}</h2>
            <p className="service-intro">{service.intro}</p>
          </div>
          <ChevronDown className="service-chevron" size={28} />
        </button>
        <div className="price-list" id={`service-content-${service.number}`} hidden={!isOpen}>
          {service.items.map(([name, detail, price], itemIndex) => (
            <div className="price-row" key={name}>
              <span className="item-index">{String(itemIndex + 1).padStart(2, '0')}</span>
              <div className="item-copy"><h3>{name}</h3><p>{detail}</p></div>
              <strong>{price}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function IntroOverlay({ onComplete }) {
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion) {
      onComplete()
    }
  }, [onComplete])

  return (
    <div className="intro-overlay" role="dialog" aria-label="Prime Reach intro" aria-modal="true">
      <video
        className={videoReady ? 'intro-video intro-video--ready' : 'intro-video'}
        autoPlay
        muted
        playsInline
        preload="metadata"
        onCanPlay={() => setVideoReady(true)}
        onEnded={onComplete}
      >
        <source src="/intro-video-compressed.mp4" type="video/mp4" />
      </video>
      <div className="intro-vignette" aria-hidden="true" />
      <button className="intro-skip" onClick={onComplete} aria-label="Skip intro" title="Skip intro"><X size={18} /></button>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const [review, setReview] = useState({ name: '', rating: 0, message: '' })
  const [reviews, setReviews] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('prime-reach-reviews') || '[]')
    } catch {
      return []
    }
  })
  const [reviewsLoading, setReviewsLoading] = useState(Boolean(supabase))
  const [likedReviews, setLikedReviews] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('prime-reach-liked-reviews') || '[]')
    } catch {
      return []
    }
  })
  const [showAllReviews, setShowAllReviews] = useState(false)

  useEffect(() => {
    localStorage.setItem('prime-reach-reviews', JSON.stringify(reviews))
  }, [reviews])

  useEffect(() => {
    localStorage.setItem('prime-reach-liked-reviews', JSON.stringify(likedReviews))
  }, [likedReviews])

  useEffect(() => {
    if (!supabase) return
    const loadReviews = async () => {
      const { data, error } = await supabase.from('reviews').select('*').eq('approved', true).order('likes', { ascending: false }).order('created_at', { ascending: false })
      if (!error) setReviews(data.map((item) => ({ id: item.id, name: item.name, rating: item.rating, message: item.message, likes: item.likes, createdAt: new Date(item.created_at).getTime() })))
      setReviewsLoading(false)
    }
    loadReviews()
  }, [])

  const completeIntro = () => {
    setShowIntro(false)
  }

  const submitReview = (event) => {
    event.preventDefault()
    if (!review.name || !review.rating || !review.message) return
    const newReview = { ...review, id: crypto.randomUUID(), likes: 0, createdAt: Date.now() }
    setReviews((currentReviews) => [newReview, ...currentReviews])
    if (supabase) supabase.from('reviews').insert({ id: newReview.id, name: newReview.name, rating: newReview.rating, message: newReview.message }).then(({ error }) => { if (error) console.error('Could not save review:', error.message) })
    setReview({ name: '', rating: 0, message: '' })
  }

  const toggleReviewLike = (reviewId) => {
    const hasLiked = likedReviews.includes(reviewId)
    setLikedReviews((currentLikes) => hasLiked ? currentLikes.filter((id) => id !== reviewId) : [...currentLikes, reviewId])
    setReviews((currentReviews) => currentReviews.map((item) => item.id === reviewId ? { ...item, likes: Math.max(0, (item.likes || 0) + (hasLiked ? -1 : 1)) } : item))
    if (supabase) supabase.from('reviews').select('likes').eq('id', reviewId).single().then(({ data, error }) => { if (!error) return supabase.from('reviews').update({ likes: Math.max(0, (data.likes || 0) + (hasLiked ? -1 : 1)) }).eq('id', reviewId) })
  }

  const rankedReviews = [...reviews].sort((first, second) => (second.likes || 0) - (first.likes || 0) || (second.createdAt || 0) - (first.createdAt || 0))
  const featuredReviews = rankedReviews.slice(0, 3)

  return (
    <div className="app-shell">
      {showIntro && <IntroOverlay onComplete={completeIntro} />}
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Prime Reach x Y Cuts home"><img src={logoImage} alt="Prime Reach logo" /><span>PRIME REACH</span><b>x</b><span>Y CUTS</span></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        <nav className={menuOpen ? 'nav-links nav-links--open' : 'nav-links'}>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a><a href="#instagram" onClick={() => setMenuOpen(false)}>Instagram</a><a href="#notes" onClick={() => setMenuOpen(false)}>Notes</a><a href="#contact" className="nav-cta" onClick={() => setMenuOpen(false)}>Start a project <ArrowUpRight size={16} /></a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="hero-brand reveal"><img src={logoImage} alt="Prime Reach logo" /><span>PRIME REACH<br /><small>Creative media studio</small></span></div>
              <p className="eyebrow reveal">Video · Design · Digital media agency</p>
              <h1 className="reveal reveal-delay-1">Content that<br /><em>reaches.</em><br />Edits that<br /><em>convert.</em></h1>
              <div className="hero-foot reveal reveal-delay-2"><p>We turn raw ideas into sharp, scroll-stopping content for people and brands with somewhere to go.</p><a href="#services" className="circle-link" aria-label="Explore services"><ArrowUpRight size={25} /></a></div>
            </div>
            <div className="hero-art reveal reveal-delay-1">
              <div className="art-frame"><div className="art-topline"><span>PR / 001</span><span>Creative studio</span></div><div className="art-center"><Play size={30} fill="currentColor" /><span>Make noise<br />with intent.</span></div><div className="art-bottomline"><span>Content / 24</span><span>↓ Scroll to explore</span></div></div>
              <div className="art-caption">A little more signal.<br />A lot less noise.</div>
            </div>
          </div>
          <div className="ticker" aria-hidden="true"><span>EDIT WITH INTENT</span><span>BUILD WITH FEELING</span><span>REACH THE RIGHT PEOPLE</span><span>EDIT WITH INTENT</span></div>
        </section>

        <section className="instagram-section" id="instagram"><div className="section-inner instagram-inner"><div><p className="eyebrow">See the work</p><h2>More cuts.<br /><em>More @madxx.zone.</em></h2></div><a className="instagram-card" href="https://instagram.com/madxx.zone" target="_blank" rel="noreferrer"><img src="https://cdn.simpleicons.org/instagram/1b1d1b" alt="" /><span>Follow our latest<br />work on Instagram</span><ArrowUpRight size={22} /></a></div></section>
        <section className="service-intro-band" id="services"><div className="section-inner band-inner"><p className="eyebrow">The menu</p><div><h2>Pick a lane.<br /><em>Or make your own.</em></h2><p>Every project gets the attention it needs, priced clearly in INR. Browse the menu and bring us the brief.</p></div><div className="down-arrow"><ChevronDown size={27} /></div></div></section>
        {services.map((service, index) => <ServiceSection key={service.number} service={service} index={index} />)}

        <section className="notes-section" id="notes"><div className="section-inner notes-grid"><div><p className="eyebrow">Before we roll</p><h2>Good work<br /><em>needs good ground.</em></h2></div><div className="notes-list"><p><span>01</span> Prices flex with footage quality, complexity, and turnaround time.</p><p><span>02</span> Rush delivery within 24–48 hours adds 25–50% to standard pricing.</p><p><span>03</span> Monthly packages and retainers are custom-quoted by volume and platform mix.</p><p><span>04</span> 50% advance to start. Balance due on final delivery.</p><p><span>05</span> First-time clients can request a free sample edit before committing.</p></div></div></section>

        <section className="contact-section" id="contact"><div className="contact-inner"><div><p className="eyebrow">For inquiries & custom quotes</p><h2>Let’s make<br /><em>something land.</em></h2></div><div className="contact-actions"><a className="contact-link primary" href="tel:+918105962281"><Phone size={19} /> Call the studio <ArrowUpRight size={18} /></a><a className="contact-link" href="https://instagram.com/madxx.zone" target="_blank" rel="noreferrer"><AtSign size={19} /> @madxx.zone <ArrowUpRight size={18} /></a><a className="contact-link" href="mailto:primereach18@gmail.com"><AtSign size={19} /> primereach18@gmail.com <ArrowUpRight size={18} /></a><p className="contact-numbers">8105962281 · 6362465754<br />8088601106 · 6362378416</p></div></div></section>

        <section className="reviews-section" id="reviews"><div className="section-inner reviews-inner"><div className="reviews-title"><p className="eyebrow">Client notes</p><h2>Tell us how<br /><em>we did.</em></h2><p>Worked with us? Leave a quick review for the next brand finding their creative team.</p>{reviews.length > 3 && <button className="reviews-all-button" type="button" onClick={() => setShowAllReviews(true)}>See all {reviews.length} reviews <ArrowUpRight size={16} /></button>}</div><form className="review-form" onSubmit={submitReview}><label>Your name<input value={review.name} onChange={(event) => setReview({ ...review, name: event.target.value })} placeholder="Name or brand" /></label><fieldset><legend>Your rating</legend><div className="star-picker">{[1, 2, 3, 4, 5].map((star) => <button type="button" className={star <= review.rating ? 'star-button star-button--active' : 'star-button'} key={star} onClick={() => setReview({ ...review, rating: star })} aria-label={`${star} star${star > 1 ? 's' : ''}`}><Star size={20} fill="currentColor" /></button>)}</div></fieldset><label>Your review<textarea value={review.message} onChange={(event) => setReview({ ...review, message: event.target.value })} placeholder="What did we make together?" rows="4" /></label><button className="review-submit" type="submit">Post review <Send size={16} /></button></form>{reviewsLoading ? <p className="reviews-empty">Loading client notes...</p> : featuredReviews.length > 0 ? <div className="review-list">{featuredReviews.map((item) => <article className="review-card" key={item.id || item.name}><div className="review-card-top"><div className="review-stars">{'★'.repeat(item.rating)}</div><button className={likedReviews.includes(item.id) ? 'review-like review-like--active' : 'review-like'} type="button" onClick={() => toggleReviewLike(item.id)} aria-label={`${likedReviews.includes(item.id) ? 'Unlike' : 'Like'} review by ${item.name}`}><Heart size={15} fill={likedReviews.includes(item.id) ? 'currentColor' : 'none'} /> {item.likes || 0}</button></div><p>“{item.message}”</p><strong>{item.name}</strong></article>)}</div> : <p className="reviews-empty">Be the first to leave a note.</p>}</div></section>
        {showAllReviews && <div className="reviews-modal" role="dialog" aria-modal="true" aria-labelledby="all-reviews-title"><div className="reviews-modal-panel"><div className="reviews-modal-header"><div><p className="eyebrow">The full guestbook</p><h2 id="all-reviews-title">All <em>reviews.</em></h2></div><button className="reviews-close" type="button" onClick={() => setShowAllReviews(false)} aria-label="Close all reviews"><X size={20} /></button></div><div className="reviews-modal-list">{rankedReviews.map((item) => <article className="review-card" key={item.id || item.name}><div className="review-card-top"><div className="review-stars">{'★'.repeat(item.rating)}</div><button className={likedReviews.includes(item.id) ? 'review-like review-like--active' : 'review-like'} type="button" onClick={() => toggleReviewLike(item.id)} aria-label={`${likedReviews.includes(item.id) ? 'Unlike' : 'Like'} review by ${item.name}`}><Heart size={15} fill={likedReviews.includes(item.id) ? 'currentColor' : 'none'} /> {item.likes || 0}</button></div><p>“{item.message}”</p><strong>{item.name}</strong></article>)}</div></div></div>}
      </main>
      <a className="whatsapp-float" href="https://wa.me/918105962281" target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp"><img src="https://cdn.simpleicons.org/whatsapp/ffffff" alt="" /></a>
      <footer><span>PRIME REACH x Y CUTS</span><span>Video · Design · Digital media agency</span><span>© 2024</span></footer>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
