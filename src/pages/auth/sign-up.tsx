import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Lock, Mail, Phone, User } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { FormField } from '@/components/form-field'
import { PasswordInput } from '@/components/password-input'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const signUpSchema = z
  .object({
    avatar: z.string().url(),
    name: z
      .string({ required_error: 'Nome é obrigatório!' })
      .min(1, 'Nome é obrigatório!'),
    phone: z
      .string({ required_error: 'Telefone é obrigatório!' })
      .min(1, 'Telefone é obrigatório!'),
    email: z
      .string({ required_error: 'Email é obrigatório!' })
      .min(1, 'Email é obrigatório!')
      .email('Email inválido!'),
    password: z
      .string({ required_error: 'Senha é obrigatória!' })
      .min(1, 'Senha é obrigatória!'),
    confirmPassword: z
      .string({ required_error: 'Confimação da senha é obrigatória!' })
      .min(1, 'Confimação da senha é obrigatória!'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type SignUpFormType = z.infer<typeof signUpSchema>

export function SignUpPage() {
  const navigate = useNavigate()

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<SignUpFormType>({
    resolver: zodResolver(signUpSchema),
  })

  async function handleSignUp(data: SignUpFormType) {
    console.log(data)
  }

  return (
    <>
      <Helmet title="Sign Up" />
      <div className="flex h-full flex-col justify-between gap-10 overflow-auto">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col items-start gap-2">
            <h2 className="font-ff-dm-sans text-title-md text-gray-500">
              Crie sua conta
            </h2>
            <p className="text-body-sm text-gray-300">
              Informe os seus dados pessoais e de acesso
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleSignUp)}
            className="flex w-full flex-col gap-12"
            noValidate
          >
            <section className="flex flex-col gap-5">
              <h3 className="font-ff-dm-sans text-title-sm text-gray-500">
                Perfil
              </h3>

              <FormField
                labelFor="name"
                labelText="Nome"
                error={errors.name}
                prefixIcon={<User />}
              >
                <Input
                  id="name"
                  placeholder="Seu nome completo"
                  type="text"
                  {...register('name')}
                />
              </FormField>

              <FormField
                labelFor="phone"
                labelText="Telefone"
                error={errors.phone}
                prefixIcon={<Phone />}
              >
                <Input
                  id="phone"
                  placeholder="(00) 00000-0000"
                  type="tel"
                  {...register('phone')}
                />
              </FormField>
            </section>

            <section className="flex flex-col gap-5">
              <h3 className="font-ff-dm-sans text-title-sm text-gray-500">
                Acesso
              </h3>

              <FormField
                labelFor="email"
                labelText="E-mail"
                error={errors.email}
                prefixIcon={<Mail />}
              >
                <Input
                  id="email"
                  placeholder="Seu e-mail de acesso"
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
                  placeholder="Senha de acesso"
                  {...register('password')}
                />
              </FormField>

              <FormField
                labelFor="confirmPassword"
                labelText="Senha"
                error={errors.confirmPassword}
                prefixIcon={<Lock />}
              >
                <PasswordInput
                  id="confirmPassword"
                  placeholder="Confirme a senha"
                  {...register('confirmPassword')}
                />
              </FormField>
            </section>

            <Button
              variant="default"
              size="xl"
              type="submit"
              className="flex items-center justify-between border-none border-transparent bg-orange-base text-white hover:bg-orange-dark"
              disabled={isSubmitting}
            >
              <span className="text-action-md">Cadastrar</span>
              <ArrowRight className="h-6 w-6" />
            </Button>
          </form>
        </div>

        <div className="flex flex-col gap-5 text-gray-300">
          <p className="text-body-md">Já tem uma conta?</p>
          <Button
            variant="outline"
            size="xl"
            type="button"
            className="flex items-center justify-between border-orange-base text-orange-base hover:border-orange-dark hover:text-orange-dark"
            disabled={isSubmitting}
            onClick={() => navigate('/sign-in')}
          >
            <span className="text-action-md">Acessar</span>
            <ArrowRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </>
  )
}
