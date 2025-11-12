import { CircleX, ImageUp } from 'lucide-react'
import { useRef, useState } from 'react'

import { cn } from '@/lib/utils'

interface FileInputProps {
  onSelect: (file: File | null) => void
  className?: string
  imageClassName?: string
  initialImage?: string
  optionalBackgroundText?: string
  removeButtonPosition?: 'right' | 'left'
}

export function FileInput({
  className,
  onSelect,
  initialImage,
  imageClassName,
  optionalBackgroundText,
  removeButtonPosition = 'right',
}: FileInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      onSelect(file)
    }
  }

  const handleRemoveImage = () => {
    setSelectedFile(null)
    onSelect(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = '' // limpa o input para permitir reselecionar o mesmo arquivo
    }
  }

  return (
    <div className="relative w-min">
      <div
        onClick={handleDivClick}
        className={cn(
          'group relative flex h-[120px] w-[120px] cursor-pointer items-center justify-center rounded-xl bg-shape',
          className,
        )}
      >
        {selectedFile ? (
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Imagem selecionada"
            className={cn(
              'h-full w-full rounded-xl object-cover',
              imageClassName,
            )}
          />
        ) : initialImage ? (
          <img
            src={initialImage}
            alt="Imagem selecionada"
            className={cn(
              'h-full w-full rounded-xl object-cover',
              imageClassName,
            )}
          />
        ) : optionalBackgroundText ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <ImageUp className="h-8 w-8 text-orange-base" />
            <span className="max-w-40 text-center text-body-sm text-gray-300">
              {optionalBackgroundText}
            </span>
          </div>
        ) : (
          <ImageUp className="h-8 w-8 text-orange-base" />
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <div
          className={cn(
            'absolute left-0 top-0 z-30 flex h-full w-full items-center justify-center rounded-xl bg-transparent group-hover:bg-black/60',
            imageClassName,
          )}
        >
          <ImageUp className="h-8 w-8 text-transparent group-hover:z-50 group-hover:text-white" />
        </div>
      </div>

      {selectedFile && (
        <div
          className={cn(
            'absolute top-0 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100/20',
            removeButtonPosition === 'right' && '-right-8',
            removeButtonPosition === 'left' && '-left-8',
          )}
          onClick={handleRemoveImage}
        >
          <CircleX className="h-4 w-4 text-gray-200" />
        </div>
      )}
    </div>
  )
}
