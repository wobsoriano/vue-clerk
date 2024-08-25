import type { PropType, RendererElement, RendererNode, VNode } from 'vue'
import { Teleport, computed, defineComponent, h, ref, watchEffect } from 'vue'
import type { CustomMenuItem, UserButtonProps } from '@clerk/types'
import { useClerk } from '../composables/useClerk'
import { ClerkLoaded } from './controlComponents'

const UserButtonRoot = defineComponent((props: UserButtonProps, { slots }) => {
  const clerk = useClerk()
  const el = ref<HTMLDivElement | null>(null)
  const teleportDestinationMap = ref<Map<HTMLDivElement, {
    to: HTMLDivElement
    children: () => VNode
  }>>(new Map())

  const customItemsNodes = slots.default?.() as (VNode & {
    children: {
      default: () => (VNode<RendererNode, RendererElement, {
        label: string
        href?: string
        onClick?: () => void
      }> & {
        children: {
          labelIcon: () => VNode
        }
      })[]
    }
  })[]

  const customMenuItems = computed<CustomMenuItem[]>(() => {
    const customMenuItems: CustomMenuItem[] = []

    customItemsNodes.forEach((node) => {
      node.children.default().forEach((menuItemNode) => {
        const customMenuItem: CustomMenuItem = {
          label: menuItemNode.props?.label ?? '',
          mountIcon(el) {
            teleportDestinationMap.value.set(el, {
              to: el,
              children: menuItemNode.children.labelIcon,
            })
          },
          unmountIcon: (el) => {
            if (el) {
              teleportDestinationMap.value.delete(el)
            }
          },
        }

        if (menuItemNode.props?.href) {
          customMenuItem.href = menuItemNode.props.href
        }

        if (menuItemNode.props?.onClick) {
          customMenuItem.onClick = menuItemNode.props.onClick
        }

        customMenuItems.push(customMenuItem)
      })
    })

    // eslint-disable-next-line no-console
    console.log('customMenuItems', customMenuItems)

    return customMenuItems
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
    ...Array.from(teleportDestinationMap.value.values()).map((item) => {
      return h(Teleport, { to: item.to }, item.children())
    }) ?? [],
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

export const UserButton = Object.assign(UserButtonRoot, { MenuItems: UserButtonMenuItems, Link: UserButtonLink, Action: UserButtonAction })
