import { log } from "console"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { api } from "~/utils/api"


export default function deleteNote(props: any){
    const router = useRouter()
    const {id, title}  = router.query
    const noteId = parseInt(id as string)

    const {data: retornoDeleteNote, mutate: deleteNote, status} = api.personalNote.deleteNote.useMutation()

    useEffect(() => {
      console.log("aqui")
      if(title){
        console.log('entrou')
        // localStorage.removeItem(title)
      }
      if (typeof noteId == "number") {
        console.log(typeof noteId);
              
        deleteNote({
          id: noteId
        })
      }
    }, [deleteNote])

    return (
        <>
            <div><h1>Nota deletada</h1></div>
        </>
    )
}