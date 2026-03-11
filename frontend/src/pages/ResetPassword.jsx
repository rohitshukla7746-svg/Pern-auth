// import React, { useContext, useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AppContent } from '../context/AppContext';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';
// import { motion, AnimatePresence } from 'framer-motion';

// /* ═══════════════════════════════════════════════════
//    AURORA CANVAS — same optimized version as Login
// ═══════════════════════════════════════════════════ */
// const AuroraCanvas = () => {
//   const canvasRef = useRef(null);
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d', { alpha: false });
//     let raf, W, H, t = 0, stars = [];
//     let hillCanvas = document.createElement('canvas');
//     let hillCtx = hillCanvas.getContext('2d');
//     let skyGrad = null, vigGrad = null;

//     const auroraConfig = [
//       { color:[80,220,120],  baseY:0.28, amp:38, freq:0.0018, speed:0.00042, width:0.22, alpha:0.36 },
//       { color:[40,210,200],  baseY:0.22, amp:30, freq:0.0022, speed:0.00036, width:0.18, alpha:0.28 },
//       { color:[140,80,220],  baseY:0.32, amp:44, freq:0.0015, speed:0.00026, width:0.26, alpha:0.26 },
//       { color:[60,255,100],  baseY:0.18, amp:26, freq:0.0026, speed:0.00052, width:0.14, alpha:0.33 },
//       { color:[220,60,180],  baseY:0.36, amp:50, freq:0.0012, speed:0.00020, width:0.20, alpha:0.20 },
//     ];
//     const STEPS = 40;

//     const resize = () => {
//       W = canvas.width = window.innerWidth;
//       H = canvas.height = window.innerHeight;
//       hillCanvas.width = W; hillCanvas.height = H;
//       stars = Array.from({ length: 160 }, () => ({
//         x: Math.random()*W, y: Math.random()*H*0.60,
//         r: Math.random()*1.3+0.2, alpha: Math.random()*0.55+0.35,
//         ts: Math.random()*0.016+0.005, to: Math.random()*Math.PI*2,
//       }));
//       skyGrad = ctx.createLinearGradient(0,0,0,H);
//       skyGrad.addColorStop(0,'#010a05'); skyGrad.addColorStop(0.25,'#021309');
//       skyGrad.addColorStop(0.6,'#031b0d'); skyGrad.addColorStop(1,'#062414');
//       vigGrad = ctx.createRadialGradient(W/2,H/2,H*0.18,W/2,H/2,W*0.82);
//       vigGrad.addColorStop(0,'rgba(0,0,0,0)'); vigGrad.addColorStop(0.65,'rgba(1,8,4,0.12)');
//       vigGrad.addColorStop(1,'rgba(1,5,3,0.52)');
//       // Hills offscreen
//       hillCtx.clearRect(0,0,W,H);
//       const hy = H*0.82;
//       hillCtx.beginPath(); hillCtx.moveTo(0,H); hillCtx.lineTo(0,hy+30);
//       hillCtx.bezierCurveTo(W*0.12,hy-10,W*0.22,hy+20,W*0.35,hy+5);
//       hillCtx.bezierCurveTo(W*0.48,hy-15,W*0.58,hy+25,W*0.72,hy-5);
//       hillCtx.bezierCurveTo(W*0.85,hy-20,W*0.93,hy+10,W,hy+20);
//       hillCtx.lineTo(W,H); hillCtx.closePath();
//       const hg=hillCtx.createLinearGradient(0,hy-20,0,H);
//       hg.addColorStop(0,'rgba(15,35,25,0.93)'); hg.addColorStop(0.3,'rgba(8,22,15,0.97)');
//       hg.addColorStop(1,'rgba(3,10,7,1)'); hillCtx.fillStyle=hg; hillCtx.fill();
//       [{x:W*0.08,y:hy+15,w:W*0.09},{x:W*0.28,y:hy,w:W*0.08},
//        {x:W*0.52,y:hy+10,w:W*0.1},{x:W*0.72,y:hy-8,w:W*0.07},{x:W*0.9,y:hy+15,w:W*0.08}]
//       .forEach(({x,y,w})=>{
//         const sg=hillCtx.createRadialGradient(x+w/2,y,0,x+w/2,y+12,w*0.7);
//         sg.addColorStop(0,'rgba(200,240,220,0.5)'); sg.addColorStop(0.5,'rgba(150,210,185,0.22)');
//         sg.addColorStop(1,'rgba(80,160,130,0)'); hillCtx.fillStyle=sg;
//         hillCtx.beginPath(); hillCtx.ellipse(x+w/2,y+6,w*0.52,13,0,0,Math.PI*2); hillCtx.fill();
//       });
//       hillCtx.beginPath(); hillCtx.moveTo(0,H); hillCtx.lineTo(0,hy+55);
//       hillCtx.bezierCurveTo(W*0.08,hy+30,W*0.18,hy+60,W*0.3,hy+45);
//       hillCtx.bezierCurveTo(W*0.42,hy+30,W*0.55,hy+65,W*0.68,hy+40);
//       hillCtx.bezierCurveTo(W*0.8,hy+20,W*0.9,hy+55,W,hy+50);
//       hillCtx.lineTo(W,H); hillCtx.closePath(); hillCtx.fillStyle='rgba(3,12,7,0.99)'; hillCtx.fill();
//     };

