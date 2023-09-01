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
  }, [slug])

  return (
    <Accordion defaultIndex={defaultIndex} w='full'>
      {items.map((item) => {
        return item.type === 'accordion' ? (
          <AccordionItem key={uuid()}>
            <AccordionButton w='full'>
              <Box as='span' flex='1' textAlign='left' fontWeight='bold'>
                {item.label}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pt={0} pr={0} pb={4} pl={4}>
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
  onClose: () => void
  items: ContentItem[]
}

const SidebarContent: FC<SidebarContentProps> = (props) => {
  const { onClose, items } = props

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
  const { isOpen, variant = 'drawer', onClose, items } = props

  return variant === 'sidebar' ? (
    <Box p={5} w='full' h='100%' bg='#dfdfdf'>
      <SidebarContent items={items} onClose={onClose} />
    </Box>
  ) : (
    <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent pt={10}>
          <DrawerCloseButton />
          <DrawerBody>
            <SidebarContent items={items} onClose={onClose} />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}
