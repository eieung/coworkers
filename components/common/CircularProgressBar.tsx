import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

/*
 * @component
 * ProgressBar - 원형 진행 표시줄을 표시하는 컴포넌트
 *
 * @props
 * - percentage (필수): 진행 상태를 나타내는 퍼센트 값 (0 ~ 100).
 * - strokeWidth (optional): 프로그레스바 진행 상태의 두께를 설정. 기본값은 16.
 * - textColor (optional): 퍼센트 텍스트의 색상을 지정합니다. useGradient가 true이면 무시됩니다.
 * - showText (optional): 퍼센트 텍스트를 표시할지 여부를 결정. 기본값은 false입니다.
 * - className (optional): 사용자 지정 스타일
 *
 * @usage
 * 1. 기본 ProgressBar:
 *    <ProgressBar
 *      percentage={75}
 *      trailColor="#eee"
 *    />
 *
 * 2. 텍스트 표시가 있는 ProgressBar:
 *    <ProgressBar
 *      percentage={50}
 *      trailColor="#ddd"
 *      showText={true}
 *    />
 *
 */

interface CircularProgressBarProps {
  percentage: number;
  strokeWidth?: number;
  trailColor: string;
  showText?: boolean;
  className?: string;
}

export default function CircularProgressBar({
  percentage = 0,
  strokeWidth = 16,
  trailColor,
  showText = false,
  className,
}: CircularProgressBarProps) {
  return (
    <>
      <svg style={{ width: 0, height: 0 }}>
        <defs>
          <linearGradient id="progress-gradient" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#A3E635" />
          </linearGradient>
        </defs>
      </svg>

      <CircularProgressbar
        value={percentage}
        strokeWidth={strokeWidth}
        styles={{
          path: {
            stroke: 'url(#progress-gradient)',
            strokeLinecap: 'round',
            transition: 'stroke-dashoffset 0.5s ease 0s',
            transformOrigin: 'center center',
            transform: 'rotate(0.25turn)',
          },
          trail: {
            stroke: trailColor,
            strokeLinecap: 'butt',
            transform: 'rotate(0.25turn)',
            transformOrigin: 'center center',
          },
          text: {
            fill: 'url(#progress-gradient)',
            fontSize: '20px',
            fontWeight: 700,
            display: showText ? 'block' : 'none',
          },
        }}
        text={showText ? `${percentage}%` : ''}
        className={className}
      />
    </>
  );
}
