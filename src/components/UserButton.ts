import type { Component, PropType } from 'vue'
import { Teleport, computed, defineComponent, h, ref, watchEffect } from 'vue'
import type { CustomMenuItem, UserButtonProps } from '@clerk/types'
import { useClerk } from '../composables/useClerk'
import { ClerkLoaded } from './controlComponents'

const UserButtonRoot = defineComponent((props: UserButtonProps, { slots }) => {
  const clerk = useClerk()
  const el = ref<HTMLDivElement | null>(null)
  const teleportDestinationMap = ref<Map<Component, HTMLDivElement>>(new Map())

  const menuSlotItems = slots.default?.()

  const customMenuItems = computed<CustomMenuItem[]>(() => {
    return menuSlotItems?.map((item) => {
      const menuItem: CustomMenuItem = {
        label: item.props?.label ?? '',
      }

      if (item.props?.href) {
        menuItem.href = item.props.href
      }

      if (item.props?.onClick) {
        menuItem.onClick = item.props.onClick
      }

      return {
        ...menuItem,
        mountIcon(el) {
          teleportDestinationMap.value.set(item, el)
        },
        // TODO: What do we need to clean?
        unmountIcon: () => { /* cleanup */ },
      }
    }) ?? []
  })

  watchEffect((onInvalidate) => {
    if (el.value) {
      clerk.mountUserButton(el.value, {
        ...props,
        customMenuItems: customMenuItems.value,
      })
    }

    onInvalidate(() => {
      if (el.value)
        clerk.unmountUserButton(el.value)
    })
  })

  return () => h(ClerkLoaded, () => [
    h('div', { ref: el }),
    ...menuSlotItems?.map((item) => {
      const target = teleportDestinationMap.value.get(item)
      return target ? h(Teleport, { to: target }, item) : null
    }) ?? [],
  ])
})

const UserButtonLink = defineComponent({
  inheritAttrs: false,
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
  props: {
    label: {
      type: String,
      required: true,
    },
    onClick: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
  setup(_props, { slots }) {
    return () => slots.labelIcon?.()
  },
})

export const UserButton = Object.assign(UserButtonRoot, { Link: UserButtonLink, Action: UserButtonAction })
