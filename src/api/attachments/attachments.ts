import { api } from '@/lib/axios'

interface UploadAttachmentResponse {
  attachments: {
    id: string
    url: string
  }[]
}

export async function uploadAttachment(
  file: File | null,
): Promise<UploadAttachmentResponse | null> {
  if (!file) {
    return null
  }

  // 5MB
  if (file.size > 5 * 1024 * 1024) {
    throw new Error('O arquivo excede o tamanho permitido.')
  }
  if (!file.type.startsWith('image/')) {
    throw new Error('O arquivo deve ser uma imagem.')
  }

  const formData = new FormData()
  formData.append('files', file)

  const response = await api.post('/attachments', formData)

  return response.data as UploadAttachmentResponse | null
}
