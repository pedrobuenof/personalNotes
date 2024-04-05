import { useRouter } from "next/router";
import NoteForm from "~/components/NoteForm";
import { api } from "~/utils/api";

export default function editNote(props: any){
    const router = useRouter()
    const {id}  = router.query
    const noteId = parseInt(id as string)

    const { data: resultQueryNoteById, isSuccess: querySuccess } = api.personalNote.showNoteById.useQuery({ id: noteId});

    
    return (
        <>
          {resultQueryNoteById ? <NoteForm isNewNote={false} initialNote={resultQueryNoteById}/> : <h1>Não achou a nota pelo id. Tente novamente!</h1>}  
        </>
    )
}