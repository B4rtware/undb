import { ActionIcon, Center, Group, IconLanguage, Image, Menu, Text, Avatar, IconLogout } from '@undb/ui'
import logo from '../../assets/logo.svg'
import { useTranslation } from 'react-i18next'
import { getMe, logout } from '@undb/store'
import { useDispatch, useSelector } from 'react-redux'

export const Header: React.FC = () => {
  const { i18n, t } = useTranslation()
  const language = i18n.language
  const me = useSelector(getMe)
  const dispatch = useDispatch()

  return (
    <Group
      px="xs"
      h={50}
      py={6}
      sx={(theme) => ({ borderBottom: '1px solid ' + theme.colors.gray[3] })}
      position="apart"
    >
      <Center>
        <Image src={logo} alt="undb" width="20px" height="20px" />
        <Text pl="xs">undb</Text>
      </Center>

      <Center mr="lg">
        <Menu>
          <Menu.Target>
            <ActionIcon>
              <IconLanguage />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item fw={language === 'zh-CN' ? 600 : 'normal'} onClick={() => i18n.changeLanguage('zh-CN')}>
              简体中文
            </Menu.Item>
            <Menu.Item fw={language === 'en' ? 600 : 'normal'} onClick={() => i18n.changeLanguage('en')}>
              English
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
        {me && (
          <Menu width={200}>
            <Menu.Target>
              <Avatar radius="xl" ml="sm" role="button" sx={{ cursor: 'pointer' }}>
                {me.username.slice(0, 2).toUpperCase()}
              </Avatar>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item fw={600}>{me.username}</Menu.Item>
              <Menu.Divider />
              <Menu.Item icon={<IconLogout size={16} />} onClick={() => dispatch(logout())}>
                {t('logout', { ns: 'auth' })}
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )}
      </Center>
    </Group>
  )
}