import { api } from '@/lib/axios'

interface UploadProfilePictureResponse {
  attachments: {
    id: string
    url: string
  }[]
}

export interface SignUpBody {
  name: string
  email: string
  password: string
  avatarId: string | null
  phone: string
  passwordConfirmation: string
}

interface SignUpResponse {
  seller: {
    id: string
    name: string
    phone: string
    email: string
    avatar: {
      id: string
      url: string
    }
  }
}

export async function uploadProfilePicture(
  file: File | null,
): Promise<UploadProfilePictureResponse | null> {
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
  formData.append('attachment', file)

  return api.post('/attachments', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export async function signUp({
  name,
  phone,
  email,
  avatarId,
  password,
  passwordConfirmation,
}: SignUpBody): Promise<SignUpResponse> {
  return await api.post('/sellers', {
    name,
    phone,
    email,
    avatarId,
    password,
    passwordConfirmation,
  })
}
