import defaultSettings from '@/settings'

const title = defaultSettings.title || '全国疫情可视化平台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
