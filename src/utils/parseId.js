export const parseId = url => {
  const myregexp = /\/(\d+)\//
  // var my_other_regexp = /\/(\d+)(?:\/|$)/;
  const match = myregexp.exec(url)
  if (match != null) {
    const result = match[1]
    return result
  }
}
