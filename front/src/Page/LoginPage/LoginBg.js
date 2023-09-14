import loginbg from '../../images/loginbg.png'

export default function LoginBg({p1, p2, p3, p4, textclassName}) {
  return (
    <div className={`relative w-1/3 h-full font-poppins ${textclassName}`}>
      <img src={loginbg} className="w-full h-full" />
      <div className="absolute w-full p-10 text-6xl font-bold text-white top-4">
        {p1} <br />
        {p2} <br /> {p3}
        <p className="pt-10 text-2xl font-bold text-white ">{p4}</p>
      </div>
    </div>
  )
}
