export default function Home() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>🚀 Vercel 테스트 페이지</h1>
        <p style={styles.subtitle}>Next.js로 만든 간단한 테스트 페이지입니다</p>
      </header>

      <main style={styles.main}>
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>✨ 기능</h2>
          <ul style={styles.list}>
            <li>⚡ Next.js 최신 버전</li>
            <li>📱 반응형 디자인</li>
            <li>🚀 Vercel에 배포됨</li>
            <li>💻 TypeScript 지원</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>🔗 유용한 링크</h2>
          <div style={styles.links}>
            <a 
              href="https://nextjs.org" 
              target="_blank" 
              rel="noopener noreferrer"
              style={styles.link}
            >
              Next.js 문서
            </a>
            <a 
              href="https://vercel.com" 
              target="_blank" 
              rel="noopener noreferrer"
              style={styles.link}
            >
              Vercel
            </a>
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>📊 정보</h2>
          <div style={styles.info}>
            <p><strong>배포 시간:</strong> {new Date().toLocaleString('ko-KR')}</p>
            <p><strong>환경:</strong> Production</p>
            <p><strong>플랫폼:</strong> Vercel</p>
          </div>
        </section>
      </main>

      <footer style={styles.footer}>
        <p>© 2025 Vercel 테스트 페이지 - 배포 테스트</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    backgroundColor: '#0f172a',
    color: '#e2e8f0',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  header: {
    background: 'linear-gradient(135deg, #0f766e 0%, #0d9488 100%)',
    padding: '3rem 1rem',
    textAlign: 'center' as const,
    borderBottom: '2px solid #0d9488',
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    margin: '0 0 0.5rem 0',
    color: '#fff',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#d1fae5',
    margin: 0,
  },
  main: {
    flex: 1,
    maxWidth: '900px',
    margin: '0 auto',
    padding: '2rem 1rem',
    width: '100%',
  },
  section: {
    marginBottom: '2rem',
    padding: '1.5rem',
    backgroundColor: '#1e293b',
    borderRadius: '0.5rem',
    border: '1px solid #334155',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginTop: 0,
    marginBottom: '1rem',
    color: '#a7f3d0',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  li: {
    padding: '0.5rem 0',
    fontSize: '1rem',
  },
  links: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap' as const,
  },
  link: {
    display: 'inline-block',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#0f766e',
    color: '#a7f3d0',
    textDecoration: 'none',
    borderRadius: '0.375rem',
    transition: 'all 0.3s ease',
    border: '1px solid #0d9488',
    cursor: 'pointer',
  },
  info: {
    fontSize: '1rem',
    lineHeight: '1.8',
  },
  footer: {
    backgroundColor: '#0f172a',
    borderTop: '1px solid #334155',
    padding: '1.5rem',
    textAlign: 'center' as const,
    color: '#94a3b8',
    marginTop: 'auto',
  },
};
