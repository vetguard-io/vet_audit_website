import Image from 'next/image'

interface LogoProps {
  layout?: 'horizontal' | 'vertical'
  className?: string
  height?: number
}

export default function Logo({
  layout = 'horizontal',
  className = '',
  height,
}: LogoProps) {
  const logoHeight = height ?? (layout === 'vertical' ? 120 : 44)
  const logoWidth = Math.round(logoHeight * (541 / 331))

  const logoImage = (
    <Image
      src="/images/vet-guard-logo-transparent.png"
      alt="VetGuard.io"
      width={logoWidth}
      height={logoHeight}
      className="h-auto w-auto flex-shrink-0"
      style={{ height: logoHeight, width: 'auto' }}
      priority
    />
  )

  if (layout === 'vertical') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        {logoImage}
      </div>
    )
  }

  return (
    <div className={`flex items-center ${className}`}>
      {logoImage}
    </div>
  )
}
