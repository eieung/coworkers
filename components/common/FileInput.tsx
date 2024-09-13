import { ChangeEvent, ReactNode, useEffect, useRef, useState } from 'react';

interface FileInputProps {
  name: string;
  value: File | null;
  onChange: (file: File | null) => void;
  children: (props: {
    preview: string;
    handleClearClick: () => void;
  }) => ReactNode;
}

const FileInput: React.FC<FileInputProps> = ({ value, onChange, children }) => {
  const [preview, setPreview] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target?.files?.[0];
    if (nextValue) {
      onChange(nextValue);
    }
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview('');
    }

    inputNode.value = '';
    onChange(null);
  };

  useEffect(() => {
    if (!value) return;

    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    return () => {
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]);

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <section>
      <input
        className="hidden"
        ref={inputRef}
        id="fileInput"
        type="file"
        accept="image/png, image/jpeg, image/gif, image/svg+xml, application/pdf, image/webp"
        onChange={handleChange}
      />
      <div
        className="inline-block cursor-pointer hover:brightness-110"
        onClick={handleClick}
      >
        {children({ preview, handleClearClick })}
      </div>
    </section>
  );
};

export default FileInput;
