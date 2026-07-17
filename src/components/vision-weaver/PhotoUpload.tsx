import React, { useRef } from 'react';
import { PhotoItem, VisionWeaverData } from '../../types/visionWeaver';
import { StepCard } from './StepCard';

interface PhotoUploadProps {
  data: VisionWeaverData;
  onUpload: (photos: PhotoItem[]) => void;
  onDelete: (id: string) => void;
  onSkip: () => void;
  onContinue: () => void;
}

export default function PhotoUpload({ data, onUpload, onDelete, onSkip, onContinue }: PhotoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const photos = data.photos || [];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    if (photos.length + newFiles.length > 5) {
      alert('You can only upload up to 5 photos.');
      return;
    }

    const newPhotoItems: PhotoItem[] = newFiles.map(file => ({
      id: crypto.randomUUID(),
      file: file as any,
      preview: URL.createObjectURL(file as any),
      cloudinaryUrl: null,
      uploadStatus: 'pending',
      uploadProgress: 0,
    }));

    onUpload(newPhotoItems);
  };

  return (
    <StepCard 
      step={11} 
      totalSteps={11} 
      title="Upload photos of your current bathroom" 
      subtitle="Help Vision AI understand the space"
      direction={1} 
      onContinue={onContinue} 
      isValid={true}
    >
      <div className="w-full flex flex-col gap-6">
        <div 
          role="button"
          tabIndex={0}
          onClick={() => fileInputRef.current?.click()}
          className="w-full bg-[#C8A951] text-[#2B2B2B] font-bold text-[16px] rounded-lg h-14 flex items-center justify-center cursor-pointer hover:bg-[#EDD98A] transition-colors"
        >
          📷 Add Photos from Camera or Gallery
        </div>
        
        <div 
          role="region"
          aria-label="Photo upload area"
          onClick={() => fileInputRef.current?.click()}
          className="hidden md:flex w-full border-2 border-dashed border-[#C8A951] rounded-lg p-8 items-center justify-center text-[#4A4A4A] cursor-pointer hover:bg-[#C8A951]/5 transition-colors"
        >
          Drag photos here, or click to browse
        </div>

        <input 
          type="file" 
          accept="image/*" 
          multiple 
          capture="environment" 
          className="hidden" 
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        {photos.length > 0 && (
          <div className="mt-4">
            <div className="text-[14px] text-[#4A4A4A] mb-3">{photos.length} / 5 photos added</div>
            <div className="flex flex-wrap gap-4">
              {photos.map(p => (
                <div key={p.id} className="relative w-20 h-20 rounded border border-[#E0D8CC] overflow-hidden group">
                  <img src={p.preview} alt="Upload preview" className="w-full h-full object-cover" />
                  <button 
                    onClick={(e) => { e.stopPropagation(); onDelete(p.id); }}
                    className="absolute top-1 right-1 bg-white/80 rounded-full w-5 h-5 flex items-center justify-center text-[#2B2B2B] text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    &times;
                  </button>
                  {p.file && (
                    <div className="absolute bottom-0 left-0 text-[10px] bg-black/50 text-white w-full truncate px-1 pb-0.5">
                      {p.file.name.substring(0, 18)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-4 text-center">
          <button onClick={onSkip} className="text-[#4A4A4A] hover:underline text-sm">
            Skip this step
          </button>
        </div>
      </div>
    </StepCard>
  );
}
