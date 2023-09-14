import {Link} from 'react-router-dom'
import {useRef, useState, useEffect} from 'react'
import customerimg from '../../images/customerService.png'

export function WriteBoard() {
  // private Integer id;
  // private String username;
  // private String title;
  // private String content;
  // private LocalDate date;
  // private LocalTime time;
  // private Integer viewcnt;

  const titleRef = useRef(null)
  const contentRef = useRef(null)
  const imgRef = useRef(null)

  const saveImgFile = () => {}

  const registerBtnClick = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/public/board/insertBoard`)
      .then(response => response.data)
      .catch(err => err.message)
  }

  return (
    <div className="pt-[120px] w-full h-full">
      <div className="relative flex items-center justify-center w-full">
        <img src={customerimg} alt="" className="object-cover w-full" />
        <p className="absolute text-3xl font-bold text-black font-poppins">문의 게시판</p>
      </div>
      <div className="w-full mt-10 text-2xl text-center font-poppins text-bold">게시글 등록</div>

      <div className="flex flex-col items-center p-8 mt-4">
        <div className="flex items-center justify-center w-full mt-8 border-y-2">
          <div className="mt-4 mb-4 mr-4">제목</div>
          <input
            type="text"
            className="w-2/5 mt-4 mb-4 border-gray-300 input"
            ref={titleRef}
            // defaultValue={location}
          />
        </div>
        <div className="flex flex-col items-center w-full mt-4">
          <div>내용</div>
          <div className="w-4/5 mt-4 border-gray-300 input h-96" contentEditable="true" ref={contentRef}></div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <input type="file" multiple accept="image/*" id="Img" ref={imgRef} onChange={saveImgFile} />
        <div className="mt-4">{/* <img src={} alt="이미지" /> */}</div>
      </div>

      <div className="flex justify-center p-4 m-4">
        <button className="mr-4 text-white btn btn-success" onClick={registerBtnClick}>
          등록하기
        </button>
        <Link to={`/customer`}>
          <button className="btn ">취소</button>
        </Link>
      </div>
    </div>
  )
}
