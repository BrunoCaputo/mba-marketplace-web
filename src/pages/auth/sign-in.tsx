import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { ArrowRight, Lock, Mail } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { signIn } from '@/api/auth/sign-in'
import { FormField } from '@/components/form-field'
import { PasswordInput } from '@/components/password-input'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const signInSchema = z.object({
  email: z
    .string({ required_error: 'Email é obrigatório!' })
    .min(1, 'Email é obrigatório!')
    .email('Email inválido!'),
  password: z
    .string({ required_error: 'Senha é obrigatória!' })
    .min(1, 'Senha é obrigatória!'),
})

type SignInFormType = z.infer<typeof signInSchema>

export function SignInPage() {
  const navigate = useNavigate()

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<SignInFormType>({
    resolver: zodResolver(signInSchema),
  })

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })

  async function handleSignIn({ email, password }: SignInFormType) {
    try {
      const { accessToken } = await authenticate({ email, password })

      localStorage.setItem('accessToken', accessToken)
      navigate('/')
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
            <h2 className="font-ff-dm-sans text-title-md text-gray-500">
              Acesse sua conta
            </h2>
            <p className="text-body-sm text-gray-300">
              Informe seu e-mail e senha para entrar
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleSignIn)}
            className="flex w-full flex-col gap-12"
            noValidate
          >
            <div className="flex flex-col gap-5">
              <FormField
                labelFor="email"
                labelText="E-mail"
                error={errors.email}
                prefixIcon={<Mail />}
              >
                <Input
                  id="email"
                  placeholder="Seu e-mail cadastrado"
                  type="email"
                  {...register('email')}
                />
              </FormField>

              <FormField
                labelFor="password"
                labelText="Senha"
                error={errors.password}
                prefixIcon={<Lock />}
              >
                <PasswordInput
                  id="password"
                  placeholder="Sua senha de acesso"
                  {...register('password')}
                />
              </FormField>
            </div>

            <Button
              variant="default"
              size="xl"
              type="submit"
              className="flex items-center justify-between border-none border-transparent bg-orange-base text-white hover:bg-orange-dark"
              disabled={isSubmitting}
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
            disabled={isSubmitting}
            onClick={() => navigate('/sign-up')}
          >
            <span className="text-action-md">Cadastrar</span>
            <ArrowRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </>
  )
}
