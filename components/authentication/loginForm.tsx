export default function LoginForm() {
  return (
    <form className="md:mb-49 mb-[25px] flex flex-col gap-[40px] lg:mb-[48px]">
      <div>
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col gap-[12px]">
            <label
              htmlFor="email"
              className="font-medium-[16px] text-text-primary"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              placeholder="이메일을 입력하세요."
              className="font-regular-14 h-[44px] w-[343px] rounded-[12px] border-[1px] border-solid border-bd-primary bg-bg-secondary px-[16px] py-[13.5px] placeholder-text-default"
            />
          </div>
          <div className="flex flex-col gap-[12px]">
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
              className="font-regular-14 h-[44px] w-[343px] rounded-[12px] border-[1px] border-solid border-bd-primary bg-bg-secondary px-[16px] py-[13.5px] placeholder-text-default"
            />
            <div className="flex justify-end text-emerald-500">
              비밀번호를 잊으셨나요?
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[24px]">
        <button className="bg-white">로그인</button>
        <div className="flex-center justify-between gap-[12px]">
          <span className="font-medium-16 text-text-primary">
            아직 계정이 없으신가요?
          </span>
          <span className="font-medium-16 text-emerald-500">가입하기</span>
        </div>
      </div>
    </form>
  );
}
