import OpenAI from "openai";

async function main(){
  const key = process.env.OPENAI_API_KEY;
  if(!key){
    console.error('OPENAI_API_KEY is not set');
    process.exit(1);
  }
  const openai = new OpenAI({ apiKey: key });

  const prompt = `웹사이트 분석 샘플 리포트를 생성해줘. 사이트: https://example.com, 로딩속도: 85, SEO: 78, 접근성: 82, Best Practices: 90, 총점: 84`;

  try{
    const res = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: '당신은 웹사이트 분석 전문가입니다.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 500,
      temperature: 0.5,
    });

    console.log('=== OpenAI 응답 ===');
    console.log(res.choices?.[0]?.message?.content || JSON.stringify(res));
  }catch(e){
    console.error('OpenAI 호출 실패:', e);
    process.exit(1);
  }
}

main();
