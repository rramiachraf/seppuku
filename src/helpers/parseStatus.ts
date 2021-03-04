export const parseStatus = (status: string) => {
  switch (status) {
    case 'currently_airing':
      return 'Currently airing'
    case 'finished_airing':
      return 'Finished airing'
    default:
      return ''
  }
}
