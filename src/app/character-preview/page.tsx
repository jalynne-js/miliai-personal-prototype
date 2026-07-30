import Image from "next/image";

const characters = [
  ["남자 20대", "male-20s"],
  ["남자 30대", "male-30s"],
  ["남자 40대", "male-40s"],
  ["여자 20대", "female-20s"],
  ["여자 30대", "female-30s"],
  ["여자 40대", "female-40s"],
  ["고양이", "cat"],
  ["다람쥐", "squirrel"],
  ["강아지", "dog"],
  ["AI 로봇", "robot"],
  ["여우", "fox"],
  ["곰", "bear"],
] as const;

export default function CharacterPreviewPage() {
  return (
    <main className="min-h-screen bg-[#050806] px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-bold tracking-[0.2em] text-[#b7ff31]">MILI AI CHARACTER FAMILY</p>
        <h1 className="mt-3 text-4xl font-black">전신 캐릭터 PNG 미리보기</h1>
        <p className="mt-3 text-sm text-white/50">배경이 제거된 12종 캐릭터 에셋입니다.</p>
        <section className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {characters.map(([label, file]) => (
            <article key={file} className="border border-[#b7ff31]/25 bg-[radial-gradient(circle_at_50%_40%,#193119,#080c09_65%)] p-4">
              <div className="relative aspect-square">
                <Image src={`/characters/fullbody/${file}.png`} alt={label} fill className="object-contain" />
              </div>
              <p className="mt-3 text-center text-sm font-bold">{label}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
