import { ContentItem, Sidebar, SidebarVariant } from '@/components/sidebar'
import { HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  Grid,
  GridItem,
  IconButton,
  Stack,
  useBreakpointValue
} from '@chakra-ui/react'
import { FC, ReactNode, useCallback, useState } from 'react'

type SidebarLayoutProps = {
  sidebarItems: ContentItem[]
  children?: ReactNode
}

const SidebarLayout: FC<SidebarLayoutProps> = ({ sidebarItems, children }) => {
  const variant = useBreakpointValue({
    base: SidebarVariant.drawer,
    md: SidebarVariant.sidebar
  })
  const sidebarWidth = useBreakpointValue({ base: '0px', md: '200px' })
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const onHamburgerClick = useCallback(() => {
    setIsSidebarOpen(true)
  }, [])

  const onSidebarClose = useCallback(() => {
    setIsSidebarOpen(false)
  }, [])

  return (
    <>
      <Grid minH='100vh' templateColumns={`${sidebarWidth} 1fr`}>
        <GridItem>
          <Sidebar
            items={sidebarItems}
            variant={variant}
            isOpen={isSidebarOpen}
            onClose={onSidebarClose}
          />
        </GridItem>
        <GridItem>
          <Stack h='full'>
            <header>
              {variant === SidebarVariant.drawer && (
                <IconButton
                  onClick={onHamburgerClick}
                  aria-label='Open Index'
                  icon={<HamburgerIcon />}
                />
              )}
            </header>
            <Box flexGrow='1' maxW={`calc(100vw - ${sidebarWidth})`} p={5}>
              <main>{children}</main>
            </Box>
            <footer></footer>
          </Stack>
        </GridItem>
      </Grid>
    </>
  )
}

export default SidebarLayout