//     const drawBand = (band) => {
//       const {color:[r,g,b],baseY,amp,freq,speed,width,alpha}=band;
//       const bandH=H*width, cy=H*baseY, sw=W/STEPS;
//       const pts=[];
//       for(let i=0;i<=STEPS;i++){
//         const x=i*sw;
//         pts.push({x,y:cy+Math.sin(x*freq+t*speed*55)*amp+Math.sin(x*freq*1.6+t*speed*38+1.1)*amp*0.45+Math.sin(x*freq*0.55+t*speed*22+2.3)*amp*0.25});
//       }
//       const minY=Math.min(...pts.map(p=>p.y));
//       const grad=ctx.createLinearGradient(0,minY-bandH*0.15,0,minY+bandH*1.3);
//       grad.addColorStop(0,`rgba(${r},${g},${b},0)`);
//       grad.addColorStop(0.12,`rgba(${r},${g},${b},${alpha})`);
//       grad.addColorStop(0.45,`rgba(${r},${g},${b},${alpha*0.85})`);
//       grad.addColorStop(0.8,`rgba(${r},${g},${b},${alpha*0.3})`);
//       grad.addColorStop(1,`rgba(${r},${g},${b},0)`);
//       ctx.beginPath();
//       pts.forEach(p=>ctx.lineTo(p.x,p.y-bandH*0.15));
//       for(let i=STEPS;i>=0;i--)ctx.lineTo(pts[i].x,pts[i].y+bandH);
//       ctx.closePath(); ctx.fillStyle=grad; ctx.fill();
//       ctx.beginPath(); pts.forEach((p,i)=>i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y));
//       ctx.strokeStyle=`rgba(${r},${g},${b},${alpha*0.9})`; ctx.lineWidth=2.5; ctx.stroke();
//     };

//     const draw = (ts) => {
//       t = ts * 0.001;
//       ctx.fillStyle = skyGrad; ctx.fillRect(0,0,W,H);
//       for(let i=0;i<stars.length;i++){
//         const s=stars[i], tw=Math.sin(t*s.ts*60+s.to)*0.42+0.58;
//         ctx.globalAlpha=s.alpha*tw; ctx.fillStyle='#e0f8ec';
//         ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fill();
//       }
//       ctx.globalAlpha=1;
//       ctx.save(); ctx.globalCompositeOperation='lighter';
//       auroraConfig.forEach(drawBand); ctx.restore();
//       ctx.drawImage(hillCanvas,0,0);
//       const ry=H*0.845;
//       auroraConfig.forEach(({color:[r,g,b],alpha})=>{
//         const rg=ctx.createLinearGradient(0,ry,0,ry+28);
//         rg.addColorStop(0,`rgba(${r},${g},${b},${alpha*0.14})`);
//         rg.addColorStop(1,`rgba(${r},${g},${b},0)`);
//         ctx.fillStyle=rg; ctx.fillRect(0,ry,W,28);
//       });
//       ctx.fillStyle=vigGrad; ctx.fillRect(0,0,W,H);
//       raf=requestAnimationFrame(draw);
//     };

//     resize();
//     window.addEventListener('resize', resize);
//     raf = requestAnimationFrame(draw);
//     return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
//   }, []);
//   return <canvas ref={canvasRef} style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none' }} />;
// };

// /* ═══════════════════════════════════════════════════
//    AURORA INPUT
// ═══════════════════════════════════════════════════ */
// const AuroraInput = ({ label, value, onChange, type = 'text', delay = 0 }) => {
//   const [focused, setFocused] = useState(false);
//   const active = focused || (value && value.length > 0);
//   return (
//     <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.45, delay }}
//       style={{ position:'relative', marginBottom:18 }}>
//       <label style={{
//         position:'absolute', left:14, zIndex:2, pointerEvents:'none',
//         top: active ? 7 : 16,
//         fontSize: active ? '0.6rem' : '0.85rem',
//         color: active ? (focused ? '#4dffa0' : 'rgba(100,220,160,0.6)') : 'rgba(120,200,150,0.45)',
//         fontFamily:"'Raleway',sans-serif", fontWeight: active ? 600 : 400,
//         letterSpacing: active ? '0.15em' : '0.03em',
//         textTransform: active ? 'uppercase' : 'none',
//         transition:'all 0.25s cubic-bezier(0.4,0,0.2,1)',
//       }}>{label}</label>
//       <div style={{
//         display:'flex', alignItems:'center',
//         padding: active ? '22px 14px 8px' : '16px 14px',
//         background: focused ? 'rgba(40,180,100,0.08)' : 'rgba(20,80,50,0.25)',
//         border:`1px solid ${focused ? 'rgba(80,220,140,0.65)' : 'rgba(60,160,100,0.2)'}`,
//         borderRadius:12, backdropFilter:'blur(18px)', transition:'all 0.3s ease',
//         boxShadow: focused ? '0 0 24px rgba(60,200,120,0.2),inset 0 0 16px rgba(40,180,100,0.06)' : 'none',
//       }}>
//         <input type={type} value={value} onChange={onChange} required
//           onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
//           style={{ flex:1, background:'transparent', border:'none', outline:'none',
//             color:'#c8ffe0', fontSize:'0.92rem', fontFamily:"'Raleway',sans-serif", letterSpacing:'0.04em' }}
//         />
//         {focused && (
//           <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}}
//             style={{width:7,height:7,borderRadius:'50%',flexShrink:0,marginLeft:8,
//               background:'#4dffa0', boxShadow:'0 0 10px #4dffa0,0 0 20px rgba(77,255,160,0.5)'}} />
//         )}
//       </div>
//       {focused && (
//         <motion.div initial={{scaleX:0}} animate={{scaleX:1}} transition={{duration:0.3}}
//           style={{position:'absolute',bottom:0,left:0,right:0,height:1,
//             background:'linear-gradient(90deg,transparent,#4dffa0,#40e0d0,#4dffa0,transparent)',
//             transformOrigin:'left',borderRadius:1,boxShadow:'0 0 8px rgba(77,255,160,0.6)'}} />
//       )}
//     </motion.div>
//   );
// };

