export function formatDate(timestamp: number): string {
  const formattedDate = new Date(timestamp).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
  return `${formattedDate}`
}
export function formatTime(timestamp: number): string {
  const dayOfWeek = new Date(timestamp).toLocaleString('en-US', {
    weekday: 'short',
  })

  const formattedTime = new Date(timestamp).toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  })

  return `${dayOfWeek} ${formattedTime}`
}
