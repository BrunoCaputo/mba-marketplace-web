interface TitleLabelProps {
  title: string
  subtitle: string
}

export function TitleLabel({ title, subtitle }: TitleLabelProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <h3 className="font-ff-dm-sans text-title-md text-gray-500">{title}</h3>
      <p className="text-body-sm text-gray-300">{subtitle}</p>
    </div>
  )
}
