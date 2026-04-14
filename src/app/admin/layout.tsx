"use client";

import { usePathname, useRouter } from "next/navigation";
import { LogoFooter } from "@/components/Logo";

const NAVY = "#2d1b69";
const TEAL = "#9333ea";
const GOLD = "linear-gradient(145deg, #ffe566 0%, #d4af37 40%, #a07800 75%, #c9a227 100%)";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/shipments", label: "All Shipments", icon: "📦" },
  { href: "/admin/shipments/new", label: "Add New Shipment", icon: "➕" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") return <>{children}</>;

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Open Sans', sans-serif" }}>
      {/* Sidebar */}
      <aside style={{
        width: "240px", flexShrink: 0, backgroundColor: "#111827",
        display: "flex", flexDirection: "column" as const,
        position: "sticky", top: 0, height: "100vh", overflowY: "auto",
      }}>
        <div style={{ padding: "24px 20px 16px" }}>
          <LogoFooter />
          <div style={{ marginTop: "8px", fontSize: "10px", color: "#6b7280", letterSpacing: "1px", textTransform: "uppercase" as const }}>
            Admin Portal
          </div>
        </div>

        <div style={{ height: "1px", backgroundColor: "#1f2937", margin: "0 20px" }} />

        <nav style={{ flex: 1, padding: "16px 12px" }}>
          {NAV.map(item => {
            const active = item.href === "/admin"
              ? pathname === "/admin"
              : item.href === "/admin/shipments"
                ? pathname === "/admin/shipments" || (pathname.startsWith("/admin/shipments/") && pathname !== "/admin/shipments/new")
                : pathname === item.href;
            return (
              <a key={item.href} href={item.href} style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "10px 12px", borderRadius: "6px", marginBottom: "4px",
                backgroundColor: active ? "#1f2937" : "transparent",
                color: active ? "#fff" : "#9ca3af",
                textDecoration: "none", fontSize: "13px", fontWeight: "600",
                borderLeft: active ? `3px solid ${TEAL}` : "3px solid transparent",
                transition: "all 0.15s ease",
              }}>
                <span>{item.icon}</span>
                {item.label}
              </a>
            );
          })}
        </nav>

        <div style={{ padding: "16px 12px" }}>
          <a href="/" target="_blank" style={{
            display: "flex", alignItems: "center", gap: "10px",
            padding: "10px 12px", borderRadius: "6px", marginBottom: "4px",
            color: "#6b7280", textDecoration: "none", fontSize: "12px",
          }}>
            🌐 View Website ↗
          </a>
          <button onClick={handleLogout} style={{
            width: "100%", display: "flex", alignItems: "center", gap: "10px",
            padding: "10px 12px", borderRadius: "6px",
            background: "none", border: "none",
            color: "#6b7280", cursor: "pointer", fontSize: "13px", fontWeight: "600",
            textAlign: "left" as const,
          }}>
            🔒 Sign Out
          </button>
        </div>
      </aside>

      {/* Main area */}
      <main style={{ flex: 1, backgroundColor: "#f9fafb", minHeight: "100vh" }}>
        {/* Top bar */}
        <div style={{
          backgroundColor: "#fff", borderBottom: "1px solid #e5e7eb",
          padding: "14px 28px", display: "flex",
          alignItems: "center", justifyContent: "space-between",
          position: "sticky", top: 0, zIndex: 10,
        }}>
          <div style={{ fontSize: "13px", color: "#6b7280" }}>
            Freehold Express Services · <span style={{ color: NAVY, fontWeight: "700" }}>Shipment Admin</span>
          </div>
          <a href="/admin/shipments/new" style={{
            background: GOLD, color: "#fff", textDecoration: "none",
            padding: "8px 18px", borderRadius: "6px", fontSize: "12px",
            fontWeight: "700", textShadow: "0 1px 2px rgba(0,0,0,0.2)",
            boxShadow: "0 2px 8px rgba(212,175,55,0.4)",
          }}>
            + New Shipment
          </a>
        </div>

        <div style={{ padding: "28px" }}>
          {children}
        </div>
      </main>
    </div>
  );
}
