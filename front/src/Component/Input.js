import {forwardRef} from 'react'

export const Input = ({type, className, placeholder, name, id, onChange}) => {
  const inputClassName = ['input', 'w-2/3', 'border', 'bg-gray-50', 'border-gray-300', className].join(' ')
  return (
    <input type={type} id={id} name={name} placeholder={placeholder} className={inputClassName} onChange={onChange} />
  )
}

export const LoginInput = forwardRef(({type, placeholder, className, onChange}, ref) => {
  const LoginInputClassName = ['input', 'w-2/3', 'border', 'bg-gray-50', 'border-gray-300', className].join(' ')

  // const LoginInputClassName =
  //   'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ' +
  //   className
  return (
    <div>
      <input
        ref={ref}
        type={type}
        name={type}
        id={type}
        className={LoginInputClassName}
        placeholder={placeholder}
        required=""
        onChange={onChange}
      />
    </div>
  )
})
