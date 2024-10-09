import { useRouter } from 'next/router';
import { useState } from 'react';

export default function WritePost() {
  const { query } = useRouter();
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
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <div className="mx-auto max-w-4xl rounded-lg p-8">
        <h1 className="mb-6 text-2xl font-semibold">게시글 쓰기</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium">* 제목</label>
            <input
              type="text"
              className="w-full rounded-lg bg-gray-700 p-3 text-white"
              placeholder="제목을 입력해주세요."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">* 내용</label>
            <textarea
              className="h-40 w-full rounded-lg bg-gray-700 p-3 text-white"
              placeholder="내용을 입력해주세요."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">이미지</label>
            <div className="flex h-40 w-40 items-center justify-center rounded-lg border border-dashed border-gray-600 bg-gray-700">
              <label
                htmlFor="imageUpload"
                className="cursor-pointer text-center"
              >
                {image ? <p>{image.name}</p> : <span>이미지 등록</span>}
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
            className="rounded-lg bg-emerald-500 px-6 py-2 font-semibold text-white"
          >
            등록
          </button>
        </form>
      </div>
    </div>
  );
}
