import { useState, useRef, useEffect } from "react";

// ── Tokens ──────────────────────────────────────────────────────────────────
const T = {
  bg: "#0a0a0f",
  surface: "#111118",
  surfaceUp: "#18181f",
  border: "#1e1e2e",
  borderBright: "#2e2e4e",
  accent: "#ff6b35",
  accentDim: "rgba(255,107,53,0.15)",
  accentGlow: "rgba(255,107,53,0.35)",
  teal: "#00d4aa",
  tealDim: "rgba(0,212,170,0.12)",
  purple: "#8b5cf6",
  purpleDim: "rgba(139,92,246,0.12)",
  text: "#e8e8f0",
  textMid: "#9090a8",
  textDim: "#5a5a72",
  red: "#ff4560",
};

// ── Shared styles ────────────────────────────────────────────────────────────
const inputStyle = {
  width: "100%",
  background: T.surfaceUp,
  border: `1px solid ${T.border}`,
  borderRadius: 8,
  color: T.text,
  fontFamily: "'DM Mono', monospace",
  fontSize: 13,
  padding: "10px 14px",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
};

const btnPrimary = {
  background: `linear-gradient(135deg, ${T.accent}, #ff8c42)`,
  border: "none",
  borderRadius: 8,
  color: "#fff",
  fontFamily: "'DM Mono', monospace",
  fontWeight: 700,
  fontSize: 13,
  padding: "10px 20px",
  cursor: "pointer",
  letterSpacing: "0.04em",
  boxShadow: `0 0 18px ${T.accentGlow}`,
  transition: "opacity 0.2s, transform 0.1s",
};

const btnSecondary = {
  background: "transparent",
  border: `1px solid ${T.borderBright}`,
  borderRadius: 8,
  color: T.textMid,
  fontFamily: "'DM Mono', monospace",
  fontSize: 12,
  padding: "8px 14px",
  cursor: "pointer",
  transition: "border-color 0.2s, color 0.2s",
};

const card = {
  background: T.surface,
  border: `1px solid ${T.border}`,
  borderRadius: 12,
  padding: 20,
};

// ── Spinner ──────────────────────────────────────────────────────────────────
function Spinner() {
  return (
    <span style={{
      display: "inline-block", width: 14, height: 14,
      border: `2px solid ${T.accentDim}`,
      borderTop: `2px solid ${T.accent}`,
      borderRadius: "50%",
      animation: "spin 0.7s linear infinite",
      verticalAlign: "middle", marginRight: 8,
    }} />
  );
}

// ── Tag ──────────────────────────────────────────────────────────────────────
function Tag({ label, color = T.teal }) {
  return (
    <span style={{
      background: `${color}18`,
      border: `1px solid ${color}44`,
      borderRadius: 4,
      color,
      fontSize: 10,
      fontFamily: "'DM Mono', monospace",
      padding: "2px 7px",
      letterSpacing: "0.06em",
      textTransform: "uppercase",
    }}>{label}</span>
  );
}

// ── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ icon, title, tag, tagColor }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
      <span style={{ fontSize: 18 }}>{icon}</span>
      <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: T.text }}>{title}</span>
      {tag && <Tag label={tag} color={tagColor || T.teal} />}
    </div>
  );
}

