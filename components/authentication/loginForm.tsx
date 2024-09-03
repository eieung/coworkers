export default function LoginForm() {
  return (
    <form className="mb-25 flex flex-col gap-40 md:mb-49 lg:mb-48">
      <div>
        <div className="flex flex-col gap-24">
          <div className="flex flex-col gap-12">
            <label htmlFor="email" className="font-medium-16 text-text-primary">
              이메일
            </label>
            <input
              type="email"
              id="email"
              placeholder="이메일을 입력하세요."
              className="py-13.5 font-regular-14 h-44 w-343 rounded-12 border-1 border-solid border-bd-primary bg-bg-secondary px-16 placeholder-text-default"
            />
          </div>
          <div className="flex flex-col gap-12">
            <label
              htmlFor="password"
              className="font-medium-16 text-text-primary"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              placeholder="비밀번호를 입력해주세요."
              className="py-13.5 font-regular-14 h-44 w-343 rounded-12 border-1 border-solid border-bd-primary bg-bg-secondary px-16 placeholder-text-default"
            />
            <div className="flex justify-end text-emerald-500">
              비밀번호를 잊으셨나요?
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-24">
        <button className="bg-white">로그인</button>
        <div className="flex-center justify-between gap-12">
          <span className="font-medium-16 text-text-primary">
            아직 계정이 없으신가요?
          </span>
          <span className="font-medium-16 text-emerald-500">가입하기</span>
        </div>
      </div>
    </form>
  );
}
