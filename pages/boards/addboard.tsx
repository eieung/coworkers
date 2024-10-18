import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { useUploadImageMutation } from '@/queries/image/upload-images';
import {
  useCreateArticle,
  useEditArticle,
  useGetArticleDetail,
} from '@/queries/article/useArticleData';
import { toast } from 'react-toastify';
import Button from '@/components/common/button';

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ImageUploader = () => {
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState<{
    src: string;
    file: File | null;
  } | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const imageUpload = useUploadImageMutation();
  const createArticle = useCreateArticle();

  const { mode, id: articleId } = router.query;
  const isEditMode = mode === 'edit';

  const { data: article } = useGetArticleDetail({
    articleId: Number(articleId),
  });
  const { mutate: editArticle } = useEditArticle();

  useEffect(() => {
    if (isEditMode && article) {
      setTitle(article.title);
      setContent(article.content);
      if (article.image) {
        setImageSrc({ src: article.image, file: null });
      }
    }
  }, [isEditMode, article]);

  useEffect(() => {
    if (imageSrc) {
      return () => URL.revokeObjectURL(imageSrc.src);
    }
  }, [imageSrc]);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error('이미지 크기는 10MB 이하로 설정해주세요.');
        return;
      }

      const preview = URL.createObjectURL(file);

      setImageSrc({
        src: preview,
        file,
      });
    }
  };

  const handleSubmit = () => {
    let imageUrl = imageSrc?.src || '';

    if (imageSrc?.file) {
      imageUpload
        .mutateAsync(imageSrc.file)
        .then((response) => {
          imageUrl = response.data.url;
          proceedWithSubmit(imageUrl);
        })
        .catch(() => {
          toast.error('이미지 업로드 중 오류가 발생했습니다.');
        });
    } else {
      proceedWithSubmit(imageUrl);
    }
  };

  const proceedWithSubmit = (imageUrl: string) => {
    if (isEditMode) {
      editArticle({
        articleId: Number(articleId),
        articleData: {
          title,
          content,
          image: imageUrl,
        },
      });
      router.push(`/boards`);
    } else {
      createArticle.mutate(
        {
          title,
          content,
          ...(imageUrl ? { image: imageUrl } : {}),
        },
        {
          onSuccess: () => {
            toast.success('게시글이 작성되었습니다.');
            router.push(`/boards`);
          },
        },
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <div className="flex items-center justify-between p-4">
        <h1 className="mb-4 text-2xl font-semibold">
          {isEditMode ? '게시글 수정' : '게시글 쓰기'}
        </h1>
        <Button className="w-[184px] text-white" onClick={handleSubmit}>
          {isEditMode ? '수정' : '등록'}
        </Button>
      </div>
      <div className="p-4">
        <hr className="my-5 h-px border-none bg-gray-600" />
      </div>
      <div className="p-4">
        <p>* 제목</p>
      </div>
      <div className="p-4">
        <input
          type="text"
          className="mb-2 h-12 w-full rounded-lg bg-gray-700 p-4 text-white"
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)} // 제목 변경 시 상태 업데이트
        />
      </div>
      <div className="p-4">
        <p>* 내용</p>
      </div>
      <div className="p-4">
        <textarea
          className="mb-2 h-32 w-full rounded-lg bg-gray-700 p-4 text-white"
          placeholder="내용을 입력해주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)} // 내용 변경 시 상태 업데이트
        />
      </div>
      <div className="p-4">
        <p>* 이미지</p>
      </div>
      <div className="p-4">
        <div
          className="mb-4 flex h-[240px] w-[240px] cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-700 p-4 text-white"
          onClick={handleClick} // 클릭 시 파일 선택 대화상자 열기
        >
          {imageSrc && imageSrc.src ? (
            <img
              src={imageSrc.src}
              alt="Uploaded"
              className="h-full w-full rounded-lg object-cover"
            />
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