// ── FEATURE 1: Multi-URL Scraper ─────────────────────────────────────────────
function MultiURLScraper() {
  const [urls, setUrls] = useState([""]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  const addUrl = () => { if (urls.length < 5) setUrls([...urls, ""]); };
  const removeUrl = (i) => setUrls(urls.filter((_, idx) => idx !== i));
  const updateUrl = (i, v) => setUrls(urls.map((u, idx) => idx === i ? v : u));

  const run = async () => {
    const validUrls = urls.filter(u => u.trim());
    if (!validUrls.length || !prompt.trim()) {
      setError("Add at least one URL and a prompt.");
      return;
    }
    setError(""); setLoading(true); setResults([]);
    const entry = { urls: validUrls, prompt, time: new Date().toLocaleTimeString() };

    // Simulate API call (replace with real FirecrawlApp.extract)
    await new Promise(r => setTimeout(r, 1800));
    const mock = validUrls.map(url => ({
      url,
      data: [
        { field: "title", value: `Page title from ${url}` },
        { field: "description", value: "Extracted meta description..." },
        { field: "keywords", value: "web, scraping, api" },
      ]
    }));
    setResults(mock);
    setHistory(h => [{ ...entry, resultCount: mock.length }, ...h.slice(0, 4)]);
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* URL Inputs */}
      <div style={card}>
        <SectionHeader icon="🌐" title="Target URLs" tag="Multi-URL" tagColor={T.accent} />
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {urls.map((url, i) => (
            <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ color: T.textDim, fontFamily: "'DM Mono', monospace", fontSize: 11, minWidth: 20 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <input
                style={{ ...inputStyle, flex: 1 }}
                placeholder="https://example.com"
                value={url}
                onChange={e => updateUrl(i, e.target.value)}
                onFocus={e => e.target.style.borderColor = T.accent}
                onBlur={e => e.target.style.borderColor = T.border}
              />
              {urls.length > 1 && (
                <button onClick={() => removeUrl(i)} style={{
                  ...btnSecondary, padding: "8px 10px", color: T.red, borderColor: T.red + "44"
                }}>✕</button>
              )}
            </div>
          ))}
        </div>
        {urls.length < 5 && (
          <button onClick={addUrl} style={{ ...btnSecondary, marginTop: 10, width: "100%" }}>
            + Add URL ({urls.length}/5)
          </button>
        )}
      </div>

      {/* Prompt */}
      <div style={card}>
        <SectionHeader icon="💬" title="Extraction Prompt" tag="NLP" tagColor={T.purple} />
        <textarea
          style={{ ...inputStyle, minHeight: 80, resize: "vertical", lineHeight: 1.6 }}
          placeholder='e.g. "Extract all product names, prices, and availability"'
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          onFocus={e => e.target.style.borderColor = T.purple}
          onBlur={e => e.target.style.borderColor = T.border}
        />
        {error && <p style={{ color: T.red, fontSize: 12, marginTop: 8, fontFamily: "'DM Mono', monospace" }}>{error}</p>}
        <button
          onClick={run}
          disabled={loading}
          style={{ ...btnPrimary, marginTop: 12, width: "100%", opacity: loading ? 0.7 : 1 }}
        >
          {loading ? <><Spinner />Extracting...</> : "⚡ Extract from All URLs"}
        </button>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div style={card}>
          <SectionHeader icon="📊" title="Extraction Results" tag={`${results.length} sources`} tagColor={T.teal} />
          {results.map((r, i) => (
            <div key={i} style={{
              borderLeft: `2px solid ${T.accent}`,
              paddingLeft: 14,
              marginBottom: 16,
            }}>
              <p style={{ color: T.textMid, fontSize: 11, fontFamily: "'DM Mono', monospace", marginBottom: 8 }}>
                🔗 {r.url}
              </p>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {["Field", "Extracted Value"].map(h => (
                      <th key={h} style={{
                        textAlign: "left", padding: "6px 10px",
                        background: T.surfaceUp, color: T.textMid,
                        fontSize: 11, fontFamily: "'DM Mono', monospace",
                        borderBottom: `1px solid ${T.border}`,
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {r.data.map((row, j) => (
                    <tr key={j} style={{ borderBottom: `1px solid ${T.border}` }}>
                      <td style={{ padding: "8px 10px", color: T.accent, fontFamily: "'DM Mono', monospace", fontSize: 12 }}>{row.field}</td>
                      <td style={{ padding: "8px 10px", color: T.text, fontFamily: "'DM Mono', monospace", fontSize: 12 }}>{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}

      {/* Query History */}
      {history.length > 0 && (
        <div style={card}>
          <SectionHeader icon="🕑" title="Query History" tag="recent" tagColor={T.textDim} />
          {history.map((h, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "8px 0", borderBottom: i < history.length - 1 ? `1px solid ${T.border}` : "none",
            }}>
              <div>
                <p style={{ color: T.text, fontSize: 12, fontFamily: "'DM Mono', monospace", margin: 0 }}>
                  {h.prompt.slice(0, 50)}{h.prompt.length > 50 ? "…" : ""}
                </p>
                <p style={{ color: T.textDim, fontSize: 10, fontFamily: "'DM Mono', monospace", margin: "2px 0 0" }}>
                  {h.urls.length} URL{h.urls.length > 1 ? "s" : ""} · {h.time}
                </p>
              </div>
              <button
                onClick={() => { setUrls(h.urls); setPrompt(h.prompt); }}
                style={{ ...btnSecondary, fontSize: 11 }}
              >↩ Reuse</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── FEATURE 2: Advanced Schema Builder ──────────────────────────────────────
const FIELD_TYPES = ["str", "bool", "int", "float", "list[str]", "list[int]"];

function SchemaBuilder() {
  const [fields, setFields] = useState([{ id: 1, name: "", type: "str", description: "", required: true }]);
  const [schemaName, setSchemaName] = useState("MySchema");
  const [targetUrl, setTargetUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [viewMode, setViewMode] = useState("form"); // form | json | preview
  const nextId = useRef(2);

  const addField = () => {
    setFields(f => [...f, { id: nextId.current++, name: "", type: "str", description: "", required: true }]);
  };
  const removeField = (id) => setFields(f => f.filter(x => x.id !== id));
  const updateField = (id, key, val) => setFields(f => f.map(x => x.id === id ? { ...x, [key]: val } : x));

  const buildSchema = () => {
    const props = {};
    const required = [];
    fields.filter(f => f.name.trim()).forEach(f => {
      const typeMap = {
        "str": { type: "string" },
        "bool": { type: "boolean" },
        "int": { type: "integer" },
        "float": { type: "number" },
        "list[str]": { type: "array", items: { type: "string" } },
        "list[int]": { type: "array", items: { type: "integer" } },
      };
      props[f.name] = { ...typeMap[f.type], description: f.description };
      if (f.required) required.push(f.name);
    });
    return { title: schemaName, type: "object", properties: props, required };
  };

  const run = async () => {
    if (!targetUrl.trim() || !fields.some(f => f.name.trim())) return;
    setLoading(true); setOutput(null);
    await new Promise(r => setTimeout(r, 1600));
    const schema = buildSchema();
    const mock = {};
    fields.filter(f => f.name.trim()).forEach(f => {
      if (f.type === "str") mock[f.name] = `Sample text for ${f.name}`;
      else if (f.type === "bool") mock[f.name] = true;
      else if (f.type === "int") mock[f.name] = 42;
      else if (f.type === "float") mock[f.name] = 3.14;
      else if (f.type.startsWith("list")) mock[f.name] = ["item_1", "item_2"];
    });
    setOutput({ schema, data: mock });
    setLoading(false);
    setViewMode("preview");
  };

  const schema = buildSchema();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Schema name + URL */}
      <div style={card}>
        <SectionHeader icon="🏗️" title="Schema Configuration" tag="Extended" tagColor={T.purple} />
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <div style={{ flex: "0 0 180px" }}>
            <label style={{ color: T.textMid, fontSize: 11, fontFamily: "'DM Mono', monospace", display: "block", marginBottom: 6 }}>SCHEMA NAME</label>
            <input
              style={inputStyle}
              value={schemaName}
              onChange={e => setSchemaName(e.target.value)}
              onFocus={e => e.target.style.borderColor = T.purple}
              onBlur={e => e.target.style.borderColor = T.border}
            />
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <label style={{ color: T.textMid, fontSize: 11, fontFamily: "'DM Mono', monospace", display: "block", marginBottom: 6 }}>TARGET URL</label>
            <input
              style={inputStyle}
              placeholder="https://example.com"
              value={targetUrl}
              onChange={e => setTargetUrl(e.target.value)}
              onFocus={e => e.target.style.borderColor = T.purple}
              onBlur={e => e.target.style.borderColor = T.border}
            />
          </div>
        </div>
      </div>

      {/* Fields */}
      <div style={card}>
        <SectionHeader icon="🧩" title="Schema Fields" tag={`${fields.length} fields`} tagColor={T.accent} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {fields.map((f, i) => (
            <div key={f.id} style={{
              background: T.surfaceUp,
              border: `1px solid ${T.border}`,
              borderRadius: 8,
              padding: "12px 14px",
            }}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "flex-start" }}>
                <div style={{ flex: "0 0 30px", paddingTop: 10, color: T.textDim, fontFamily: "'DM Mono', monospace", fontSize: 11 }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div style={{ flex: "1 1 130px" }}>
                  <label style={{ color: T.textDim, fontSize: 10, fontFamily: "'DM Mono', monospace", display: "block", marginBottom: 4 }}>FIELD NAME</label>
                  <input
                    style={inputStyle}
                    placeholder="e.g. product_name"
                    value={f.name}
                    onChange={e => updateField(f.id, "name", e.target.value)}
                    onFocus={e => e.target.style.borderColor = T.accent}
                    onBlur={e => e.target.style.borderColor = T.border}
                  />
                </div>
                <div style={{ flex: "0 0 110px" }}>
                  <label style={{ color: T.textDim, fontSize: 10, fontFamily: "'DM Mono', monospace", display: "block", marginBottom: 4 }}>TYPE</label>
                  <select
                    style={{ ...inputStyle, cursor: "pointer" }}
                    value={f.type}
                    onChange={e => updateField(f.id, "type", e.target.value)}
                  >
                    {FIELD_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div style={{ flex: "1 1 160px" }}>
                  <label style={{ color: T.textDim, fontSize: 10, fontFamily: "'DM Mono', monospace", display: "block", marginBottom: 4 }}>DESCRIPTION</label>
                  <input
                    style={inputStyle}
                    placeholder="What to extract..."
                    value={f.description}
                    onChange={e => updateField(f.id, "description", e.target.value)}
                    onFocus={e => e.target.style.borderColor = T.teal}
                    onBlur={e => e.target.style.borderColor = T.border}
                  />
                </div>
                <div style={{ flex: "0 0 70px", paddingTop: 24, display: "flex", alignItems: "center", gap: 6 }}>
                  <input
                    type="checkbox"
                    checked={f.required}
                    onChange={e => updateField(f.id, "required", e.target.checked)}
                    style={{ accentColor: T.accent, cursor: "pointer" }}
                    id={`req-${f.id}`}
                  />
                  <label htmlFor={`req-${f.id}`} style={{ color: T.textDim, fontSize: 10, fontFamily: "'DM Mono', monospace", cursor: "pointer" }}>REQ</label>
                </div>
                {fields.length > 1 && (
                  <button onClick={() => removeField(f.id)} style={{
                    ...btnSecondary, padding: "8px 10px", marginTop: 20,
                    color: T.red, borderColor: T.red + "33",
                  }}>✕</button>
                )}
              </div>
            </div>
          ))}
        </div>
        <button onClick={addField} style={{ ...btnSecondary, marginTop: 12, width: "100%" }}>
          + Add Field ({fields.length}/10)
        </button>
      </div>

      {/* Schema Preview tabs */}
      <div style={card}>
        <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
          {["form", "json", "preview"].map(mode => (
            <button key={mode} onClick={() => setViewMode(mode)} style={{
              ...btnSecondary,
              borderColor: viewMode === mode ? T.purple : T.border,
              color: viewMode === mode ? T.purple : T.textMid,
              fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em",
            }}>{mode === "json" ? "JSON Schema" : mode === "preview" ? "Live Preview" : "Summary"}</button>
          ))}
        </div>

        {viewMode === "form" && (
          <div>
            <p style={{ color: T.textMid, fontSize: 12, fontFamily: "'DM Mono', monospace", marginBottom: 12 }}>
              {fields.filter(f => f.name).length} active field{fields.filter(f => f.name).length !== 1 ? "s" : ""} · {fields.filter(f => f.required && f.name).length} required
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {fields.filter(f => f.name).map(f => (
                <div key={f.id} style={{
                  background: T.accentDim,
                  border: `1px solid ${T.accent}33`,
                  borderRadius: 6,
                  padding: "4px 10px",
                  display: "flex", gap: 6, alignItems: "center",
                }}>
                  <span style={{ color: T.text, fontSize: 12, fontFamily: "'DM Mono', monospace" }}>{f.name}</span>
                  <Tag label={f.type} color={T.teal} />
                  {f.required && <Tag label="req" color={T.accent} />}
                </div>
              ))}
            </div>
          </div>
        )}

        {viewMode === "json" && (
          <pre style={{
            background: T.bg, borderRadius: 8, padding: 16,
            color: T.teal, fontSize: 11, fontFamily: "'DM Mono', monospace",
            overflow: "auto", maxHeight: 280, lineHeight: 1.7, margin: 0,
          }}>
            {JSON.stringify(schema, null, 2)}
          </pre>
        )}

        {viewMode === "preview" && output && (
          <div>
            <p style={{ color: T.textMid, fontSize: 11, fontFamily: "'DM Mono', monospace", marginBottom: 10 }}>
              ✅ Sample extracted data:
            </p>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Field", "Type", "Sample Value"].map(h => (
                    <th key={h} style={{
                      textAlign: "left", padding: "7px 10px",
                      background: T.surfaceUp, color: T.textMid,
                      fontSize: 11, fontFamily: "'DM Mono', monospace",
                      borderBottom: `1px solid ${T.border}`,
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fields.filter(f => f.name).map((f, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${T.border}` }}>
                    <td style={{ padding: "8px 10px", color: T.accent, fontFamily: "'DM Mono', monospace", fontSize: 12 }}>{f.name}</td>
                    <td style={{ padding: "8px 10px" }}><Tag label={f.type} color={T.teal} /></td>
                    <td style={{ padding: "8px 10px", color: T.text, fontFamily: "'DM Mono', monospace", fontSize: 12 }}>
                      {String(output.data[f.name] ?? "—")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {viewMode === "preview" && !output && (
          <p style={{ color: T.textDim, fontSize: 12, fontFamily: "'DM Mono', monospace" }}>
            Run an extraction first to see the live preview.
          </p>
        )}
      </div>

      <button
        onClick={run}
        disabled={loading}
        style={{ ...btnPrimary, opacity: loading ? 0.7 : 1 }}
      >
        {loading ? <><Spinner />Running Schema Extraction...</> : "🧬 Extract with Schema"}
      </button>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("scraper");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${T.bg}; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${T.bg}; }
        ::-webkit-scrollbar-thumb { background: ${T.border}; border-radius: 2px; }
        select option { background: ${T.surfaceUp}; }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: T.bg,
        color: T.text,
        fontFamily: "'DM Mono', monospace",
        animation: "fadeUp 0.4s ease both",
      }}>
        {/* Header */}
        <div style={{
          background: T.surface,
          borderBottom: `1px solid ${T.border}`,
          padding: "0 24px",
          position: "sticky", top: 0, zIndex: 10,
          backdropFilter: "blur(12px)",
        }}>
          <div style={{
            maxWidth: 860, margin: "0 auto",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            height: 56,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 22 }}>🔥</span>
              <span style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800, fontSize: 18,
                background: `linear-gradient(90deg, ${T.accent}, #ff8c42)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                letterSpacing: "-0.02em",
              }}>Firecrawl</span>
              <Tag label="Studio" color={T.accent} />
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              {[
                { id: "scraper", label: "🌐 Multi-URL Scraper" },
                { id: "schema", label: "🧬 Schema Builder" },
              ].map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} style={{
                  background: tab === t.id ? T.accentDim : "transparent",
                  border: `1px solid ${tab === t.id ? T.accent + "55" : "transparent"}`,
                  borderRadius: 7,
                  color: tab === t.id ? T.accent : T.textMid,
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 12, padding: "6px 12px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}>{t.label}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Hero strip */}
        <div style={{
          background: `linear-gradient(135deg, ${T.accentDim}, ${T.purpleDim})`,
          borderBottom: `1px solid ${T.border}`,
          padding: "14px 24px",
        }}>
          <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <p style={{ color: T.textMid, fontSize: 12 }}>
              {tab === "scraper"
                ? "⚡ Extract structured data from multiple URLs simultaneously with natural language prompts."
                : "🧩 Define custom JSON schemas and extract typed, structured data with validation."}
            </p>
            <div style={{ display: "flex", gap: 6 }}>
              <Tag label={tab === "scraper" ? "Up to 5 URLs" : "Up to 10 fields"} color={T.accent} />
              <Tag label="AI Powered" color={T.purple} />
              <Tag label="Query History" color={T.teal} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "24px 24px 60px" }}>
          {tab === "scraper" ? <MultiURLScraper /> : <SchemaBuilder />}
        </div>

        {/* Footer */}
        <div style={{
          borderTop: `1px solid ${T.border}`,
          padding: "14px 24px",
          textAlign: "center",
          color: T.textDim,
          fontSize: 11,
          fontFamily: "'DM Mono', monospace",
        }}>
          Built with 🔥 Firecrawl + Streamlit · Firecrawl Studio UI
        </div>
      </div>
    </>
  );
}
