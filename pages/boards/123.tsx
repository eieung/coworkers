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

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
}

export default function BoardDetail() {
  const router = useRouter();
  const { details } = router.query;
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState('');

  // Initial data setup
  const initialTitle = "자유게시판에 질문을 올릴 수 있어요";
  const initialContent = "본문이 들어가는 영역입니다.";
  const initialAuthor = "우지은";
  const initialDate = "2024.07.25";

  useEffect(() => {
    const storedPost = localStorage.getItem('post');
    if (storedPost) {
      setPost(JSON.parse(storedPost));
    } else {
      const fetchedPost = {
        id: Number(details),
        title: initialTitle,
        content: initialContent,
        author: initialAuthor,
        date: initialDate,
      };
      setPost(fetchedPost);
      localStorage.setItem('post', JSON.stringify(fetchedPost));
    }
  }, [details]);

  useEffect(() => {
    const storedComments = localStorage.getItem('comments');
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

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
      localStorage.setItem('comments', JSON.stringify(updatedComments));
      setComment('');
    }
  };

  const commentCount = comments.length;

  if (!post) {
    return (
      <div className="min-h-screen text-white p-6 bg-gray-900">   
        <div className="p-4"> 
          <h1 className="text-2xl font-semibold mb-4">{initialTitle}</h1>
          <hr style={{border: 'none', height: '1px', backgroundColor: 'rgb(55 65 81 / var(--tw-bg-opacity))', margin: '20px 0'}} />
          <p className="text-sm text-gray-400 mb-4 flex items-center"><Image src={member} alt="member" width={32} height={32} />&nbsp;{initialAuthor} | {initialDate}&nbsp;&nbsp;&nbsp;<Image src={subtract} alt="subtract" width={16} height={16} style={{ float: 'right', marginLeft: 'auto' }}  />0&nbsp;<Image src={heart} alt="heart" width={16} height={16} />0</p>
          <p className="text-base leading-relaxed mb-6">{initialContent}</p>           
        </div>
        <div style={{ marginBottom: '30px' }}></div>
        <div className="p-4"> 
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
        {/* Post title and information */}
        <h1 className="text-2xl font-semibold mb-4">{post.title}</h1>
        <p className="text-sm text-gray-400 mb-4 flex items-center"><Image src={member} alt="member" width={32} height={32} />&nbsp;{post.author} | {post.date}&nbsp;&nbsp;&nbsp;<Image src={subtract} alt="subtract" width={16} height={16} style={{ float: 'right', marginLeft: 'auto' }} />{commentCount}&nbsp;<Image src={heart} alt="heart" width={16} height={16} />0</p>
        <p className="text-base leading-relaxed mb-6">{post.content}</p>
      </div>
      <div style={{ marginBottom: '30px' }}></div>
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
