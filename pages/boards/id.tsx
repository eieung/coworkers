import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const BoardsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="bg-bg-primary p-6 text-white">
      <h1 className="mb-4 text-2xl font-semibold">
        게시글 제목 영역입니다. {id}
      </h1>
      <hr
        style={{
          border: 'none',
          height: '1px',
          backgroundColor: 'rgb(55 65 81 / var(--tw-bg-opacity))',
          margin: '20px 0',
        }}
      />
      <p className="mb-4 text-sm text-gray-400">
        우지은
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|
        &nbsp;&nbsp;&nbsp;2024.07.25
      </p>
      <p className="mb-6 text-base leading-relaxed">
        본문이 들어가는 영역입니다. 본문이 들어가는 영역입니다. 본문이 들어가는
        영역입니다. 본문이 들어가는 영역입니다. 본문이 들어가는 영역입니다.
        본문이 들어가는 영역입니다. 본문이 들어가는 영역입니다. 본문이 들어가는
        영역입니다.
      </p>
    </div>
  );
};

export default BoardsPage;
