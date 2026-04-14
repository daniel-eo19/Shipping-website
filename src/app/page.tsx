"use client";

import { useState, useEffect } from "react";
import SiteLayout from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";

const TEAL = "#9333ea";
const NAVY = "#2d1b69";
const GOLD = "linear-gradient(145deg, #ffe566 0%, #d4af37 40%, #a07800 75%, #c9a227 100%)";

const SLIDES = [
  { img: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1920&q=85&auto=format&fit=crop", heading: "Easy Worldwide Shipping" },
  { img: "https://images.unsplash.com/photo-1773126379692-342ff516ea53?w=1920&q=85&auto=format&fit=crop", heading: "Best Innovative Solutions" },
  { img: "https://images.unsplash.com/photo-1774929108280-652f82f21d9f?w=1920&q=85&auto=format&fit=crop", heading: "Quick & Global Delivery" },
];

const TESTIMONIALS = [
  { text: "I have used Freehold Express Services over many years, and I have always recommended their services to my customers. Freehold Express Services renders fast services worldwide, and her staffs are wonderfully honest. Freehold Express Services keeps my customers very much informed, and goes out to overcome any issues.", name: "JULIEN AMOS", location: "Brooklyn New York City", img: "https://images.unsplash.com/photo-1603775493298-e06a5f21e46c?w=100&h=100&q=80&auto=format&fit=crop&crop=face" },
  { text: "I've been using Freehold Express Services several times for short and long distance transport of my artworks. I have always found their services to be very much reliable, courteous, and punctual in all. I can recommend their services especially for fragile items and artworks that require special attention and handling.", name: "GARY MORENO", location: "Toronto Canada", img: "https://images.unsplash.com/photo-1638897212550-b0f4c5d8eb3d?w=100&h=100&q=80&auto=format&fit=crop&crop=face" },
  { text: "Thanks to Freehold Express Services and her workers for an excellent job on every occasion and taking the stress out of my move! I sincerely appreciate the outstanding care taken with my belongings.", name: "MAYANK RAJ", location: "Inderpal Patel, New Delhi India.", img: "https://images.unsplash.com/photo-1658678530179-5bc957a1e315?w=100&h=100&q=80&auto=format&fit=crop&crop=face" },
  { text: "I was really impressed with your brilliant service. Everything was arranged in record time, and you kept me informed throughout the entire delivery processes. Thank you so much. You are the best!", name: "ADRIAN WILLIAMS", location: "Buckinghamshire, England.", img: "https://images.unsplash.com/photo-1680104072720-ae824ef15c0e?w=100&h=100&q=80&auto=format&fit=crop&crop=face" },
];

const STATS = [
  { icon: "package", value: "20154", label: "DELIVERED PACKAGES", desc: "Express international delivery of documents, parcels and pallets by fastest possible means" },
  { icon: "warehouse", value: "20154", label: "PACKAGE STORAGE", desc: "Uniquely designed warehouse for high value goods such as hospital and laboratory equiptments" },
  { icon: "truck", value: "524545", label: "KM PER YEAR", desc: "We provide a secure execellent trunked service, avoiding conveyor belts throughout your consignments" },
  { icon: "projects", value: "3246", label: "PROJECTS DONE", desc: "With years of experience placing and managing freight and cargo projects across the globe appropriately" },
];

const Badge = ({ children }: { children: React.ReactNode }) => (
  <div style={{ width: 68, height: 68, borderRadius: 20, backgroundColor: "#ede9fe", display: "flex", alignItems: "center", justifyContent: "center" }}>
    {children}
  </div>
);

const STAT_ICONS: Record<string, React.ReactNode> = {
  package: (
    <Badge>
      <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
        {/* lid */}
        <rect x="3" y="3" width="32" height="11" rx="3" fill="#2d1b69"/>
        {/* body */}
        <rect x="3" y="12" width="32" height="23" rx="3" fill="#9333ea"/>
        {/* ribbon cross */}
        <rect x="15" y="3" width="8" height="32" fill="rgba(255,255,255,0.18)"/>
        <rect x="3" y="17" width="32" height="6" fill="rgba(255,255,255,0.18)"/>
      </svg>
    </Badge>
  ),
  warehouse: (
    <Badge>
      <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
        {/* roof */}
        <polygon points="19,2 36,14 2,14" fill="#2d1b69"/>
        {/* body */}
        <rect x="3" y="13" width="32" height="23" rx="2" fill="#9333ea"/>
        {/* door */}
        <rect x="14" y="24" width="10" height="12" rx="2" fill="#2d1b69"/>
        {/* windows */}
        <rect x="5" y="18" width="8" height="5" rx="1.5" fill="rgba(255,255,255,0.3)"/>
        <rect x="25" y="18" width="8" height="5" rx="1.5" fill="rgba(255,255,255,0.3)"/>
      </svg>
    </Badge>
  ),
  truck: (
    <Badge>
      <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
        {/* cargo body */}
        <rect x="1" y="8" width="23" height="18" rx="3" fill="#9333ea"/>
        {/* cab */}
        <rect x="24" y="13" width="13" height="13" rx="3" fill="#2d1b69"/>
        {/* windshield */}
        <rect x="25" y="14" width="9" height="7" rx="1.5" fill="rgba(255,255,255,0.28)"/>
        {/* undercarriage */}
        <rect x="1" y="24" width="36" height="4" rx="2" fill="#7c3aed"/>
        {/* wheel left */}
        <circle cx="9" cy="30" r="5" fill="#1a0f3d"/>
        <circle cx="9" cy="30" r="2.5" fill="#6d28d9"/>
        {/* wheel right */}
        <circle cx="29" cy="30" r="5" fill="#1a0f3d"/>
        <circle cx="29" cy="30" r="2.5" fill="#6d28d9"/>
      </svg>
    </Badge>
  ),
  projects: (
    <Badge>
      <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
        {/* base */}
        <rect x="2" y="34" width="34" height="2.5" rx="1.25" fill="#2d1b69"/>
        {/* bar 1 short */}
        <rect x="4" y="24" width="9" height="10" rx="2" fill="#2d1b69"/>
        {/* bar 2 medium */}
        <rect x="15" y="15" width="9" height="19" rx="2" fill="#7c3aed"/>
        {/* bar 3 tall */}
        <rect x="26" y="7" width="9" height="27" rx="2" fill="#9333ea"/>
      </svg>
    </Badge>
  ),
};

export default function HomePage() {
  const [slide, setSlide] = useState(0);
  const [testi, setTesti] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <SiteLayout activePage="/">

      {/* ── Hero Slider ── */}
      <section className="hero-section" style={{ position: "relative", width: "100%", overflow: "hidden" }}>
        {SLIDES.map((s, i) => (
          <div key={i} style={{
            position: "absolute", inset: 0, opacity: i === slide ? 1 : 0,
            transition: "opacity 1s ease",
            backgroundImage: `url('${s.img}')`,
            backgroundSize: "cover", backgroundPosition: "center",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.35)" }} />
            <div style={{ position: "relative", zIndex: 2, textAlign: "center" as const, padding: "0 20px" }}>
              <h2 className="hero-title hero-animate hero-animate-1" style={{ color: "#fff", fontWeight: "700", marginBottom: "28px", textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>
                {s.heading}
              </h2>
              <div className="hero-animate hero-animate-2" style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" as const }}>
                <a href="/track" style={{ background: GOLD, color: "#fff", fontWeight: "700", fontSize: "14px", textTransform: "uppercase" as const, padding: "12px 30px", borderRadius: "3px", textDecoration: "none", boxShadow: "0 2px 10px rgba(212,175,55,0.55)", textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}>Track Shipment</a>
                <a href="/contact" style={{ backgroundColor: NAVY, color: "#fff", fontWeight: "700", fontSize: "14px", textTransform: "uppercase" as const, padding: "12px 30px", borderRadius: "3px", textDecoration: "none" }}>Contact Us</a>
              </div>
            </div>
          </div>
        ))}
        <button onClick={() => setSlide((s) => (s - 1 + SLIDES.length) % SLIDES.length)}
          style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.4)", color: "#fff", border: "none", borderRadius: "50%", width: "38px", height: "38px", fontSize: "22px", cursor: "pointer", zIndex: 10 }}>‹</button>
        <button onClick={() => setSlide((s) => (s + 1) % SLIDES.length)}
          style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.4)", color: "#fff", border: "none", borderRadius: "50%", width: "38px", height: "38px", fontSize: "22px", cursor: "pointer", zIndex: 10 }}>›</button>
        <div style={{ position: "absolute", bottom: "16px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "8px", zIndex: 10 }}>
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)}
              style={{ width: "12px", height: "12px", borderRadius: "50%", border: "2px solid #fff", background: i === slide ? "#fff" : "transparent", cursor: "pointer" }} />
          ))}
        </div>
      </section>

      {/* ── Feature Cards ── */}
      <section style={{ backgroundColor: "#f9f9f9", padding: "50px 0", borderBottom: "1px solid #eee" }}>
        <div className="sg3" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 15px", gap: "24px" }}>
          {[
            { icon: (
              /* Quality — gold medal badge with star */
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                <circle cx="22" cy="25" r="16" fill="#9333ea"/>
                <circle cx="22" cy="25" r="11" fill="#2d1b69"/>
                <polygon points="22,15 24.4,21.3 31,21.3 25.8,25.1 27.8,31.5 22,27.5 16.2,31.5 18.2,25.1 13,21.3 19.6,21.3" fill="#d4af37"/>
                <rect x="17" y="2" width="4" height="10" rx="2" fill="#7c3aed"/>
                <rect x="23" y="2" width="4" height="10" rx="2" fill="#9333ea"/>
              </svg>
            ), title: "QUALITY DRIVEN", desc: "Over the years now, we've proven our quality without compromise of any form, as satisfying our customers is our sole objective and aimed target." },
            { icon: (
              /* Customer — two flat person silhouettes */
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                {/* back person */}
                <circle cx="28" cy="14" r="7" fill="#7c3aed"/>
                <path d="M15 44 Q19 30 28 30 Q37 30 41 44Z" fill="#7c3aed"/>
                {/* front person */}
                <circle cx="17" cy="15" r="8" fill="#2d1b69"/>
                <path d="M3 44 Q7 30 17 30 Q27 30 31 44Z" fill="#2d1b69"/>
              </svg>
            ), title: "CUSTOMER FOCUSED", desc: "Our customers remain the greatest source of our strength & pride. You are the reason we are hard bent on giving you more than expected." },
            { icon: (
              /* Global — filled globe with grid lines */
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                <circle cx="22" cy="22" r="19" fill="#9333ea"/>
                {/* equator */}
                <rect x="3" y="20" width="38" height="4" fill="#2d1b69"/>
                {/* tropic lines */}
                <rect x="5" y="12" width="34" height="3" rx="1.5" fill="rgba(45,27,105,0.5)"/>
                <rect x="5" y="29" width="34" height="3" rx="1.5" fill="rgba(45,27,105,0.5)"/>
                {/* central meridian */}
                <ellipse cx="22" cy="22" rx="6" ry="19" fill="rgba(45,27,105,0.35)"/>
                {/* outer ring */}
                <circle cx="22" cy="22" r="19" stroke="#2d1b69" strokeWidth="2.5" fill="none"/>
              </svg>
            ), title: "GLOBAL SOURCING", desc: "With us there's no discrimination in our sourcing. We welcome every bit of idea to make our world a better resourceful place. Always the best service." },
          ].map((f, i) => (
            <Reveal key={f.title} direction="up" delay={i * 120} duration={600}>
              <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: "4px", padding: "32px 24px", textAlign: "center" as const, height: "100%" }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "14px" }}>{f.icon}</div>
                <h4 style={{ fontSize: "13px", fontWeight: "700", color: NAVY, marginBottom: "10px", textTransform: "uppercase" as const }}>{f.title}</h4>
                <p style={{ fontSize: "13px", color: "#777", lineHeight: "1.7" }}>{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── About Us ── */}
      <section style={{ backgroundColor: "#fff", padding: "60px 0" }}>
        <div className="sg2" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 15px", gap: "60px", alignItems: "start" }}>
          <Reveal direction="right" duration={700}>
            <div>
              <h2 style={{ fontSize: "13px", fontWeight: "700", color: "#222", textTransform: "uppercase" as const, marginBottom: "10px" }}>ABOUT US</h2>
              <div style={{ width: "40px", height: "3px", background: GOLD, marginBottom: "16px" }} />
              <h2 style={{ fontSize: "30px", fontWeight: "700", color: "#222", lineHeight: "1.3", textTransform: "uppercase" as const }}>
                OUR REAL COMMITMENT REACHES BEYOND STORAGE &amp; DELIVERY.
              </h2>
            </div>
          </Reveal>
          <Reveal direction="left" duration={700} delay={120}>
            <div>
              <p style={{ fontSize: "14px", fontWeight: "600", color: "#222", marginBottom: "14px" }}>
                Who We Are! Extending Friendship Across The Globe &amp; Improving Total Performance
              </p>
              <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.8", marginBottom: "12px" }}>
                Security, convenience, and access – these are the words that define Freehold Express Services Storage and that drive our growth and success. Thanks to our commitment and dedication to customer satisfaction, Freehold Express Services has become a leader in self-storage.
              </p>
              <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.8" }}>
                Our customers-first attitude has allowed us to expand to 53 locations. With new advances in technology, our company continues to grow and adapt to provide you with the best service. Stop by one of our many locations to see first hand what Freehold Express Services Storage can offer. If you&apos;re interested in portable storage, email us.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ backgroundColor: "#fff", padding: "50px 0", borderTop: "1px solid #f0f0f0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 15px" }}>
          <Reveal direction="up" duration={600}>
            <div style={{ textAlign: "center" as const, marginBottom: "40px" }}>
              <h1 style={{ fontSize: "24px", fontWeight: "700", textTransform: "uppercase" as const, color: "#222" }}>ABOUT OUR CARGO SHIPMENT</h1>
              <hr style={{ width: "60px", border: "none", borderTop: "3px solid #d4af37", margin: "16px auto", background: GOLD, height: "3px" }} />
              <p style={{ fontSize: "13px", color: "#777", maxWidth: "700px", margin: "0 auto", lineHeight: "1.8" }}>
                Our trucking service extends to various locations such as offices, warehouses, exhibition venue to neighboring countries, Malaysia and In United Kingdom.
              </p>
            </div>
          </Reveal>
          <div className="sg4" style={{ gap: "24px", textAlign: "center" as const }}>
            {STATS.map((s, i) => (
              <Reveal key={s.label} direction="up" delay={i * 100} duration={600}>
                <div style={{ padding: "24px 16px" }}>
                  <div style={{ margin: "0 auto 16px", display: "inline-flex" }}>{STAT_ICONS[s.icon]}</div>
                  <CountUp target={Number(s.value)} duration={1800} className="stat-val" style={{ fontSize: "32px", fontWeight: "700", color: TEAL, marginBottom: "6px", display: "block" }} />
                  <h4 style={{ fontSize: "12px", fontWeight: "700", color: "#222", textTransform: "uppercase" as const, marginBottom: "8px" }}>{s.label}</h4>
                  <p style={{ fontSize: "12px", color: "#888", lineHeight: "1.6" }}>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Shipping Info ── */}
      <section style={{ backgroundColor: "#fff", padding: "60px 0", borderTop: "1px solid #f0f0f0" }}>
        <div className="sg2" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 15px", gap: "50px", alignItems: "center" }}>
          <Reveal direction="right" duration={750}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.pexels.com/photos/36552175/pexels-photo-36552175/free-photo-of-warehouse-worker-handling-box-on-storage-aisle.jpeg?auto=compress&cs=tinysrgb&w=700&fit=crop" alt="Freehold Express Services" style={{ width: "100%", borderRadius: "4px", objectFit: "cover" }} />
          </Reveal>
          <Reveal direction="left" duration={750} delay={150}>
            <div>
              <p style={{ fontSize: "11px", fontWeight: "700", color: TEAL, textTransform: "uppercase" as const, letterSpacing: "2px", marginBottom: "8px" }}>SHIPPING MADE EASY</p>
              <h2 style={{ fontSize: "26px", fontWeight: "400", color: "#222", marginBottom: "6px" }}>Freehold Express Services</h2>
              <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#222", textTransform: "uppercase" as const, marginBottom: "16px" }}>ACCESS ANYWHERE, ANYTIME...</h3>
              <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.8", marginBottom: "12px" }}>
                Storage is like a hotel room for your stuff! Your storage unit is constructed with concrete and/or steel and has a concrete floor. Units are minimum of 8′ high and come in a wide variety of sizes. The space has its own door — either a regular swing door, or a roll up door.
              </p>
              <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.8" }}>
                Units are rented in 4-week increments. You can access your unit during our extended access hours 7 days a week, 6am-11pm. (Some sites even have 24 hr access!) We have multiple payment options for your convenience.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Worldwide Delivery ── */}
      <section style={{ backgroundImage: "url('https://images.unsplash.com/photo-1761307234324-0c9eadb951de?w=1920&q=85&auto=format&fit=crop')", backgroundSize: "cover", backgroundPosition: "center", padding: "60px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 15px" }}>
          <Reveal direction="up" duration={600}>
            <div style={{ width: "40px", height: "3px", background: GOLD, marginBottom: "10px" }} />
            <h2 style={{ color: "#fff", fontSize: "26px", fontWeight: "700", textTransform: "uppercase" as const, marginBottom: "24px" }}>WORLDWIDE DELIVERY</h2>
          </Reveal>
          <div className="sg3" style={{ gap: "16px" }}>
            {[
              "https://images.unsplash.com/photo-1761133381018-aed5063d22fe?w=700&q=85&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1542296332-2e4473faf563?w=700&q=85&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1769144256207-bc4bb75b29db?w=700&q=85&auto=format&fit=crop",
            ].map((src, i) => (
              <Reveal key={src} direction="up" delay={i * 100} duration={600}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="Worldwide Delivery" style={{ width: "100%", height: "220px", objectFit: "cover", borderRadius: "4px", display: "block" }} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ backgroundColor: "#fff", padding: "60px 0", borderTop: "1px solid #f0f0f0" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 15px" }}>
          <Reveal direction="up" duration={600}>
            <h5 style={{ textAlign: "center" as const, fontSize: "15px", color: "#666", marginBottom: "36px" }}>
              ~ See What <strong>Our Customers</strong> Say About Us ~
            </h5>
          </Reveal>
          <div className="sg2" style={{ gap: "32px" }}>
            {[TESTIMONIALS[testi], TESTIMONIALS[(testi + 1) % TESTIMONIALS.length]].map((t, i) => (
              <Reveal key={t.name} direction="up" delay={i * 120} duration={600}>
                <div style={{ padding: "24px", border: "1px solid #eee", borderRadius: "4px", height: "100%" }}>
                  <p style={{ fontSize: "13px", color: "#777", lineHeight: "1.8", marginBottom: "16px", fontStyle: "italic" as const }}>&ldquo;{t.text}&rdquo;</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={t.img} alt={t.name} style={{ width: "52px", height: "52px", borderRadius: "50%", objectFit: "cover" }} />
                    <div>
                      <div style={{ fontWeight: "700", fontSize: "13px", color: NAVY }}>{t.name}</div>
                      <div style={{ fontSize: "12px", color: "#999" }}>{t.location}</div>
                      <div style={{ color: "#f5a623", fontSize: "13px", letterSpacing: "2px" }}>★★★★★</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "24px" }}>
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setTesti(i)}
                style={{ width: "10px", height: "10px", borderRadius: "50%", border: `1px solid ${TEAL}`, background: i === testi ? TEAL : "transparent", cursor: "pointer" }} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Partner Logos ── */}
      <section style={{ backgroundColor: "#f9f9f9", padding: "40px 0", borderTop: "1px solid #eee" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 15px", display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap" as const, gap: "50px" }}>
          {[1, 2, 3, 4].map((i) => (
            <Reveal key={i} direction="fade" delay={i * 80} duration={700}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://maxmoveshex.com/wp-content/uploads/2017/06/partners-${i}.png`} alt={`Partner ${i}`}
                style={{ height: "50px", width: "auto", objectFit: "contain", filter: "grayscale(40%)", opacity: 0.85 }} />
            </Reveal>
          ))}
        </div>
      </section>

    </SiteLayout>
  );
}
