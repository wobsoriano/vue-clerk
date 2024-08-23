import type { Component, PropType, VNode } from 'vue'
import { Teleport, computed, defineComponent, h, onMounted, ref, watchEffect } from 'vue'
import type { CustomMenuItem, UserButtonProps, CustomPage } from '@clerk/types'
import { useClerk } from '../composables/useClerk'
import { ClerkLoaded } from './controlComponents'

const _UserButton = defineComponent((props: UserButtonProps, { slots }) => {
  const clerk = useClerk()
  const el = ref<HTMLDivElement | null>(null)
  const teleportDestinationMap = ref<Map<Component, HTMLDivElement>>(new Map())
  const profilePageTeleportMap = ref<Map<Component, HTMLDivElement>>(new Map())

  // @ts-expect-error: Add `name` field type
  const menuSlotItemsRoot = slots.default?.().find(i => i.type.name === 'UserButtonMenuItems')

  onMounted(() => {
    // eslint-disable-next-line no-console
    console.log('slots.default?.()', slots.default?.())
  })

  // @ts-expect-error: Add `default` slot type
  const menuSlotItems = menuSlotItemsRoot?.children?.default?.() as VNode[]

  const customMenuItems = computed<CustomMenuItem[]>(() => {
    return menuSlotItems?.map((item) => {
      const menuItem: CustomMenuItem = {
        label: item.props?.label ?? '',
      }

      if (item.props?.href) {
        menuItem.href = item.props.href
      }
      else if (item.props?.onClick) {
        menuItem.onClick = item.props.onClick
      }
      else if (item.props?.open) {
        menuItem.open = item.props.open.startsWith('/') ? item.props.open : `/${item.props.open}`
      }

      return {
        ...menuItem,
        mountIcon(el) {
          teleportDestinationMap.value.set(item, el)
        },
        unmountIcon: () => { /* cleanup */ },
      }
    }) ?? []
  })

  // @ts-expect-error: Add `name` field type
  const profilePages = slots.default?.().filter(i => i.type.name === 'UserProfilePage') as VNode[]
  const customPages = computed<CustomPage[]>(() => {
    return profilePages?.map((item) => {
      const menuItem: CustomPage = {
        label: item.props?.label ?? '',
        url: item.props?.url ?? '',
        mountIcon(el) {
          teleportDestinationMap.value.set(item, el)
        },
        unmountIcon: () => { /* cleanup */ },
        mount(el) {
          profilePageTeleportMap.value.set(item, el)
        },
        unmount: () => { /* cleanup */ },
      }

      return menuItem
    }) ?? []
  })

  watchEffect((onInvalidate) => {
    if (el.value) {
      clerk.mountUserButton(el.value, {
        ...props,
        customMenuItems: customMenuItems.value,
        userProfileProps: {
          customPages: customPages.value,
        }
      })
    }

    onInvalidate(() => {
      if (el.value)
        clerk.unmountUserButton(el.value)
    })
  })

  return () => h(ClerkLoaded, () => [
    h('div', { ref: el }),
    ...menuSlotItems.map((item) => {
      const target = teleportDestinationMap.value.get(item)
      return target ? h(Teleport, { to: target }, item) : null
    }),
    ...profilePages.map((item) => {
      const target = profilePageTeleportMap.value.get(item)
      // @ts-expect-error: fix labelIcon type
      return target ? h(Teleport, { to: target }, item.children?.labelIcon) : null
    })
  ])
})

const UserButtonMenuItems = defineComponent((_props, { slots }) => {
  return () => slots.default?.()
}, {
  name: 'UserButtonMenuItems',
  inheritAttrs: false,
})

const UserButtonLink = defineComponent({
  inheritAttrs: false,
  name: 'UserButtonLink',
  props: {
    label: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
  },
  setup(_props, { slots }) {
    return () => slots.labelIcon?.()
  },
})

const UserButtonAction = defineComponent({
  inheritAttrs: false,
  name: 'UserButtonAction',
  props: {
    label: {
      type: String,
      required: true,
    },
    onClick: {
      type: Function as PropType<() => void>,
      required: false,
    },
    open: {
      type: String,
      required: false,
    }
  },
  setup(_props, { slots }) {
    return () => slots.labelIcon?.()
  },
})

const UserProfilePage = defineComponent({
  inheritAttrs: false,
  name: 'UserProfilePage',
  props: {
    label: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: false,
    },
  },
  setup(_props, { slots }) {
    return () => slots.labelIcon?.()
  },
})

export const UserButton = Object.assign(_UserButton, {
  MenuItems: UserButtonMenuItems,
  Link: UserButtonLink,
  Action: UserButtonAction,
  UserProfilePage,
})
