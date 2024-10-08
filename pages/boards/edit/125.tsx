import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
}

export default function BoardDetails() {
  const router = useRouter();
  const { details2 } = router.query;
  const [title, setTitle] = useState("게시글 제목 영역입니다.");
  const [content, setContent] = useState("본문이 들어가는 영역입니다.본문이 들어가는 영역입니다.본문이 들어가는 영역입니다.본문이 들어가는 영역입니다.");
  const [author] = useState("우지은");
  const [date] = useState("2024.07.26");
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState('');
  const [showCommentSection, setShowCommentSection] = useState(false); // State for comment section visibility

  // Load comments from local storage
  useEffect(() => {
    if (details2) {
      const storedComments = localStorage.getItem(`comments_${details2}`);
      if (storedComments) {
        setComments(JSON.parse(storedComments));
      }
    }
  }, [details2]);

  // Comment change handler
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  // Comment submit handler
  const handleCommentSubmit = () => {
    if (comment.trim()) {
      const newComment: Comment = {
        id: comments.length + 1,
        author: author,
        content: comment,
        date: new Date().toISOString().slice(0, 10),
      };
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      localStorage.setItem(`comments_${details2}`, JSON.stringify(updatedComments));
      setComment('');
    }
  };

  // Title change handler
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // Content change handler
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  // Save post to local storage
  const handleSavePost = () => {
    const postData = {
      title,
      content,
      author,
      date,
    };
    localStorage.setItem(`post_${details2}`, JSON.stringify(postData));
  };

  // Toggle comment section visibility
  const toggleCommentSection = () => {
    setShowCommentSection((prev) => !prev);
  };

  return (
    <div className="min-h-screen text-white p-6 bg-gray-900">
      <div className="p-4">
        {/* Post title and content editable */}
        <input
          className="text-2xl font-semibold mb-4 bg-gray-700 p-2 w-full rounded"
          value={title}
          onChange={handleTitleChange}
        />
        <textarea
          className="w-full h-48 bg-gray-700 text-white p-4 rounded mb-4"
          value={content}
          onChange={handleContentChange}
        />
        <p className="text-sm text-gray-400 mb-4">{author} | {date}</p>
        <button
          onClick={handleSavePost}
          className="bg-emerald-500 text-white px-6 py-2 rounded-lg mb-4"
        >
          저장
        </button>
      </div>
      
      {/* Button to toggle comment section visibility, aligned to the right */}
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleCommentSection}
          className="bg-emerald-500 text-white px-4 py-2 rounded-lg"
        >
          {showCommentSection ? "댓글 숨기기" : "댓글 보기"}
        </button>
      </div>

      {/* Comment section */}
      {showCommentSection && (
        <div className="p-4">
          <textarea
            className="w-full h-24 bg-gray-700 text-white p-4 rounded-lg mb-2"
            placeholder="댓글을 입력해 주세요."
            value={comment}
            onChange={handleCommentChange}
          />
          <button
            onClick={handleCommentSubmit}
            className="bg-emerald-500 text-white px-6 py-2 rounded-lg mb-4"
          >
            등록
          </button>

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
      )}
    </div>
  );
}