// /* ═══════════════════════════════════════════════════
//    STEP INDICATOR
// ═══════════════════════════════════════════════════ */
// const StepIndicator = ({ current }) => {
//   const steps = ['Email', 'OTP', 'Password'];
//   return (
//     <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:0, marginBottom:28 }}>
//       {steps.map((label, i) => (
//         <React.Fragment key={i}>
//           <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:5 }}>
//             <motion.div
//               animate={{
//                 background: i < current
//                   ? 'linear-gradient(135deg,#1a9a55,#20c878)'
//                   : i === current
//                   ? 'linear-gradient(135deg,#20c878,#40e0d0)'
//                   : 'rgba(20,80,50,0.4)',
//                 boxShadow: i === current
//                   ? '0 0 16px rgba(60,200,120,0.6),0 0 32px rgba(60,200,120,0.2)'
//                   : i < current ? '0 0 8px rgba(40,180,100,0.4)' : 'none',
//                 borderColor: i <= current ? 'rgba(77,255,160,0.6)' : 'rgba(60,160,100,0.2)',
//               }}
//               transition={{ duration:0.4 }}
//               style={{ width:32, height:32, borderRadius:'50%', border:'1px solid',
//                 display:'flex', alignItems:'center', justifyContent:'center' }}
//             >
//               {i < current ? (
//                 <span style={{ color:'#011a0d', fontSize:'0.8rem', fontWeight:700 }}>✓</span>
//               ) : (
//                 <span style={{ color: i === current ? '#011a0d' : 'rgba(80,180,120,0.4)',
//                   fontSize:'0.72rem', fontFamily:"'Courier Prime',monospace", fontWeight:700 }}>
//                   {i + 1}
//                 </span>
//               )}
//             </motion.div>
//             <span style={{ fontFamily:"'Courier Prime',monospace", fontSize:'0.55rem',
//               letterSpacing:'0.12em', textTransform:'uppercase',
//               color: i <= current ? 'rgba(100,220,160,0.7)' : 'rgba(60,140,90,0.35)' }}>
//               {label}
//             </span>
//           </div>
//           {i < steps.length - 1 && (
//             <motion.div
//               animate={{ background: i < current
//                 ? 'linear-gradient(90deg,#20c878,#40e0d0)'
//                 : 'rgba(40,120,70,0.2)' }}
//               transition={{ duration:0.4 }}
//               style={{ height:1, width:48, marginBottom:20, flexShrink:0 }}
//             />
//           )}
//         </React.Fragment>
//       ))}
//     </div>
//   );
// };

// /* ═══════════════════════════════════════════════════
//    MAIN RESET PASSWORD
// ═══════════════════════════════════════════════════ */
// const ResetPassword = () => {
//   const { backendUrl } = useContext(AppContent);
//   axios.defaults.withCredentials = true;
//   const navigate = useNavigate();

//   const [email, setEmail]             = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [isEmailSent, setIsEmailSent] = useState(false);
//   const [otp, setOtp]                 = useState(0);
//   const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
//   const [isLoading, setIsLoading]     = useState(false);
//   const [showPass, setShowPass]       = useState(false);

//   const inputRefs = useRef([]);

//   const currentStep = !isEmailSent ? 0 : !isOtpSubmitted ? 1 : 2;

//   const handleInput = (e, index) => {
//     if (e.target.value.length > 0 && index < inputRefs.current.length - 1)
//       inputRefs.current[index + 1].focus();
//   };
//   const handleKeyDown = (e, index) => {
//     if (e.key === 'Backspace' && e.target.value === '' && index > 0)
//       inputRefs.current[index - 1].focus();
//   };
//   const handlePaste = (e) => {
//     const paste = e.clipboardData.getData('text').split('');
//     paste.forEach((char, i) => { if (inputRefs.current[i]) inputRefs.current[i].value = char; });
//     // Move focus to last filled
//     const last = Math.min(paste.length, 5);
//     if (inputRefs.current[last]) inputRefs.current[last].focus();
//   };

//   const onSubmitEmail = async (e) => {
//     e.preventDefault(); setIsLoading(true);
//     try {
//       const res = await axios.post(`${backendUrl}/api/auth/send-reset-otp`, { email }, { withCredentials:true });
//       if (res.data.success) { toast.success(res.data.message); setIsEmailSent(true); }
//       else toast.error(res.data.message);
//     } catch (err) { toast.error(err.response?.data?.message || 'Something went wrong'); }
//     finally { setIsLoading(false); }
//   };

