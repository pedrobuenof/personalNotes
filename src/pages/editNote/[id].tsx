import { useRouter } from "next/router";
import NoteForm from "~/components/NoteForm";
import { api } from "~/utils/api";

export default function editNote(props: any){
    const router = useRouter()
    const {id}  = router.query
    const noteId = parseInt(id as string)

    const { data: dbQueryNoteById, isSuccess: querySuccess } = api.personalNote.showNoteById.useQuery({ id: noteId});
    return (
        <>
          {dbQueryNoteById ? <NoteForm isNewNote={false} initialNote={dbQueryNoteById}/> : console.log("Não achou a nota pelo id")}  
        </>
    )
}