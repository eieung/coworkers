import { useState } from 'react';

export default function WritePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 게시글 작성 API 호출 또는 저장 로직을 여기에 추가합니다.
    console.log({ title, content, image });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto p-8 rounded-lg">
        <h1 className="text-2xl font-semibold mb-6">게시글 쓰기</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">* 제목</label>
            <input
              type="text"
              className="w-full p-3 bg-gray-700 text-white rounded-lg"
              placeholder="제목을 입력해주세요."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">* 내용</label>
            <textarea
              className="w-full p-3 bg-gray-700 text-white rounded-lg h-40"
              placeholder="내용을 입력해주세요."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">이미지</label>
            <div className="w-40 h-40 border border-dashed border-gray-600 flex items-center justify-center bg-gray-700 rounded-lg">
              <label htmlFor="imageUpload" className="cursor-pointer text-center">
                {image ? (
                  <p>{image.name}</p>
                ) : (
                  <span>이미지 등록</span>
                )}
              </label>
              <input
                type="file"
                id="imageUpload"
                className="hidden"
                onChange={handleImageUpload}
                accept="image/*"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-emerald-500 px-6 py-2 rounded-lg text-white font-semibold"
          >
            등록
          </button>
        </form>
      </div>
    </div>
  );
}