//   const onSubmitOtp = async (e) => {
//     e.preventDefault();
//     const otpVal = inputRefs.current.map(el => el.value).join('');
//     if (otpVal.length < 6) { toast.error('Please enter all 6 digits'); return; }
//     setOtp(otpVal);
//     setIsOtpSubmitted(true);
//   };

//   const onSubmitNewPassword = async (e) => {
//     e.preventDefault(); setIsLoading(true);
//     try {
//       const res = await axios.post(`${backendUrl}/api/auth/reset-password`, { email, otp, newPassword }, { withCredentials:true });
//       if (res.data.success) { toast.success(res.data.message); setTimeout(() => navigate('/login'), 1200); }
//       else toast.error(res.data.message);
//     } catch (err) { toast.error(err.response?.data?.message || 'Something went wrong'); }
//     finally { setIsLoading(false); }
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,600&family=Courier+Prime:wght@400;700&display=swap');
//         *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

//         .aurora-root {
//           min-height:100vh; display:flex; align-items:center; justify-content:center;
//           position:relative; overflow:hidden; background:#010a05;
//         }

//         .aurora-card {
//           background:linear-gradient(145deg,rgba(4,22,12,0.90) 0%,rgba(3,16,9,0.95) 100%);
//           border:1px solid rgba(60,200,120,0.2);
//           border-radius:22px;
//           box-shadow:
//             0 0 0 1px rgba(100,255,160,0.05),
//             0 0 60px rgba(40,180,100,0.13),
//             0 40px 100px rgba(0,0,0,0.72),
//             inset 0 1px 0 rgba(100,255,160,0.1);
//           backdrop-filter:blur(36px);
//           position:relative; overflow:hidden;
//         }
//         .aurora-card::before {
//           content:''; position:absolute; top:0; left:0; right:0; height:1px;
//           background:linear-gradient(90deg,transparent,rgba(60,220,120,0.7),rgba(40,210,200,0.6),rgba(140,80,220,0.4),rgba(60,255,100,0.5),transparent);
//           animation:aurora-border 5s ease-in-out infinite;
//         }
//         .aurora-card::after {
//           content:''; position:absolute; top:-100%; left:-50%; width:30%; height:300%;
//           background:linear-gradient(105deg,transparent 40%,rgba(80,220,140,0.05) 50%,transparent 65%);
//           animation:holo-sweep 8s ease-in-out infinite; pointer-events:none;
//         }
//         @keyframes aurora-border { 0%,100%{opacity:0.6} 50%{opacity:1} }
//         @keyframes holo-sweep { 0%{left:-50%} 100%{left:130%} }

//         .aurora-btn {
//           width:100%; padding:14px; border:none; border-radius:50px;
//           font-family:'Raleway',sans-serif; font-size:0.84rem; font-weight:800;
//           letter-spacing:0.14em; text-transform:uppercase; cursor:pointer;
//           background:linear-gradient(90deg,#1a9a55,#20c878,#1ad4b8,#20c878,#1a9a55);
//           background-size:300% 100%; color:#011a0d;
//           transition:all 0.5s ease;
//           box-shadow:0 4px 30px rgba(40,200,120,0.45),0 0 60px rgba(40,200,120,0.15);
//           position:relative; overflow:hidden;
//         }
//         .aurora-btn:hover { background-position:100% 0; transform:translateY(-2px); box-shadow:0 10px 44px rgba(40,200,120,0.65); }
//         .aurora-btn:active { transform:translateY(0); }
//         .aurora-btn:disabled { opacity:0.5; cursor:not-allowed; transform:none; }
//         .aurora-btn::before {
//           content:''; position:absolute; inset:0;
//           background:linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent);
//           transform:translateX(-100%); transition:transform 0.55s ease;
//         }
//         .aurora-btn:hover::before { transform:translateX(100%); }

//         /* OTP inputs */
//         .otp-input {
//           width:46px; height:52px;
//           background:rgba(20,80,50,0.3);
//           border:1px solid rgba(60,160,100,0.3);
//           border-radius:10px;
//           color:#c8ffe0; text-align:center; font-size:1.3rem;
//           font-family:'Courier Prime',monospace; font-weight:700;
//           outline:none; transition:all 0.25s ease;
//           caret-color:#4dffa0;
//         }
//         .otp-input:focus {
//           border-color:rgba(77,255,160,0.75);
//           background:rgba(40,180,100,0.1);
//           box-shadow:0 0 20px rgba(60,200,120,0.25),inset 0 0 12px rgba(40,180,100,0.08);
//           transform:translateY(-2px);
//         }
//         .otp-input:not(:placeholder-shown) {
//           border-color:rgba(60,220,120,0.5);
//           background:rgba(30,120,70,0.15);
//         }

//         .back-link {
//           font-family:'Courier Prime',monospace; font-size:0.68rem;
//           color:rgba(80,180,120,0.45); cursor:pointer; transition:all 0.2s;
//           letter-spacing:0.06em; display:inline-flex; align-items:center; gap:4px;
//         }
//         .back-link:hover { color:#4dffa0; }

//         @keyframes twinkle-aurora { 0%,100%{opacity:0.2} 50%{opacity:0.9} }
//       `}</style>

//       <div className="aurora-root">
//         <AuroraCanvas />

