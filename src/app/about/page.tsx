import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

const NAVY = "#2d1b69";
const GOLD = "linear-gradient(145deg, #ffe566 0%, #d4af37 40%, #a07800 75%, #c9a227 100%)";

export default function AboutPage() {
  return (
    <SiteLayout activePage="/about">
      <PageHero title="About Us" breadcrumb="Home / Our Company" />

      {/* Our Edge section */}
      <section style={{ backgroundColor: "#fff", padding: "60px 0" }}>
        <div className="sg2" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 15px", gap: "50px", alignItems: "start" }}>
          <Reveal direction="right" duration={750}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.pexels.com/photos/36552175/pexels-photo-36552175/free-photo-of-warehouse-worker-handling-box-on-storage-aisle.jpeg?auto=compress&cs=tinysrgb&w=700&fit=crop" alt="Freehold Express Services" style={{ width: "100%", borderRadius: "4px" }} />
          </Reveal>
          <Reveal direction="left" duration={750} delay={120}>
            <div>
              <h2 style={{ fontSize: "26px", fontWeight: "700", color: "#222", marginBottom: "16px" }}>OUR EDGE OVER THE YEARS</h2>
              <div style={{ width: "40px", height: "3px", background: GOLD, marginBottom: "20px" }} />
              <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.9", marginBottom: "14px" }}>
                Security, convenience, and access – these are the words that define Freehold Express Services Storage and that drive our growth and success. Thanks to our commitment and dedication to customer satisfaction, Freehold Express Services has become a leader in self-storage.
              </p>
              <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.9", marginBottom: "14px" }}>
                Our customers-first attitude has allowed us to expand to 53 locations. With new advances in technology, our company continues to grow and adapt to provide you with the best service – and consequently, the best experience – possible.
              </p>
              <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.9" }}>
                Stop by one of our many locations to see first hand what Freehold Express Services Storage can offer. If you&apos;re interested in portable storage, email us.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values section */}
      <section style={{ backgroundColor: "#f9f9f9", padding: "50px 0", borderTop: "1px solid #eee" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 15px" }}>
          <Reveal direction="up" duration={600}>
            <h2 style={{ fontSize: "24px", fontWeight: "700", textAlign: "center" as const, marginBottom: "8px" }}>OUR CORE VALUES</h2>
            <div style={{ width: "40px", height: "3px", background: GOLD, margin: "0 auto 36px" }} />
          </Reveal>
          <div className="sg3" style={{ gap: "24px" }}>
            {[
              { icon: (
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                  <circle cx="22" cy="25" r="16" fill="#9333ea"/>
                  <circle cx="22" cy="25" r="11" fill="#2d1b69"/>
                  <polygon points="22,15 24.4,21.3 31,21.3 25.8,25.1 27.8,31.5 22,27.5 16.2,31.5 18.2,25.1 13,21.3 19.6,21.3" fill="#d4af37"/>
                  <rect x="17" y="2" width="4" height="10" rx="2" fill="#7c3aed"/>
                  <rect x="23" y="2" width="4" height="10" rx="2" fill="#9333ea"/>
                </svg>
              ), title: "Quality Driven", desc: "We've proven our quality without compromise of any form, as satisfying our customers is our sole objective." },
              { icon: (
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                  <circle cx="28" cy="14" r="7" fill="#7c3aed"/>
                  <path d="M15 44 Q19 30 28 30 Q37 30 41 44Z" fill="#7c3aed"/>
                  <circle cx="17" cy="15" r="8" fill="#2d1b69"/>
                  <path d="M3 44 Q7 30 17 30 Q27 30 31 44Z" fill="#2d1b69"/>
                </svg>
              ), title: "Customer Focused", desc: "Our customers remain the greatest source of our strength & pride. You are the reason we give more than expected." },
              { icon: (
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                  <circle cx="22" cy="22" r="19" fill="#9333ea"/>
                  <rect x="3" y="20" width="38" height="4" fill="#2d1b69"/>
                  <rect x="5" y="12" width="34" height="3" rx="1.5" fill="rgba(45,27,105,0.5)"/>
                  <rect x="5" y="29" width="34" height="3" rx="1.5" fill="rgba(45,27,105,0.5)"/>
                  <ellipse cx="22" cy="22" rx="6" ry="19" fill="rgba(45,27,105,0.35)"/>
                  <circle cx="22" cy="22" r="19" stroke="#2d1b69" strokeWidth="2.5" fill="none"/>
                </svg>
              ), title: "Global Sourcing", desc: "With us there's no discrimination in our sourcing. We make our world a better resourceful place." },
            ].map((v, i) => (
              <Reveal key={v.title} direction="up" delay={i * 120} duration={600}>
                <div style={{ backgroundColor: "#fff", border: "1px solid #e8e8e8", borderRadius: "4px", padding: "28px 20px", textAlign: "center" as const, height: "100%" }}>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: "12px" }}>{v.icon}</div>
                  <h4 style={{ fontSize: "14px", fontWeight: "700", color: NAVY, marginBottom: "10px" }}>{v.title}</h4>
                  <p style={{ fontSize: "13px", color: "#777", lineHeight: "1.7" }}>{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
