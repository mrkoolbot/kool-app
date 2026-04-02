import Link from "next/link";
import { KoolLogo } from "@/components/kool-logo";

export function DashboardFooter() {
  return (
    <footer style={{ borderTop: "1px solid #EBEBEB", padding: "40px 24px", marginTop: "auto" }}>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "24px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "6px" }}>
          <Link href="/" style={{ display: "inline-block", marginLeft: "-29px" }}><KoolLogo size="sm" /></Link>
          <span style={{ fontSize: "11px", color: "#999", letterSpacing: "0.04em" }}>intellectual property of the koolture group (TKG) — all rights reserved</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "32px", fontSize: "13px", color: "#888" }}>
          <Link href="/pricing" style={{ color: "#888", textDecoration: "none" }}>pricing</Link>
          <Link href="/login" style={{ color: "#888", textDecoration: "none" }}>log in</Link>
          <Link href="/signup" style={{ color: "#888", textDecoration: "none" }}>sign up</Link>
          <Link href="https://thekoolturegroup.com" target="_blank" style={{ color: "#888", textDecoration: "none" }}>the koolture group</Link>
        </div>
      </div>
    </footer>
  );
}
