export default function InsightsPreview() {
  const articles = [
    { num: "01", title: "your brand is your biggest asset", img: "/insights-preview/brand-asset.jpg", category: "Brand Strategy" },
    { num: "02", title: "culture doesn't eat strategy — it is strategy", img: "/insights-preview/culture-strategy.jpg", category: "Culture" },
    { num: "03", title: "events are brand strategy, not marketing tactics", img: "/insights-preview/events-brand.jpg", category: "Events" },
    { num: "04", title: "the psychology of color in brand identity", img: "/insights-preview/color-psychology.jpg", category: "Brand Strategy" },
    { num: "05", title: "your leadership is your brand", img: "/insights-preview/leadership-brand.jpg", category: "Leadership" },
    { num: "06", title: "why brands fail (it's not the logo)", img: "/insights-preview/brands-fail.jpg", category: "Brand Strategy" },
    { num: "07", title: "the roi of brand strategy", img: "/insights-preview/brand-roi.jpg", category: "Brand Strategy" },
    { num: "08", title: "the power of collective intelligence", img: "/insights-preview/collective-intel.jpg", category: "Insights" },
    { num: "09", title: "the future of brand in the ai age", img: "/insights-preview/future-brand.jpg", category: "Insights" },
    { num: "10", title: "the koolture manifesto", img: "/insights-preview/manifesto.jpg", category: "Insights" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", padding: 40, fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: "#231f20", marginBottom: 8 }}>
          the koolture files — image approval
        </h1>
        <p style={{ color: "#666", marginBottom: 40, fontSize: 14 }}>
          review all 10 hero images. send me the numbers of any you want changed.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 24 }}>
          {articles.map((a) => (
            <div key={a.num} style={{ background: "#fff", borderRadius: 8, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
              <div style={{ position: "relative", aspectRatio: "1200/630", overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.img} alt={a.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{
                  position: "absolute", top: 12, left: 12,
                  background: "#eb1e00", color: "#fff",
                  fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 2,
                }}>
                  {a.num}
                </div>
              </div>
              <div style={{ padding: "14px 16px" }}>
                <p style={{ fontSize: 11, color: "#eb1e00", fontWeight: 700, marginBottom: 4, letterSpacing: "0.1em" }}>
                  {a.category.toUpperCase()}
                </p>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#231f20", margin: 0, lineHeight: 1.4 }}>
                  {a.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p style={{ textAlign: "center", marginTop: 48, fontSize: 14, color: "#999" }}>
          → send me "approve all" or list the numbers you want replaced (e.g. "replace 2, 5, 8")
        </p>
      </div>
    </div>
  );
}
