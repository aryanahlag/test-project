export default (context, inject) => {
  const utils = {
    convertDate(stringDate) {
      const date = new Date(stringDate)
      const y = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
      const m = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date)
      const d = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
      const day = new Intl.DateTimeFormat('ko-KR', { weekday: 'short' }).format(
        date
      )
      return `${y}-${m}-${d} (${day})`
    },
    image(id) {
      return (
        context.app.context.app.$axios.defaults.baseURL + 'filestores/' + id
      )
    },
    limitParagraph(value, limit) {
      if (value.length > limit) return value.substr(0, limit) + '...'
      return value
    },
  }
  inject('utils', utils)
  context.$utils = utils
}
