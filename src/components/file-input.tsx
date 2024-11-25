import { CircleX, ImageUp } from 'lucide-react'
import { useRef, useState } from 'react'

interface FileInputProps {
  onSelect: (file: File | null) => void
}

export function FileInput({ onSelect }: FileInputProps) {
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

  return (
    <div
      onClick={handleDivClick}
      className="relative flex h-[120px] w-[120px] cursor-pointer items-center justify-center rounded-xl bg-shape"
    >
      {selectedFile ? (
        <img
          src={URL.createObjectURL(selectedFile)}
          alt="Imagem de perfil"
          className="h-full w-full rounded-xl object-cover"
        />
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

      {selectedFile && (
        <div
          className="absolute -right-8 top-0 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100/20"
          onClick={() => setSelectedFile(null)}
        >
          <CircleX className="h-4 w-4 text-gray-200" />
        </div>
      )}
    </div>
  )
}
