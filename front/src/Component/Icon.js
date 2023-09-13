export const Icon = ({name, className, style, onClick}) => {
  const iconClassName = ['material-icons', className].join(' ')
  return (
    <span className={iconClassName} style={style} onClick={onClick}>
      {name}
    </span>
  )
}
