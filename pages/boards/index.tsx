import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { board } from '@/types/group';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import medal from '@/assets/image/icon/medal.svg';
import search from '@/assets/image/icon/search.svg';
import member from '@/assets/image/icon/member.svg';
import heart from '@/assets/image/icon/heart.svg';
import image from '@/assets/image/icon/image.png';
import arrowRight from '@/assets/image/icon/arrow_right.svg';

interface Post {
  content: string;
  id: number;
  title: string;
  date: string | null;
  user: string | null; 
  views: string | null;
  image?: string | StaticImageData;
}

const PostCard: React.FC<{
  url: string | { pathname: string; query: Record<string, string> }; 
  editUrl: string;
  title: string;
  user: string;
  views: string;
  date: string;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  id: number;
  handleDelete: (id: number) => void;
  handleEdit: (id: number) => void;  // 여기에 추가
  isDropdownOpen: boolean;
  toggleDropdown: (id: number) => void;
  currentUser: string;
}> = ({ url, title, user, views, date, setPosts, id, handleDelete, handleEdit, isDropdownOpen, toggleDropdown, currentUser }) => {
 
  const router = useRouter();
 /* const handleEdit = (postId: number) => {
    if (user !== currentUser) {
      alert("본인의 게시물만 수정할 수 있습니다.");
      return; 
    }
      router.push(editUrl);    
  };*/

  const handleDeleteClick = (id: number) => {
    if (user !== currentUser) {
      alert("본인의 게시물만 수정할 수 있습니다.");
      return; 
    }else{    
    handleDelete(id);     
  }   
  };

  const handleEditClick = (id: number) => {
    if (user !== currentUser) {
      alert("본인의 게시물만 삭제할 수 있습니다.");
      return; 
    } else {    
      handleEdit(id);  // user를 전달
    }   
  };

  return (
    <div className="bg-bg-secondary p-4 rounded-lg flex flex-col justify-between relative">
      <div className="flex justify-between">
        <Link href={url}>
          <h3 className="font-medium-18">{title}</h3>
        </Link>
        <button className="text-text-secondary" onClick={() => toggleDropdown(id)}>⋮</button>
        {isDropdownOpen && (
          <ul className="absolute right-0 z-20 mt-2 overflow-hidden rounded-xl border border-bd-primary bg-bg-secondary text-white">
            <li className="w-[135px] cursor-pointer bg-bg-secondary hover:bg-gray-600">
              <span className="flex-center flex py-3 cursor-pointer" onClick={() => handleEditClick(id)}>
                수정하기
              </span>          
            </li>
            <li className="w-[135px] cursor-pointer bg-bg-secondary hover:bg-gray-600">
              <span className="flex-center flex py-3 cursor-pointer" onClick={() => handleDeleteClick(id)}>
                삭제하기
              </span>
            </li>
          </ul>
        )}
      </div>     
      <div className="flex items-center gap-3 mt-4">
        <Image src={member} alt="member" width={32} height={32} />
        <span className="text-text-secondary">{user} <span style={{color: '#334155', opacity: 1, padding: '0 4px'}}>|</span> {date}</span>
        <div className="ml-auto flex items-center gap-1">
          <Image src={heart} alt="heart" width={16} height={16} />
          <span className="text-text-secondary">{views}</span>
        </div>
      </div>
    </div>
  );
};

