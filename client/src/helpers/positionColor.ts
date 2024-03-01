export const positionColor = (position: number): string => {
  if (position === 1) {
    return 'gold'
  }
  if (position === 2) {
    return 'silver'
  }
  if (position === 3) {
    return 'bronze'
  }
  return ''
}