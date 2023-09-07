// Nav 바
import {Link} from 'react-router-dom'

export function Nav() {
  return (
    <nav className="w-full h-[120px] fixed z-50 flex justify-between items-center">
      <div className="w-1/4">
        <Link to="/">
          <p>logo</p>
        </Link>
      </div>
      <div className="flex items-center justify-center w-2/4 text-xl text-white">
        <Link to="/static">
          <p className="h-full font-semibold text-center align-middle mr-14 font-poppins">통계</p>
        </Link>
        <Link to="/inquiry">
          <p className="h-full font-semibold text-center align-middle mr-14 font-poppins">
            자료 조회
          </p>
        </Link>
        <Link to="/guide">
          <p className="h-full font-semibold text-center align-middle mr-14 font-poppins">
            Guide & Tip
          </p>
        </Link>
        <Link to="/customer">
          <p className="h-full font-semibold text-center align-middle mr-14 font-poppins">
            고객센터
          </p>
        </Link>
      </div>
      <div className="flex items-center justify-center w-1/4 text-white">
        <Link to="/login">
          <p className="h-full mr-8 text-lg text-center align-middle font-Inconsolata ">SIGN IN</p>
        </Link>
        <Link to="/signup">
          <p className="h-full text-lg text-center align-middle font-Inconsolata">SIGN UP</p>
        </Link>
      </div>
    </nav>
  )
}
