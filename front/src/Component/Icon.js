export const Icon = ({name, className, style}) => {
  const iconClassName = ['material-icons', className].join(' ')
  return (
    <span className={iconClassName} style={style}>
      {name}
    </span>
  )
}
