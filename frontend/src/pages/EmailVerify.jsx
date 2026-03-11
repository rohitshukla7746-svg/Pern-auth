import React, { useContext, useEffect, useRef } from 'react';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

/* ═══════════════════════════════════════════════════
   AURORA CANVAS — same optimized version
═══════════════════════════════════════════════════ */
const AuroraCanvas = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    let raf, W, H, t = 0, stars = [];
    let hillCanvas = document.createElement('canvas');
    let hillCtx = hillCanvas.getContext('2d');
    let skyGrad = null, vigGrad = null;

    const auroraConfig = [
      { color:[80,220,120],  baseY:0.28, amp:38, freq:0.0018, speed:0.00042, width:0.22, alpha:0.36 },
      { color:[40,210,200],  baseY:0.22, amp:30, freq:0.0022, speed:0.00036, width:0.18, alpha:0.28 },
      { color:[140,80,220],  baseY:0.32, amp:44, freq:0.0015, speed:0.00026, width:0.26, alpha:0.26 },
      { color:[60,255,100],  baseY:0.18, amp:26, freq:0.0026, speed:0.00052, width:0.14, alpha:0.33 },
      { color:[220,60,180],  baseY:0.36, amp:50, freq:0.0012, speed:0.00020, width:0.20, alpha:0.20 },
    ];
    const STEPS = 40;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      hillCanvas.width = W; hillCanvas.height = H;
      stars = Array.from({ length: 160 }, () => ({
        x: Math.random()*W, y: Math.random()*H*0.60,
        r: Math.random()*1.3+0.2, alpha: Math.random()*0.55+0.35,
        ts: Math.random()*0.016+0.005, to: Math.random()*Math.PI*2,
      }));
      skyGrad = ctx.createLinearGradient(0,0,0,H);
      skyGrad.addColorStop(0,'#010a05'); skyGrad.addColorStop(0.25,'#021309');
      skyGrad.addColorStop(0.6,'#031b0d'); skyGrad.addColorStop(1,'#062414');
      vigGrad = ctx.createRadialGradient(W/2,H/2,H*0.18,W/2,H/2,W*0.82);
      vigGrad.addColorStop(0,'rgba(0,0,0,0)'); vigGrad.addColorStop(0.65,'rgba(1,8,4,0.12)');
      vigGrad.addColorStop(1,'rgba(1,5,3,0.52)');
      const hy = H*0.82;
      hillCtx.clearRect(0,0,W,H);
      hillCtx.beginPath(); hillCtx.moveTo(0,H); hillCtx.lineTo(0,hy+30);
      hillCtx.bezierCurveTo(W*0.12,hy-10,W*0.22,hy+20,W*0.35,hy+5);
      hillCtx.bezierCurveTo(W*0.48,hy-15,W*0.58,hy+25,W*0.72,hy-5);
      hillCtx.bezierCurveTo(W*0.85,hy-20,W*0.93,hy+10,W,hy+20);
      hillCtx.lineTo(W,H); hillCtx.closePath();
      const hg=hillCtx.createLinearGradient(0,hy-20,0,H);
      hg.addColorStop(0,'rgba(15,35,25,0.93)'); hg.addColorStop(0.3,'rgba(8,22,15,0.97)');
      hg.addColorStop(1,'rgba(3,10,7,1)'); hillCtx.fillStyle=hg; hillCtx.fill();
      [{x:W*0.08,y:hy+15,w:W*0.09},{x:W*0.28,y:hy,w:W*0.08},
       {x:W*0.52,y:hy+10,w:W*0.1},{x:W*0.72,y:hy-8,w:W*0.07},{x:W*0.9,y:hy+15,w:W*0.08}]
      .forEach(({x,y,w})=>{
        const sg=hillCtx.createRadialGradient(x+w/2,y,0,x+w/2,y+12,w*0.7);
        sg.addColorStop(0,'rgba(200,240,220,0.5)'); sg.addColorStop(0.5,'rgba(150,210,185,0.22)');
        sg.addColorStop(1,'rgba(80,160,130,0)'); hillCtx.fillStyle=sg;
        hillCtx.beginPath(); hillCtx.ellipse(x+w/2,y+6,w*0.52,13,0,0,Math.PI*2); hillCtx.fill();
      });
      hillCtx.beginPath(); hillCtx.moveTo(0,H); hillCtx.lineTo(0,hy+55);
      hillCtx.bezierCurveTo(W*0.08,hy+30,W*0.18,hy+60,W*0.3,hy+45);
      hillCtx.bezierCurveTo(W*0.42,hy+30,W*0.55,hy+65,W*0.68,hy+40);
      hillCtx.bezierCurveTo(W*0.8,hy+20,W*0.9,hy+55,W,hy+50);
      hillCtx.lineTo(W,H); hillCtx.closePath(); hillCtx.fillStyle='rgba(3,12,7,0.99)'; hillCtx.fill();
    };

    const drawBand = (band) => {
      const {color:[r,g,b],baseY,amp,freq,speed,width,alpha}=band;
      const bandH=H*width, cy=H*baseY, sw=W/STEPS, pts=[];
      for(let i=0;i<=STEPS;i++){
        const x=i*sw;
        pts.push({x,y:cy+Math.sin(x*freq+t*speed*55)*amp+Math.sin(x*freq*1.6+t*speed*38+1.1)*amp*0.45+Math.sin(x*freq*0.55+t*speed*22+2.3)*amp*0.25});
      }
      const minY=Math.min(...pts.map(p=>p.y));
      const grad=ctx.createLinearGradient(0,minY-bandH*0.15,0,minY+bandH*1.3);
      grad.addColorStop(0,`rgba(${r},${g},${b},0)`); grad.addColorStop(0.12,`rgba(${r},${g},${b},${alpha})`);
      grad.addColorStop(0.45,`rgba(${r},${g},${b},${alpha*0.85})`); grad.addColorStop(0.8,`rgba(${r},${g},${b},${alpha*0.3})`);
      grad.addColorStop(1,`rgba(${r},${g},${b},0)`);
      ctx.beginPath(); pts.forEach(p=>ctx.lineTo(p.x,p.y-bandH*0.15));
      for(let i=STEPS;i>=0;i--)ctx.lineTo(pts[i].x,pts[i].y+bandH);
      ctx.closePath(); ctx.fillStyle=grad; ctx.fill();
      ctx.beginPath(); pts.forEach((p,i)=>i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y));
      ctx.strokeStyle=`rgba(${r},${g},${b},${alpha*0.9})`; ctx.lineWidth=2.5; ctx.stroke();
    };

    const draw = (ts) => {
      t=ts*0.001; ctx.fillStyle=skyGrad; ctx.fillRect(0,0,W,H);
      for(let i=0;i<stars.length;i++){
        const s=stars[i],tw=Math.sin(t*s.ts*60+s.to)*0.42+0.58;
        ctx.globalAlpha=s.alpha*tw; ctx.fillStyle='#e0f8ec';
        ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fill();
      }
      ctx.globalAlpha=1; ctx.save(); ctx.globalCompositeOperation='lighter';
      auroraConfig.forEach(drawBand); ctx.restore();
      ctx.drawImage(hillCanvas,0,0);
      const ry=H*0.845;
      auroraConfig.forEach(({color:[r,g,b],alpha})=>{
        const rg=ctx.createLinearGradient(0,ry,0,ry+28);
        rg.addColorStop(0,`rgba(${r},${g},${b},${alpha*0.14})`); rg.addColorStop(1,`rgba(${r},${g},${b},0)`);
        ctx.fillStyle=rg; ctx.fillRect(0,ry,W,28);
      });
      ctx.fillStyle=vigGrad; ctx.fillRect(0,0,W,H);
      raf=requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none' }} />;
};

