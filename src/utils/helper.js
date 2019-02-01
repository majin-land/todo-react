export const appRoot = document.getElementById('app-root')
export const modalRoot = document.getElementById('modal-root')

export const fillRange = (start, end) => {
  return Array((end - start) + 1).fill().map((item, index) => start + index)
}

export const inRange = (num, start, end) => {
  return (start < num) && (num < end)
}
