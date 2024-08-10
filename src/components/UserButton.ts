import type { Component } from 'vue'
import { Teleport, computed, defineComponent, h, ref, watchEffect } from 'vue'
import type { CustomMenuItem, UserButtonProps } from '@clerk/types'
import { useClerk } from '../composables/useClerk'
import { ClerkLoaded } from './controlComponents'

export const UserButtonMain = defineComponent((props: UserButtonProps, { slots }) => {
  const clerk = useClerk()
  const el = ref<HTMLDivElement | null>(null)
  const mountRefs = ref<Map<Component, HTMLDivElement>>(new Map())

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
          mountRefs.value.set(item, el)
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
    ...(menuSlotItems?.map((item) => {
      return mountRefs.value.get(item) ? h(Teleport, { to: mountRefs.value.get(item) }, item) : null
    }) ?? []),
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
      type: Function,
      required: true,
    },
  },
  setup(_props, { slots }) {
    return () => slots.labelIcon?.()
  },
})

export const UserButton = Object.assign(UserButtonMain, { Link: UserButtonLink, Action: UserButtonAction })
