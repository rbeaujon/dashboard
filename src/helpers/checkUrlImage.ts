export const checkUrlImage = (url: string) => {
 
  return (

    url.match(/\.(webp|jpg|jpeg|png|gif|bmp|tiff|tif|svg|ico|eps|raw|pdf)$/) != null)
  }