import { useForm, Controller } from 'react-hook-form';
import Modal from '.';
import { ACTION_TYPE, ModalUserActions } from '@/constants/modal';
import { toast } from 'react-toastify';
import Input from '@/components/common/Input';
import Button from '@/components/common/button';
import clsx from 'clsx';
import { fetchData } from '@/services/task/taskListApi';
import { useAuthQuery } from '@/queries/user';
import { useRouter } from 'next/router';

interface ChangePasswordProps {
  close: () => void;
}

interface FormData {
  password: string;
  passwordConfirmation: string;
}

const containsKorean = (value: string) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(value);

const validatePassword = (value: string) => {
  if (containsKorean(value)) {
    return '영문자만 입력해주세요.';
  }
  if (value.length < 8) {
    return '비밀번호는 최소 8자 이상이어야 합니다.';
  }
  return true;
};

const validatePasswordConfirmation = (value: string, password: string) => {
  if (value !== password) {
    return '비밀번호가 일치하지 않습니다.';
  }
  return true;
};

export default function ChangePassword({ close }: ChangePasswordProps) {
  const { replace } = useRouter();

  const { logout } = useAuthQuery();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    trigger,
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
  });

  const { title, description, inputs, buttons } =
    ModalUserActions[ACTION_TYPE.CHANGE_PASSWORD];

  const password = watch('password');

  const onSubmit = async (data: FormData) => {
    const trimmedPassword = data.password.trim();
    const trimmedPasswordConfirmation = data.passwordConfirmation.trim();

    if (trimmedPassword !== trimmedPasswordConfirmation) {
      toast.error('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await fetchData('/user/password', undefined, 'PATCH', {
        passwordConfirmation: trimmedPasswordConfirmation,
        password: trimmedPassword,
      });

      logout();

      toast(`비밀번호가 성공적으로 변경되었습니다!`);
      close();
      replace('/login');
    } catch (err) {
      toast.error('비밀번호 변경에 실패했습니다.');
    }
  };

  return (
    <Modal
      onClose={close}
      title={title}
      showCloseIcon={true}
      description={description}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {inputs?.map((input, index) => (
          <div className="mt-4 flex flex-col" key={index}>
            <Controller
              name={input.name as keyof FormData}
              control={control}
              rules={{
                required: `${input.placeholder}`,
                validate:
                  input.name === 'password'
                    ? validatePassword
                    : input.name === 'passwordConfirmation'
                      ? (value) => validatePasswordConfirmation(value, password)
                      : undefined,
              }}
              render={({ field }) => (
                <Input
                  {...input}
                  {...field}
                  type="password"
                  className={clsx(
                    'placeholder:font-regular-14 w-full border',
                    input.height,
                  )}
                  invalid={!!errors[input.name as keyof FormData]}
                  validationMessage={
                    errors[input.name as keyof FormData]?.message
                  }
                  onChange={(e) => {
                    const newValue = e.target.value;
                    const trimmedValue = newValue.trim();
                    field.onChange(trimmedValue);
                    setValue(input.name as keyof FormData, trimmedValue);
                    trigger(input.name as keyof FormData);
                  }}
                  onBlur={() => trigger(input.name as keyof FormData)}
                  value={field.value}
                />
              )}
            />
          </div>
        ))}
        <div className="flex flex-col">
          <div className="flex-center mt-6 gap-2">
            {buttons?.map((button, index) => (
              <Button
                key={index}
                {...button}
                onClick={index === 0 ? close : button.onClick}
                disabled={index === 0 ? false : !isValid}
              />
            ))}
          </div>
        </div>
      </form>
    </Modal>
  );
}
