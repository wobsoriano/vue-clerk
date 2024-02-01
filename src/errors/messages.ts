export const noClerkProviderError = 'You must wrap your application in a <ClerkProvider> component.'

export const multipleClerkProvidersError
  = 'You\'ve added multiple <ClerkProvider> components in your React component tree. Wrap your components in a single <ClerkProvider>.'

export const hocChildrenNotAFunctionError = 'Child of WithClerk must be a function.'

export function multipleChildrenInButtonComponent(name: string) {
  return `You've passed multiple children components to <${name}/>. You can only pass a single child component or text.`
}

export const invalidStateError
  = 'Invalid state. Feel free to submit a bug or reach out to support here: https://clerk.com/support'

export const unsupportedNonBrowserDomainOrProxyUrlFunction
  = 'Unsupported usage of isSatellite, domain or proxyUrl. The usage of isSatellite, domain or proxyUrl as function is not supported in non-browser environments.'

export const userProfilePageRenderedError
  = '<UserProfile.Page /> component needs to be a direct child of `<UserProfile />` or `<UserButton />`.'
export const userProfileLinkRenderedError
  = '<UserProfile.Link /> component needs to be a direct child of `<UserProfile />` or `<UserButton />`.'

export const organizationProfilePageRenderedError
  = '<OrganizationProfile.Page /> component needs to be a direct child of `<OrganizationProfile />` or `<OrganizationSwitcher />`.'
export const organizationProfileLinkRenderedError
  = '<OrganizationProfile.Link /> component needs to be a direct child of `<OrganizationProfile />` or `<OrganizationSwitcher />`.'

export function customPagesIgnoredComponent(componentName: string) {
  return `<${componentName} /> can only accept <${componentName}.Page /> and <${componentName}.Link /> as its children. Any other provided component will be ignored.`
}

export function customPageWrongProps(componentName: string) {
  return `Missing props. <${componentName}.Page /> component requires the following props: url, label, labelIcon, alongside with children to be rendered inside the page.`
}

export function customLinkWrongProps(componentName: string) {
  return `Missing props. <${componentName}.Link /> component requires the following props: url, label and labelIcon.`
}

export const useAuthHasRequiresRoleOrPermission
  = 'Missing parameters. `has` from `useAuth` requires a permission or role key to be passed. Example usage: `has({permission: "org:posts:edit"`'

export function noPathProvidedError(componentName: string) {
  return `The <${componentName}/> component uses path-based routing by default unless a different routing strategy is provided using the \`routing\` prop. When path-based routing is used, you need to provide the path where the component is mounted on by using the \`path\` prop. Example: <${componentName} path={'/my-path'} />`
}

export function incompatibleRoutingWithPathProvidedError(componentName: string) {
  return `The \`path\` prop will only be respected when the Clerk component uses path-based routing. Please update the  <${componentName}/> component and either drop the \`path\` prop or update the routing strategy using the \`routing\` prop. For more details please refer to our docs: https://clerk.com/docs`
}
