// import React, { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom'
// import { AppContent } from '../context/AppContext';
// import axios from 'axios';
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { motion } from "framer-motion";

// const Login = () => {

//   const navigate = useNavigate();
//   const { backendUrl, setIsLoggedin, getUserData, setAuthToken } = useContext(AppContent)

//   const [state, setState] = useState('signup')
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')

//   const onSubmitHandle = async (e) => {
//     e.preventDefault();

//     try {
//       if (state === 'signup') {
//         const res = await axios.post(backendUrl + '/api/auth/signup', { name, email, password });
//         const data = res.data;

//         if (data.success) {
//           localStorage.setItem('token', data.token);  // ← save token
//           setAuthToken(data.token);                    // ← set in axios headers
//           setIsLoggedin(true);
//           getUserData();
//           navigate('/');
//         } else {
//           toast.error(data.message);
//         }

//       } else {
//         const res = await axios.post(backendUrl + '/api/auth/login', { email, password });
//         const data = res.data;

//         if (data.success) {
//           localStorage.setItem('token', data.token);  // ← save token
//           setAuthToken(data.token);                    // ← set in axios headers
//           setIsLoggedin(true);
//           getUserData();
//           navigate('/');
//         } else {
//           toast.error(data.message);
//         }
//       }

//     } catch (error) {
//       toast.error(error.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <div className='flex items-center justify-end min-h-screen px-6 md:pr-20 bg-gradient-to-br from-slate-900 to-purple-400'>
//       <div className='text-white justify-end min-h-screen pt-20 px-6 md:pr-[500px]'>
//         <motion.p
//           initial={{ x: -100, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 1, delay: 1 }}
//           className='text-[20px] justify-start md:pl-9 py-2'>
//           <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className='text-[40px]'>W</motion.span>elcome to
//         </motion.p>

//         <motion.h1
//           initial={{ y: -100, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 1, delay: 1 }}
//           className='text-4xl font-bold justify-start md:pl-9 py-2'>
//           <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className='text-[90px]'>W</motion.span>connect
//           <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3, repeat: Infinity, repeatType: "loop" }}>.</motion.span>
//           <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4, repeat: Infinity, repeatType: "loop" }}>.</motion.span>
//           <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5, repeat: Infinity, repeatType: "loop" }}>.</motion.span>
//           <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 6, repeat: Infinity, repeatType: "loop" }}>.</motion.span>
//           <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 7, repeat: Infinity, repeatType: "loop" }}>.</motion.span>
//           <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 8, repeat: Infinity, repeatType: "loop" }}>.</motion.span>
//         </motion.h1>

//         <motion.h1
//           initial={{ y: 200, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 1, delay: 3 }}
//           className='text-[30px] font-serif justify-start md:pl-9 pt-20'>
//           Create Your Account <br /> <span>or</span> <br /> <span>Sign in</span> <span>-------------</span>
//         </motion.h1>
//       </div>

//       <motion.div
//         initial={{ x: 50, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 1, delay: 2 }}
//         className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>
//         <h2 className='text-3xl font-semibold text-white text-center mb-3'>
//           {state === 'signup' ? 'Create account' : 'Login account'}
//         </h2>
//         <p className='text-center text-sm mb-6'>
//           {state === 'signup' ? 'Create your account' : 'Login to your account'}
//         </p>

//         <form onSubmit={onSubmitHandle}>
//           {state === 'signup' && (
//             <div className='mb-4 flex items-center gap-3 text-white w-full px-5 py-2.5 rounded-full bg-[#b4291f]'>
//               <input onChange={e => setName(e.target.value)} value={name} className='bg-transparent outline-none' type="text" placeholder='Full Name' required />
//             </div>
//           )}

//           <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 text-white rounded-full bg-[#b4291f]'>
//             <input onChange={e => setEmail(e.target.value)} value={email} className='bg-transparent outline-none' type="email" placeholder='Email id' required />
//           </div>

//           <div className='mb-4 flex items-center gap-3 w-full text-white px-5 py-2.5 rounded-full bg-[#b4291f]'>
//             <input onChange={e => setPassword(e.target.value)} value={password} className='bg-transparent outline-none' type="password" placeholder='Password' required />
//           </div>

//           <p onClick={() => navigate('/reset-password')} className='mb-4 text-blue-400 cursor-pointer'>Forgot Password?</p>

//           <button className='w-full py-2.5 rounded-full bg-red-700 text-white hover:bg-red-300 font-medium'>
//             {state === 'signup' ? 'Sign Up' : 'Login'}
//           </button>
//         </form>

