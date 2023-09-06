export function Div({className, children}) {
  const DivclassName = ['box-sizing', className].join(' ')
  return <div className={DivclassName}>{children}</div>
}
