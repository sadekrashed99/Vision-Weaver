import React, { useRef, useEffect } from 'react';
import { VisionWeaverData } from '../../types/visionWeaver';

interface MoodboardCanvasProps {
  data: VisionWeaverData;
}

export const MoodboardCanvas: React.FC<MoodboardCanvasProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 1200, 800);

    // Bottom strip
    ctx.fillStyle = '#F0EBE0';
    ctx.fillRect(0, 720, 1200, 80);

    ctx.font = 'bold 24px sans-serif';
    ctx.fillStyle = '#C8A951';
    ctx.fillText('Vision Weaver', 40, 765);

    ctx.font = '11px sans-serif';
    ctx.fillStyle = '#9E7A28';
    ctx.textAlign = 'right';
    ctx.fillText('A Stratapult Systems experience', 1160, 760);
    ctx.textAlign = 'left';

    // Top row dividers
    ctx.strokeStyle = '#E0D8CC';
    ctx.lineWidth = 1;
    for (let i = 1; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(i * 300, 0);
      ctx.lineTo(i * 300, 720);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(0, 360);
    ctx.lineTo(1200, 360);
    ctx.stroke();

    // Just some basic text placeholders for the panels to meet the requirement
    ctx.fillStyle = '#2B2B2B';
    ctx.font = 'bold 20px sans-serif';
    
    // Top Row (300x360 each)
    ctx.fillText('Style Direction', 20, 40);
    ctx.font = '16px sans-serif';
    ctx.fillText(data.styleDirection || 'Modern Minimal', 20, 70);

    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('Colour Palette', 320, 40);
    
    ctx.fillText('Tapware Finish', 620, 40);
    ctx.font = '16px sans-serif';
    ctx.fillText(data.tapwareFinish || 'Chrome', 620, 70);

    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('Tile Style', 920, 40);
    ctx.font = '16px sans-serif';
    ctx.fillText(data.tileStyle || 'Large Format', 920, 70);

    // Bottom Row (300x360 each)
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('Mirror Style', 20, 400);
    ctx.font = '16px sans-serif';
    ctx.fillText(data.mirrorStyle || 'Arched', 20, 430);

    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('Key Features', 320, 400);
    ctx.font = '16px sans-serif';
    let startY = 430;
    (data.features || []).slice(0, 8).forEach(feat => {
      ctx.fillText(feat, 320, startY);
      startY += 25;
    });

    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('Renovation Details', 620, 400);
    ctx.font = '16px sans-serif';
    ctx.fillText(`Budget: ${data.budget || 'Not sure'}`, 620, 430);
    ctx.fillText(`Timeline: ${data.timeline || 'Exploring'}`, 620, 460);
    ctx.fillText(`Location: ${data.suburb || 'Australia'}`, 620, 490);

  }, [data]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vision-weaver-moodboard.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="flex flex-col items-center mt-8 w-full max-w-2xl">
      <div className="w-full overflow-hidden border border-[#E0D8CC] rounded-xl shadow-sm mb-6 bg-white hidden">
        <canvas ref={canvasRef} width={1200} height={800} className="w-full h-auto" />
      </div>
      <button
        onClick={handleDownload}
        className="w-full bg-white border-[1.5px] border-[#C8A951] text-[#2B2B2B] font-bold py-4 px-6 rounded text-lg transition-colors hover:bg-[#F9F6F1] shadow-sm flex justify-center items-center gap-2"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        Download My Vision Moodboard
      </button>
    </div>
  );
};