//         {state === 'signup' ? (
//           <p className='text-gray-400 text-center text-xs mt-4'>Already have an account?{' '}
//             <span className='text-blue-400 cursor-pointer underline' onClick={() => setState('login')}>Login here</span>
//           </p>
//         ) : (
//           <p className='text-gray-400 text-center text-xs mt-4'>Don't have an account?{' '}
//             <span className='text-blue-400 cursor-pointer underline' onClick={() => setState('signup')}>Sign up</span>
//           </p>
//         )}
//       </motion.div>
//     </div>
//   );
// };

// export default Login;



import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

/* ═══════════════════════════════════════════════════
   AURORA CANVAS — optimized for smooth 60fps
═══════════════════════════════════════════════════ */
const AuroraCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    let raf, W, H;
    let t = 0;
    let stars = [];
    // Offscreen canvas for static hills (drawn once per resize)
    let hillCanvas = document.createElement('canvas');
    let hillCtx = hillCanvas.getContext('2d');
    // Pre-built sky gradient (rebuilt only on resize)
    let skyGrad = null;
    // Pre-built vignette (rebuilt only on resize)
    let vigGrad = null;

    const auroraConfig = [
      { color: [80,220,120],  baseY:0.28, amp:38, freq:0.0018, speed:0.00042, width:0.22, alpha:0.36 },
      { color: [40,210,200],  baseY:0.22, amp:30, freq:0.0022, speed:0.00036, width:0.18, alpha:0.28 },
      { color: [140,80,220],  baseY:0.32, amp:44, freq:0.0015, speed:0.00026, width:0.26, alpha:0.26 },
      { color: [60,255,100],  baseY:0.18, amp:26, freq:0.0026, speed:0.00052, width:0.14, alpha:0.33 },
      { color: [220,60,180],  baseY:0.36, amp:50, freq:0.0012, speed:0.00020, width:0.20, alpha:0.20 },
    ];

    // POINTS: reduced from 120 to 40 per band — same visual, 3× faster
    const STEPS = 40;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      hillCanvas.width = W; hillCanvas.height = H;
      initStars();
      buildStaticGrads();
      buildHills();
    };

    const initStars = () => {
      stars = Array.from({ length: 160 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H * 0.60,
        r: Math.random() * 1.3 + 0.2,
        alpha: Math.random() * 0.55 + 0.35,
        ts: Math.random() * 0.016 + 0.005,
        to: Math.random() * Math.PI * 2,
      }));
    };

    const buildStaticGrads = () => {
      // Sky — built once, reused every frame
      skyGrad = ctx.createLinearGradient(0, 0, 0, H);
      skyGrad.addColorStop(0,    '#010a05');
      skyGrad.addColorStop(0.25, '#021309');
      skyGrad.addColorStop(0.6,  '#031b0d');
      skyGrad.addColorStop(1,    '#062414');

      // Vignette — built once
      vigGrad = ctx.createRadialGradient(W/2, H/2, H*0.18, W/2, H/2, W*0.82);
      vigGrad.addColorStop(0,   'rgba(0,0,0,0)');
      vigGrad.addColorStop(0.65,'rgba(1,8,4,0.12)');
      vigGrad.addColorStop(1,   'rgba(1,5,3,0.52)');
    };

    // Hills drawn once to offscreen canvas — zero cost to stamp each frame
    const buildHills = () => {
      hillCtx.clearRect(0, 0, W, H);
      const hillY = H * 0.82;

      // Back hill
      hillCtx.beginPath();
      hillCtx.moveTo(0, H);
      hillCtx.lineTo(0, hillY + 30);
      hillCtx.bezierCurveTo(W*0.12, hillY-10, W*0.22, hillY+20, W*0.35, hillY+5);
      hillCtx.bezierCurveTo(W*0.48, hillY-15, W*0.58, hillY+25, W*0.72, hillY-5);
      hillCtx.bezierCurveTo(W*0.85, hillY-20, W*0.93, hillY+10, W, hillY+20);
      hillCtx.lineTo(W, H);
      hillCtx.closePath();
      const hg1 = hillCtx.createLinearGradient(0, hillY-20, 0, H);
      hg1.addColorStop(0, 'rgba(15,35,25,0.93)');
      hg1.addColorStop(0.3,'rgba(8,22,15,0.97)');
      hg1.addColorStop(1, 'rgba(3,10,7,1)');
      hillCtx.fillStyle = hg1; hillCtx.fill();

      // Snow caps
      [{x:W*0.08,y:hillY+15,w:W*0.09},{x:W*0.28,y:hillY,w:W*0.08},
       {x:W*0.52,y:hillY+10,w:W*0.1},{x:W*0.72,y:hillY-8,w:W*0.07},{x:W*0.9,y:hillY+15,w:W*0.08}]
      .forEach(({ x, y, w }) => {
        const sg = hillCtx.createRadialGradient(x+w/2, y, 0, x+w/2, y+12, w*0.7);
        sg.addColorStop(0, 'rgba(200,240,220,0.5)');
        sg.addColorStop(0.5,'rgba(150,210,185,0.22)');
        sg.addColorStop(1, 'rgba(80,160,130,0)');
        hillCtx.fillStyle = sg;
        hillCtx.beginPath();
        hillCtx.ellipse(x+w/2, y+6, w*0.52, 13, 0, 0, Math.PI*2);
        hillCtx.fill();
      });

      // Front hill
      hillCtx.beginPath();
      hillCtx.moveTo(0, H);
      hillCtx.lineTo(0, hillY+55);
      hillCtx.bezierCurveTo(W*0.08,hillY+30,W*0.18,hillY+60,W*0.3,hillY+45);
      hillCtx.bezierCurveTo(W*0.42,hillY+30,W*0.55,hillY+65,W*0.68,hillY+40);
      hillCtx.bezierCurveTo(W*0.8,hillY+20,W*0.9,hillY+55,W,hillY+50);
      hillCtx.lineTo(W, H); hillCtx.closePath();
      hillCtx.fillStyle = 'rgba(3,12,7,0.99)'; hillCtx.fill();
    };

    // ── OPTIMIZED aurora: one filled polygon per band + one stroke path ──
    // Uses vertical gradient on a filled polygon shape — no per-strip fillRect loop
    const drawAuroraBand = (band) => {
      const { color:[r,g,b], baseY, amp, freq, speed, width, alpha } = band;
      const bandH  = H * width;
      const cy     = H * baseY;
      const stepW  = W / STEPS;

      // Build top wave points once
      const pts = [];
      for (let i = 0; i <= STEPS; i++) {
        const x = i * stepW;
        const w1 = Math.sin(x * freq + t * speed * 55) * amp;
        const w2 = Math.sin(x * freq * 1.6 + t * speed * 38 + 1.1) * amp * 0.45;
        const w3 = Math.sin(x * freq * 0.55 + t * speed * 22 + 2.3) * amp * 0.25;
        pts.push({ x, y: cy + w1 + w2 + w3 });
      }

      // Vertical gradient for the whole band (one gradient, not per-strip)
      const minY = Math.min(...pts.map(p => p.y));
      const maxY = minY + bandH * 1.3;
      const grad = ctx.createLinearGradient(0, minY - bandH * 0.15, 0, maxY);
      grad.addColorStop(0,    `rgba(${r},${g},${b},0)`);
      grad.addColorStop(0.12, `rgba(${r},${g},${b},${alpha})`);
      grad.addColorStop(0.45, `rgba(${r},${g},${b},${alpha * 0.85})`);
      grad.addColorStop(0.8,  `rgba(${r},${g},${b},${alpha * 0.3})`);
      grad.addColorStop(1,    `rgba(${r},${g},${b},0)`);

      // Draw filled curtain polygon
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y - bandH * 0.15);
      pts.forEach(p => ctx.lineTo(p.x, p.y - bandH * 0.15));
      // Bottom edge sweeps back
      for (let i = STEPS; i >= 0; i--) ctx.lineTo(pts[i].x, pts[i].y + bandH);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Glowing core line — no shadowBlur (expensive), use lineWidth instead
      ctx.beginPath();
      pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
      ctx.strokeStyle = `rgba(${r},${g},${b},${alpha * 0.9})`;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Thin bright highlight line just above
      ctx.beginPath();
      pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y - 3) : ctx.lineTo(p.x, p.y - 3));
      ctx.strokeStyle = `rgba(${r},${g},${b},${alpha * 0.5})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    // ── Reflection: one rect per band, no per-pixel loop ──
    const drawReflection = () => {
      const reflY = H * 0.845;
      auroraConfig.forEach(({ color:[r,g,b], alpha }) => {
        const rg = ctx.createLinearGradient(0, reflY, 0, reflY + 28);
        rg.addColorStop(0, `rgba(${r},${g},${b},${alpha * 0.14})`);
        rg.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = rg;
        ctx.fillRect(0, reflY, W, 28);
      });
    };

    const draw = (ts) => {
      t = ts * 0.001; // seconds — cleaner than raw ms

      // Sky fill (reuse pre-built gradient)
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, W, H);

      // Stars — no shadowBlur per star (use globalAlpha only)
      const tSec = t;
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const tw = Math.sin(tSec * s.ts * 60 + s.to) * 0.42 + 0.58;
        ctx.globalAlpha = s.alpha * tw;
        ctx.fillStyle = '#e0f8ec';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Aurora bands with additive blending
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      auroraConfig.forEach(drawAuroraBand);
      ctx.restore();

      // Stamp pre-rendered hills (single drawImage call)
      ctx.drawImage(hillCanvas, 0, 0);

      // Reflection
      drawReflection();

      // Vignette
      ctx.fillStyle = vigGrad;
      ctx.fillRect(0, 0, W, H);

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
};

/* ═══════════════════════════════════════════════════
   AURORA INPUT FIELD
═══════════════════════════════════════════════════ */
const AuroraInput = ({ icon, label, value, onChange, type: baseType, delay, showToggle }) => {
  const [focused, setFocused] = useState(false);
  const [show, setShow] = useState(false);
  const type = showToggle ? (show ? 'text' : 'password') : baseType;
  const active = focused || value.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      style={{ position: 'relative', marginBottom: 18 }}
    >
      {/* Floating label */}
      <label style={{
        position: 'absolute', left: 14, zIndex: 2, pointerEvents: 'none',
        top: active ? 7 : 16,
        fontSize: active ? '0.6rem' : '0.85rem',
        color: active ? (focused ? '#4dffa0' : 'rgba(100,220,160,0.6)') : 'rgba(120,200,150,0.45)',
        fontFamily: "'Raleway', sans-serif",
        fontWeight: active ? 600 : 400,
        letterSpacing: active ? '0.15em' : '0.03em',
        textTransform: active ? 'uppercase' : 'none',
        transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
      }}>
        {label}
      </label>

      <div style={{
        display: 'flex', alignItems: 'center',
        padding: active ? '22px 14px 8px' : '16px 14px',
        background: focused
          ? 'rgba(40, 180, 100, 0.08)'
          : 'rgba(20, 80, 50, 0.25)',
        border: `1px solid ${focused ? 'rgba(80,220,140,0.65)' : 'rgba(60,160,100,0.2)'}`,
        borderRadius: 12,
        backdropFilter: 'blur(18px)',
        transition: 'all 0.3s ease',
        boxShadow: focused
          ? '0 0 24px rgba(60,200,120,0.2), inset 0 0 16px rgba(40,180,100,0.06)'
          : 'inset 0 1px 0 rgba(80,200,130,0.06)',
      }}>
        <input
          type={type}
          value={value}
          onChange={onChange}
          required
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            color: '#c8ffe0', fontSize: '0.92rem',
            fontFamily: "'Raleway', sans-serif",
            letterSpacing: '0.04em',
          }}
        />
        {showToggle && (
          <button type="button" onClick={() => setShow(s => !s)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(80,200,130,0.5)', fontSize: '0.62rem',
              fontFamily: "'Courier Prime', monospace", letterSpacing: '0.1em',
              transition: 'color 0.2s', padding: '0 2px',
            }}
            onMouseEnter={e => e.target.style.color = '#4dffa0'}
            onMouseLeave={e => e.target.style.color = 'rgba(80,200,130,0.5)'}
          >
            {show ? 'HIDE' : 'SHOW'}
          </button>
        )}
        {focused && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              width: 7, height: 7, borderRadius: '50%', flexShrink: 0, marginLeft: 8,
              background: '#4dffa0',
              boxShadow: '0 0 10px #4dffa0, 0 0 20px rgba(77,255,160,0.5)',
            }}
          />
        )}
      </div>

      {/* Aurora underline glow */}
      {focused && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
            background: 'linear-gradient(90deg, transparent, #4dffa0, #40e0d0, #4dffa0, transparent)',
            transformOrigin: 'left', borderRadius: 1,
            boxShadow: '0 0 8px rgba(77,255,160,0.6)',
          }}
        />
      )}
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════
   PASSWORD STRENGTH
═══════════════════════════════════════════════════ */
const PasswordStrength = ({ password }) => {
  const getStrength = (p) => {
    if (!p) return null;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    const levels = [
      { label: 'Weak',     color: '#ff6060' },
      { label: 'Fair',     color: '#ffcc44' },
      { label: 'Good',     color: '#40e0d0' },
      { label: 'Strong',   color: '#4dffa0' },
      { label: 'Aurora ✦', color: '#a0ffcc' },
    ];
    return { score: s, ...levels[s] };
  };
  const info = getStrength(password);
  if (!info) return null;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginBottom: 14, marginTop: -10 }}>
      <div style={{ display: 'flex', gap: 4, marginBottom: 5 }}>
        {[0,1,2,3].map(i => (
          <motion.div key={i}
            animate={{
              background: i < info.score ? info.color : 'rgba(80,200,130,0.1)',
              boxShadow: i < info.score ? `0 0 8px ${info.color}80` : 'none',
            }}
            transition={{ duration: 0.35 }}
            style={{ flex: 1, height: 3, borderRadius: 2 }}
          />
        ))}
      </div>
      <motion.span animate={{ color: info.color }}
        style={{ fontFamily: "'Courier Prime', monospace", fontSize: '0.62rem', letterSpacing: '0.12em' }}>
        {info.label}
      </motion.span>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════
   MAIN LOGIN
═══════════════════════════════════════════════════ */
const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData, setAuthToken } = useContext(AppContent);

  const [state, setState]       = useState('signup');
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [agree, setAgree]       = useState(false);

  // Card tilt parallax
  const cardRef = useRef(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const sRotX = useSpring(rotX, { stiffness: 100, damping: 20 });
  const sRotY = useSpring(rotY, { stiffness: 100, damping: 20 });
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    rotX.set(((e.clientY - rect.top - rect.height / 2) / rect.height) * -8);
    rotY.set(((e.clientX - rect.left - rect.width / 2) / rect.width) * 8);
  };

  const onSubmitHandle = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (state === 'signup') {
        const res = await axios.post(backendUrl + '/api/auth/signup', { name, email, password });
        if (res.data.success) {
          localStorage.setItem('token', res.data.token);
          setAuthToken(res.data.token);
          setIsLoggedin(true);
          getUserData();
          navigate('/');
        } else { toast.error(res.data.message); }
      } else {
        const res = await axios.post(backendUrl + '/api/auth/login', { email, password });
        if (res.data.success) {
          localStorage.setItem('token', res.data.token);
          setAuthToken(res.data.token);
          setIsLoggedin(true);
          getUserData();
          navigate('/');
        } else { toast.error(res.data.message); }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signal lost in the aurora…');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,600&family=Courier+Prime:wght@400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .aurora-root {
          min-height: 100vh;
          display: flex; align-items: center; justify-content: center;
          position: relative; overflow: hidden;
          background: #010a05;
        }

        /* Glass card */
        .aurora-card {
          background: linear-gradient(145deg, rgba(4,22,12,0.88) 0%, rgba(3,16,9,0.94) 100%);
          border: 1px solid rgba(60,200,120,0.2);
          border-radius: 22px;
          box-shadow:
            0 0 0 1px rgba(100,255,160,0.06),
            0 0 60px rgba(40,180,100,0.14),
            0 40px 100px rgba(0,0,0,0.7),
            inset 0 1px 0 rgba(100,255,160,0.1),
            inset 0 -1px 0 rgba(40,120,70,0.08);
          backdrop-filter: blur(36px);
          -webkit-backdrop-filter: blur(36px);
          position: relative; overflow: hidden;
        }

        /* Top aurora shimmer border */
        .aurora-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg,
            transparent,
            rgba(60,220,120,0.7),
            rgba(40,210,200,0.6),
            rgba(140,80,220,0.4),
            rgba(60,255,100,0.5),
            transparent
          );
          animation: aurora-border 5s ease-in-out infinite;
        }
        @keyframes aurora-border {
          0%,100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        /* Holographic sweep */
        .aurora-card::after {
          content: '';
          position: absolute; top: -100%; left: -50%; width: 30%; height: 300%;
          background: linear-gradient(105deg,
            transparent 40%,
            rgba(80,220,140,0.05) 50%,
            rgba(40,210,200,0.03) 55%,
            transparent 65%
          );
          animation: holo-sweep 8s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes holo-sweep { 0% { left: -50%; } 100% { left: 130%; } }

        /* Tabs */
        .aurora-tab {
          flex: 1; padding: 10px 8px; border: none; border-radius: 10px;
          font-family: 'Raleway', sans-serif; font-size: 0.74rem; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer;
          transition: all 0.3s ease; background: transparent;
          color: rgba(80,180,120,0.38);
        }
        .aurora-tab.active {
          background: linear-gradient(135deg, rgba(40,180,100,0.28), rgba(40,200,180,0.18));
          color: #7fffc0;
          box-shadow: 0 0 22px rgba(60,200,120,0.28), inset 0 1px 0 rgba(100,255,160,0.12);
          border: 1px solid rgba(60,200,120,0.28);
        }

        /* Submit button */
        .aurora-btn {
          width: 100%; padding: 14px; border: none; border-radius: 50px;
          font-family: 'Raleway', sans-serif; font-size: 0.84rem; font-weight: 800;
          letter-spacing: 0.14em; text-transform: uppercase;
          cursor: pointer; position: relative; overflow: hidden;
          background: linear-gradient(90deg, #1a9a55, #20c878, #1ad4b8, #20c878, #1a9a55);
          background-size: 300% 100%;
          color: #011a0d;
          transition: all 0.5s ease;
          box-shadow: 0 4px 30px rgba(40,200,120,0.45), 0 0 60px rgba(40,200,120,0.15);
        }
        .aurora-btn:hover {
          background-position: 100% 0;
          transform: translateY(-2px);
          box-shadow: 0 10px 44px rgba(40,200,120,0.65), 0 0 80px rgba(40,200,120,0.2);
        }
        .aurora-btn:active { transform: translateY(0); }
        .aurora-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
        .aurora-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transform: translateX(-100%);
          transition: transform 0.55s ease;
        }
        .aurora-btn:hover::before { transform: translateX(100%); }

        .forgot-link {
          font-family: 'Courier Prime', monospace; font-size: 0.68rem;
          color: rgba(80,180,120,0.45); cursor: pointer; transition: all 0.2s;
          letter-spacing: 0.06em;
        }
        .forgot-link:hover { color: #4dffa0; text-shadow: 0 0 10px rgba(77,255,160,0.5); }

        .switch-link {
          color: #40e0a0; cursor: pointer; font-weight: 700;
          transition: all 0.2s;
        }
        .switch-link:hover { color: #a0ffd0; text-shadow: 0 0 12px rgba(77,255,160,0.6); }

        .checkbox-aurora {
          width: 16px; height: 16px;
          border: 1px solid rgba(60,200,120,0.45); border-radius: 4px;
          background: rgba(20,80,50,0.3); cursor: pointer;
          appearance: none; flex-shrink: 0; transition: all 0.2s;
          position: relative;
        }
        .checkbox-aurora:checked { background: rgba(40,200,120,0.3); border-color: rgba(77,255,160,0.8); }
        .checkbox-aurora:checked::after {
          content: '✦'; position: absolute; top: 50%; left: 50%;
          transform: translate(-50%,-50%); color: #4dffa0; font-size: 8px;
        }

        @keyframes twinkle-aurora { 0%,100%{opacity:0.2} 50%{opacity:0.9} }

        @media (min-width: 900px) { .aurora-left { display: flex !important; } }
      `}</style>

      <div className="aurora-root">
        <AuroraCanvas />

        {/* Floating aurora mist particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div key={i}
            style={{
              position: 'fixed', borderRadius: '50%', pointerEvents: 'none', zIndex: 1,
              width: 200 + i * 60, height: 80 + i * 20,
              left: `${(i * 14) % 90}%`,
              top: `${15 + (i * 7) % 50}%`,
              background: [
                'rgba(60,220,120,0.04)', 'rgba(40,210,200,0.035)', 'rgba(140,80,220,0.03)',
                'rgba(60,255,100,0.04)', 'rgba(220,60,180,0.025)', 'rgba(60,220,120,0.03)',
                'rgba(40,210,200,0.04)', 'rgba(80,200,160,0.03)',
              ][i],
              filter: 'blur(30px)',
            }}
            animate={{ x: [0, 30 - i * 8, 0], y: [0, -12 + i * 3, 0], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 1.1 }}
          />
        ))}

        {/* Main layout */}
        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 980, margin: '0 auto',
          padding: '28px 24px', display: 'flex', alignItems: 'center', gap: 64 }}>

          {/* LEFT PANEL */}
          <motion.div className="aurora-left"
            style={{ flex: 1, display: 'none', flexDirection: 'column', gap: 0 }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Brand */}
            <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
              {/* Aurora ring logo */}
              <div style={{ position: 'relative', width: 48, height: 48 }}>
                {[44, 32, 20].map((sz, i) => (
                  <motion.div key={i}
                    animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                    transition={{ duration: 6 + i * 3, repeat: Infinity, ease: 'linear' }}
                    style={{
                      position: 'absolute', top: '50%', left: '50%',
                      width: sz, height: sz, marginLeft: -sz / 2, marginTop: -sz / 2,
                      borderRadius: '50%',
                      border: `1px solid rgba(${i === 0 ? '60,220,120' : i === 1 ? '40,210,200' : '140,80,220'},0.5)`,
                    }}>
                    <div style={{
                      position: 'absolute', top: -3, left: '50%', marginLeft: -3,
                      width: 6, height: 6, borderRadius: '50%',
                      background: i === 0 ? '#4dffa0' : i === 1 ? '#40e0d0' : '#b060ff',
                      boxShadow: `0 0 10px ${i === 0 ? '#4dffa0' : i === 1 ? '#40e0d0' : '#b060ff'}`,
                    }} />
                  </motion.div>
                ))}
                <div style={{ position: 'absolute', top: '50%', left: '50%', width: 10, height: 10,
                  marginLeft: -5, marginTop: -5, borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, #a0ffd0, #20c878)',
                  boxShadow: '0 0 16px rgba(64,230,160,0.9)' }} />
              </div>
              <span style={{ fontFamily: "'Courier Prime', monospace", fontSize: '0.65rem',
                color: 'rgba(80,200,130,0.5)', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                Wconnect System
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 700,
                fontSize: 'clamp(3rem, 5vw, 4.4rem)', lineHeight: 1.08, marginBottom: 16,
                background: 'linear-gradient(140deg, #c8ffe0 0%, #4dffa0 30%, #40e0d0 60%, #a060ff 90%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.01em' }}>
              W<br />connect
            </motion.h1>

            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.65, duration: 0.9 }}
              style={{ height: 1, width: 220, marginBottom: 18, transformOrigin: 'left',
                background: 'linear-gradient(90deg, rgba(60,220,120,0.7), rgba(40,200,200,0.4), transparent)' }} />

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
              style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, fontSize: '1rem',
                color: 'rgba(160,240,190,0.55)', lineHeight: 1.78, maxWidth: 255, letterSpacing: '0.03em' }}>
             Connect with people around the world through Wconnect 
            </motion.p>

            {/* System status */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
              style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                
                { label: 'CHANNEL',  value: 'SECURE',       dot: '#40e0d0' },
                { label: 'STATUS',   value: 'ONLINE',       dot: '#60ff90' },
                
              ].map(({ label, value, dot }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontFamily: "'Courier Prime', monospace", fontSize: '0.58rem',
                    color: 'rgba(80,180,120,0.38)', letterSpacing: '0.2em', width: 62 }}>{label}</span>
                  <div style={{ width: 16, height: 1, background: 'rgba(60,200,120,0.22)' }} />
                  <span style={{ fontFamily: "'Courier Prime', monospace", fontSize: '0.66rem',
                    color: 'rgba(140,240,180,0.65)', letterSpacing: '0.12em' }}>{value}</span>
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.3, 0.8] }}
                    transition={{ duration: 2.2, repeat: Infinity, delay: Math.random() * 1.5 }}
                    style={{ width: 5, height: 5, borderRadius: '50%', background: dot, boxShadow: `0 0 8px ${dot}` }} />
                </div>
              ))}
            </motion.div>

            {/* Constellation dots */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
              style={{ marginTop: 36, position: 'relative', height: 60 }}>
              <svg width="220" height="60" style={{ overflow: 'visible' }}>
                {[[10,30],[45,12],[80,42],[120,18],[160,36],[200,10]].map(([x,y],i,arr) => (
                  <g key={i}>
                    {i < arr.length-1 && <line x1={x} y1={y} x2={arr[i+1][0]} y2={arr[i+1][1]}
                      stroke="rgba(60,200,120,0.18)" strokeWidth="0.8" />}
                    <circle cx={x} cy={y} r="2.5" fill="rgba(77,255,160,0.6)"
                      style={{ animation:`twinkle-aurora ${2+i*0.3}s ease-in-out infinite`, animationDelay:`${i*0.4}s` }} />
                  </g>
                ))}
              </svg>
            </motion.div>
          </motion.div>

          {/* RIGHT — AURORA CARD */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: '100%', maxWidth: 400, flex: '0 0 auto', margin: '0 auto', perspective: 1000 }}
          >
            <motion.div ref={cardRef} onMouseMove={handleMouseMove}
              onMouseLeave={() => { rotX.set(0); rotY.set(0); }}
              style={{ rotateX: sRotX, rotateY: sRotY, transformStyle: 'preserve-3d' }}>

              <div className="aurora-card" style={{ padding: '36px 32px' }}>

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
                  <span style={{ fontFamily: "'Courier Prime', monospace", fontSize: '0.58rem',
                    color: 'rgba(80,180,120,0.38)', letterSpacing: '0.22em' }}>
                    WCONNECT // AUTH
                  </span>
                  <div style={{ display: 'flex', gap: 5 }}>
                    {['#ff5f57','#febc2e','#28c840'].map((c,i) => (
                      <motion.div key={i}
                        animate={{ opacity: [0.5,1,0.5], scale: [0.9,1.1,0.9] }}
                        transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.4 }}
                        style={{ width: 9, height: 9, borderRadius: '50%', background: c, boxShadow: `0 0 10px ${c}` }} />
                    ))}
                  </div>
                </div>

                {/* Aurora arc icon + title */}
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                  {/* Mini aurora arc */}
                  <motion.div style={{ display: 'inline-block', marginBottom: 14 }}>
                    <svg width="80" height="44" viewBox="0 0 80 44">
                      {[
                        { color: '#3ddc84', cy: 44, ry: 30, alpha: 0.7 },
                        { color: '#40e0d0', cy: 44, ry: 22, alpha: 0.55 },
                        { color: '#9040e0', cy: 44, ry: 14, alpha: 0.45 },
                      ].map((arc, i) => (
                        <motion.ellipse key={i} cx="40" cy={arc.cy} rx="38" ry={arc.ry}
                          fill="none" stroke={arc.color} strokeWidth="2"
                          strokeOpacity={arc.alpha}
                          style={{ filter: `drop-shadow(0 0 6px ${arc.color})` }}
                          animate={{ strokeOpacity: [arc.alpha * 0.5, arc.alpha, arc.alpha * 0.5] }}
                          transition={{ duration: 2 + i * 0.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
                        />
                      ))}
                    </svg>
                  </motion.div>

                  <AnimatePresence mode="wait">
                    <motion.div key={state}
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28 }}>
                      <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 700,
                        fontSize: '1.65rem', color: '#d0ffe8', margin: '0 0 5px', letterSpacing: '-0.01em' }}>
                        {state === 'signup' ? 'Create new account' : 'Login into existing account'}
                      </h2>
                      <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: '0.76rem',
                        color: 'rgba(140,230,180,0.45)', margin: 0, letterSpacing: '0.07em' }}>
                        {state === 'signup' ? 'Begin your journey connect with people' : 'Welcome back'}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: 5, background: 'rgba(20,80,50,0.3)', borderRadius: 13,
                  padding: 4, marginBottom: 22, border: '1px solid rgba(60,200,120,0.1)' }}>
                  {[{ id: 'signup', label: '✦ Sign Up' }, { id: 'login', label: '◎ Log In' }].map(t => (
                    <button key={t.id} onClick={() => setState(t.id)}
                      className={`aurora-tab ${state === t.id ? 'active' : ''}`}>{t.label}</button>
                  ))}
                </div>

                {/* Form */}
                <form onSubmit={onSubmitHandle}>
                  <AnimatePresence mode="wait">
                    <motion.div key={state} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                      {state === 'signup' && (
                        <AuroraInput label="Your name" value={name} onChange={e => setName(e.target.value)}
                          type="text" delay={0.05} />
                      )}
                      <AuroraInput label="Email address" value={email} onChange={e => setEmail(e.target.value)}
                        type="email" delay={0.1} />
                      <AuroraInput label="Password" value={password} onChange={e => setPassword(e.target.value)}
                        type="password" delay={0.15} showToggle />
                      {state === 'signup' && <PasswordStrength password={password} />}
                    </motion.div>
                  </AnimatePresence>

                  {/* Remember / Terms + Forgot */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
                      fontFamily: "'Raleway', sans-serif", fontSize: '0.74rem', color: 'rgba(120,210,160,0.5)' }}>
                      <input type="checkbox" className="checkbox-aurora" checked={agree}
                        onChange={e => setAgree(e.target.checked)}
                        required={state === 'signup'} />
                      {state === 'signup' ? 'I agree to terms' : 'Remember me'}
                    </label>
                    <span className="forgot-link" onClick={() => navigate('/reset-password')}>
                     Forget password?
                    </span>
                  </div>

                  {/* Submit */}
                  <button type="submit" disabled={isLoading} className="aurora-btn" style={{ marginBottom: 16 }}>
                    {isLoading ? (
                      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.85, repeat: Infinity, ease: 'linear' }}
                          style={{ width: 14, height: 14, border: '2px solid rgba(1,26,13,0.4)', borderTopColor: '#011a0d', borderRadius: '50%' }} />
                        Connecting…
                      </span>
                    ) : (
                      state === 'signup' ? ' Begin Journey' : '✦ Sign in'
                    )}
                  </button>

                  {/* Divider */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                    <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,rgba(60,200,120,0.2))' }} />
                    <span style={{ fontFamily: "'Courier Prime', monospace", fontSize: '0.62rem',
                      color: 'rgba(60,200,120,0.3)', letterSpacing: '0.15em' }}>✦ ✦ ✦</span>
                    <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(60,200,120,0.2),transparent)' }} />
                  </div>

                  <p style={{ textAlign: 'center', fontFamily: "'Raleway', sans-serif",
                    fontSize: '0.8rem', color: 'rgba(120,210,160,0.42)', margin: 0 }}>
                    {state === 'signup' ? 'Already here? ' : 'New to the north? '}
                    <span className="switch-link" onClick={() => setState(state === 'signup' ? 'login' : 'signup')}>
                      {state === 'signup' ? 'Log in' : 'Sign up'}
                    </span>
                  </p>
                </form>

                {/* Animated aurora bottom line */}
                <motion.div
                  animate={{ width: ['0%', '100%', '0%'], opacity: [0, 1, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ position: 'absolute', bottom: 0, left: 0, height: '1px',
                    background: 'linear-gradient(90deg,transparent,rgba(60,220,120,0.8),rgba(40,210,200,0.6),rgba(140,80,220,0.5),transparent)' }} />
              </div>
            </motion.div>

            {/* Footer coords */}
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
              style={{ textAlign: 'center', marginTop: 12, fontFamily: "'Courier Prime', monospace",
                fontSize: '0.56rem', color: 'rgba(60,180,100,0.22)', letterSpacing: '0.18em' }}>
              WCONNECT SECURE 
            </motion.p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Login;
