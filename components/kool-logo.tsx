import Image from "next/image"

export function KoolLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <Image
        src="/kool-logo-v2.svg"
        alt="kool events"
        width={120}
        height={60}
        style={{ height: "1em", width: "auto" }}
        priority
      />
    </span>
  )
}