//         {/* Floating aurora mist */}
//         {[...Array(6)].map((_,i) => (
//           <motion.div key={i} style={{
//             position:'fixed', borderRadius:'50%', pointerEvents:'none', zIndex:1,
//             width:180+i*50, height:70+i*18,
//             left:`${(i*18)%88}%`, top:`${18+(i*8)%45}%`,
//             background:['rgba(60,220,120,0.04)','rgba(40,210,200,0.035)','rgba(140,80,220,0.03)',
//               'rgba(60,255,100,0.04)','rgba(220,60,180,0.025)','rgba(80,200,160,0.03)'][i],
//             filter:'blur(28px)',
//           }}
//             animate={{ x:[0,22-i*6,0], y:[0,-10+i*2,0], opacity:[0.4,0.85,0.4] }}
//             transition={{ duration:8+i*2, repeat:Infinity, ease:'easeInOut', delay:i*1.1 }}
//           />
//         ))}

//         <div style={{ position:'relative', zIndex:10, width:'100%', maxWidth:440,
//           margin:'0 auto', padding:'24px 20px' }}>

//           <AnimatePresence mode="wait">

//             {/* ── STEP 1: EMAIL ── */}
//             {!isEmailSent && (
//               <motion.div key="email"
//                 initial={{ opacity:0, y:40, scale:0.96 }}
//                 animate={{ opacity:1, y:0, scale:1 }}
//                 exit={{ opacity:0, y:-30, scale:0.96 }}
//                 transition={{ duration:0.5, ease:[0.16,1,0.3,1] }}>
//                 <div className="aurora-card" style={{ padding:'36px 32px' }}>

//                   {/* Header */}
//                   <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:22 }}>
//                     <span style={{ fontFamily:"'Courier Prime',monospace", fontSize:'0.58rem',
//                       color:'rgba(80,180,120,0.38)', letterSpacing:'0.22em' }}>WCONNECT // RESET</span>
//                     <div style={{ display:'flex', gap:5 }}>
//                       {['#ff5f57','#febc2e','#28c840'].map((c,i)=>(
//                         <motion.div key={i} animate={{ opacity:[0.5,1,0.5] }}
//                           transition={{ duration:1.6, repeat:Infinity, delay:i*0.4 }}
//                           style={{ width:9, height:9, borderRadius:'50%', background:c, boxShadow:`0 0 10px ${c}` }} />
//                       ))}
//                     </div>
//                   </div>

//                   <StepIndicator current={0} />

//                   {/* Mini aurora icon */}
//                   <div style={{ textAlign:'center', marginBottom:22 }}>
//                     <motion.div style={{ display:'inline-block', marginBottom:12 }}>
//                       <svg width="64" height="36" viewBox="0 0 64 36">
//                         {[{color:'#3ddc84',ry:26},{color:'#40e0d0',ry:18},{color:'#9040e0',ry:10}].map((a,i)=>(
//                           <motion.ellipse key={i} cx="32" cy="36" rx="30" ry={a.ry}
//                             fill="none" stroke={a.color} strokeWidth="1.8" strokeOpacity={0.65}
//                             style={{filter:`drop-shadow(0 0 5px ${a.color})`}}
//                             animate={{strokeOpacity:[0.3,0.65,0.3]}}
//                             transition={{duration:2+i*0.8,repeat:Infinity,ease:'easeInOut',delay:i*0.4}}
//                           />
//                         ))}
//                       </svg>
//                     </motion.div>
//                     <h2 style={{ fontFamily:"'Playfair Display',serif", fontStyle:'italic', fontWeight:700,
//                       fontSize:'1.6rem', color:'#d0ffe8', margin:'0 0 6px' }}>
//                       forget password?
//                     </h2>
//                     <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.78rem',
//                       color:'rgba(140,230,180,0.45)', letterSpacing:'0.05em' }}>
//                       Enter your email and we'll send a recovery signal
//                     </p>
//                   </div>

//                   <form onSubmit={onSubmitEmail}>
//                     <AuroraInput label="Registered email" value={email}
//                       onChange={e => setEmail(e.target.value)} type="email" delay={0.1} />

//                     <button type="submit" disabled={isLoading} className="aurora-btn" style={{ marginTop:6 }}>
//                       {isLoading ? (
//                         <span style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:10 }}>
//                           <motion.div animate={{ rotate:360 }} transition={{ duration:0.85, repeat:Infinity, ease:'linear' }}
//                             style={{ width:14, height:14, border:'2px solid rgba(1,26,13,0.4)', borderTopColor:'#011a0d', borderRadius:'50%' }} />
//                           Sending Otp
//                         </span>
//                       ) : ' Send Recovery OTP'}
//                     </button>
//                   </form>

//                   <div style={{ textAlign:'center', marginTop:20 }}>
//                     <span className="back-link" onClick={() => navigate('/login')}>
//                       ← Return to Login page
//                     </span>
//                   </div>

//                   {/* Bottom scan line */}
//                   <motion.div
//                     animate={{ width:['0%','100%','0%'], opacity:[0,1,0] }}
//                     transition={{ duration:5, repeat:Infinity, ease:'easeInOut' }}
//                     style={{ position:'absolute', bottom:0, left:0, height:'1px',
//                       background:'linear-gradient(90deg,transparent,rgba(60,220,120,0.8),rgba(40,210,200,0.6),rgba(140,80,220,0.5),transparent)' }} />
//                 </div>
//               </motion.div>
//             )}

