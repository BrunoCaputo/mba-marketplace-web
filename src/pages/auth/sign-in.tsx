import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { signIn } from '@/api/sign-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type SignInFormType = z.infer<typeof signInSchema>

export function SignInPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const { handleSubmit, register } = useForm<SignInFormType>({
    resolver: zodResolver(signInSchema),
  })

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })

  async function handleSignIn({ email, password }: SignInFormType) {
    try {
      console.log({ email, password })

      await authenticate({ email, password })

      toast.success('Logado com sucesso!')
    } catch (error) {
      console.error(error)
      toast.error('Credenciais inválidas!')
    }
  }

  return (
    <>
      <Helmet title="Sign In" />
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col items-start gap-2">
            <h2 className="text-title-md text-gray-500">Acesse sua conta</h2>
            <p className="text-body-sm text-gray-300">
              Informe seu e-mail e senha para entrar
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleSignIn)}
            className="flex w-full flex-col gap-12"
          >
            <div className="flex flex-col gap-5">
              <div>
                <Label htmlFor="email">E-mail</Label>
                <div className="flex h-12 w-full items-center gap-2 border-b-[1px] border-gray-100 py-[14px] text-gray-400">
                  <Mail className="h-6 w-6 text-gray-200" />
                  <Input
                    id="email"
                    placeholder="Seu e-mail cadastrado"
                    type="email"
                    {...register('email')}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Senha</Label>
                <div className="flex h-12 w-full items-center gap-2 border-b-[1px] border-gray-100 py-[14px] text-gray-400">
                  <Lock className="h-6 w-6 text-gray-200" />
                  <Input
                    id="password"
                    placeholder="Sua senha de acesso"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPassword((state) => !state)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-6 w-6 text-gray-200" />
                    ) : (
                      <Eye className="h-6 w-6 text-gray-200" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <Button
              variant="default"
              size="xl"
              type="submit"
              className="flex items-center justify-between border-none border-transparent bg-orange-base text-white hover:bg-orange-dark"
            >
              <span className="text-action-md">Acessar</span>
              <ArrowRight className="h-6 w-6" />
            </Button>
          </form>
        </div>

        <div className="flex flex-col gap-5 text-gray-300">
          <p className="text-body-md">Ainda não tem uma conta?</p>
          <Button
            variant="outline"
            size="xl"
            type="button"
            className="flex items-center justify-between border-orange-base text-orange-base hover:border-orange-dark hover:text-orange-dark"
          >
            <span className="text-action-md">Cadastrar</span>
            <ArrowRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </>
  )
}