/* ═══════════════════════════════════════════════════
   EMAIL VERIFY
═══════════════════════════════════════════════════ */
const EmailVerify = () => {
  axios.defaults.withCredentials = true;
  const { backendUrl, isLoggedin, userData, getUserData } = useContext(AppContent);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  // ── same logic untouched ──
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1)
      inputRefs.current[index + 1].focus();
  };
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0)
      inputRefs.current[index - 1].focus();
  };
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text').split('');
    paste.forEach((char, i) => { if (inputRefs.current[i]) inputRefs.current[i].value = char; });
    const last = Math.min(paste.length, 5);
    if (inputRefs.current[last]) inputRefs.current[last].focus();
  };
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const otp = inputRefs.current.map(el => el.value).join('');
      const res = await axios.post(`${backendUrl}/api/auth/verify-account`, { otp }, { withCredentials: true });
      if (res.data.success) { toast.success(res.data.message); getUserData(); navigate('/'); }
      else toast.error(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };
  useEffect(() => {
    isLoggedin && userData && userData.is_account_verified && navigate('/');
  }, [isLoggedin, userData]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,600&family=Courier+Prime:wght@400;700&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

        .aurora-root { min-height:100vh; display:flex; align-items:center; justify-content:center; position:relative; overflow:hidden; background:#010a05; }

        .aurora-card {
          background:linear-gradient(145deg,rgba(4,22,12,0.90) 0%,rgba(3,16,9,0.95) 100%);
          border:1px solid rgba(60,200,120,0.2); border-radius:22px;
          box-shadow:0 0 0 1px rgba(100,255,160,0.05),0 0 60px rgba(40,180,100,0.13),0 40px 100px rgba(0,0,0,0.72),inset 0 1px 0 rgba(100,255,160,0.1);
          backdrop-filter:blur(36px); position:relative; overflow:hidden;
        }
        .aurora-card::before {
          content:''; position:absolute; top:0; left:0; right:0; height:1px;
          background:linear-gradient(90deg,transparent,rgba(60,220,120,0.7),rgba(40,210,200,0.6),rgba(140,80,220,0.4),rgba(60,255,100,0.5),transparent);
          animation:aurora-border 5s ease-in-out infinite;
        }
        .aurora-card::after {
          content:''; position:absolute; top:-100%; left:-50%; width:30%; height:300%;
          background:linear-gradient(105deg,transparent 40%,rgba(80,220,140,0.05) 50%,transparent 65%);
          animation:holo-sweep 8s ease-in-out infinite; pointer-events:none;
        }
        @keyframes aurora-border { 0%,100%{opacity:0.6} 50%{opacity:1} }
        @keyframes holo-sweep { 0%{left:-50%} 100%{left:130%} }

        .otp-box {
          width:48px; height:56px;
          background:rgba(20,80,50,0.3);
          border:1px solid rgba(60,160,100,0.3);
          border-radius:12px;
          color:#c8ffe0; text-align:center; font-size:1.4rem;
          font-family:'Courier Prime',monospace; font-weight:700;
          outline:none; transition:all 0.25s ease;
          caret-color:#4dffa0;
        }
        .otp-box:focus {
          border-color:rgba(77,255,160,0.8);
          background:rgba(40,180,100,0.12);
          box-shadow:0 0 22px rgba(60,200,120,0.3),inset 0 0 12px rgba(40,180,100,0.08);
          transform:translateY(-3px) scale(1.05);
        }
        .otp-box:not(:placeholder-shown) {
          border-color:rgba(60,220,120,0.55);
          background:rgba(30,120,70,0.18);
        }

        .aurora-btn {
          width:100%; padding:14px; border:none; border-radius:50px;
          font-family:'Raleway',sans-serif; font-size:0.84rem; font-weight:800;
          letter-spacing:0.14em; text-transform:uppercase; cursor:pointer;
          background:linear-gradient(90deg,#1a9a55,#20c878,#1ad4b8,#20c878,#1a9a55);
          background-size:300% 100%; color:#011a0d;
          transition:all 0.5s ease;
          box-shadow:0 4px 30px rgba(40,200,120,0.45),0 0 60px rgba(40,200,120,0.15);
          position:relative; overflow:hidden;
        }
        .aurora-btn:hover { background-position:100% 0; transform:translateY(-2px); box-shadow:0 10px 44px rgba(40,200,120,0.65); }
        .aurora-btn:active { transform:translateY(0); }
        .aurora-btn::before {
          content:''; position:absolute; inset:0;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent);
          transform:translateX(-100%); transition:transform 0.55s ease;
        }
        .aurora-btn:hover::before { transform:translateX(100%); }

        .back-link { font-family:'Courier Prime',monospace; font-size:0.68rem; color:rgba(80,180,120,0.45); cursor:pointer; transition:all 0.2s; letter-spacing:0.06em; }
        .back-link:hover { color:#4dffa0; }
      `}</style>

      <div className="aurora-root">
        <AuroraCanvas />

        {/* Mist particles */}
        {[...Array(5)].map((_,i) => (
          <motion.div key={i} style={{
            position:'fixed', borderRadius:'50%', pointerEvents:'none', zIndex:1,
            width:160+i*45, height:60+i*16, left:`${(i*20)%85}%`, top:`${20+(i*9)%40}%`,
            background:['rgba(60,220,120,0.04)','rgba(40,210,200,0.035)','rgba(140,80,220,0.03)','rgba(60,255,100,0.04)','rgba(80,200,160,0.03)'][i],
            filter:'blur(28px)',
          }}
            animate={{ x:[0,18-i*5,0], y:[0,-8+i*2,0], opacity:[0.35,0.8,0.35] }}
            transition={{ duration:8+i*2, repeat:Infinity, ease:'easeInOut', delay:i*1.2 }}
          />
        ))}

        <motion.div initial={{ opacity:0, y:40, scale:0.96 }} animate={{ opacity:1, y:0, scale:1 }}
          transition={{ duration:0.7, ease:[0.16,1,0.3,1] }}
          style={{ position:'relative', zIndex:10, width:'100%', maxWidth:420, margin:'0 auto', padding:'24px 20px' }}>

          <div className="aurora-card" style={{ padding:'38px 32px' }}>

            {/* Header bar */}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:26 }}>
              <span style={{ fontFamily:"'Courier Prime',monospace", fontSize:'0.58rem', color:'rgba(80,180,120,0.38)', letterSpacing:'0.22em' }}>
                WCONNECT // VERIFY
              </span>
              <div style={{ display:'flex', gap:5 }}>
                {['#ff5f57','#febc2e','#28c840'].map((c,i) => (
                  <motion.div key={i} animate={{ opacity:[0.5,1,0.5] }}
                    transition={{ duration:1.6, repeat:Infinity, delay:i*0.4 }}
                    style={{ width:9, height:9, borderRadius:'50%', background:c, boxShadow:`0 0 10px ${c}` }} />
                ))}
              </div>
            </div>

            {/* Icon + Title */}
            <div style={{ textAlign:'center', marginBottom:28 }}>
              {/* Envelope + aurora arc */}
              <motion.div style={{ display:'inline-block', marginBottom:16 }}
                animate={{ y:[0,-6,0] }} transition={{ duration:4, repeat:Infinity, ease:'easeInOut' }}>
                <div style={{ position:'relative', width:72, height:72, margin:'0 auto' }}>
                  {/* Glowing circle */}
                  <div style={{ width:72, height:72, borderRadius:'50%',
                    background:'radial-gradient(circle at 35% 35%, rgba(80,220,140,0.2), rgba(20,80,50,0.6))',
                    border:'1px solid rgba(60,200,120,0.35)',
                    boxShadow:'0 0 28px rgba(60,200,120,0.25)',
                    display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <svg width="34" height="26" viewBox="0 0 34 26" fill="none">
                      <rect x="1" y="1" width="32" height="24" rx="3" stroke="#4dffa0" strokeWidth="1.5" strokeOpacity="0.8"/>
                      <path d="M1 4L17 15L33 4" stroke="#4dffa0" strokeWidth="1.5" strokeOpacity="0.8"/>
                      <motion.path d="M1 4L17 15L33 4" stroke="#a0ffcc" strokeWidth="1"
                        animate={{ strokeOpacity:[0.2,0.8,0.2] }} transition={{ duration:2, repeat:Infinity }} />
                    </svg>
                  </div>
                  {/* Pulse ring */}
                  <motion.div animate={{ scale:[1,1.5,1], opacity:[0.5,0,0.5] }} transition={{ duration:2.5, repeat:Infinity }}
                    style={{ position:'absolute', inset:-8, borderRadius:'50%', border:'1px solid rgba(60,200,120,0.3)' }} />
                </div>
              </motion.div>

              <h2 style={{ fontFamily:"'Playfair Display',serif", fontStyle:'italic', fontWeight:700,
                fontSize:'1.65rem', color:'#d0ffe8', margin:'0 0 8px' }}>
                Verify Your Email
              </h2>
              <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.78rem',
                color:'rgba(140,230,180,0.45)', letterSpacing:'0.04em', lineHeight:1.65 }}>
                Enter the 6-digit codesent<br />to your registered email address
              </p>
            </div>

            {/* OTP Form */}
            <form onSubmit={onSubmitHandler}>
              <motion.div
                initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
                style={{ display:'flex', justifyContent:'center', gap:8, marginBottom:28 }}
                onPaste={handlePaste}
              >
                {Array(6).fill(0).map((_, i) => (
                  <motion.input
                    key={i} type="text" maxLength="1"
                    className="otp-box" placeholder="·"
                    ref={el => inputRefs.current[i] = el}
                    onInput={e => handleInput(e, i)}
                    onKeyDown={e => handleKeyDown(e, i)}
                    initial={{ opacity:0, y:16 }}
                    animate={{ opacity:1, y:0 }}
                    transition={{ delay:0.05 * i + 0.25 }}
                  />
                ))}
              </motion.div>

              <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.55 }}>
                <button type="submit" className="aurora-btn">
                  ✦ Verify Otp 
                </button>
              </motion.div>
            </form>

            {/* Back link */}
            <div style={{ textAlign:'center', marginTop:20 }}>
              <span className="back-link" onClick={() => navigate('/')}>← Return to main</span>
            </div>

            {/* Bottom scan line */}
            <motion.div
              animate={{ width:['0%','100%','0%'], opacity:[0,1,0] }}
              transition={{ duration:5, repeat:Infinity, ease:'easeInOut' }}
              style={{ position:'absolute', bottom:0, left:0, height:'1px',
                background:'linear-gradient(90deg,transparent,rgba(60,220,120,0.8),rgba(40,210,200,0.6),rgba(140,80,220,0.5),transparent)' }} />
          </div>

          {/* Footer */}
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1 }}
            style={{ textAlign:'center', marginTop:14, fontFamily:"'Courier Prime',monospace",
              fontSize:'0.56rem', color:'rgba(60,180,100,0.22)', letterSpacing:'0.18em' }}>
             WCONNECT
          </motion.p>
        </motion.div>
      </div>
    </>
  );
};

export default EmailVerify;
