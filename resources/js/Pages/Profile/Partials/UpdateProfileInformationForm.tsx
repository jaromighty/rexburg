import { type FormEventHandler, type ReactElement } from 'react'
import { Link, useForm, usePage } from '@inertiajs/react'
import { Transition } from '@headlessui/react'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import { PrimaryButton } from '@/Components/Buttons'
import { TextInput } from '@/Components/TextInput'
import { type PageProps } from '@/types'

export default function UpdateProfileInformation ({ mustVerifyEmail, status, className = '' }: { mustVerifyEmail: boolean, status?: string, className?: string }): ReactElement {
  const { user } = usePage<PageProps>().props.auth

  const {
    data, setData, patch, errors, processing, recentlySuccessful
  } = useForm({
    name: user.name,
    email: user.email
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    patch(route('profile.update'))
  }

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-slate-900 dark:text-slate-100">Profile Information</h2>

        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Update your account&apos;s profile information and email address.
        </p>
      </header>

      <form onSubmit={submit} className="mt-6 space-y-6">
        <div>
          <InputLabel htmlFor="name" value="Name" />

          <TextInput
            id="name"
            className="mt-1 block w-full"
            value={data.name}
            onChange={(e) => { setData('name', e.target.value) }}
            required
            isFocused
            autoComplete="name"
          />

          <InputError className="mt-2" message={errors.name} />
        </div>

        <div>
          <InputLabel htmlFor="email" value="Email" />

          <TextInput
            id="email"
            type="email"
            className="mt-1 block w-full"
            value={data.email}
            onChange={(e) => { setData('email', e.target.value) }}
            required
            autoComplete="username"
          />

          <InputError className="mt-2" message={errors.email} />
        </div>

        {mustVerifyEmail && user.email_verified_at === null && (
          <div>
            <p className="mt-2 text-sm text-slate-200">
              Your email address is unverified.
              <Link
                href={route('verification.send')}
                method="post"
                as="button"
                className="rounded-md text-sm text-slate-400 underline hover:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Click here to re-send the verification email.
              </Link>
            </p>

            {status === 'verification-link-sent' && (
              <div className="mt-2 text-sm font-medium text-green-400">
                A new verification link has been sent to your email address.
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-4">
          <PrimaryButton disabled={processing}>Save</PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-gray-400">Saved.</p>
          </Transition>
        </div>
      </form>
    </section>
  )
}
