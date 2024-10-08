import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setUser } from '@/store/store';

const Button = styled.button`
  color: var(--white);
  padding: 0.5rem 1.5rem;
  background-color: rgb(16, 185, 129);
  border-radius: 0.5rem;
  margin-left: 500px !important;
  margin-top: 1rem; 
  display: inline-block;
`;

const ImageUploader = () => {
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Open file dialog
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string); // Preview image
      };
      reader.readAsDataURL(file);
    }
  };

  const savePostToLocalStorage = (post: { title: string; user: string; views: number; date: string; id: number; content: string; }) => {
    localStorage.setItem('newPost', JSON.stringify(post));
    router.push('/boards'); // Redirect back to boards
  };

  const handleSubmit = () => {
    if (title.trim() && content.trim() && user) {
      // Create post data
      const post = {
        title,
        user, // Replace with actual user name
        views: 0, // Default value
        date: new Date().toISOString(), // Current date
        id: Math.floor(Math.random() * 1000), // Temporary ID
        content, // Include content
      };

      router.push({
        pathname: '/boards',
        query: post, // 게시글 데이터 전달
      });
      savePostToLocalStorage(post); // Save the post to local storage
    } else {
      const post = {
        title,
        user, // Replace with actual user name
        views: 0, // Default value
        date: new Date().toISOString(), // Current date
        id: Math.floor(Math.random() * 1000), // Temporary ID
        content, // Include content
      };

      router.push({
        pathname: '/boards',
        query: post, // 게시글 데이터 전달
      });
      savePostToLocalStorage(post); 
      //alert("제목과 내용을 입력해주세요."); // Validation
    }
  };

  return (
    <div className="min-h-screen text-white p-6 bg-gray-900">
    <div className="p-4">
      {/* 게시물 제목 및 정보 */}       
      <button className="btn123" onClick={handleSubmit}>등록</button>
      <h1 className="text-2xl font-semibold mb-4">게시글 쓰기</h1>
    </div>
    <div style={{ marginBottom: '-30px' }}></div>
    <div className="p-4">
      <hr style={{ border: 'none', height: '1px', backgroundColor: 'rgb(55 65 81 / var(--tw-bg-opacity))', margin: '20px 0' }} />        
      </div>    
      <div style={{ marginTop: '-13px' }}></div>
      <div className="p-4">
      <p>* 제목</p>
      </div>
      <div style={{ marginTop: '-10px' }}></div>
      <div className="p-4">
      <input 
          type="text" 
          className="w-full h-12 bg-gray-700 text-white p-4 rounded-lg mb-2" 
          placeholder="제목을 입력해주세요." 
          value={title}
          onChange={(e) => setTitle(e.target.value)} // 제목 변경 시 상태 업데이트
        />
      </div>
      <div style={{ marginTop: '0px' }}></div>
      <div className="p-4">
      <p>* 내용</p>
      </div>
      <div style={{ marginTop: '-10px' }}></div>
      <div className="p-4">
      <textarea 
          className="w-full h-12 bg-gray-700 text-white p-4 rounded-lg mb-2" 
          style={{ height: '120px' }} 
          placeholder="내용을 입력해주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)} // 내용 변경 시 상태 업데이트
        />
      </div>
      <div style={{ marginTop: '-10px' }}></div>
      <div className="p-4">
      <p>* 이미지</p>
      </div>
      <div style={{ marginTop: '0px' }}></div> 
      <div className="p-4">
      <div 
        className="w-fulls h-52 bg-gray-700 text-white p-4 rounded-lg flex flex-col items-center justify-center mb-4 cursor-pointer"
        onClick={handleClick} // 클릭 시 파일 선택 대화상자 열기
      >
    {imageSrc ? (
          <img src={imageSrc} alt="Uploaded" className="w-full h-full object-cover rounded-lg" />
        ) : (
          <>
            <span className="text-2xl">+</span>
            <span className="text-sm">이미지 등록</span>
          </>
        )}
  </div>
  <input 
        type="file" 
        accept="image/*" 
        ref={fileInputRef} // ref 연결
        style={{ display: 'none' }} // 숨기기
        onChange={handleChange} // 파일 변경 시 호출
      />
</div>
    </div>
  );
};

export default ImageUploader;
