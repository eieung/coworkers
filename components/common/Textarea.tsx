import { useRef, useEffect, forwardRef } from 'react';
import clsx from 'clsx';

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  invalid?: boolean;
  validationMessage?: string;
  className?: string;
  height?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { label, invalid, validationMessage, className, height = '48px', ...props },
    ref,
  ) => {
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
      if (textAreaRef.current) {
        textAreaRef.current.style.height = height;
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
      }
    }, [props.value, height]);

    return (
      <>
        {label && (
          <label
            htmlFor={props.id}
            className="font-medium-16 mb-3 inline-block text-text-primary"
          >
            {label}
          </label>
        )}
        <textarea
          {...props}
          ref={(node) => {
            if (node) {
              textAreaRef.current = node;
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
            }
          }}
          className={clsx(
            'placeholder:font-regular-16 rounded-[12px] border border-solid border-bd-primary bg-bg-secondary p-4 text-text-primary outline-none placeholder:text-text-default',
            'hover:border-it-hover',
            'focus:border-it-focus',
            invalid && 'border-red-500',
            !invalid &&
              props.value &&
              props.value !== '' &&
              'border-bd-primary',
            'resize-none',
            'overflow-hidden',
            className,
          )}
        />
        {invalid && validationMessage && (
          <span className="font-medium-14 mt-2 inline-block text-red-500">
            {validationMessage}
          </span>
        )}
      </>
    );
  },
);

Textarea.displayName = 'Textarea';

export default Textarea;
