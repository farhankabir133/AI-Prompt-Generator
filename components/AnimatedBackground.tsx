import React, { useRef, useEffect } from 'react';

// --- Helper Functions for HUD Elements ---
const drawReticle = (ctx: CanvasRenderingContext2D, el: HudElement) => {
    const { x, y, size, progress } = el;
    const radius = size * 0.5;
    ctx.strokeStyle = `rgba(163, 113, 247, ${el.opacity})`;
    ctx.lineWidth = 1;

    // Outer circle
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();
    
    // Crosshairs
    ctx.beginPath();
    ctx.moveTo(x - radius, y);
    ctx.lineTo(x + radius, y);
    ctx.moveTo(x, y - radius);
    ctx.lineTo(x, y + radius);
    ctx.stroke();

    // Rotating inner bracket
    const angle = progress * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(x, y, radius * 0.6, angle, angle + Math.PI * 0.5);
    ctx.stroke();
};

const drawWaveform = (ctx: CanvasRenderingContext2D, el: HudElement) => {
    const { x, y, size, progress } = el;
    const width = size * 2;
    const height = size * 0.5;
    ctx.strokeStyle = `rgba(100, 150, 255, ${el.opacity})`;
    ctx.lineWidth = 1.5;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    for (let i = 0; i < width; i++) {
        const sine = Math.sin(i * 0.1 + progress * 10) * (height / 2);
        ctx.lineTo(x + i, y + sine);
    }
    ctx.stroke();
};

const drawDataReadout = (ctx: CanvasRenderingContext2D, el: HudElement) => {
    const { x, y, size } = el;
    ctx.fillStyle = `rgba(200, 180, 255, ${el.opacity})`;
    ctx.font = `${size}px monospace`;
    // @ts-ignore
    ctx.fillText(el.text, x, y);
};

const drawCornerBrackets = (ctx: CanvasRenderingContext2D, width: number, height: number, progress: number) => {
    const size = 30;
    const padding = 20;
    const opacity = 0.6 + (Math.sin(progress * Math.PI * 2) * 0.4); // Made brighter and pulse more
    ctx.strokeStyle = `rgba(163, 113, 247, ${opacity})`;
    ctx.lineWidth = 2;
    
    // Top-left
    ctx.beginPath();
    ctx.moveTo(padding + size, padding);
    ctx.lineTo(padding, padding);
    ctx.lineTo(padding, padding + size);
    ctx.stroke();

    // Top-right
    ctx.beginPath();
    ctx.moveTo(width - padding - size, padding);
    ctx.lineTo(width - padding, padding);
    ctx.lineTo(width - padding, padding + size);
    ctx.stroke();

    // Bottom-left
    ctx.beginPath();
    ctx.moveTo(padding + size, height - padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(padding, height - padding - size);
    ctx.stroke();
    
    // Bottom-right
    ctx.beginPath();
    ctx.moveTo(width - padding - size, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.lineTo(width - padding, height - padding - size);
    ctx.stroke();
};

// --- Types ---
type HudElementType = 'reticle' | 'waveform' | 'data';
interface HudElement {
    id: number;
    type: HudElementType;
    x: number;
    y: number;
    size: number;
    opacity: number;
    ttl: number; // Time to live
    maxTtl: number;
    progress: number;
    text?: string;
}

const AnimatedBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const elementsRef = useRef<HudElement[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let lastSpawnTime = 0;
        let frameCount = 0;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth * window.devicePixelRatio;
            canvas.height = window.innerHeight * window.devicePixelRatio;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };
        resizeCanvas();

        const createHudElement = (): HudElement => {
            const type: HudElementType = ['reticle', 'waveform', 'data'][Math.floor(Math.random() * 3)] as HudElementType;
            const ttl = Math.random() * 200 + 150; // Live for 150-350 frames
            
            const element: Partial<HudElement> = {
                id: Date.now() + Math.random(),
                type,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                ttl,
                maxTtl: ttl,
            };

            switch(type) {
                case 'reticle':
                    element.size = Math.random() * 40 + 20;
                    break;
                case 'waveform':
                    element.size = Math.random() * 50 + 30;
                    break;
                case 'data':
                    element.size = 12;
                    element.text = `0x${Math.random().toString(16).substr(2, 8).toUpperCase()}`;
                    break;
            }
            return element as HudElement;
        };
        
        const animate = (timestamp: number) => {
            if (!ctx) return;
            frameCount++;

            // Spawn new elements periodically - FASTER rate and HIGHER density
            if (timestamp - lastSpawnTime > 30 && elementsRef.current.length < 80) {
                 elementsRef.current.push(createHudElement());
                 lastSpawnTime = timestamp;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw static elements
            drawCornerBrackets(ctx, window.innerWidth, window.innerHeight, frameCount / 100);

            // Update and draw dynamic elements
            elementsRef.current = elementsRef.current.filter(el => {
                el.ttl--;
                if (el.ttl <= 0) return false;

                const lifeLeft = el.ttl / el.maxTtl;
                el.opacity = lifeLeft > 0.5 ? (1 - lifeLeft) * 2 : lifeLeft * 2; // Fade in, fade out
                el.opacity = Math.min(el.opacity, 0.9); // Cap max opacity - MUCH BRIGHTER
                el.progress = (el.maxTtl - el.ttl) / el.maxTtl;

                switch(el.type) {
                    case 'reticle': drawReticle(ctx, el); break;
                    case 'waveform': drawWaveform(ctx, el); break;
                    case 'data': drawDataReadout(ctx, el); break;
                }
                
                return true;
            });
            
            animationFrameId = requestAnimationFrame(animate);
        };

        animate(0);

        window.addEventListener('resize', resizeCanvas);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full" />;
};

export default AnimatedBackground;