//             {/* ── STEP 2: OTP ── */}
//             {!isOtpSubmitted && isEmailSent && (
//               <motion.div key="otp"
//                 initial={{ opacity:0, y:40, scale:0.96 }}
//                 animate={{ opacity:1, y:0, scale:1 }}
//                 exit={{ opacity:0, y:-30, scale:0.96 }}
//                 transition={{ duration:0.5, ease:[0.16,1,0.3,1] }}>
//                 <div className="aurora-card" style={{ padding:'36px 32px' }}>

//                   <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:22 }}>
//                     <span style={{ fontFamily:"'Courier Prime',monospace", fontSize:'0.58rem',
//                       color:'rgba(80,180,120,0.38)', letterSpacing:'0.22em' }}>WCONNECT // OTP</span>
//                     <div style={{ display:'flex', gap:5 }}>
//                       {['#ff5f57','#febc2e','#28c840'].map((c,i)=>(
//                         <motion.div key={i} animate={{ opacity:[0.5,1,0.5] }}
//                           transition={{ duration:1.6, repeat:Infinity, delay:i*0.4 }}
//                           style={{ width:9, height:9, borderRadius:'50%', background:c, boxShadow:`0 0 10px ${c}` }} />
//                       ))}
//                     </div>
//                   </div>

//                   <StepIndicator current={1} />

//                   <div style={{ textAlign:'center', marginBottom:24 }}>
//                     <motion.div style={{ display:'inline-block', marginBottom:12 }}>
//                       <svg width="64" height="36" viewBox="0 0 64 36">
//                         {[{color:'#3ddc84',ry:26},{color:'#40e0d0',ry:18},{color:'#9040e0',ry:10}].map((a,i)=>(
//                           <motion.ellipse key={i} cx="32" cy="36" rx="30" ry={a.ry}
//                             fill="none" stroke={a.color} strokeWidth="1.8" strokeOpacity={0.65}
//                             style={{filter:`drop-shadow(0 0 5px ${a.color})`}}
//                             animate={{strokeOpacity:[0.3,0.65,0.3]}}
//                             transition={{duration:2+i*0.8,repeat:Infinity,ease:'easeInOut',delay:i*0.4}}
//                           />
//                         ))}
//                       </svg>
//                     </motion.div>
//                     <h2 style={{ fontFamily:"'Playfair Display',serif", fontStyle:'italic', fontWeight:700,
//                       fontSize:'1.6rem', color:'#d0ffe8', margin:'0 0 6px' }}>
//                       Aurora Signal Sent
//                     </h2>
//                     <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.78rem',
//                       color:'rgba(140,230,180,0.45)', letterSpacing:'0.04em', lineHeight:1.6 }}>
//                       Enter the 6-digit code sent to<br />
//                       <span style={{ color:'rgba(77,255,160,0.7)', fontWeight:600 }}>{email}</span>
//                     </p>
//                   </div>

//                   <form onSubmit={onSubmitOtp}>
//                     {/* OTP boxes */}
//                     <motion.div
//                       initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
//                       transition={{ delay:0.1 }}
//                       style={{ display:'flex', justifyContent:'center', gap:8, marginBottom:24 }}
//                       onPaste={handlePaste}
//                     >
//                       {Array(6).fill(0).map((_, i) => (
//                         <motion.input
//                           key={i}
//                           type="text" maxLength="1"
//                           className="otp-input"
//                           placeholder="·"
//                           ref={el => inputRefs.current[i] = el}
//                           onInput={e => handleInput(e, i)}
//                           onKeyDown={e => handleKeyDown(e, i)}
//                           initial={{ opacity:0, y:12 }}
//                           animate={{ opacity:1, y:0 }}
//                           transition={{ delay:0.05 * i + 0.15 }}
//                         />
//                       ))}
//                     </motion.div>

//                     <button type="submit" className="aurora-btn">
//                       ✦ Verify Otp
//                     </button>
//                   </form>

//                   {/* Resend + back */}
//                   <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:18 }}>
//                     <span className="back-link" onClick={() => setIsEmailSent(false)}>
//                       ← Change email
//                     </span>
//                     <span className="back-link" onClick={onSubmitEmail} style={{ color:'rgba(77,255,160,0.5)' }}>
//                       Resend code ↺
//                     </span>
//                   </div>

//                   <motion.div
//                     animate={{ width:['0%','100%','0%'], opacity:[0,1,0] }}
//                     transition={{ duration:5, repeat:Infinity, ease:'easeInOut' }}
//                     style={{ position:'absolute', bottom:0, left:0, height:'1px',
//                       background:'linear-gradient(90deg,transparent,rgba(60,220,120,0.8),rgba(40,210,200,0.6),rgba(140,80,220,0.5),transparent)' }} />
//                 </div>
//               </motion.div>
//             )}

//             {/* ── STEP 3: NEW PASSWORD ── */}
//             {isOtpSubmitted && isEmailSent && (
//               <motion.div key="newpass"
//                 initial={{ opacity:0, y:40, scale:0.96 }}
//                 animate={{ opacity:1, y:0, scale:1 }}
//                 exit={{ opacity:0, y:-30, scale:0.96 }}
//                 transition={{ duration:0.5, ease:[0.16,1,0.3,1] }}>
//                 <div className="aurora-card" style={{ padding:'36px 32px' }}>