export default function BoardPage() {
const [titles, setTitle] = useState(board ? board.title : ''); 
const [dates, setDate] = useState(board ? board.date : ''); 
const [users, setUser] = useState(board ? board.user : ''); 
const [viewss, setViews] = useState(board ? board.views : ''); 
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState({ id: null, title: '', content: '', user: '' });
  const [bestPosts, setBestPosts] = useState<Post[]>([]);

  
  const [originalPosts, setOriginalPosts] = useState<Post[]>([
    {
      id: 1,
      title: titles,
      date: dates,
      user: users,
      views: viewss,
      image: "",
      content: "",
    },
    {
      id: 2,
      title: titles,
      date: dates,
      user: users,
      views: viewss,
      image: "",
      content: "",
    },
    {
      id: 3,
      title: titles,
      date: dates,
      user: users,
      views: viewss,
      image: image,
      content: "",
    },
    {
      id: 4,
      title: titles,
      date: dates,
      user: users,
      views: viewss,
      image: "",
      content: "",
    },
  ]);
  
  const [sortOrder, setSortOrder] = useState<'최신순' | '좋아요높은순'>('최신순');
  const router = useRouter();
  const currentUser = "우지은"; 

  /*useEffect(() => {
    setPosts(originalPosts);
    setBestPosts(originalPosts.slice(0, 3));
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [originalPosts]);

  useEffect(() => {
    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(originalPosts); // Assuming originalPosts is defined
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    // 페이지가 로드될 때 localStorage에서 게시글을 불러온다.
    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(originalPosts); // 저장된 게시글이 없으면 originalPosts로 초기화
    }
  }, []);

  useEffect(() => {
    // 게시글이 변경될 때마다 bestPosts와 localStorage 업데이트
    if (originalPosts.length > 0) {
      setBestPosts(originalPosts.slice(0, 3)); // 가장 최신 3개의 게시글
      setPosts(originalPosts);
      localStorage.setItem('posts', JSON.stringify(originalPosts)); // localStorage 업데이트
    }
  }, [posts]);*/

  /*useEffect(() => {
    // Update best posts and localStorage when posts change
    if (originalPosts.length > 0) {
      setPosts(originalPosts);
      setBestPosts(originalPosts.slice(0, 3)); // Update best posts based on current posts
      localStorage.setItem('posts', JSON.stringify(originalPosts)); // Save current posts to localStorage
    }
  }, [originalPosts]);*/


  const postUrls = [
    "/boards/123",
    "/boards/125",
    "/boards/127", 
    "/boards/129",
  ];

  const postUrls2 = [
    "/boards/edit/123",
    "/boards/edit/125",
    "/boards/edit/127",
    "/boards/edit/129",
  ];

  const [bottomPosition, setBottomPosition] = useState('120px');

  useEffect(() => {
    const handleScroll = () => {
      const newBottom = 120 + 'px'; 
      setBottomPosition(newBottom);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  /*const sortedPosts123 = [...posts].sort((a, b) => {
    if (sortOrder === '최신순') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return parseInt(b.views) - parseInt(a.views);
    }
  });*/


  const handleEdit = (id: number, user: string) => {
    if (user !== currentUser) {
      alert("본인의 게시물만 수정할 수 있습니다.");
      return;
    }else{
      const editUrl123 = postUrls2[id - 1] || '/'; // Fallback to a default URL
      
      router.push(editUrl123); 

  }
  };


  const handleDelete = (id: number, user: string) => {
    if (user !== currentUser) {     
      alert("본인의 게시물만 삭제할 수 있습니다.");
      return;
    }else{
      
      const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
      if (confirmDelete) {
        setPosts((prevPosts) => {
          const updatedPosts = prevPosts.filter((p) => p.id !== id);
          localStorage.setItem('posts', JSON.stringify(updatedPosts)); // 업데이트된 게시글을 로컬 스토리지에 저장
          alert("삭제되었습니다.");
          return updatedPosts;
        });      
  };
};
  }

  const handleClick = () => {
    router.push('/boards/addboard');
  };

  const [dropdownState, setDropdownState] = useState<number | null>(null); 

  const toggleDropdown = (id: number) => {
    setDropdownState((prev) => (prev === id ? null : id));
  };

  const addPost = (newPost: Post) => {
    // 새로운 게시물의 id가 설정되어야 함
    setNewPost(newPost);
  
    const existingPost = posts.find(post => post.id === newPost.id); // id를 통해 기존 게시물 찾기
    const postTitle = existingPost ? existingPost.title : newPost.title; // 기존 게시물이 있다면 제목을 사용, 없으면 새로운 제목 사용
  
    // postId는 newPost.id를 문자열로 변환
    const postId = newPost.id.toString();
  
    // URL 쿼리 파라미터를 설정
    router.push({
      pathname: `/boards/${postId}`,
      query: {
        id: postId,
        title: newPost.title,
        content: newPost.content,
        user: newPost.user,
        views: newPost.views.toString(),
        date: newPost.date,
      },
    });
  
    setPosts((prevPosts) => {
      // 중복 체크
      const exists = prevPosts.some(post => post.id === newPost.id);
      if (exists) {
        alert("이미 같은 ID의 게시물이 존재합니다.");
        return prevPosts; // 중복이 있으면 이전 상태를 그대로 반환
      } else {
        const updatedPosts = [...prevPosts, newPost];
        localStorage.setItem('posts', JSON.stringify(updatedPosts)); // Update localStorage
        return updatedPosts;
      }
    });
  };  

  const sortedPosts = [
    ...originalPosts, // 기존 게시글 4개
    ...posts.filter(post => !originalPosts.some(original => original.id === post.id)) // 추가된 게시글
  ].sort((a, b) => {
    if (sortOrder === '최신순') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return parseInt(b.views) - parseInt(a.views);
    }
  });

useEffect(() => {
  // 페이지가 로드될 때 localStorage에서 게시글을 불러온다.
  const savedPosts = localStorage.getItem('posts');
  if (savedPosts) {
    setBestPosts(originalPosts.slice(0, 4)); 
    setPosts(JSON.parse(savedPosts));
    //localStorage.removeItem('posts');
    //setPosts([]); 
    //setPosts(originalPosts);
    //localStorage.setItem('posts', JSON.stringify(originalPosts)); // localStorage 업데이트
  } else {    
    setBestPosts(originalPosts.slice(0, 4)); // 가장 최신 3개의 게시글
    setPosts(originalPosts);
    //setPosts(JSON.parse(savedPosts));
    //localStorage.setItem('posts', JSON.stringify(originalPosts)); // localStorage 업데이트
  }
}, []);

useEffect(() => {
  // 쿼리 파라미터에서 게시글 추가
  const { title, views, date, id, content } = router.query;

  if (title && views && date && id && content) {
    const newPost: Post = {
      id: parseInt(id as string),
      title: title as string,
      user: currentUser,
      views: views as string,
      date: new Date(date as string).toLocaleDateString(),
      content: content as string,
    };

    addPost(newPost); 

    // URL 쿼리 파라미터를 클리어
    router.replace(router.pathname, undefined, { shallow: true });
  }

  // 게시글 데이터 로드 처리
  if (id) {
    const postId = parseInt(id as string);
    const postData = posts.find(post => post.id === postId);
    if (postData) {
      // 게시글 데이터를 설정하는 로직
      console.log(postData); // 예: postData를 상태에 저장하거나 표시
    } else {
      // 게시글이 없을 때의 처리 (예: 404 페이지로 이동)
      console.error('게시글이 없습니다.');
    }
  }
}, [router.query, posts]);


  return (
    <div className="relative min-h-screen bg-bg-primary text-white">
      <main className="px-4 py-8 max-w-[1200px] mx-auto">
        <section className="mb-6">
          <h1 className="font-bold-24 mb-4">자유게시판</h1>
          <div className="flex items-center bg-bg-secondary p-3 rounded-lg border border-bd-primary">
            <Image src={search} alt="search icon" width={24} height={24} />
            <input
              type="text"
              placeholder="검색어를 입력해주세요"
              className="w-full p-2 ml-2 text-white placeholder:text-text-secondary rounded-[12px] bg-bg-secondary"
            />
          </div>
        </section>

        <section className="mb-8">
          <div className="flex justify-between items-center w-full mb-4 sm:mb-6 md:mb-10 lg:mb-14">
            <h2 className="font-bold-20">베스트 게시글</h2>
            <a href="#" className="text-text-secondary flex items-center gap-1">
              더보기
              <Image src={arrowRight} alt="arrow right" width={16} height={16} />
            </a>
          </div>
          <div className="container">
            <div className="flex justify-between items-center align-self-stretch gap-6 w-full kkk">
              {bestPosts.map((post) => (
                <div key={post.id} className="flex-col justify-between items-center w-full p-[12px_16px] bg-bg-secondary rounded-lg border border-[1px] border-[var(--Background-Tertiary,#334155)]">
                  <Link href={`/boards/${post.id}`}>
                    <div className="flex items-center gap-1.5">
                      <Image src={medal} alt="medal" width={16} height={16} />
                      <span className="text-white font-medium-16">Best</span>
                    </div>
                    <div className="flex flex-col mt-3.5">
                    <div className="flex items-center">
                      <h3 className="font-medium-18">{post.title}</h3> 
                      &nbsp; {post.image && ( // 이미지가 있을 때만 렌더링
                  <Image src={post.image} alt="image" width={32} height={32} />
                )}
                      </div>                   
                      <p className="text-text-secondary mt-3">{post.date}</p>
                    </div>
                    <div className="flex items-center mt-4 text-text-secondary">
                      <Image src={member} alt="member" width={16} height={16} />
                      <span className="ml-1">{post.user}</span>
                      <span className="ml-2">{post.views}</span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold-20 mb-4">게시글</h2>          
            <select
              id="sortOrder"
              className="bg-bg-secondary text-white border border-bd-primary rounded-lg p-2"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as '최신순' | '좋아요높은순')}
            >
              <option value="최신순">최신순</option>
              <option value="좋아요높은순">좋아요높은순</option>
            </select>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sortedPosts.map((post) => {
  const postId = post.id.toString();
  const url = postUrls[post.id - 1] || {
    pathname: `/boards/${postId}`,
    query: {
      id: postId,
      title: post.title,
      content: post.content,
      user: post.user,
      views: post.views,
      date: post.date,
    },
  };
    //const url = postUrls[post.id - 1] || `/boards/${post.id}`; // postUrls가 없으면 ID 기반 URL로 설정
    const editUrl = postUrls2[post.id - 1] || '/'; // Fallback to a default URL
    
    // 새로운 게시물의 제목을 사용하는 조건
    //const title = post.title;

    return (
      <PostCard
        key={post.id}
        url={url}
        editUrl={editUrl}
        title={post.title}
        user={post.user}
        views={post.views}
        date={post.date}
        content={post.content}
        setPosts={setPosts}
        id={post.id}
        handleDelete={handleDelete}
        handleEdit={handleEdit} // 여기에서 handleEdit을 전달
        isDropdownOpen={dropdownState === post.id}
        toggleDropdown={toggleDropdown}
        currentUser={currentUser}
      />
    );
  })}
</div>
        </section>

        <div className="w-full flex justify-end relative">            
          <button
            style={{ bottom: bottomPosition, width: '120px' }}
            className="button bg-emerald-500 text-white p-4 rounded-full shadow-lg z-20"
            onClick={handleClick}>
              + 글쓰기
          </button>
        </div>
      </main> 
    </div>
  );
}
