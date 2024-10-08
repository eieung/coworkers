// pages/boards/index.tsx
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const BoardsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="p-6 bg-bg-primary text-white">
    <h1 className="text-2xl font-semibold mb-4">게시글 제목 영역입니다. {id}</h1>
    <hr style={{ border: 'none', height: '1px', backgroundColor: 'rgb(55 65 81 / var(--tw-bg-opacity))', margin: '20px 0' }} />
    <p className="text-sm text-gray-400 mb-4">
      우지은 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| &nbsp;&nbsp;&nbsp;2024.07.25
    </p>
    <p className="text-base leading-relaxed mb-6">
      본문이 들어가는 영역입니다. 본문이 들어가는 영역입니다. 본문이 들어가는 영역입니다. 본문이 들어가는 영역입니다.
      본문이 들어가는 영역입니다. 본문이 들어가는 영역입니다. 본문이 들어가는 영역입니다.
      본문이 들어가는 영역입니다.
    </p>
  </div>
  );
};

export default BoardsPage;
