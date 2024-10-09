import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import member from '@/assets/image/icon/member.svg';
import heart from '@/assets/image/icon/heart.svg';
import subtract from '@/assets/image/icon/subtract.svg';

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
}

export default function BoardDetails4() {
  const router = useRouter();
  const { details4 } = router.query;
  const [title] = useState('자유게시판에 질문을 올릴 수 있어요'); // Title is now static
  const [content] = useState(
    '본문이 들어가는 영역입니다.본문이 들어가는 영역입니다.본문이 들어가는 영역입니다.본문이 들어가는 영역입니다.',
  ); // Content is now static
  const [author] = useState('우지은');
  const [date] = useState('2024.07.27');
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState('');

  // Load comments from local storage
  useEffect(() => {
    if (details4) {
      const storedComments = localStorage.getItem(`comments_4_${details4}`);
      if (storedComments) {
        setComments(JSON.parse(storedComments));
      }
    }
  }, [details4]);

  // Comment change handler
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  // Comment submit handler
  const handleCommentSubmit = () => {
    if (comment.trim()) {
      const newComment: Comment = {
        id: comments.length + 1,
        author: '우지은',
        content: comment,
        date: new Date().toISOString().slice(0, 10),
      };
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      localStorage.setItem(
        `comments_4_${details4}`,
        JSON.stringify(updatedComments),
      );
      setComment('');
    }
  };

  const commentCount = comments.length;

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <div className="p-4">
        {/* Title displayed as static text */}
        <h1 className="mb-4 text-2xl font-semibold">{title}</h1>
        {/* Content displayed as static text */}
        <p className="mb-4 flex items-center text-sm text-gray-400">
          <Image src={member} alt="member" width={32} height={32} />
          &nbsp;{author} | {date}&nbsp;&nbsp;&nbsp;
          <Image
            src={subtract}
            alt="subtract"
            width={16}
            height={16}
            style={{ float: 'right', marginLeft: 'auto' }}
          />
          {commentCount}&nbsp;
          <Image src={heart} alt="heart" width={16} height={16} />0
        </p>
        <p className="mb-6 text-base leading-relaxed">{content}</p>
      </div>

      {/* Comment section */}
      <div className="p-4">
        <h2 className="mb-4 text-xl font-semibold">댓글 달기</h2>
        <textarea
          className="mb-2 h-24 w-full rounded-lg bg-gray-700 p-4 text-white"
          placeholder="댓글을 입력해 주세요."
          value={comment}
          onChange={handleCommentChange}
        />
        <div className="flex justify-end">
          <button
            onClick={handleCommentSubmit}
            className="mb-4 rounded-lg bg-emerald-500 px-6 py-2 text-white"
          >
            등록
          </button>
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
