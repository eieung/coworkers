import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('MongoDB 연결 문자열(MONGODB_URI)이 설정되지 않았습니다.');
}

// MongoDB 연결을 캐시하기 위한 변수
let cachedConnection: Mongoose | null = null;
let connectionPromise: Promise<Mongoose> | null = null;

export default async function dbConnect(): Promise<Mongoose> {
  if (cachedConnection) {
    return cachedConnection;
  }

  // 처음 연결 시 connectionPromise가 없으면 새로운 연결을 시도
  if (!connectionPromise) {
    const opts = {
      /**
       * @bufferCommands
       * @ 명령어가 커넥션 버퍼에 저장되지 않도록 설정하여,
       * @ 연결이 완료되기 전에 발생한 명령어들이 대기하지 않게 함.
       * @ 연결 지연 시 예상치 못한 동작을 방지하는 데 유용.
       */
      bufferCommands: false,

      /**
       * @useNewUrlParser
       * @ MongoDB의 새로운 URL 구문 분석기를 사용하도록 설정.
       * @ 기존의 구식 URL 구문 분석기에서 발생할 수 있는 문제를 방지하고,
       * @ 더 최신의 표준을 따르는 구문 분석기를 이용함.
       */
      useNewUrlParser: true,

      /**
       * @useUnifiedTopology
       * @ MongoDB의 새로운 통합 토폴로지 엔진을 사용하도록 설정.
       * @ 더 안정적인 연결을 유지하고,
       * @ 이전의 연결 관리 방식에서 발생할 수 있는 여러 문제를 해결.
       * @ 특히 연결 풀링이나 모니터링과 관련된 이슈에 대해 개선된 방식 제공.
       */
      useUnifiedTopology: true,
    };

    // 연결 성공 시 cachedConnection에 연결을 저장하고, 실패 시 에러를 처리
    connectionPromise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        cachedConnection = mongooseInstance;
        return mongooseInstance;
      })
      .catch((error) => {
        cachedConnection = null; // 연결 실패 시 캐시 초기화
        connectionPromise = null; // 연결 실패 시 캐시된 Promise도 초기화
        console.error('MongoDB 연결 오류:', error);
        throw error;
      });
  }

  // 연결이 완료될 때까지 await하고, 그 후 캐시된 연결을 반환
  cachedConnection = await connectionPromise;
  return cachedConnection;
}
