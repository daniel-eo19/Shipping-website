export default function PageHero({ title, breadcrumb }: { title: string; breadcrumb: string }) {
  return (
    <div style={{
      backgroundImage: "linear-gradient(rgba(0,0,0,0.55),rgba(0,0,0,0.55)), url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1920&q=85&auto=format&fit=crop')",
      backgroundSize: "cover", backgroundPosition: "center",
      padding: "60px 0",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 15px" }}>
        <h1 style={{ color: "#fff", fontSize: "32px", fontWeight: "700", marginBottom: "8px" }}>{title}</h1>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "13px" }}>{breadcrumb}</p>
      </div>
    </div>
  );
}
