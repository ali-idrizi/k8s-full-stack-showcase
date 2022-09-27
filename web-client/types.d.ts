declare module '*module.css' {
  const styles: {
    [className: string]: string
  }
  export default styles
}

declare module 'jest-next-dynamic' {
  const preloadAll = async () => Promise<void>
  export default preloadAll
}
