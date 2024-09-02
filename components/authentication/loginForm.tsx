export default function LoginForm() {
  return (
    <form>
      <div className="flex flex-col gap-24">
        <div className="flex flex-col gap-12">
          <label htmlFor="email" className="font-medium-16 text-text-primary">
            이메일
          </label>
          <input
            type="email"
            id="email"
            placeholder="이메일을 입력하세요."
            className="w-343 h-44 rounded-12 border-1 border-solid border-bd-primary px-16 py-13.5 bg-bg-secondary placeholder-text-default font-regular-14"
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
            className="w-343 h-44 rounded-12 border-1 border-solid border-bd-primary  px-16 py-13.5 bg-bg-secondary placeholder-text-default font-regular-14"
          />
          <div className="flex justify-end text-emerald-500">
            비밀번호를 잊으셨나요?
          </div>
        </div>
      </div>
      <button>로그인</button>
    </form>
  );
}
