import { defineComponent, h, ref, watchEffect } from 'vue'
import type {
  CreateOrganizationProps,
  GoogleOneTapProps,
  OrganizationListProps,
  OrganizationSwitcherProps,
  SignInProps,
  SignUpProps,
  WaitlistProps,
} from '@clerk/types'
import { useClerk } from '../composables/useClerk'
import { UserButton } from './UserButton'
import { OrganizationProfile } from './OrganizationProfile'
import { UserProfile } from './UserProfile'
import { ClerkLoaded } from './controlComponents'

type AnyObject = Record<string, any>

interface MountProps {
  mount: (node: HTMLDivElement, props: AnyObject) => void
  unmount: (node: HTMLDivElement) => void
  props?: AnyObject
}

const UIPortal = defineComponent((props: MountProps) => {
  const el = ref<HTMLDivElement | null>(null)

  watchEffect((onInvalidate) => {
    if (el.value)
      props.mount(el.value, props.props || {})

    onInvalidate(() => {
      if (el.value)
        props.unmount(el.value)
    })
  })

  return () => h(ClerkLoaded, () => h('div', { ref: el }))
})

export const GoogleOneTap = defineComponent((props: GoogleOneTapProps) => {
  const clerk = useClerk()
  return () => h(UIPortal, {
    mount: () => clerk.openGoogleOneTap(props),
    unmount: clerk.closeGoogleOneTap,
  })
})

export const SignIn = defineComponent((props: SignInProps) => {
  const clerk = useClerk()
  return () => h(UIPortal, {
    mount: clerk.mountSignIn,
    unmount: clerk.unmountSignIn,
    props,
  })
})

export const SignUp = defineComponent((props: SignUpProps) => {
  const clerk = useClerk()
  return () => h(UIPortal, {
    mount: clerk.mountSignUp,
    unmount: clerk.unmountSignUp,
    props,
  })
})

export const CreateOrganization = defineComponent((props: CreateOrganizationProps) => {
  const clerk = useClerk()
  return () => h(UIPortal, {
    mount: clerk.mountCreateOrganization,
    unmount: clerk.unmountCreateOrganization,
    props,
  })
})

export const OrganizationSwitcher = defineComponent((props: OrganizationSwitcherProps) => {
  const clerk = useClerk()
  return () => h(UIPortal, {
    mount: clerk.mountOrganizationSwitcher,
    unmount: clerk.unmountOrganizationSwitcher,
    props,
  })
})

export const OrganizationList = defineComponent((props: OrganizationListProps) => {
  const clerk = useClerk()
  return () => h(UIPortal, {
    mount: clerk.mountOrganizationList,
    unmount: clerk.unmountOrganizationList,
    props,
  })
})

export const Waitlist = defineComponent((props: WaitlistProps) => {
  const clerk = useClerk()
  return () => h(UIPortal, {
    mount: clerk.mountWaitlist,
    unmount: clerk.unmountWaitlist,
    props,
  })
})

export {
  OrganizationProfile,
  UserButton,
  UserProfile,
}
