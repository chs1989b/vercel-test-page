# Vercel 테스트 페이지

Next.js와 Vercel로 배포한 간단한 테스트 페이지입니다.

## 개발 시작

```bash
npm install
npm run dev
```

`http://localhost:3000`에서 페이지를 볼 수 있습니다.

## 빌드

```bash
npm run build
npm start
```

## Vercel 배포

이 프로젝트는 Vercel에 배포하도록 최적화되어 있습니다.

### 배포 방법

1. **GitHub에 푸시**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo>
   git push -u origin main
   ```

2. **Vercel에 연결**
   - [Vercel 대시보드](https://vercel.com/dashboard)로 이동
   - "Add New Project" 클릭
   - GitHub 저장소 선택
   - 배포 완료!

또는 Vercel CLI 사용:

```bash
npm i -g vercel
vercel
```

## 프로젝트 구조

```
.
├── app/
│   ├── layout.tsx      # Root 레이아웃
│   └── page.tsx        # 홈 페이지
├── package.json        # 의존성
├── next.config.ts      # Next.js 설정
└── tsconfig.json       # TypeScript 설정
```

## 기술 스택

- **Next.js 15** - React 프레임워크
- **TypeScript** - 정적 타입 지원
- **Vercel** - 호스팅 플랫폼

## 라이센스

MIT
