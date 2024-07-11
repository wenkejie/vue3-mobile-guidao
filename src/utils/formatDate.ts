// plugins/formatDate.ts
import type App from '@/App.vue'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $formatDate: (date: Date | string | number, format: string) => string
  }
}

const formatDatePlugin = {
  install(app: App) {
    app.config.globalProperties.$formatDate = (date: Date | string | number, format: string) => {
      const options: Intl.DateTimeFormatOptions = {}

      if (/yyyy/.test(format))
        options.year = 'numeric'
      if (/MM/.test(format))
        options.month = '2-digit'
      if (/dd/.test(format))
        options.day = '2-digit'
      if (/HH/.test(format))
        options.hour = '2-digit'
      if (/mm/.test(format))
        options.minute = '2-digit'
      if (/ss/.test(format))
        options.second = '2-digit'

      const localeString = new Date(date).toLocaleString('en-US', options)
      const [datePart, timePart] = localeString.split(', ')
      const [month, day, year] = datePart.split('/')
      const [hour, minute, second] = (timePart || '').split(':')

      return format
        .replace('yyyy', year)
        .replace('MM', month)
        .replace('dd', day)
        .replace('HH', hour || '')
        .replace('mm', minute || '')
        .replace('ss', second || '')
    }
  },
}

export default formatDatePlugin
