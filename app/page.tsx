"use client";

import { useMemo, useState } from "react";
import { generateAds } from "../lib/generator";

export default function HomePage() {
  const [product, setProduct] = useState("");
  const [benefit, setBenefit] = useState("");
  const [audience, setAudience] = useState("");
  const [platform, setPlatform] = useState("instagram");
  const [tone, setTone] = useState("friendly");
  const [length, setLength] = useState("short");
  const [emoji, setEmoji] = useState(true);
  const [hashtags, setHashtags] = useState(true);
  const [ads, setAds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const disabled = useMemo(() => !product.trim() || !benefit.trim(), [product, benefit]);

  const onGenerate = async () => {
    setLoading(true);
    // simulate minimal delay for UX polish
    setTimeout(() => {
      const res = generateAds({ product, benefit, audience, platform, tone, length, emoji, hashtags });
      setAds(res);
      setLoading(false);
    }, 150);
  };

  const onCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("?? ??? ???? ?");
    } catch {
      alert("????? ?????");
    }
  };

  const onDownload = (text: string, idx: number) => {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ad_${idx + 1}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container">
      <header className="header" style={{ marginBottom: "1.25rem" }}>
        <div className="logo">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" fill="#16a34a"/>
          </svg>
          <div>
            <div style={{ fontSize: "1.1rem" }}>????? ????? ??????? ????????</div>
            <div className="muted" style={{ fontSize: ".9rem" }}>??????? ? ???? ? ???? ?????</div>
          </div>
        </div>
        <span className="badge">???? ???? ??????</span>
      </header>

      <div className="grid">
        <section className="card section">
          <h2>????????</h2>
          <div className="row">
            <div>
              <div className="label">??????/??????</div>
              <input className="input" placeholder="????: ???? ?????? ????? ?????..." value={product} onChange={e => setProduct(e.target.value)} />
            </div>
          </div>
          <div className="row">
            <div>
              <div className="label">??????? ????????</div>
              <input className="input" placeholder="??? ??? ???????" value={benefit} onChange={e => setBenefit(e.target.value)} />
            </div>
          </div>
          <div className="row">
            <div>
              <div className="label">??????? ???????? (???????)</div>
              <input className="input" placeholder="????? ??????? ?????? ???? ?????..." value={audience} onChange={e => setAudience(e.target.value)} />
            </div>
          </div>
          <div className="row two">
            <div>
              <div className="label">???????</div>
              <select className="select" value={platform} onChange={e => setPlatform(e.target.value)}>
                <option value="instagram">????????</option>
                <option value="x">X (?????)</option>
                <option value="tiktok">??? ???</option>
                <option value="snapchat">???? ???</option>
                <option value="facebook">??????</option>
                <option value="linkedin">???????</option>
              </select>
            </div>
            <div>
              <div className="label">??????</div>
              <select className="select" value={tone} onChange={e => setTone(e.target.value)}>
                <option value="friendly">????</option>
                <option value="premium">?????</option>
                <option value="energetic">??????</option>
                <option value="trust">??????</option>
                <option value="funny">????? ??</option>
              </select>
            </div>
          </div>
          <div className="row two">
            <div>
              <div className="label">?????</div>
              <select className="select" value={length} onChange={e => setLength(e.target.value)}>
                <option value="short">????</option>
                <option value="medium">?????</option>
                <option value="long">????</option>
              </select>
            </div>
            <div className="row" style={{ alignItems: "end" }}>
              <label style={{ display: "flex", gap: ".6rem", alignItems: "center" }}>
                <input type="checkbox" checked={emoji} onChange={e => setEmoji(e.target.checked)} />
                ??????
              </label>
              <label style={{ display: "flex", gap: ".6rem", alignItems: "center" }}>
                <input type="checkbox" checked={hashtags} onChange={e => setHashtags(e.target.checked)} />
                ????????
              </label>
            </div>
          </div>

          <div className="actions" style={{ marginTop: "1rem" }}>
            <button className="button" onClick={onGenerate} disabled={disabled || loading}>
              {loading ? "??? ???????..." : "???? ???????"}
            </button>
            <button className="button secondary" onClick={() => { setProduct(""); setBenefit(""); setAudience(""); setAds([]); }}>
              ????? ?????
            </button>
          </div>
        </section>

        <section className="card section">
          <h2>???????</h2>
          {ads.length === 0 ? (
            <div className="muted">???? ???????? ????? "???? ???????" ???? ???? ????? ?????.</div>
          ) : (
            <div style={{ display: "grid", gap: "0.75rem" }}>
              {ads.map((text, idx) => (
                <div key={idx} className="card" style={{ padding: "0.9rem" }}>
                  <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.9 }}>{text}</div>
                  <div className="actions" style={{ marginTop: ".7rem" }}>
                    <button className="button secondary" onClick={() => onCopy(text)}>???</button>
                    <button className="button secondary" onClick={() => onDownload(text, idx)}>????? TXT</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <div className="footer">???? ?? ??????? ???????? ??????? ???????? ?? ?????? ??????? ???????.</div>
    </div>
  );
}
