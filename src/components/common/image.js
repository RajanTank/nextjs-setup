import React from 'react'
import Image from 'next/image'

const ImageComponent = ({
  src,
  alt,
  height,
  width,
  style,
  className
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      height={height}
      width={width}
      // style={style}
      // layout={'fill'}
      className={className}
    />
  )
}
export default ImageComponent