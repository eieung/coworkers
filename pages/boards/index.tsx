import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Link 컴포넌트 추가
import medal from '@/assets/image/icon/medal.svg'; // medal 아이콘 import
import search from '@/assets/image/icon/search.svg'; // user 아이콘 import
import member from '@/assets/image/icon/member.svg'; // member 아이콘 import
import heart from '@/assets/image/icon/heart.svg'; // heart 아이콘 import 
import arrowRight from '@/assets/image/icon/arrow_right.svg'; // arrow_right.svg import
import Image from 'next/image'; // 이미지 로드를 위한 import

export default function BoardPage() {
  const [postsToShow, setPostsToShow] = useState(3); // 기본적으로 3개의 게시글을 보여줌

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setPostsToShow(3); // large: 3개
      } else if (window.innerWidth >= 768) {
        setPostsToShow(2); // medium: 2개
      } else {
        setPostsToShow(1); // small: 1개
      }
    };

    // 초기 실행 및 화면 크기 변화에 따른 업데이트
    window.addEventListener('resize', handleResize);
    handleResize(); // 처음 로드 시 실행

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const posts = [
    {
      id: 1,  // 게시물 ID 추가
      title: "자유게시판에 질문을 올릴 수 있어요",
      date: "2024.07.25",
      user: "우지은",
      views: "4444+",
    },
    {
      id: 2,
      title: "자유게시판에 질문을 올릴 수 있어요",
      date: "2024.07.26",
      user: "우지은",
      views: "2222+",
    },
    {
      id: 3,
      title: "자유게시판에 질문을 올릴 수 있어요",
      date: "2024.07.27",
      user: "우지은",
      views: "9999+",
    }
  ];

  return (
    <div className="min-h-screen bg-bg-primary text-white">
      <main className="px-4 py-8 max-w-[1200px] mx-auto">
        {/* 자유게시판 제목 및 검색 */}
        <section className="mb-6">
          <h1 className="font-bold-24 mb-4">자유게시판</h1>
          
          {/* 검색창 */}
          <div className="flex items-center bg-bg-secondary p-3 rounded-lg border border-bd-primary">
            <Image src={search} alt="user icon" width={24} height={24} /> {/* 아이콘 추가 */}
            <input
              type="text"
              placeholder="검색어를 입력해주세요"
              className="w-full p-2 ml-2 text-white placeholder:text-text-secondary rounded-[12px] bg-bg-secondary"
            />
          </div>
        </section>

        {/* 베스트 게시글 */}
        <section className="mb-8">
          {/* 베스트 게시글 타이틀과 더보기 버튼을 flex로 배치 */}
          <div className="flex justify-between items-center w-full mb-4 sm:mb-6 md:mb-10 lg:mb-14">
            <h2 className="font-bold-20">베스트 게시글</h2>
            <a href="#" className="text-text-secondary flex items-center gap-1">
              더보기
              <Image src={arrowRight} alt="arrow right" width={16} height={16} />
            </a>
          </div>

          {/* 베스트 게시글 묶음 처리 및 레이아웃 배치 방식 조정 */}
          <div className="flex justify-between items-center align-self-stretch gap-6 w-full">
            {posts.map((post, index) => {
              const isHidden = index >= postsToShow ? 'hidden' : '';
              const cardClasses = `flex-col justify-between items-center w-full p-[12px_16px] bg-bg-secondary rounded-lg border border-[1px] border-[var(--Background-Tertiary,#334155)] ${isHidden}`;

              return (
                <div key={post.id} className={cardClasses}>
                  <Link href={`/board/${post.id}`}> {/* 게시물 클릭 시 동적 라우트로 이동 */}
                    <a>
                      <div className="flex items-center gap-1.5">
                        <Image src={medal} alt="medal" width={16} height={16} />
                        <span className="text-white font-medium-16">Best</span>
                      </div>
                      <div className="flex flex-col mt-3.5">
                        <h3 className="font-medium-18">{post.title}</h3>
                        <p className="text-text-secondary mt-3">{post.date}</p>
                      </div>
                      <div className="flex items-center gap-3 mt-9"> {/* flex와 간격 추가 */}
                        <Image src={member} alt="member" width={32} height={32} />
                        <span className="text-text-secondary">{post.user}</span> {/* 12px 간격 */}
                        <div className="ml-auto flex items-center gap-1"> {/* Heart와 Views를 하나로 묶음 */}
                          <Image src={heart} alt="heart" width={16} height={16} />
                          <span className="text-text-secondary">{post.views}</span> {/* 4px 간격 */}
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* 일반 게시글 */}
        <section>
          <h2 className="font-bold-20 mb-4">게시글</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="bg-bg-secondary p-4 rounded-lg flex flex-col justify-between">
                <div className="flex justify-between">
                  <h3 className="font-medium-18">자유게시판에 질문을 올릴 수 있어요</h3>
                  <button className="text-text-secondary">⋮</button>
                </div>
                <div className="flex items-center gap-3 mt-4"> {/* flex와 간격 추가 */}
                  <Image src={member} alt="member" width={32} height={32} />
                  <span className="text-text-secondary">유저명</span> 
                  <div className="ml-auto flex items-center gap-1"> {/* Heart와 Views를 하나로 묶음 */}
                    <Image src={heart} alt="heart" width={16} height={16} />
                    <span className="text-text-secondary">9999+</span> 
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <button className="fixed bottom-8 right-8 bg-emerald-500 text-white p-4 rounded-full shadow-lg">
        글쓰기
      </button>
    </div>
  );
}
