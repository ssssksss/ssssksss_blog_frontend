import React, { useEffect, useRef, useState } from 'react';

const TextParticle: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [keyword, setKeyword] = useState('프론트엔드 개발자 이수경입니다');
  const [contentCount, setContentCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (contentCount == 0) {
        setKeyword('조금씩 계속 성장 중 입니다');
        setContentCount(1);
      }
      if (contentCount == 1) {
        setKeyword('풀스택 개발자가 되려고 노력 중');
        setContentCount(2);
      }
      if (contentCount == 2) {
        setKeyword('프론트엔드 개발자 이수경입니다');
        setContentCount(0);
      }
    }, 4000);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cw = canvas.width = window.innerWidth;
    const ch = canvas.height = 200;
    const radius = 200;
    const drag = 0.9;
    const density = 1;
    const offset = 1;
    let pixels: Uint8ClampedArray;
    const particles: Particle[] = [];
    let mx = 0,
      my = 0;
    const divisionFontSize = 90 / keyword.length;
    const event = (e: MouseEvent) => {
      mx = e.clientX - canvas.offsetLeft;
      my = e.clientY - canvas.offsetTop;
    };
    canvas.addEventListener('mousemove', event);
    
    class Particle {
      hx: number;
      hy: number;
      cx: number;
      cy: number;
      vx: number;
      vy: number;
      
      constructor(x: number, y: number) {
        this.hx = Math.floor(x - offset * Math.random());
        this.hy = Math.floor(y - offset * Math.random());
        this.cx = Math.floor(cw * Math.random());
        this.cy = Math.floor(ch * Math.random());
        this.vx = Math.random() * 10 - 5;
        this.vy = Math.random() * 10 - 5;
      }
      
      update() {
        const dx = this.cx - mx;
        const dy = this.cy - my;
        const ds = dx * dx + dy * dy;
        const aradius = Math.min(radius / ds, radius);
        const theta = Math.atan2(dy, dx);
        
        const hdx = this.hx - this.cx;
        const hdy = this.hy - this.cy;
        const hds = Math.sqrt(hdx * hdx + hdy * hdy);
        const hf = hds * 0.01;
        const htheta = Math.atan2(hdy, hdx);
        
        this.vx += aradius * Math.cos(theta) + hf * Math.cos(htheta);
        this.vy += aradius * Math.sin(theta) + hf * Math.sin(htheta);
        
        this.vx *= drag;
        this.vy *= drag;
        
        this.cx += this.vx;
        this.cy += this.vy;
      }
    }
    
    let cancelRef: number;
    
    const draw = () => {
      const a = ctx.createImageData(cw, ch);
      const b = a.data;
      const color = Math.random() * 5 + 100;
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
      }
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const n = (Math.floor(p.cx) + Math.floor(p.cy) * cw) * 4;
        b[n] = color;
        b[n + 1] = color;
        b[n + 2] = color;
        b[n + 3] = 255;
      }
      
      ctx.putImageData(a, 0, 0);
      cancelRef = requestAnimationFrame(draw);
    };
    
    const init = () => {
      ctx.font = `${divisionFontSize + 0.1 * Math.random()}vw 'Jockey One'`;
      // ctx.font = `${5 + 1 * Math.random()}vw 'Arial'`;
      console.log("three-text-particle.tsx 파일 : ",ctx.font);
      ctx.fillText(
        keyword,
        cw / 2 - Math.round(ctx.measureText(keyword).width / 2) > 0
        ? cw / 2 - Math.round(ctx.measureText(keyword).width / 2)
        : 0,
        Math.floor(ch / 2),
      );
      pixels = ctx.getImageData(0, 0, cw, ch).data;
      
      for (let i = 0; i < ch; i += density) {
        for (let j = 0; j < cw; j += density) {
          const index = (j + i * cw) * 4;

          if (pixels[index + 3] > 128) {
            if (index >= particles.length) {
              particles.push(new Particle(j, i));
            } else {
              particles[index].hx = j;
              particles[index].hy = i;
            }
          }
        }
      }
    };

    init();
    // console.log(particles.length);
    draw();

    return () => {
      canvas.removeEventListener('mousemove', event);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(cancelRef);
    };
  }, [keyword]);

  return (
    <div>
      <canvas ref={canvasRef} id="canvas" />
    </div>
  );
};

export default TextParticle;
