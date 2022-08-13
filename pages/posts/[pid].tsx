import {useRouter} from 'next/router'
import Link from 'next/link'

export default function Posts(){
  
  const router = useRouter()
  const { pid } = router.query
  console.log(pid)
  return (
    <main>
      <div>
        <h1>Hello this is page: {pid}</h1>
      </div>
      <div>
        <Link href="/">ホームに戻る</Link>
      </div>
    </main>
  )
}