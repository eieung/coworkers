import Button from '@/components/common/button';

export default function Home() {
  return (
    <>
      <Button
        size="floating-large"
        appearance="floating-outlined"
        fullWidth={false}
        children="+ 할 일 추가"
        className=""
        disabled={true}
      />
    </>
  );
}
