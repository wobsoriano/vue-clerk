import type { RendererElement, RendererNode, VNode } from 'vue'
import { Teleport, computed, defineComponent, h, ref, watchEffect } from 'vue'
import type { CustomMenuItem, CustomPage, UserButtonProps } from '@clerk/types'
import { useClerk } from '../composables/useClerk'
import { ClerkLoaded } from './controlComponents'

const reorderItemsLabels = ['manageAccount', 'signOut']

const UserButtonRoot = defineComponent((props: UserButtonProps, { slots }) => {
  const clerk = useClerk()
  const el = ref<HTMLDivElement | null>(null)
  const teleportDestinationMap = ref<Map<HTMLDivElement, {
    to: HTMLDivElement
    children: () => VNode | VNode[]
  }>>(new Map())

  const customItemsNodes = slots.default?.() as (VNode & {
    children: {
      default: () => (VNode<RendererNode, RendererElement, {
        label: string
        href?: string
        onClick?: () => void
        open?: string
      }> & {
        children: {
          labelIcon: () => VNode
        }
      })[]
      labelIcon: () => VNode[]
    }
    type: {
      name: string
    }
  })[]

  const customMenuItemsAndPages = computed<{
    menuItems: CustomMenuItem[]
    pages: CustomPage[]
  }>(() => {
    const customMenuItems: CustomMenuItem[] = []
    const customPages: CustomPage[] = []

    customItemsNodes?.forEach((node) => {
      if (node.type.name === 'UserButtonMenuItems') {
        node.children.default().forEach((menuItemNode) => {
          const isReorderItem = reorderItemsLabels.includes(menuItemNode.props!.label)

          if (isReorderItem) {
            customMenuItems.push({
              label: menuItemNode.props!.label,
            })
            return
          }

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
          else if (menuItemNode.props?.onClick) {
            customMenuItem.onClick = menuItemNode.props.onClick
          }
          else if (menuItemNode.props?.open) {
            customMenuItem.open = menuItemNode.props.open
          }

          customMenuItems.push(customMenuItem)
        })
      }
      else if (['UserButtonUserProfilePage', 'UserButtonUserProfileLink'].includes(node.type.name)) {
        const customPage: CustomPage = {
          label: node.props?.label ?? '',
          url: node.props?.url ?? '',
          mountIcon(el) {
            teleportDestinationMap.value.set(el, {
              to: el,
              children: node.children.labelIcon,
            })
          },
          unmountIcon: (el) => {
            if (el) {
              teleportDestinationMap.value.delete(el)
            }
          },
        }

        if (node.type.name === 'UserButtonUserProfilePage') {
          customPage.mount = (el) => {
            teleportDestinationMap.value.set(el, {
              to: el,
              children: node.children.default,
            })
          }
          customPage.unmount = (el) => {
            if (el) {
              teleportDestinationMap.value.delete(el)
            }
          }
        }

        customPages.push(customPage)
      }
    })

    return {
      menuItems: customMenuItems,
      pages: customPages,
    }
  })

  watchEffect((onInvalidate) => {
    if (el.value) {
      clerk.mountUserButton(el.value, {
        ...props,
        customMenuItems: customMenuItemsAndPages.value.menuItems,
        userProfileProps: {
          ...props.userProfileProps,
          customPages: customMenuItemsAndPages.value.pages,
        },
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

// TODO: Fix reorder label types.
type ReorderItemsLabels = 'manageAccount' | 'signOut'
const UserButtonAction = defineComponent(
  <T extends string>(_props: { label: T } & T extends ReorderItemsLabels ? { onClick?: () => void, open?: string } : ({
    onClick: () => void
    open?: string
  } | {
    onClick?: () => void
    open: string
  }), { slots }: { slots: any }) => {
    return () => slots.labelIcon?.()
  },
)

const UserButtonUserProfilePage = defineComponent({
  inheritAttrs: false,
  name: 'UserButtonUserProfilePage',
  props: {
    label: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  setup(_props, { slots }) {
    return () => slots.labelIcon?.()
  },
})

const UserButtonUserProfileLink = defineComponent({
  inheritAttrs: false,
  name: 'UserButtonUserProfileLink',
  props: {
    label: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  setup(_props, { slots }) {
    return () => slots.labelIcon?.()
  },
})

export const UserButton = Object.assign(UserButtonRoot, {
  MenuItems: UserButtonMenuItems,
  Link: UserButtonLink,
  Action: UserButtonAction,
  UserProfilePage: UserButtonUserProfilePage,
  UserProfileLink: UserButtonUserProfileLink,
})
