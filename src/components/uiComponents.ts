import { defineComponent, h, ref, watchEffect } from 'vue'
import type {
  CreateOrganizationProps,
  GoogleOneTapProps,
  OrganizationListProps,
  OrganizationProfileProps,
  OrganizationSwitcherProps,
  SignInProps,
  SignUpProps,
  UserButtonProps,
  UserProfileProps,
} from '@clerk/types'
import { useClerk } from '../composables/useClerk'
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
      props.mount(el.value, props)

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
    props,
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

export const UserProfile = defineComponent((props: UserProfileProps) => {
  const clerk = useClerk()
  return () => h(UIPortal, {
    mount: clerk.mountUserProfile,
    unmount: clerk.unmountUserProfile,
    props,
  })
})

export const UserButton = defineComponent((props: UserButtonProps) => {
  const clerk = useClerk()
  return () => h(UIPortal, {
    mount: clerk.mountUserButton,
    unmount: clerk.unmountUserButton,
    props,
  })
})

export const OrganizationProfile = defineComponent((props: OrganizationProfileProps) => {
  const clerk = useClerk()
  return () => h(UIPortal, {
    mount: clerk.mountUserButton,
    unmount: clerk.unmountUserButton,
    props,
  })
})

export const CreateOrganization = defineComponent((props: CreateOrganizationProps) => {
  const clerk = useClerk()
  return () => h(UIPortal, {
    mount: clerk.mountUserButton,
    unmount: clerk.unmountUserButton,
    props,
  })
})

export const OrganizationSwitcher = defineComponent((props: OrganizationSwitcherProps) => {
  const clerk = useClerk()
  return () => h(UIPortal, {
    mount: clerk.mountUserButton,
    unmount: clerk.unmountUserButton,
    props,
  })
})

export const OrganizationList = defineComponent((props: OrganizationListProps) => {
  const clerk = useClerk()
  return () => h(UIPortal, {
    mount: clerk.mountUserButton,
    unmount: clerk.unmountUserButton,
    props,
  })
})
