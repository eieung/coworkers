import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { board } from '@/types/group';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import medal from '@/assets/image/icon/medal.svg';
import search from '@/assets/image/icon/search.svg';
import member from '@/assets/image/icon/member.svg';
import heart from '@/assets/image/icon/heart.svg';
import arrowRight from '@/assets/image/icon/arrow_right.svg';
import {
  useGetArticleList,
  useDeleteArticle,
} from '@/queries/article/useArticleData';
import { format } from 'date-fns';
import { getUser } from '@/utils/auth';
import { toast } from 'react-toastify';
import useModalStore from '@/store/useModalStore';
import ConfirmModal from '@/components/common/modal/ConfirmModal';

interface Post {
  content: string;
  id: number | null;
  title: string;
  date?: string | null;
  user: string | null;
  views?: string | null;
  image?: string | StaticImageData;
  likeCount?: number;
  createdAt?: string;
  writer?: {
    nickname: string;
    id: number;
  };
}

const PostCard: React.FC<{
  url: string | { pathname: string };
  title: string;
  user: string;
  views: string;
  date: string;
  userId: number;
  id: number;
  isDropdownOpen: boolean;
  toggleDropdown: (id: number) => void;
}> = ({
  url,
  title,
  user,
  views,
  date,

  id,
  userId,
  isDropdownOpen,
  toggleDropdown,
}) => {
  const openModal = useModalStore((state) => state.openModal);
  const currentUserData = getUser();
  const router = useRouter();

  const deleteArticle = useDeleteArticle();

  const isMyPost = (currentUserData && currentUserData.id) == userId;

  const handleDeleteClick = async (id: number) => {
    if (!isMyPost) {
      toast.warning('본인의 게시물만 삭제할 수 있습니다.');
      return;
    } else {
      openModal((close) => (
        <ConfirmModal
          title="삭제하시겠어요?"
          close={close}
          confirmText="삭제하기"
          onConfirm={() => {
            deleteArticle.mutate(
              { articleId: Number(id) },
              {
                onSuccess: () => {
                  toast.success('삭제되었습니다');
                },
                onError: (err) => {
                  toast.error('삭제에 실패했습니다');
                  console.error(err);
                },
              },
            );
          }}
          buttonType="danger"
        />
      ));
    }
  };

  const handleEditClick = (id: number) => {
    if (!isMyPost) {
      alert('본인의 게시물만 수정할 수 있습니다.');
      return;
    } else {
    }
  };

  return (
    <div className="relative flex flex-col justify-between rounded-lg bg-bg-secondary p-4">
      <div className="flex justify-between">
        <Link href={url}>
          <h3 className="font-medium-18">{title}</h3>
        </Link>
        {isMyPost && (
          <button
            className="text-text-secondary"
            onClick={() => toggleDropdown(id)}
          >
            ⋮
          </button>
        )}
        {isDropdownOpen && (
          <ul className="absolute right-0 z-20 mt-2 overflow-hidden rounded-xl border border-bd-primary bg-bg-secondary text-white">
            <li className="w-[135px] cursor-pointer bg-bg-secondary hover:bg-gray-600">
              <span
                className="flex-center flex cursor-pointer py-3"
                onClick={() => handleEditClick(id)}
              >
                수정하기
              </span>
            </li>
            <li className="w-[135px] cursor-pointer bg-bg-secondary hover:bg-gray-600">
              <span
                className="flex-center flex cursor-pointer py-3"
                onClick={() => handleDeleteClick(id)}
              >
                삭제하기
              </span>
            </li>
          </ul>
        )}
      </div>
      <div className="mt-4 flex items-center gap-3">
        <Image src={member} alt="member" width={32} height={32} />
        <span className="text-text-secondary">
          {user}{' '}
          <span style={{ color: '#334155', opacity: 1, padding: '0 4px' }}>
            |
          </span>{' '}
          {date}
        </span>
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
  const [originalPosts, setOriginalPosts] = useState<Post[]>([]);
  const [sortOrder, setSortOrder] = useState<'최신순' | '좋아요높은순'>(
    '최신순',
  );
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const { data: articleList } = useGetArticleList();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    if (articleList && articleList.list && articleList.list.length > 0) {
      setOriginalPosts(articleList.list);

      const sortedByLikeCount = [...articleList.list].sort((a, b) => {
        return (
          (b.likeCount ? b.likeCount : 0) - (a.likeCount ? a.likeCount : 0)
        );
      });

      setBestPosts(sortedByLikeCount.slice(0, 3));
    } else {
      setBestPosts([]);
    }
  }, [articleList]);

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

  const handleClick = () => {
    router.push('/boards/addboard');
  };

  const [dropdownState, setDropdownState] = useState<number | null>(null);

  const toggleDropdown = (id: number) => {
    setDropdownState((prev) => (prev === id ? null : id));
  };

  const sortedPosts = [
    ...originalPosts, // 기존 게시글 4개
    ...posts.filter(
      (post) => !originalPosts.some((original) => original.id === post.id),
    ), // 추가된 게시글
  ].sort((a, b) => {
    if (sortOrder === '최신순') {
      return (
        new Date(Number(b.createdAt)).getTime() -
        new Date(Number(a.createdAt)).getTime()
      );
    } else {
      return (
        (b.likeCount ? parseInt(String(b.likeCount)) : 0) -
        (a.likeCount ? parseInt(String(a.likeCount)) : 0)
      );
    }
  });

  const filteredAndSortedePost = sortedPosts.filter((post) =>
    post.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
  );

  return (
    <div className="relative min-h-screen bg-bg-primary text-white">
      <main className="mx-auto max-w-[1200px] px-4 py-8">
        <section className="mb-6">
          <h1 className="font-bold-24 mb-4">자유게시판</h1>
          <div className="flex items-center rounded-lg border border-bd-primary bg-bg-secondary p-3">
            <Image src={search} alt="search icon" width={24} height={24} />
            <input
              type="text"
              placeholder="검색어를 입력해주세요"
              value={searchValue}
              onChange={handleInputChange}
              className="ml-2 w-full rounded-[12px] bg-bg-secondary p-2 text-white placeholder:text-text-secondary"
            />
          </div>
        </section>

        <section className="mb-8">
          <div className="mb-4 flex w-full items-center justify-between sm:mb-6 md:mb-10 lg:mb-14">
            <h2 className="font-bold-20">베스트 게시글</h2>
            <a href="#" className="flex items-center gap-1 text-text-secondary">
              더보기
              <Image
                src={arrowRight}
                alt="arrow right"
                width={16}
                height={16}
              />
            </a>
          </div>
          <div className="container sm:max-w-unset md:max-w-unset">
            <div className="align-self-stretch kkk gap-6md:w-full flex w-full items-center justify-between gap-4 md:grid md:grid-cols-2 md:gap-4">
              {bestPosts.map((post) => (
                <div
                  key={post.id}
                  className="w-full flex-col items-center justify-between rounded-lg border border-[var(--Background-Tertiary,#334155)] bg-bg-secondary p-[12px_16px] sm:mb-4 md:mb-8"
                >
                  <Link href={`/boards/${post.id}`}>
                    <div className="flex items-center gap-1.5">
                      <Image src={medal} alt="medal" width={16} height={16} />
                      <span className="font-medium-16 text-white">Best</span>
                    </div>
                    <div className="mt-3.5 flex flex-col">
                      <div className="flex items-center">
                        <h3 className="font-medium-18">{post.title}</h3>
                        &nbsp;{' '}
                        {post.image && ( // 이미지가 있을 때만 렌더링
                          <Image
                            src={post.image}
                            alt="image"
                            width={32}
                            height={32}
                          />
                        )}
                      </div>
                      <p className="mt-3 text-text-secondary">{post.date}</p>
                    </div>
                    <div className="mt-4 flex items-center text-text-secondary">
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
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold-20 mb-4">게시글</h2>
            <select
              id="sortOrder"
              className="rounded-lg border border-bd-primary bg-bg-secondary p-2 text-white"
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(e.target.value as '최신순' | '좋아요높은순')
              }
            >
              <option value="최신순">최신순</option>
              <option value="좋아요높은순">좋아요높은순</option>
            </select>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {filteredAndSortedePost.map((post) => {
              const postId = post.id != null ? post.id.toString() : '0'; // post.id가 null이나 undefined일 경우 '0'으로 기본값 설정

              const url = {
                pathname: `/boards/${postId}`,
              };

              return (
                <PostCard
                  key={post.id}
                  url={url}
                  title={post.title}
                  user={post.user ?? post.writer?.nickname ?? ''}
                  views={String(post.likeCount) ?? 0}
                  date={
                    post.date ??
                    format(new Date(post.createdAt || Date.now()), 'yyyy.MM.dd')
                  }
                  userId={(post.writer && post.writer?.id) ?? 0}
                  id={post.id ?? 0}
                  isDropdownOpen={dropdownState === post.id}
                  toggleDropdown={toggleDropdown}
                />
              );
            })}
          </div>
        </section>

        <div className="relative flex w-full justify-end">
          <button
            style={{ bottom: bottomPosition, width: '120px' }}
            className="button z-20 rounded-full bg-emerald-500 p-4 text-white shadow-lg"
            onClick={handleClick}
          >
            + 글쓰기
          </button>
        </div>
      </main>
    </div>
  );
}
