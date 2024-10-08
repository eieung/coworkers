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
  const { details } = router.query;
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState('');
  const [showCommentSection, setShowCommentSection] = useState(false); // State to manage comment section visibility

  // Initial data setup
  const initialTitle = "게시글 제목 영역입니다.";
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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    if (post) {
      const updatedPost = { ...post, title: newTitle };
      setPost(updatedPost);
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    if (post) {
      const updatedPost = { ...post, content: newContent };
      setPost(updatedPost);
    }
  };

  const handleSavePost = () => {
    if (post) {
      localStorage.setItem('post', JSON.stringify(post));
    }
  };

  const toggleCommentSection = () => {
    setShowCommentSection((prev) => !prev);
  };

  if (!post) {
    return (
      <div className="min-h-screen text-white p-6 bg-gray-900">   
        <div className="p-4"> 
          <h1 className="text-2xl font-semibold mb-4">게시글 제목 영역입니다.</h1>
          <hr style={{border: 'none', height: '1px', backgroundColor: 'rgb(55 65 81 / var(--tw-bg-opacity))', margin: '20px 0'}} />
          <p className="text-sm text-gray-400 mb-4">{initialAuthor} | {initialDate}</p>
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
        <input
          className="text-2xl font-semibold mb-4 bg-gray-700 p-2 w-full rounded"
          value={post.title}
          onChange={handleTitleChange} // Title edit
        />
        <textarea
          className="w-full h-48 bg-gray-700 text-white p-4 rounded mb-4"
          value={post.content}
          onChange={handleContentChange} // Content edit
        />
        <p className="text-sm text-gray-400 mb-4">{post.author} | {post.date}</p>
        <button
          onClick={handleSavePost}
          className="bg-emerald-500 text-white px-6 py-2 rounded-lg mb-4"
        >
          저장
        </button>
      </div>
      <div style={{ marginBottom: '30px' }}></div>
      <div className="p-4 flex justify-end"> 
        <button
          onClick={toggleCommentSection}
          className="bg-emerald-500 text-white px-4 py-2 rounded-lg"
        >
          {showCommentSection ? "댓글 숨기기" : "댓글 보기"}
        </button>
      </div>
      {showCommentSection && ( // Conditionally render the comment section
        <>
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
        </>
      )}
    </div>
  );
}