//                   <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:22 }}>
//                     <span style={{ fontFamily:"'Courier Prime',monospace", fontSize:'0.58rem',
//                       color:'rgba(80,180,120,0.38)', letterSpacing:'0.22em' }}>WCONNECT // NEW KEY</span>
//                     <div style={{ display:'flex', gap:5 }}>
//                       {['#ff5f57','#febc2e','#28c840'].map((c,i)=>(
//                         <motion.div key={i} animate={{ opacity:[0.5,1,0.5] }}
//                           transition={{ duration:1.6, repeat:Infinity, delay:i*0.4 }}
//                           style={{ width:9, height:9, borderRadius:'50%', background:c, boxShadow:`0 0 10px ${c}` }} />
//                       ))}
//                     </div>
//                   </div>

//                   <StepIndicator current={2} />

//                   <div style={{ textAlign:'center', marginBottom:24 }}>
//                     <motion.div style={{ display:'inline-block', marginBottom:12 }}>
//                       <svg width="64" height="36" viewBox="0 0 64 36">
//                         {[{color:'#3ddc84',ry:26},{color:'#40e0d0',ry:18},{color:'#9040e0',ry:10}].map((a,i)=>(
//                           <motion.ellipse key={i} cx="32" cy="36" rx="30" ry={a.ry}
//                             fill="none" stroke={a.color} strokeWidth="1.8" strokeOpacity={0.65}
//                             style={{filter:`drop-shadow(0 0 5px ${a.color})`}}
//                             animate={{strokeOpacity:[0.3,0.65,0.3]}}
//                             transition={{duration:2+i*0.8,repeat:Infinity,ease:'easeInOut',delay:i*0.4}}
//                           />
//                         ))}
//                       </svg>
//                     </motion.div>
//                     <h2 style={{ fontFamily:"'Playfair Display',serif", fontStyle:'italic', fontWeight:700,
//                       fontSize:'1.6rem', color:'#d0ffe8', margin:'0 0 6px' }}>
//                       Set New Password
//                     </h2>
//                     <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.78rem',
//                       color:'rgba(140,230,180,0.45)', letterSpacing:'0.04em' }}>
//                       Choose a strong password for your account
//                     </p>
//                   </div>

//                   <form onSubmit={onSubmitNewPassword}>
//                     {/* Password field with show/hide */}
//                     <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }}
//                       transition={{ duration:0.45, delay:0.1 }}
//                       style={{ position:'relative', marginBottom:18 }}>
//                       <div style={{
//                         display:'flex', alignItems:'center', gap:10, padding:'13px 14px',
//                         background:'rgba(20,80,50,0.25)',
//                         border:'1px solid rgba(60,160,100,0.2)',
//                         borderRadius:12, backdropFilter:'blur(18px)',
//                       }}>
//                         <input
//                           type={showPass ? 'text' : 'password'}
//                           value={newPassword}
//                           onChange={e => setNewPassword(e.target.value)}
//                           placeholder="New password"
//                           required
//                           style={{ flex:1, background:'transparent', border:'none', outline:'none',
//                             color:'#c8ffe0', fontSize:'0.92rem',
//                             fontFamily:"'Raleway',sans-serif", letterSpacing:'0.04em' }}
//                         />
//                         <button type="button" onClick={() => setShowPass(s => !s)}
//                           style={{ background:'none', border:'none', cursor:'pointer', padding:0,
//                             color:'rgba(80,200,130,0.5)', fontSize:'0.62rem',
//                             fontFamily:"'Courier Prime',monospace", letterSpacing:'0.1em', transition:'color 0.2s' }}
//                           onMouseEnter={e=>e.target.style.color='#4dffa0'}
//                           onMouseLeave={e=>e.target.style.color='rgba(80,200,130,0.5)'}>
//                           {showPass ? 'HIDE' : 'SHOW'}
//                         </button>
//                       </div>
//                     </motion.div>

//                     {/* Password strength */}
//                     {newPassword && (() => {
//                       let s=0;
//                       if(newPassword.length>=8)s++;
//                       if(/[A-Z]/.test(newPassword))s++;
//                       if(/[0-9]/.test(newPassword))s++;
//                       if(/[^A-Za-z0-9]/.test(newPassword))s++;
//                       const levels=[{l:'Weak',c:'#ff6060'},{l:'Fair',c:'#ffcc44'},{l:'Good',c:'#40e0d0'},{l:'Strong',c:'#4dffa0'},{l:'Aurora ✦',c:'#a0ffcc'}];
//                       const {l,c}=levels[s];
//                       return (
//                         <div style={{ marginBottom:16, marginTop:-8 }}>
//                           <div style={{ display:'flex', gap:4, marginBottom:5 }}>
//                             {[0,1,2,3].map(i=>(
//                               <motion.div key={i}
//                                 animate={{ background:i<s?c:'rgba(80,200,130,0.1)', boxShadow:i<s?`0 0 8px ${c}60`:'none' }}
//                                 transition={{ duration:0.35 }}
//                                 style={{ flex:1, height:3, borderRadius:2 }} />
//                             ))}
//                           </div>
//                           <motion.span animate={{ color:c }}
//                             style={{ fontFamily:"'Courier Prime',monospace", fontSize:'0.62rem', letterSpacing:'0.12em' }}>
//                             {l}
//                           </motion.span>
//                         </div>
//                       );
//                     })()}

