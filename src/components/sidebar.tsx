import { uuid } from '@/util/uuid'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  VStack
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { FC, useMemo } from 'react'

export const enum SidebarVariant {
  drawer = 'drawer',
  sidebar = 'sidebar'
}

type ContentItemAccordion = {
  type: 'accordion'
  label: string
  // eslint-disable-next-line no-use-before-define
  children: ContentItem[]
}
type ContentItemLink = {
  type: 'link'
  label: string
  href: string
}
export type ContentItem = ContentItemAccordion | ContentItemLink

type ContentListProps = {
  items: ContentItem[]
  depth?: number
}

const ContentList: FC<ContentListProps> = (props) => {
  const { items, depth = 0 } = props
  const router = useRouter()
  const slug = useMemo(() => {
    return router.asPath
      .split('/')
      .filter((p) => !!p)
      .map((p) => decodeURI(p))
  }, [router])
  const defaultIndex = useMemo(() => {
    return items.map((i) => i.label).indexOf(slug[depth])
  }, [depth, items, slug])

  return (
    <Accordion defaultIndex={defaultIndex} w='full'>
      {items.map((item) => {
        return item.type === 'accordion' ? (
          <AccordionItem key={uuid()}>
            <AccordionButton w='full'>
              <Box as='span' flex='1' fontWeight='bold' textAlign='left'>
                {item.label}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4} pl={4} pr={0} pt={0}>
              <ContentList depth={depth + 1} items={item.children} />
            </AccordionPanel>
          </AccordionItem>
        ) : (
          <Box key={uuid()} p={2}>
            <NextLink href={item.href}>{item.label}</NextLink>
          </Box>
        )
      })}
    </Accordion>
  )
}

type SidebarContentProps = {
  items: ContentItem[]
}

const SidebarContent: FC<SidebarContentProps> = (props) => {
  const { items } = props

  return (
    <VStack>
      <ContentList items={items} />
    </VStack>
  )
}

type SidebarProps = {
  onClose: () => void
  isOpen: boolean
  variant?: SidebarVariant
  items: ContentItem[]
}

export const Sidebar: FC<SidebarProps> = (props) => {
  const { onClose, isOpen, variant = 'drawer', items } = props

  return variant === 'sidebar' ? (
    <Box bg='#dfdfdf' h='100%' p={5} w='full'>
      <SidebarContent items={items} />
    </Box>
  ) : (
    <Drawer isOpen={isOpen} onClose={onClose} placement='left'>
      <DrawerOverlay>
        <DrawerContent pt={10}>
          <DrawerCloseButton />
          <DrawerBody>
            <SidebarContent items={items} />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}
