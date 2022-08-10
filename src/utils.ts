export const statusIdToString = (status: number) => {
  switch (status) {
    case 1:
      return 'Online'
    case 2:
      return 'Offline'
    case 3:
      'Do Not Disturb'
    default:
      return 'Idle'
  }
}
