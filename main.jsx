import React, {useState} from "react";
import {createRoot} from "react-dom/client";
import "./styles.css";

const BRAND = "NexaLend";

function Header({onHome}) {
  return <header className="header">
    <button className="brand" onClick={onHome} aria-label="NexaLend home">
      <span className="brand-mark">N</span><span>{BRAND}</span>
    </button>
    <span className="secure">● Secure application</span>
  </header>
}

function Landing({go}) {
  return <div className="page">
    <Header onHome={()=>{}}/>
    <main>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">PERSONAL LOANS</div>
          <h1>Get your<br/><strong>LOAN</strong></h1>
          <div className="amount">€500 <span>to</span> €60,000</div>
          <p className="lead">Flexible loan options designed around your goals.</p>
          <button className="cta" onClick={()=>go("apply")}>Apply today <span>→</span></button>
          <p className="fine">Rates and eligibility depend on your application and assessment.</p>
        </div>
        <div className="hero-art">
          <div className="phone">
            <div className="phone-top"></div>
            <div className="screen">
              <div className="mini-logo"><span>N</span> NexaLend</div>
              <div className="screen-title">Your loan<br/>starts here.</div>
              <div className="screen-card"><small>Available range</small><b>€500 – €60,000</b></div>
              <div className="screen-btn">Get started</div>
            </div>
          </div>
          <div className="glow"></div>
        </div>
      </section>
      <section className="benefits">
        <div><i>％</i><b>Competitive options</b><span>Clear terms and transparent information.</span></div>
        <div><i>✓</i><b>Quick application</b><span>Complete the application from your phone.</span></div>
        <div><i>◇</i><b>Secure by design</b><span>Your application stays protected.</span></div>
        <div><i>↕</i><b>Flexible choices</b><span>Choose an option that fits your needs.</span></div>
      </section>
    </main>
    <footer>© 2026 NexaLend · Demo financial application</footer>
  </div>
}

function Apply({go, setData}) {
  const [form,setForm]=useState({name:"",email:"",phone:"",amount:"5000",income:""});
  const update=e=>setForm({...form,[e.target.name]:e.target.value});
  const submit=e=>{e.preventDefault();setData(form);go("account")};
  return <div className="dark-page">
    <Header onHome={()=>go("home")}/>
    <main className="form-wrap">
      <div className="step">STEP 1 OF 3</div>
      <h2>Start your application</h2>
      <p className="muted">Tell us a few details so we can prepare your application.</p>
      <form onSubmit={submit} className="form-card">
        <label>Full name<input required name="name" value={form.name} onChange={update} placeholder="Your full name"/></label>
        <label>Email address<input required type="email" name="email" value={form.email} onChange={update} placeholder="you@example.com"/></label>
        <label>Mobile number<input required name="phone" value={form.phone} onChange={update} placeholder="+00 000 000 000"/></label>
        <label>Requested amount
          <select name="amount" value={form.amount} onChange={update}>
            <option value="500">€500</option><option value="2500">€2,500</option><option value="5000">€5,000</option>
            <option value="10000">€10,000</option><option value="25000">€25,000</option><option value="60000">€60,000</option>
          </select>
        </label>
        <label>Approximate monthly income<input required name="income" value={form.income} onChange={update} placeholder="€ 0.00"/></label>
        <button className="cta full">Continue <span>→</span></button>
      </form>
    </main>
  </div>
}

function Account({go}) {
  return <div className="dark-page">
    <Header onHome={()=>go("home")}/>
    <main className="form-wrap narrow">
      <div className="step">STEP 2 OF 3</div>
      <h2>Create your NexaLend account</h2>
      <p className="muted">This demo uses a NexaLend account only. Never enter your bank username or password here.</p>
      <div className="form-card">
        <label>Email<input type="email" placeholder="Email address"/></label>
        <label>Create password<input type="password" placeholder="Create a password"/></label>
        <label>Confirm password<input type="password" placeholder="Confirm password"/></label>
        <button className="cta full" onClick={()=>go("identity")}>Continue <span>→</span></button>
        <div className="notice">Demo only — no banking credentials are requested.</div>
      </div>
    </main>
  </div>
}

function Identity({go}) {
  const [file,setFile]=useState(null);
  return <div className="dark-page">
    <Header onHome={()=>go("home")}/>
    <main className="form-wrap narrow">
      <div className="step">STEP 3 OF 3</div>
      <h2>Identity verification</h2>
      <p className="muted">For this demo, upload a sample document only. Do not upload a real passport, ID card, or driver's licence.</p>
      <div className="form-card">
        <label>Verification document
          <div className="upload">
            <input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={e=>setFile(e.target.files?.[0]||null)}/>
            <span className="upload-icon">↑</span>
            <b>{file ? file.name : "Choose a sample document"}</b>
            <small>JPG, PNG or PDF · demo files only</small>
          </div>
        </label>
        <button className="cta full" onClick={()=>go("done")}>Submit demo application <span>→</span></button>
        <div className="notice">No document is uploaded to a server by this front-end demo.</div>
      </div>
    </main>
  </div>
}

function Done({go}) {
  return <div className="dark-page">
    <Header onHome={()=>go("home")}/>
    <main className="success">
      <div className="check">✓</div>
      <div className="step">APPLICATION COMPLETE</div>
      <h2>Thanks — your demo application is ready.</h2>
      <p className="muted">This prototype does not submit financial or identity information to a lender.</p>
      <button className="cta" onClick={()=>go("home")}>Back to home</button>
    </main>
  </div>
}

function App(){
  const [page,setPage]=useState("home");
  const [data,setData]=useState({});
  const go=p=>setPage(p);
  if(page==="home") return <Landing go={go}/>;
  if(page==="apply") return <Apply go={go} setData={setData}/>;
  if(page==="account") return <Account go={go}/>;
  if(page==="identity") return <Identity go={go}/>;
  return <Done go={go}/>;
}
createRoot(document.getElementById("root")).render(<App/>);
