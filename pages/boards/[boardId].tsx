import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
}

export default function BoardDetail() {
  const router = useRouter();
  const { boardId } = router.query; // URL에서 boardId 가져오기
  const [post, setPost] = useState<Post | null>(null); // 게시물 상태
  const [comments, setComments] = useState<Comment[]>([]); // 댓글 상태
  const [comment, setComment] = useState(''); // 새로운 댓글 내용 상태

  // 게시물 데이터 가져오기 (여기서는 임시 데이터를 사용, 실제로는 API로 불러와야 함)
  useEffect(() => {
    if (boardId) {
      // 예시 데이터로 게시물 설정
      const fetchedPost = {
        id: Number(boardId),
        title: `게시물 제목 ${boardId}`,
        content: `이 게시물의 내용입니다. 게시물 ID는 ${boardId}입니다.`,
        author: '작성자1',
        date: '2024.07.25',
      };
      setPost(fetchedPost);
    }
  }, [boardId]);

  // 새로운 댓글 작성
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  // 댓글 제출
  const handleCommentSubmit = () => {
    if (comment.trim()) {
      const newComment: Comment = {
        id: comments.length + 1,
        author: '현재 유저', // 실제로는 로그인한 유저의 이름을 넣어야 함
        content: comment,
        date: new Date().toISOString().slice(0, 10), // YYYY-MM-DD 형식으로 날짜 생성
      };
      setComments([...comments, newComment]); // 새로운 댓글을 기존 댓글에 추가
      setComment(''); // 입력창 초기화
    }
  };

  if (!post) {
    return <div>Loading...</div>; // 게시물 로딩 중 표시
  }

  return (
    <div className="min-h-screen text-white p-6 bg-gray-900">
      <div className="max-w-4xl mx-auto p-8 bg-gray-800 rounded-lg shadow-lg">
        {/* 게시물 제목 및 정보 */}
        <h1 className="text-2xl font-semibold mb-4">{post.title}</h1>
        <p className="text-sm text-gray-400 mb-4">작성자: {post.author} | {post.date}</p>
        <p className="text-base leading-relaxed mb-6">{post.content}</p>

        {/* 댓글 입력란 */}
        <h2 className="text-xl font-semibold mb-4">댓글 달기</h2>
        <div className="mb-6">
          <textarea
            className="w-full h-24 bg-gray-700 text-white p-4 rounded-lg mb-2"
            placeholder="댓글을 입력해 주세요."
            value={comment}
            onChange={handleCommentChange}
          />
          <button
            onClick={handleCommentSubmit}
            className="bg-emerald-500 text-white px-6 py-2 rounded-lg"
          >
            등록
          </button>
        </div>

        {/* 댓글 목록 */}
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
