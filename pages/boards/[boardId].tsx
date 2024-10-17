import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import member from '@/assets/image/icon/member.svg';
import heart from '@/assets/image/icon/heart.svg';
import subtract from '@/assets/image/icon/subtract.svg';
import { useGetArticleDetail } from '@/queries/article/useArticleData';
import { format } from 'date-fns';
import {
  useCreateArticleComment,
  useGetArticleComments,
} from '@/queries/article/useArticleCommentData';

interface Comment {
  id: number;
  user: string;
  content: string;
  date: string;
  writer: {
    id: number;
    nickname: string;
  };
  createdAt: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  user: string;
  views: number;
  date: string;
}

/*const fetchPost = async (id: string) => {
  const response = await fetch(`/boards/${id}`);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
};*/

export default function BoardDetail() {
  const router = useRouter();
  const { boardId } = router.query;
  const { id, title, content, user, date } = router.query; // URL에서 boardId 가져오기
  const [post, setPost] = useState<Post | null>(null); // 게시물 상태
  const [comments, setComments] = useState<Comment[]>([]); // 댓글 상태
  const [comment, setComment] = useState(''); // 새로운 댓글 내용 상태
  const postId = '1';

  const { data: detail } = useGetArticleDetail({
    articleId: Number(boardId),
  });

  const { data: commentList } = useGetArticleComments({
    articleId: Number(boardId),
    limit: 10,
  });

  const createComment = useCreateArticleComment();

  useEffect(() => {
    if (commentList && commentList.list && commentList.list.length > 0) {
      setComments(commentList.list);
    }
  }, [commentList]);

  /*useEffect(() => {
    const getPostData = async () => {    
        try {
      const data = await fetchPost(postId);
      setPost({
        id: data.id,
        title: data.title,
        content: data.content,
        user: data.user,
        views: data.views,
        date: new Date(data.date).toLocaleDateString(),
      });
    } catch (error) {
      console.error('게시물 데이터를 가져오는 중 오류 발생:', error);
    }
  };
    getPostData();
  }, [postId]);*/

  useEffect(() => {
    if (boardId) {
      // 예시 데이터로 게시물 설정
      const fetchedPost = {
        id: Number(boardId),
        title: `게시물 제목 ${boardId}`,
        content: `이 게시물의 내용입니다. 게시물 ID는 ${boardId}입니다.`,
        user: '작성자1',
        views: 0,
        date: '2024.07.25',
      };
      setPost(fetchedPost);
    }
  }, [postId]);

  /* useEffect(() => {
    if (id) {
      fetch(`/boards/${id}`) // 게시글 데이터를 가져오는 API 엔드포인트
        .then(response => response.json())
        .then(data => {
          // 데이터를 'get'으로 바꾸기
          const get = {
            id: data.id,
            title: data.title,
            user: data.user, // 또는 data.get.user로 바꿔주세요
            content: data.content,
            views: data.views,
            date: new Date(data.date).toLocaleDateString(),
          };
          setPost(get);
        })
        .catch(error => {
          console.error('게시글을 가져오는 중 오류 발생:', error);
        });
        */
  /*
  useEffect(() => {
    if (id) {
      // ID에 기반하여 게시물 데이터 가져오기
      fetch(`/boards/${id}`) // 예: API 엔드포인트
        .then(response => response.json())
        .then(data => {
          setPost(data);
        })
        .catch(error => {
          console.error('게시글을 가져오는 중 오류 발생:', error);
        });
      
      // 댓글 로드 처리
     /* const savedComments = localStorage.getItem(`comments_${id}`);
      if (savedComments) {
        setComments(JSON.parse(savedComments));
      }
    }
  }, [postId]);
*/
  const userdata = '우지은';
  const datedata = '2024.10.8';

  // 새로운 댓글 작성
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  // 댓글 제출
  const handleCommentSubmit = () => {
    if (comment.trim()) {
      // const newComment: Comment = {
      //   id: comments.length + 1,
      //   user: '우지은', // 실제로는 로그인한 유저의 이름을 넣어야 함
      //   content: comment,
      //   date: new Date().toISOString().slice(0, 10), // YYYY-MM-DD 형식으로 날짜 생성
      // };
      // const updatedComments = [...comments, newComment];
      // setComments(updatedComments); // 새로운 댓글을 기존 댓글에 추가
      // setComment(''); // 입력창 초기화

      // // 로컬 스토리지에 댓글 저장
      // localStorage.setItem(
      //   `comments_${boardId}`,
      //   JSON.stringify(updatedComments),
      // );

      createComment.mutate(
        {
          articleId: Number(boardId),
          content: comment,
        },
        {
          onSuccess: () => {
            setComment('');
          },
        },
      );
    }
  };

  const commentCount = comments.length; // 댓글 수 계산

  //const currentPost = post;

  /* if (!post) {
    return (
      <div className="min-h-screen text-white p-6 bg-gray-900">   
        <div className="p-4"> 
      
          <h1 className="text-2xl font-semibold mb-4">{title || '게시글 제목 영역입니다.'}</h1>
          <hr style={{ border: 'none', height: '1px', backgroundColor: 'rgb(55 65 81 / var(--tw-bg-opacity))', margin: '20px 0' }} />
          <p className="text-sm text-gray-400 mb-4 flex items-center"><Image src={member} alt="member" width={32} height={32} />&nbsp;우지은 | {date || '날짜 없음'}&nbsp;&nbsp;&nbsp;<Image src={subtract} alt="subtract" width={16} height={16} style={{ float: 'right', marginLeft: 'auto' }}  />0&nbsp;<Image src={heart} alt="heart" width={16} height={16} />0</p>
          <p className="text-base leading-relaxed mb-6">{content || '본문이 들어가는 영역입니다.'}</p>
         </div>
    
        <div className="p-4"> 
        
          <h2 className="text-xl font-semibold mb-4">댓글 달기</h2>
          <div className="mb-6">
            <textarea
              className="w-full h-24 bg-gray-700 text-white p-4 rounded-lg mb-2"
              placeholder="댓글을 입력해 주세요."
              value={comment}
              onChange={handleCommentChange}
            />
            <div className="flex justify-end">
            <button
              onClick={handleCommentSubmit}
              className="bg-emerald-500 text-white px-6 py-2 rounded-lg"
            >
              등록
            </button>
            </div>
          </div>

        
          <h2 className="text-xl font-semibold mb-4">댓글 목록</h2>
          {comments.length === 0 ? (
            <p className="text-center text-gray-400">아직 작성한 댓글이 없습니다.</p>
          ) : (
            <ul>
              {comments.map((comment) => (
                <li key={comment.id} className="bg-gray-700 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-400 mb-1">
                    {comment.author} | {comment.date}
                  </p>
                  <p>{comment.content}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white p-6 bg-gray-900">   
      <div className="p-4"> 
       
        <h1 className="text-2xl font-semibold mb-4">{post.title}</h1>
        <hr style={{ border: 'none', height: '1px', backgroundColor: 'rgb(55 65 81 / var(--tw-bg-opacity))', margin: '20px 0' }} />
        <p className="text-sm text-gray-400 mb-4 flex items-center"><Image src={member} alt="member" width={32} height={32} />&nbsp;{post.author} | {post.date}&nbsp;&nbsp;&nbsp;<Image src={subtract} alt="subtract" width={16} height={16} style={{ float: 'right', marginLeft: 'auto' }} />{commentCount}&nbsp;<Image src={heart} alt="heart" width={16} height={16} />0</p>
        <p className="text-base leading-relaxed mb-6">{post.content}</p>
      </div>
    
      <div className="p-4"> 
    
        <h2 className="text-xl font-semibold mb-4">댓글 달기</h2>
        <div className="mb-6">
          <textarea
            className="w-full h-24 bg-gray-700 text-white p-4 rounded-lg mb-2"
            placeholder="댓글을 입력해 주세요."
            value={comment}
            onChange={handleCommentChange}
          />
          <div className="flex justify-end">
          <button
            onClick={handleCommentSubmit}
            className="bg-emerald-500 text-white px-6 py-2 rounded-lg"
          >
            등록
          </button>
          </div>
        </div>
     
        <h2 className="text-xl font-semibold mb-4">댓글 목록</h2>
        {comments.length === 0 ? (
          <p className="text-center text-gray-400">아직 작성한 댓글이 없습니다.</p>
        ) : (
          <ul>
            {comments.map((comment) => (
              <li key={comment.id} className="bg-gray-700 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-400 mb-1">
                  {comment.author} | {comment.date} 
                </p>
                <p>{comment.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );*/
  if (!detail) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <div className="p-4">
        <h1 className="mb-4 text-2xl font-semibold">
          {detail.title || '자유게시판에 질문을 올릴 수 있어요'}
        </h1>
        <hr
          style={{
            border: 'none',
            height: '1px',
            backgroundColor: 'rgb(55 65 81 / var(--tw-bg-opacity))',
            margin: '20px 0',
          }}
        />
        <p className="mb-4 flex items-center text-sm text-gray-400">
          <Image src={member} alt="member" width={32} height={32} />
          &nbsp;{detail.writer.nickname} |{' '}
          {format(new Date(detail.createdAt), 'yyyy.MM.dd')}
          &nbsp;&nbsp;&nbsp;
          <Image
            src={subtract}
            alt="subtract"
            width={16}
            height={16}
            style={{ float: 'right', marginLeft: 'auto' }}
          />
          {detail.commentCount ?? 0}&nbsp;
          <Image src={heart} alt="heart" width={16} height={16} />0
        </p>
        <p className="mb-6 text-base leading-relaxed">
          {detail.content ||
            '본문이 들어가는 영역입니다.본문이 들어가는 영역입니다.본문이 들어가는 영역입니다.본문이 들어가는 영역입니다.본문이 들어가는 영역입니다.본문이 들어가는 영역입니다.본문이 들어가는 영역입니다.본문이 들어가는 영역입니다.본문이 들어가는 영역입니다.본문이 들어가는 영역입니다.본문이 들어가는 영역입니다.'}
        </p>
      </div>

      <div className="p-4">
        <h2 className="mb-4 text-xl font-semibold">댓글 달기</h2>
        <div className="mb-6">
          <textarea
            className="mb-2 h-24 w-full rounded-lg bg-gray-700 p-4 text-white"
            placeholder="댓글을 입력해 주세요."
            value={comment}
            onChange={handleCommentChange}
          />
          <div className="flex justify-end">
            <button
              onClick={handleCommentSubmit}
              className="rounded-lg bg-emerald-500 px-6 py-2 text-white"
            >
              등록
            </button>
          </div>
        </div>

        <h2 className="mb-4 text-xl font-semibold">댓글 목록</h2>
        {comments.length === 0 ? (
          <p className="text-center text-gray-400">
            아직 작성한 댓글이 없습니다.
          </p>
        ) : (
          <ul>
            {comments.map((comment) => (
              <li key={comment.id} className="mb-4 rounded-lg bg-gray-700 p-4">
                <p className="mb-1 text-sm text-gray-400">
                  {comment.writer.nickname} |{' '}
                  {format(new Date(comment.createdAt), 'yyyy-MM-dd')}
                </p>
                <p>{comment.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
