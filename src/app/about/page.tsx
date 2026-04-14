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
              { icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="#9333ea" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>, title: "Quality Driven", desc: "We've proven our quality without compromise of any form, as satisfying our customers is our sole objective." },
              { icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, title: "Customer Focused", desc: "Our customers remain the greatest source of our strength & pride. You are the reason we give more than expected." },
              { icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, title: "Global Sourcing", desc: "With us there's no discrimination in our sourcing. We make our world a better resourceful place." },
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