//                     <motion.button type="submit" disabled={isLoading} className="aurora-btn"
//                       initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}>
//                       {isLoading ? (
//                         <span style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:10 }}>
//                           <motion.div animate={{ rotate:360 }} transition={{ duration:0.85, repeat:Infinity, ease:'linear' }}
//                             style={{ width:14, height:14, border:'2px solid rgba(1,26,13,0.4)', borderTopColor:'#011a0d', borderRadius:'50%' }} />
//                           Updating…
//                         </span>
//                       ) : '✦ Update Password'}
//                     </motion.button>
//                   </form>

//                   <div style={{ textAlign:'center', marginTop:18 }}>
//                     <span className="back-link" onClick={() => navigate('/login')}>
//                       ← Return to Login page
//                     </span>
//                   </div>

//                   <motion.div
//                     animate={{ width:['0%','100%','0%'], opacity:[0,1,0] }}
//                     transition={{ duration:5, repeat:Infinity, ease:'easeInOut' }}
//                     style={{ position:'absolute', bottom:0, left:0, height:'1px',
//                       background:'linear-gradient(90deg,transparent,rgba(60,220,120,0.8),rgba(40,210,200,0.6),rgba(140,80,220,0.5),transparent)' }} />
//                 </div>
//               </motion.div>
//             )}

//           </AnimatePresence>

//           {/* Footer */}
//           <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1 }}
//             style={{ textAlign:'center', marginTop:14, fontFamily:"'Courier Prime',monospace",
//               fontSize:'0.56rem', color:'rgba(60,180,100,0.22)', letterSpacing:'0.18em' }}>
//             WCONNECT 
//           </motion.p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ResetPassword;


import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext';
import { toast } from "react-toastify";
import axios from 'axios';


const ResetPassword = () => {


  const {backendUrl } = useContext(AppContent)

  axios.defaults.withCredentials = true

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isEmailSent, setIsEmailSent] = useState('')
  const [otp, setOtp] = useState(0)
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false)

  const inputRefs = React.useRef([])

  

  const handleInput = (e, index) => {
     if (e.target.value.length > 0 && index < inputRefs.current.length - 1){
      inputRefs.current[index + 1].focus();
     }
  }
  
  const handleKeyDown = (e, index) => {
     if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
     }

  }

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text')
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index) => {
     if (inputRefs.current[index]){
       inputRefs.current[index].value = char;
     }
    });
 }



 const onSubmitEmail = async (e) => {
  e.preventDefault();
  try {
    
      const res = await axios.post(`${backendUrl}/api/auth/send-reset-otp`,{email},{ withCredentials: true });
      if (res.data.success) {
        toast.success(res.data.message);
        setIsEmailSent(true);
    
      } else {
        toast.error(res.data.message);

      }

      res.data.success && setIsEmailSent(true)
  } catch (error) {
    toast.error(res.data.message);
  }
 }


 const onSubmitOtp = async (e) => {
  e.preventDefault();
  const otpArray = inputRefs.current.map(e => e.value)
     setOtp(otpArray.join(''))
     setIsOtpSubmitted(true)
 
 }


 const onSubmitNewPassword = async (e) => {
  e.preventDefault();
  try {
    
    const res = await axios.post(`${backendUrl}/api/auth/reset-password`,{email,otp, newPassword},{ withCredentials: true });
    
    res.data.success ?  toast.success(res.data.message) :  toast.error(res.data.message);

   res.data.success && navigate('/login')
} catch (error) {
  toast.error(res.data.message);
}
 }

  return (
    <div className='flex 
    items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-purple-400'>

      {!isEmailSent && 



     <form onSubmit={onSubmitEmail} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm' >
     <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset password</h1>
        <p className='text-center mb-6 text-indigo-300 '>Enter your registred email address.</p>
        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
          <input type="email" placeholder='email id' className='bg-transparent outline-none text-white'
          value={email} onChange={e => setEmail(e.target.value) } required/>
        </div>

        <button className='w-full py-3 bg-red-500 hover:bg-red-300 rounded-full'>Submit</button>

        

     </form>

      }


     {/*otp input form */}


     {!isOtpSubmitted && isEmailSent && 


     <form onSubmit={onSubmitOtp} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset password otp</h1>
        <p className='text-center mb-6 text-indigo-300 '>Enter the 6-digit code sent to your email id.</p>
        <div className='flex justify-between mb-8' onPaste={handlePaste}>
         {Array(6).fill(0).map((_, index) =>(
            <input type="text" maxLength='1' key={index} required className='w-12 h-12 bg-[#333A5c] text-white text-center text-xl rounded-md'
            ref={e => inputRefs.current[index] = e}
            onInput={(e) => handleInput(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}

            
            />

         ) )}
      </div>
      <button className='w-full py-2.5 bg-red-500 rounded-full'>Submit</button>
      </form>

     }
  
      {/* enter new password */}



       {isOtpSubmitted && isEmailSent && 

      <form onSubmit={onSubmitNewPassword} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm' >
     <h1 className='text-white text-2xl font-semibold text-center mb-4'>New password</h1>
        <p className='text-center mb-6 text-indigo-300 '>Enter the new password below</p>
        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
          <input type="password" placeholder='Password' className='bg-transparent outline-none text-white'
          value={newPassword} onChange={e => setNewPassword(e.target.value) } required/>
        </div>

        <button className='w-full py-3 bg-red-500 rounded-full'>Submit</button>

        

     </form>

    }
      

     


       
    </div>
  )
}

export default ResetPassword;