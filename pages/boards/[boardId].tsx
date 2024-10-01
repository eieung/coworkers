import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
}

export default function BoardDetail() {
  const router = useRouter();
  const { boardId } = router.query;
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (boardId) {
      // 임시로 게시물 내용과 댓글 데이터를 설정합니다.
      setComments([]); // 댓글이 없을 때는 빈 배열로 설정
    }
  }, [boardId]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    // 새로운 댓글 추가 로직
    if (comment.trim()) {
      const newComment = {
        id: comments.length + 1,
        author: '현재 유저',
        content: comment,
        date: new Date().toISOString().slice(0, 10), // YYYY-MM-DD 포맷
      };
      setComments([...comments, newComment]);
      setComment('');
    }
  };

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-semibold mb-4">게시물 제목 영역입니다.</h1>
        <p className="text-sm text-gray-400 mb-4">작성자: 유저1 | 2024.07.25</p>
        <p className="text-base leading-relaxed mb-6">
          본문이 들어가는 영역입니다. 본문이 들어가는 영역입니다. 본문이 들어가는 영역입니다.
        </p>

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
