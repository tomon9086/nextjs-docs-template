import { ContentItem } from '@/components/sidebar'

export const docsToSidebarItems = (docs: string[]): ContentItem[] => {
  const f = (
    fullPath: string,
    path: string,
    items: ContentItem[]
  ): ContentItem[] => {
    const [p, ...others] = path.split('/')
    const item = items.find((i) => i.label === p)
    const nextItem: ContentItem = others.length
      ? {
          type: 'accordion',
          label: p,
          children: f(
            fullPath,
            others.join('/'),
            item?.type === 'accordion' ? item.children : []
          )
        }
      : {
          type: 'link',
          label: p,
          href: '/' + fullPath
        }

    if (item) {
      return [...items.filter((i) => i.label !== p), nextItem]
    } else {
      return [...items, nextItem]
    }
  }

  return docs.reduce<ContentItem[]>((p, c) => {
    return f(c, c, p)
  }, [])
}
