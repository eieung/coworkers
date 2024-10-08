import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import medal from '@/assets/image/icon/medal.svg';
import search from '@/assets/image/icon/search.svg';
import member from '@/assets/image/icon/member.svg';
import heart from '@/assets/image/icon/heart.svg';
import image from '@/assets/image/icon/image.png';
import arrowRight from '@/assets/image/icon/arrow_right.svg';

interface Post {
  id: number;
  title: string;
  date: string;
  user: string;
  views: string;
  image?: string | StaticImageData;
}

const PostCard: React.FC<{
  url: string;
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
        <span className="text-text-secondary">{user} | {date}</span>
        <div className="ml-auto flex items-center gap-1">
          <Image src={heart} alt="heart" width={16} height={16} />
          <span className="text-text-secondary">{views}</span>
        </div>
      </div>
    </div>
  );
};

export default function BoardPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [bestPosts, setBestPosts] = useState<Post[]>([]);
  const [originalPosts] = useState<Post[]>([
    {
      id: 1,
      title: "자유게시판에 질문을 올릴 수 있어요",
      date: "2024.07.25",
      user: "우지은",
      views: "3333+",
      image: "",
    },
    {
      id: 2,
      title: "자유게시판에 질문을 올릴 수 있어요",
      date: "2024.07.26",
      user: "우지은",
      views: "5555+",
      image: "",
    },
    {
      id: 3,
      title: "자유게시판에 질문을 올릴 수 있어요",
      date: "2024.07.28",
      user: "우지은",
      views: "7777+",
      image: image,
    },
    {
      id: 4,
      title: "자유게시판에 질문을 올릴 수 있어요",
      date: "2024.07.27",
      user: "우지은",
      views: "9999+",
      image: "",
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

  const sortedPosts123 = [...posts].sort((a, b) => {
    if (sortOrder === '최신순') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return parseInt(b.views) - parseInt(a.views);
    }
  });


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

  /*const addPost = (newPost: Post) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };*/

  const addPost = (newPost: Post) => {
    setPosts((prevPosts) => {
        const updatedPosts = [...prevPosts, newPost];
        localStorage.setItem('posts', JSON.stringify(updatedPosts)); // Update localStorage
        return updatedPosts;
    });
};

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortOrder === '최신순') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return parseInt(b.views) - parseInt(a.views);
    }
  });

  // Handle new post addition

  /*useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (url === '/boards') {
        const newPost = localStorage.getItem('newPost');
        if (newPost) {
          const parsedPost = JSON.parse(newPost);
          setPosts((prevPosts) => [...prevPosts, parsedPost]);
          localStorage.removeItem('newPost'); // clear the stored post
        }
      }
    };
  
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (url.startsWith('/boards?')) {
        const queryParams = new URLSearchParams(url.split('?')[1]);
        const newPost: Post = {
          id: parseInt(queryParams.get('id') || '0'),
          title: queryParams.get('title') || '',
          date: queryParams.get('date') || new Date().toISOString(),
          user: queryParams.get('user') || '',
          views: queryParams.get('views') || '0',
        };
        setPosts((prevPosts) => [...prevPosts, newPost]);
      }
    };
  
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);


  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (url.startsWith('/boards?')) {
        const queryParams = new URLSearchParams(url.split('?')[1]);
        const newPost: Post = {
          id: parseInt(queryParams.get('id') || '0'),
          title: queryParams.get('title') || '',
          date: queryParams.get('date') || new Date().toISOString(),
          user: queryParams.get('user') || '',
          views: queryParams.get('views') || '0',
        };
        setPosts((prevPosts) => {
          const updatedPosts = [...prevPosts, newPost];
          localStorage.setItem('posts', JSON.stringify(updatedPosts)); // Update localStorage
          return updatedPosts;
        });
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);


  useEffect(() => {
    const handleRouteChange = (url: string) => {
        if (url === '/boards') {
            const newPostString = localStorage.getItem('newPost'); // Or however you're storing the new post
            if (newPostString) {
                const newPost: Post = JSON.parse(newPostString);
                addPost(newPost); // Use the addPost function here
                //localStorage.removeItem('newPost'); // Clear the stored post after adding
            }
        }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
    };
}, [router.events]);*/

useEffect(() => {
  // 페이지가 로드될 때 localStorage에서 게시글을 불러온다.
  const savedPosts = localStorage.getItem('posts');
  if (savedPosts) {
    setBestPosts(originalPosts.slice(0, 3)); 
    setPosts(JSON.parse(savedPosts));
    //localStorage.setItem('posts', JSON.stringify(originalPosts)); // localStorage 업데이트
  } else {    
    setBestPosts(originalPosts.slice(0, 3)); // 가장 최신 3개의 게시글
    setPosts(originalPosts);
    //setPosts(JSON.parse(savedPosts));
    //localStorage.setItem('posts', JSON.stringify(originalPosts)); // localStorage 업데이트
  }
}, []);

/*useEffect(() => {
  // 게시글이 변경될 때마다 bestPosts와 localStorage 업데이트
  if (originalPosts.length > 0) {
    setBestPosts(originalPosts.slice(0, 3)); // 가장 최신 3개의 게시글
    setPosts(originalPosts);
    localStorage.setItem('posts', JSON.stringify(originalPosts)); // localStorage 업데이트
  }
}, [posts]);*/

useEffect(() => {
  // 쿼리 파라미터에서 게시글 추가
  const { title, user, views, date, id, content } = router.query;

  if (title && user && views && date && id && content) {
    const newPost: Post = {
      id: parseInt(id as string),
      title: title as string,
      user: user as string,
      views: views as string,
      date: new Date(date as string).toLocaleDateString(), // 날짜 포맷
    };

    setPosts((prevPosts) => {
      const updatedPosts = [...prevPosts, newPost];
      localStorage.setItem('posts', JSON.stringify(updatedPosts)); // localStorage 업데이트
      return updatedPosts;
    });

    // URL 쿼리 파라미터를 클리어
    router.replace(router.pathname, undefined, { shallow: true });
  }
}, [router.query]);



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
            <div className="flex justify-between items-center align-self-stretch gap-6 w-full">
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
          { sortedPosts.map((post) => {
            const url = postUrls[post.id - 1] || `/boards/${post.id}`; // postUrls가 없으면 ID 기반 URL로 설정
            const editUrl = postUrls2[post.id - 1] || '/'; // Fallback to a default URL
        return (
          <PostCard
          key={post.id}
          url={url}
          editUrl={editUrl}
          title={post.title}
          user={post.user}
          views={post.views}
          date={post.date}
          setPosts={setPosts}
          id={post.id}
          handleDelete={handleDelete}
          handleEdit={handleEdit}  // 여기에서 handleEdit을 전달
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
