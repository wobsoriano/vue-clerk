import type { Component, RendererElement, RendererNode, VNode } from 'vue'
import { Teleport, computed, defineComponent, h, ref, watchEffect } from 'vue'
import type { CustomPage, OrganizationProfileProps, Without } from '@clerk/types'
import { useClerk } from '../composables/useClerk'
import { ClerkLoaded } from './controlComponents'

const reorderItemsLabels = ['members', 'settings']

const _OrganizationProfile = defineComponent((props: Without<OrganizationProfileProps, 'customPages'>, { slots }) => {
  const clerk = useClerk()
  const el = ref<HTMLDivElement | null>(null)
  const defaultSlotTeleportMap = ref<Map<Component, HTMLDivElement>>(new Map())
  const labelIconSlotTeleportMap = ref<Map<Component, HTMLDivElement>>(new Map())

  const customPagesSlots = slots.default?.() as (VNode<RendererNode, RendererElement, {
    label: string
    url?: string
  }> & {
    children: {
      default?: () => VNode
      labelIcon: () => VNode
    }
  })[]

  const customPageNodes = computed<CustomPage[]>(() => {
    return customPagesSlots?.map((item) => {
      let customPage: CustomPage = {
        label: item.props?.label ?? '',
      }

      const isReorderItem = reorderItemsLabels.includes(item.props!.label)
      const isExternalLink = !item.children?.default && !isReorderItem

      if (!isReorderItem) {
        if (isExternalLink) {
          customPage = {
            ...customPage,
            url: item.props!.url,
            mountIcon(el) {
              labelIconSlotTeleportMap.value.set(item, el)
            },
            unmountIcon: () => { /* cleanup */ },
          }
        }
        else {
          customPage = {
            ...customPage,
            url: item.props!.url,
            mountIcon(el) {
              labelIconSlotTeleportMap.value.set(item, el)
            },
            unmountIcon: () => { /* cleanup */ },
            mount(el) {
              defaultSlotTeleportMap.value.set(item, el)
            },
            unmount: () => { /* cleanup */ },
          }
        }
      }

      return customPage
    }) ?? []
  })

  watchEffect((onInvalidate) => {
    if (el.value) {
      clerk.mountOrganizationProfile(el.value, {
        ...props,
        customPages: customPageNodes.value,
      })
    }

    onInvalidate(() => {
      if (el.value)
        clerk.unmountOrganizationProfile(el.value)
    })
  })

  return () => h(ClerkLoaded, () => [
    h('div', { ref: el }),
    ...customPagesSlots?.map((item) => {
      const defaultElement = defaultSlotTeleportMap.value.get(item)
      const labelIconElement = labelIconSlotTeleportMap.value.get(item)
      return [
        labelIconElement ? h(Teleport, { to: labelIconElement }, item.children?.labelIcon?.()) : null,
        defaultElement && item.children?.default ? h(Teleport, { to: defaultElement }, item.children?.default?.()) : null,
      ]
    }) ?? [],
  ])
})

const OrganizationProfilePage = defineComponent({
  inheritAttrs: false,
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
    return () => [
      slots.default?.(),
      slots.labelIcon?.(),
    ]
  },
})

const OrganizationProfileLink = defineComponent({
  inheritAttrs: false,
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
    return () => slots.default?.()
  },
})

export const OrganizationProfile = Object.assign(_OrganizationProfile, { Page: OrganizationProfilePage, Link: OrganizationProfileLink })
