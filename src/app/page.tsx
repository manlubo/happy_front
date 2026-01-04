import { API_BASE_URL } from "@/lib/env"


export default function Home() {
  return (
    <div className="">
      <main className="">
        <h1 className="text-3xl font-bold">Hello World</h1>
        <div>API_BASE_URL : {API_BASE_URL}</div>
      </main>
    </div>
  );
}
